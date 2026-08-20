(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const categories = Array.isArray(window.HOMEBREW_CATEGORIES)
    ? window.HOMEBREW_CATEGORIES
    : ["All"];

  const GM_PASSCODE_SHA256 = "dc44b22d590f2f351d8fa792f7dfc7f6bffb01c00c2bdc020d4489d2c306b03b";
  const GM_ONLY_STORAGE_KEY = "gaileia-compendium-preview-gm-only-v1";

  const state = {
    category: "All",
    query: "",
    mode: "pc",
    gmOnlyIds: loadGmOnlyIds()
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
    "House Rules": "⬢",
    Items: "◇",
    Language: "◈",
    Maps: "▱",
    Oziza: "◐",
    Ritsa: "⬥",
    Sara: "△",
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
      .map(
        (trait) =>
          `<li class="trait" data-trait="${escapeHtml(normalize(trait))}">${escapeHtml(trait)}</li>`
      )
      .join("");
  }

  function filteredEntries() {
    const query = normalize(state.query.trim());
    return entries
      .filter((entry) => state.category === "All" || entry.category === state.category)
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

    if (!canOpenInCurrentMode(entry)) {
      return `<span class="card-link card-link-disabled" aria-disabled="true">${isGmOnly(entry) ? "GM only" : "PC preview"}</span>`;
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
            aria-pressed="${state.category === category}"
          >${escapeHtml(category)} (${count})</button>
        `;
      })
      .join("");

    filterList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.category = button.dataset.category || "All";
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

    const label = state.category === "All" ? "All entries" : state.category;
    resultsTitle.textContent = label;
    resultsCount.textContent = `${visibleEntries.length} ${visibleEntries.length === 1 ? "entry" : "entries"}`;
  }

  function showCatalogue({ focus = false } = {}) {
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
        <p class="detail-intro">${escapeHtml(entry.intro)}</p>
        <div class="detail-body">${entry.contentHtml}</div>
        <p class="source-note"><strong>Imported from:</strong> ${escapeHtml(entry.source)}. Mechanical wording was preserved; punctuation, obvious spelling, and presentation were normalized for web reading.</p>
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
      gmOnlyToggle.addEventListener("click", () => {
        if (state.gmOnlyIds.has(entry.id)) {
          state.gmOnlyIds.delete(entry.id);
        } else {
          state.gmOnlyIds.add(entry.id);
        }
        saveGmOnlyIds();
        const marked = isGmOnly(entry);
        gmOnlyToggle.textContent = marked ? "Remove GM Only" : "GM Only";
        gmOnlyToggle.setAttribute("aria-pressed", String(marked));
        const status = document.getElementById("gm-only-status");
        status.hidden = false;
        status.textContent = marked
          ? "Marked GM-only in this preview browser. Publish the visibility list to apply this choice for players on other devices."
          : "Removed from the GM-only preview list on this browser.";
      });
    }
  }

  function route() {
    const hash = window.location.hash.replace(/^#/, "");
    window.scrollTo({ top: 0, behavior: "auto" });

    if (!hash || hash === "catalogue") {
      showCatalogue({ focus: Boolean(hash) });
      return;
    }

    if (hash.startsWith("entry/")) {
      showEntry(decodeURIComponent(hash.slice("entry/".length)));
      return;
    }

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
    state.category = "All";
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
    const submittedHash = await sha256(passcodeInput.value);
    if (submittedHash !== GM_PASSCODE_SHA256) {
      accessError.hidden = false;
      passcodeInput.select();
      return;
    }
    accessDialog.close();
    setMode("gm");
  });

  cancelGmAccess.addEventListener("click", () => accessDialog.close());
  window.addEventListener("hashchange", route);

  entryTotal.textContent = String(entries.length);
  collectionTotal.textContent = String(categories.filter((category) => category !== "All").length);
  document.body.dataset.viewerMode = "pc";
  renderFilters();
  renderCatalogue();
  route();
})();
