(function () {
  "use strict";

  function normalizeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      url.hash = "";
      url.hostname = url.hostname.toLowerCase();
      url.pathname = url.pathname.toLowerCase().replace(/\/$/, "");
      url.searchParams.sort();
      return url.href;
    } catch (_) { return ""; }
  }

  function init({ getEntry }) {
    const references = new Map(Object.entries(window.GAILEIA_LINK_PREVIEWS || {})
      .map(([url, value]) => [normalizeUrl(url), value]));
    const panel = document.createElement("aside");
    panel.id = "link-preview";
    panel.className = "link-preview";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "link-preview-title");
    panel.hidden = true;
    panel.innerHTML = '<div class="link-preview-header"><h2 id="link-preview-title"></h2><button type="button" class="link-preview-close" aria-label="Close preview">×</button></div><div class="link-preview-body detail-body"></div><footer class="link-preview-footer"><span></span><a target="_blank" rel="noreferrer" data-no-preview>Open reference ↗</a></footer>';
    document.body.append(panel);
    const title = panel.querySelector("h2");
    const body = panel.querySelector(".link-preview-body");
    const note = panel.querySelector("footer span");
    const source = panel.querySelector("footer a");
    const closeButton = panel.querySelector("button");
    let active = null, openTimer = 0, closeTimer = 0, suppressFocus = false, lastPointer = "mouse";
    let previousAttributes = null;
    const label = (anchor) => anchor.textContent.trim().replace(/[◆↻]/g, "").trim().toLowerCase();

    function resolve(anchor) {
      const href = anchor.getAttribute("href") || "";
      if (anchor.closest("#link-preview") || anchor.hasAttribute("data-no-preview")) return null;
      if (href.startsWith("#entry/")) {
        let id;
        try { id = decodeURIComponent(href.slice(7)); } catch (_) { return null; }
        const entry = getEntry(id);
        if (!entry || entry.externalUrl) return null;
        return { title: entry.title, html: `<p>${entry.intro || ""}</p>${entry.contentHtml}`, sourceUrl: href, local: true };
      }
      // The displayed homebrew spell is authoritative even when its overview uses another AoN URL.
      if (anchor.closest("#detail-view")) {
        const card = [...document.querySelectorAll("#detail-view .rules-subcard")].find((candidate) => {
          const heading = candidate.querySelector("h3");
          return heading && label(heading) === label(anchor);
        });
        if (card) return { title: card.querySelector("h3").textContent.trim(), html: card.innerHTML, sourceUrl: href, local: true };
      }
      return references.get(normalizeUrl(href)) || null;
    }

    function findAnchor(target) {
      const anchor = target instanceof Element ? target.closest("a[href]") : null;
      return anchor && !anchor.closest("#link-preview") && resolve(anchor) ? anchor : null;
    }

    // Only a small formatting vocabulary is copied into previews; scripts, controls,
    // IDs, styles, event handlers, and nested navigation are never carried across.
    function localFragment(markup) {
      const parsed = new DOMParser().parseFromString(markup, "text/html");
      const allowed = new Set(["P", "BR", "STRONG", "EM", "H2", "H3", "H4", "UL", "OL", "LI", "DL", "DT", "DD", "DIV", "SPAN", "SECTION", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "HR"]);
      const classes = new Set(["trait-list", "trait", "stat-block", "stat-line", "action-icon", "table-wrap"]);
      parsed.querySelectorAll("script,style,iframe,object,embed,form,button,input,textarea,select,svg,img").forEach(node => node.remove());
      for (const node of [...parsed.body.querySelectorAll("*")]) {
        if (!allowed.has(node.tagName)) { node.replaceWith(...node.childNodes); continue; }
        const keep = [...node.classList].filter(c => classes.has(c));
        for (const attribute of [...node.attributes]) node.removeAttribute(attribute.name);
        if (keep.length) node.className = keep.join(" ");
      }
      const fragment = document.createDocumentFragment();
      fragment.append(...parsed.body.childNodes);
      return fragment;
    }

    function position() {
      if (!active || panel.hidden) return;
      const r = active.getBoundingClientRect(), gap = 10, margin = 12;
      const width = panel.offsetWidth, height = panel.offsetHeight;
      let top = r.bottom + gap;
      if (top + height > window.innerHeight - margin) top = r.top - height - gap;
      panel.style.left = `${Math.max(margin, Math.min(r.left, window.innerWidth - width - margin))}px`;
      panel.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - height - margin))}px`;
    }

    function close(restoreFocus = false) {
      clearTimeout(openTimer); clearTimeout(closeTimer);
      const old = active;
      panel.hidden = true;
      if (old && previousAttributes) {
        for (const [name, value] of Object.entries(previousAttributes)) {
          if (value === null) old.removeAttribute(name); else old.setAttribute(name, value);
        }
      }
      active = null; previousAttributes = null;
      if (restoreFocus && old?.isConnected) {
        suppressFocus = true;
        old.focus({ preventScroll: true });
        suppressFocus = false;
      }
    }

    function show(anchor) {
      clearTimeout(openTimer); clearTimeout(closeTimer);
      if (active === anchor && !panel.hidden) return;
      const preview = resolve(anchor);
      if (!preview || !anchor.isConnected) return;
      close(); active = anchor;
      previousAttributes = Object.fromEntries(["aria-expanded", "aria-controls", "aria-haspopup"].map(k => [k, anchor.getAttribute(k)]));
      anchor.setAttribute("aria-expanded", "true");
      anchor.setAttribute("aria-controls", panel.id);
      anchor.setAttribute("aria-haspopup", "dialog");
      title.textContent = preview.title;
      body.replaceChildren();
      if (preview.html) body.append(localFragment(preview.html));
      else { const text = document.createElement("p"); text.className = "link-preview-text"; text.textContent = preview.text; body.append(text); }
      note.textContent = preview.local ? "From this compendium" : "Archives of Nethys • saved reference";
      source.href = preview.sourceUrl;
      if (preview.sourceUrl.startsWith("#")) { source.removeAttribute("target"); source.textContent = "Open entry →"; }
      else { source.target = "_blank"; source.textContent = "Open reference ↗"; }
      panel.hidden = false;
      body.scrollTop = 0;
      position();
    }

    function scheduleClose() {
      clearTimeout(openTimer); clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (panel.matches(":hover") || panel.contains(document.activeElement) || active === document.activeElement) return;
        close();
      }, 300);
    }

    document.addEventListener("pointerover", event => {
      if (event.pointerType === "touch") return;
      const anchor = findAnchor(event.target);
      if (!anchor) return;
      if (anchor.contains(event.relatedTarget)) return;
      clearTimeout(closeTimer); clearTimeout(openTimer);
      openTimer = setTimeout(() => show(anchor), 250);
    });
    document.addEventListener("pointerout", event => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (anchor && !anchor.contains(event.relatedTarget)) scheduleClose();
    });
    panel.addEventListener("pointerenter", () => { clearTimeout(closeTimer); clearTimeout(openTimer); });
    panel.addEventListener("pointerleave", scheduleClose);
    document.addEventListener("focusin", event => {
      if (suppressFocus || panel.contains(event.target)) return;
      const anchor = findAnchor(event.target);
      if (anchor && lastPointer !== "touch") show(anchor);
      else if (!anchor) close();
    });
    document.addEventListener("focusout", scheduleClose);
    document.addEventListener("pointerdown", event => {
      lastPointer = event.pointerType;
      if (active && !panel.contains(event.target) && !active.contains(event.target)) close();
    });
    document.addEventListener("click", event => {
      const anchor = findAnchor(event.target);
      if (lastPointer === "touch" && anchor && active !== anchor && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault(); show(anchor);
      }
    });
    document.addEventListener("keydown", event => {
      lastPointer = "keyboard";
      if (event.key === "Escape" && active) { event.preventDefault(); close(true); }
      if (event.key === "ArrowDown" && active === document.activeElement && !panel.hidden) {
        event.preventDefault(); closeButton.focus();
      }
    });
    closeButton.addEventListener("click", () => close(true));
    window.addEventListener("hashchange", () => close());
    window.addEventListener("resize", position);
    document.addEventListener("scroll", event => { if (!panel.contains(event.target)) close(); }, true);
    document.getElementById("pc-mode")?.addEventListener("click", () => close());
    document.getElementById("gm-mode")?.addEventListener("click", () => close());
    return { close, resolve };
  }
  window.GaileiaPreviews = { init, normalizeUrl };
})();
