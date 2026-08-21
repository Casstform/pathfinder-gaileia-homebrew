(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const categories = Array.isArray(window.HOMEBREW_CATEGORIES)
    ? window.HOMEBREW_CATEGORIES
    : ["All"];

  const GM_PASSCODE_SHA256 = "dc44b22d590f2f351d8fa792f7dfc7f6bffb01c00c2bdc020d4489d2c306b03b";
  const GM_ONLY_STORAGE_KEY = "gaileia-compendium-preview-gm-only-v2";
  const CATALOGUE_SCROLL_KEY = "gaileia-compendium-catalogue-scroll-v1";
  const VISIBILITY_API = String(window.GAILEIA_VISIBILITY_API || "").replace(/\/$/, "");

  const state = {
    categories: new Set(),
    query: "",
    mode: "pc",
    gmOnlyIds: loadGmOnlyIds(),
    gmPasscode: ""
  };

  const catalogueView = document.getElementById("catalogue-view");
  const detailView = document.getElementById("detail-view");
  const catalogueGrid = document.getElementById("catalogue-grid");
  const filterList = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const resultsTitle = document.getElementById("results-title");
  const resultsCount = document.getElementById("results-count");
  const entryTotal = document.getElementById("entry-total");
  const collectionTotal = document.getElementById("collection-total");
  const emptyState = document.getElementById("empty-state");
  const clearSearch = document.getElementById("clear-search");
  const pcMode = document.getElementById("pc-mode");
  const gmMode = document.getElementById("gm-mode");
  const accessDialog = document.getElementById("gm-access-dialog");
  const accessForm = document.getElementById("gm-access-form");
  const passcodeInput = document.getElementById("gm-passcode");
  const accessError = document.getElementById("gm-access-error");
  const cancelGmAccess = document.getElementById("cancel-gm-access");

  const categoryOrder = Object.fromEntries(
    categories.filter((category) => category !== "All").map((category, index) => [category, index])
  );

  const categorySymbols = {
    Animist: "◎",
    "Fauna/Flora": "⬟",
    Formulae: "◫",
    "House Rules": "⬢",
    Items: "◇",
    Language: "◈",
    Maps: "▱",
    Oziza: "◐",
    Ritsa: "⬥",
    Saraik: "△",
    Spells: "✦",
    Subsystems: "⬡",
    WE4LAND: "▣"
  };

  function loadGmOnlyIds() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(GM_ONLY_STORAGE_KEY) || "[]");
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (_error) {
      return new Set();
    }
  }

  function saveGmOnlyIds() {
    window.localStorage.setItem(GM_ONLY_STORAGE_KEY, JSON.stringify([...state.gmOnlyIds]));
  }

  async function loadSharedGmOnlyIds() {
    if (!VISIBILITY_API) return;
    try {
      const response = await fetch(`${VISIBILITY_API}/visibility`, {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`Visibility service returned ${response.status}`);
      const payload = await response.json();
      state.gmOnlyIds = new Set(Array.isArray(payload.ids) ? payload.ids : []);
      saveGmOnlyIds();
      renderCatalogue();
    } catch (error) {
      console.warn("Shared GM visibility could not be loaded; using the last local copy.", error);
    }
  }

  async function saveSharedGmOnlyIds() {
    saveGmOnlyIds();
    if (!VISIBILITY_API) return { shared: false };
    const response = await fetch(`${VISIBILITY_API}/visibility`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${state.gmPasscode}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids: [...state.gmOnlyIds] })
    });
    if (!response.ok) throw new Error(`Visibility service returned ${response.status}`);
    return { shared: true };
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function matchesQuery(searchText, query) {
    return query
      .split(/\s+/)
      .filter(Boolean)
      .every((term) => {
        if (term.length <= 3) {
          return new RegExp(`\\b${escapeRegExp(term)}`).test(searchText);
        }
        return searchText.includes(term);
      });
  }

  function entrySearchText(entry, includeGmFields) {
    const fields = [
      entry.title,
      entry.category,
      entry.typeLabel,
      entry.summary,
      entry.intro,
      entry.contentHtml.replace(/<[^>]+>/g, " ")
    ];

    if (includeGmFields) {
      fields.push(entry.levelLabel, entry.headingLabel, entry.traits.join(" "));
    }

    return normalize(fields.join(" "));
  }

  entries.forEach((entry) => {
    entry._pcSearchText = entrySearchText(entry, false);
    entry._gmSearchText = entrySearchText(entry, true);
  });

  function categorySlug(category) {
    return normalize(category).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function isGmOnly(entry) {
    return Boolean(entry.gmOnly || state.gmOnlyIds.has(entry.id));
  }

  function canOpenInCurrentMode(entry) {
    if (entry.externalUrl || state.mode === "gm") return true;
    return !isGmOnly(entry);
  }

  function traitMarkup(traits) {
    return traits
      .map((trait) => {
        const normalized = normalize(trait);
        const baseTrait = normalized
          .replace(/^capacity\s+\d+$/, "capacity")
          .replace(/^fatal\s+d\d+$/, "fatal")
          .replace(/^versatile\s+.+$/, "versatile")
          .replace(/^volley\s+.+$/, "volley");
        const url = window.GAILEIA_TRAIT_URLS && window.GAILEIA_TRAIT_URLS[baseTrait];
        const label = escapeHtml(trait);
        const contents = url
          ? `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label}</a>`
          : label;
        return `<li class="trait" data-trait="${escapeHtml(normalized)}">${contents}</li>`;
      })
      .join("");
  }

  function linkRenderedTraits(container) {
    container.querySelectorAll(".trait").forEach((traitElement) => {
      if (traitElement.querySelector("a")) return;
      const normalized = normalize(traitElement.textContent.trim());
      const baseTrait = normalized
        .replace(/^capacity\s+\d+$/, "capacity")
        .replace(/^fatal\s+d\d+$/, "fatal")
        .replace(/^versatile\s+.+$/, "versatile")
        .replace(/^volley\s+.+$/, "volley");
      const url = window.GAILEIA_TRAIT_URLS && window.GAILEIA_TRAIT_URLS[baseTrait];
      if (!url) return;
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = traitElement.textContent.trim();
      traitElement.replaceChildren(anchor);
    });
  }

  function filteredEntries() {
    const query = normalize(state.query.trim());
    return entries
      .filter((entry) => state.mode === "gm" || !isGmOnly(entry))
      .filter((entry) => state.categories.size === 0 || state.categories.has(entry.category))
      .filter((entry) => {
        if (!query) return true;
        const searchText = state.mode === "gm" ? entry._gmSearchText : entry._pcSearchText;
        return matchesQuery(searchText, query);
      })
      .sort((left, right) => {
        const categoryDifference =
          (categoryOrder[left.category] ?? 99) - (categoryOrder[right.category] ?? 99);
        return categoryDifference || left.title.localeCompare(right.title);
      });
  }

  function cardActionMarkup(entry) {
    if (entry.externalUrl) {
      return `<a class="card-link" href="${escapeHtml(entry.externalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(entry.externalLabel || "Open site")}</a>`;
    }

    return `<a class="card-link" href="#entry/${encodeURIComponent(entry.id)}" aria-label="Read ${escapeHtml(entry.title)}">Read entry</a>`;
  }

  function cardMarkup(entry) {
    const gmOnly = isGmOnly(entry);
    const gmMeta =
      state.mode === "gm"
        ? `<p class="entry-level">${escapeHtml(entry.levelLabel)}</p>`
        : "";
    const gmTraits =
      state.mode === "gm"
        ? `<ul class="trait-list" aria-label="${escapeHtml(entry.title)} traits">${traitMarkup(entry.traits.slice(0, 6))}</ul>`
        : "";
    const gmBadge = state.mode === "gm" && gmOnly ? `<span class="gm-only-badge">GM only</span>` : "";

    return `
      <article
        class="entry-card${gmOnly ? " is-gm-only" : ""}"
        data-category="${escapeHtml(categorySlug(entry.category))}"
        data-symbol="${escapeHtml(categorySymbols[entry.category] || "◆")}"
      >
        <div class="card-meta">
          <p class="entry-type">${escapeHtml(entry.typeLabel)}</p>
          ${gmMeta}
        </div>
        ${gmBadge}
        <h3>${escapeHtml(entry.title)}</h3>
        <div>
          <p class="entry-summary">${escapeHtml(entry.summary)}</p>
          ${gmTraits}
        </div>
        ${cardActionMarkup(entry)}
      </article>
    `;
  }

  function renderFilters() {
    filterList.innerHTML = categories
      .map((category) => {
        const count =
          category === "All"
            ? entries.length
            : entries.filter((entry) => entry.category === category).length;
        return `
          <button
            class="filter-button"
            type="button"
            data-category="${escapeHtml(category)}"
            aria-pressed="${category === "All" ? state.categories.size === 0 : state.categories.has(category)}"
          >${escapeHtml(category)} (${count})</button>
        `;
      })
      .join("");

    filterList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category || "All";
        if (category === "All") {
          state.categories.clear();
        } else if (state.categories.has(category)) {
          state.categories.delete(category);
        } else {
          state.categories.add(category);
        }
        renderFilters();
        renderCatalogue();
      });
    });
  }

  function renderCatalogue() {
    const visibleEntries = filteredEntries();
    catalogueGrid.innerHTML = visibleEntries.map(cardMarkup).join("");
    emptyState.hidden = visibleEntries.length > 0;
    catalogueGrid.hidden = visibleEntries.length === 0;

    const label = state.categories.size === 0 ? "All entries" : [...state.categories].join(" + ");
    resultsTitle.textContent = label;
    resultsCount.textContent = `${visibleEntries.length} ${visibleEntries.length === 1 ? "entry" : "entries"}`;
  }

  function showCatalogue({ focus = false, restoreScroll = false } = {}) {
    document.title = "Gaileia Compendium";
    catalogueView.hidden = false;
    detailView.hidden = true;
    detailView.innerHTML = "";
    if (focus) {
      const title = document.getElementById("catalogue-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
      title.addEventListener("blur", () => title.removeAttribute("tabindex"), { once: true });
    }
    if (restoreScroll) {
      const storedScroll = Number(window.sessionStorage.getItem(CATALOGUE_SCROLL_KEY) || 0);
      window.requestAnimationFrame(() => window.scrollTo({ top: storedScroll, behavior: "auto" }));
    }
  }

  function showNotFound() {
    catalogueView.hidden = true;
    detailView.hidden = false;
    detailView.innerHTML = `
      <div class="not-found">
        <p class="kicker">Entry not found</p>
        <h1 tabindex="-1">That page is missing</h1>
        <p>The requested homebrew entry is not in this version of the compendium.</p>
        <a class="button button-primary" href="#catalogue">Return to the catalogue</a>
      </div>
    `;
    detailView.querySelector("h1").focus({ preventScroll: true });
  }

  function showRestricted(entry) {
    const marked = isGmOnly(entry);
    document.title = `${marked ? "GM Only" : "PC Preview"} | Gaileia Compendium`;
    catalogueView.hidden = true;
    detailView.hidden = false;
    detailView.innerHTML = `
      <div class="not-found restricted-entry">
        <p class="kicker">${marked ? "GM-only entry" : "PC preview"}</p>
        <h1 tabindex="-1">${escapeHtml(entry.title)}</h1>
        <p>This entry has been marked for the GM's view. Unlock GM mode to read the full entry.</p>
        <a class="button button-primary" href="#catalogue">Return to the catalogue</a>
      </div>
    `;
    detailView.querySelector("h1").focus({ preventScroll: true });
  }

  function detailMarkup(entry) {
    const gmOnly = isGmOnly(entry);
    const gmHeading =
      state.mode === "gm"
        ? `<p class="rules-heading">${escapeHtml(entry.headingLabel)}</p>`
        : "";
    const gmTraits =
      state.mode === "gm"
        ? `<ul class="trait-list detail-traits" aria-label="Entry traits">${traitMarkup(entry.traits)}</ul>`
        : "";
    const gmOnlyButton =
      state.mode === "gm"
        ? `<button class="button button-gm" id="gm-only-toggle" type="button" aria-pressed="${gmOnly}">${gmOnly ? "Remove GM Only" : "GM Only"}</button>`
        : "";

    return `
      <nav class="detail-nav" aria-label="Entry actions">
        <a class="button button-secondary" href="#catalogue">← Back to catalogue</a>
        <div>
          ${gmOnlyButton}
          <button class="button button-secondary" id="copy-link" type="button">Copy link</button>
          <button class="button button-primary" id="print-entry" type="button">Print entry</button>
        </div>
      </nav>
      <p id="gm-only-status" class="gm-only-status" role="status" hidden></p>
      <article class="rules-card">
        <div class="rules-title-row">
          <h1 id="entry-title" tabindex="-1">${escapeHtml(entry.title)}</h1>
          ${gmHeading}
        </div>
        ${gmTraits}
        <p class="detail-intro">${entry.introHtml || escapeHtml(entry.intro)}</p>
        <div class="detail-body">${entry.contentHtml}</div>
        ${state.mode === "gm" ? `<p class="source-note"><strong>Imported from:</strong> ${escapeHtml(entry.source)}. Mechanical wording was preserved; punctuation, obvious spelling, and presentation were normalized for web reading.</p>` : ""}
      </article>
    `;
  }

  function showEntry(id) {
    const entry = entries.find((candidate) => candidate.id === id);
    if (!entry) {
      showNotFound();
      return;
    }

    if (!canOpenInCurrentMode(entry)) {
      showRestricted(entry);
      return;
    }

    if (entry.externalUrl) {
      window.location.assign(entry.externalUrl);
      return;
    }

    document.title = `${entry.title} | Gaileia Compendium`;
    catalogueView.hidden = true;
    detailView.hidden = false;
    detailView.innerHTML = detailMarkup(entry);
    linkRenderedTraits(detailView);

    const heading = document.getElementById("entry-title");
    heading.focus({ preventScroll: true });

    document.getElementById("print-entry").addEventListener("click", () => window.print());
    document.getElementById("copy-link").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      try {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "Link copied";
      } catch (_error) {
        button.textContent = "Copy unavailable";
      }
      window.setTimeout(() => {
        button.textContent = "Copy link";
      }, 1800);
    });

    const gmOnlyToggle = document.getElementById("gm-only-toggle");
    if (gmOnlyToggle) {
      gmOnlyToggle.addEventListener("click", async () => {
        if (state.gmOnlyIds.has(entry.id)) {
          state.gmOnlyIds.delete(entry.id);
        } else {
          state.gmOnlyIds.add(entry.id);
        }
        const marked = isGmOnly(entry);
        gmOnlyToggle.textContent = marked ? "Remove GM Only" : "GM Only";
        gmOnlyToggle.setAttribute("aria-pressed", String(marked));
        const status = document.getElementById("gm-only-status");
        status.hidden = false;
        status.textContent = "Saving visibility…";
        try {
          const result = await saveSharedGmOnlyIds();
          status.textContent = result.shared
            ? marked
              ? "Marked GM-only for all PC viewers."
              : "Restored this entry for all PC viewers."
            : marked
              ? "Marked GM-only in this preview browser. The shared visibility service is ready to connect."
              : "Removed from the GM-only list in this preview browser.";
        } catch (_error) {
          status.textContent = "The shared visibility update failed. Your local preview choice is preserved.";
        }
        renderCatalogue();
      });
    }
  }

  function route() {
    const hash = window.location.hash.replace(/^#/, "");

    if (!hash || hash === "catalogue") {
      showCatalogue({ focus: Boolean(hash), restoreScroll: hash === "catalogue" });
      return;
    }

    if (hash.startsWith("entry/")) {
      window.scrollTo({ top: 0, behavior: "auto" });
      showEntry(decodeURIComponent(hash.slice("entry/".length)));
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    showNotFound();
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function setMode(mode) {
    state.mode = mode;
    document.body.dataset.viewerMode = mode;
    pcMode.setAttribute("aria-pressed", String(mode === "pc"));
    gmMode.setAttribute("aria-pressed", String(mode === "gm"));
    renderFilters();
    renderCatalogue();
    route();
  }

  function requestGmAccess() {
    accessError.hidden = true;
    passcodeInput.value = "";
    accessDialog.showModal();
    window.setTimeout(() => passcodeInput.focus(), 0);
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    renderCatalogue();
  });

  clearSearch.addEventListener("click", () => {
    state.categories.clear();
    state.query = "";
    searchInput.value = "";
    renderFilters();
    renderCatalogue();
    searchInput.focus();
  });

  pcMode.addEventListener("click", () => setMode("pc"));
  gmMode.addEventListener("click", () => {
    if (state.mode === "gm") return;
    requestGmAccess();
  });

  accessForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let authorized = false;
    if (VISIBILITY_API) {
      try {
        const response = await fetch(`${VISIBILITY_API}/session`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${passcodeInput.value}` }
        });
        authorized = response.ok;
      } catch (_error) {
        authorized = false;
      }
    } else {
      authorized = (await sha256(passcodeInput.value)) === GM_PASSCODE_SHA256;
    }
    if (!authorized) {
      accessError.hidden = false;
      passcodeInput.select();
      return;
    }
    state.gmPasscode = passcodeInput.value;
    accessDialog.close();
    setMode("gm");
  });

  cancelGmAccess.addEventListener("click", () => accessDialog.close());
  window.addEventListener("hashchange", route);
  catalogueGrid.addEventListener("click", (event) => {
    const entryLink = event.target.closest('a[href^="#entry/"]');
    if (entryLink) window.sessionStorage.setItem(CATALOGUE_SCROLL_KEY, String(window.scrollY));
  });

  entryTotal.textContent = String(entries.length);
  collectionTotal.textContent = String(categories.filter((category) => category !== "All").length);
  document.body.dataset.viewerMode = "pc";
  renderFilters();
  renderCatalogue();
  route();
  loadSharedGmOnlyIds();
})();
