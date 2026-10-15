(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const categories = Array.isArray(window.HOMEBREW_CATEGORIES)
    ? window.HOMEBREW_CATEGORIES
    : ["All"];

  const visibilityConfig = window.GAILEIA_VISIBILITY_CONFIG || {};
  const GM_PASSCODE_SHA256 = visibilityConfig.gmPasscodeSha256 || "";
  const GM_ONLY_STORAGE_KEY = visibilityConfig.gmOnlyStorageKey || "gaileia-compendium-gm-only";
  const CATALOGUE_SCROLL_KEY = visibilityConfig.catalogueScrollStorageKey || "gaileia-compendium-scroll";
  const WE4LAND_LEVEL_STORAGE_KEY = visibilityConfig.we4landLevelStorageKey || "gaileia-we4land-level";
  const VISIBILITY_API = String(visibilityConfig.api || "").replace(/\/$/, "");

  const state = {
    categories: new Set(),
    showAll: false,
    formulaFilters: new Set(),
    query: "",
    mode: "pc",
    gmOnlyIds: loadGmOnlyIds(),
    gmPasscode: "",
    we4landLevel: loadWe4landLevel(),
    visibilityReady: !VISIBILITY_API,
    visibilityCacheAvailable: hasGmOnlyCache(),
    visibilityManagerQuery: "",
    visibilityManagerFilter: "all",
    visibilityMessage: "",
    visibilityMessageType: "",
    visibilitySavingId: ""
  };

  const catalogueView = document.getElementById("catalogue-view");
  const detailView = document.getElementById("detail-view");
  const catalogueGrid = document.getElementById("catalogue-grid");
  const filterList = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const resultsTitle = document.getElementById("results-title");
  const resultsCount = document.getElementById("results-count");
  const resultsHeading = document.querySelector(".results-heading");
  const formulaFilterList = document.getElementById("formula-filters");
  const entryTotal = document.getElementById("entry-total");
  const collectionTotal = document.getElementById("collection-total");
  const emptyState = document.getElementById("empty-state");
  const emptyStateTitle = document.getElementById("empty-state-title");
  const emptyStateMessage = document.getElementById("empty-state-message");
  const clearSearch = document.getElementById("clear-search");
  const pcMode = document.getElementById("pc-mode");
  const gmMode = document.getElementById("gm-mode");
  const accessDialog = document.getElementById("gm-access-dialog");
  const accessForm = document.getElementById("gm-access-form");
  const passcodeInput = document.getElementById("gm-passcode");
  const accessError = document.getElementById("gm-access-error");
  const cancelGmAccess = document.getElementById("cancel-gm-access");
  const manageVisibility = document.getElementById("manage-visibility");
  const visibilityDialog = document.getElementById("visibility-dialog");
  const closeVisibility = document.getElementById("close-visibility");
  const visibilitySearch = document.getElementById("visibility-search");
  const visibilityManagerList = document.getElementById("visibility-manager-list");
  const visibilitySummary = document.getElementById("visibility-summary");
  const visibilityManagerStatus = document.getElementById("visibility-manager-status");

  const categoryOrder = Object.fromEntries(
    categories.filter((category) => category !== "All").map((category, index) => [category, index])
  );

  const categorySymbols = window.GAILEIA_CATEGORY_SYMBOLS || {};

  function loadGmOnlyIds() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(GM_ONLY_STORAGE_KEY) || "[]");
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (_error) {
      return new Set();
    }
  }

  function hasGmOnlyCache() {
    try {
      return window.localStorage.getItem(GM_ONLY_STORAGE_KEY) !== null;
    } catch (_error) {
      return false;
    }
  }

  function saveGmOnlyIds() {
    window.localStorage.setItem(GM_ONLY_STORAGE_KEY, JSON.stringify([...state.gmOnlyIds]));
  }

  function normalizeCharacterLevel(value) {
    if (value === null || String(value).trim() === "") return null;
    const numericLevel = Math.round(Number(value));
    if (!Number.isFinite(numericLevel)) return null;
    return Math.min(20, Math.max(1, numericLevel));
  }

  function advancedAlchemySlots(level) {
    const calculator = window.GAILEIA_ADVANCED_ALCHEMY;
    return calculator && typeof calculator.slotsForLevel === "function"
      ? calculator.slotsForLevel(level)
      : 4 + Math.ceil(level / 2);
  }

  function loadWe4landLevel() {
    try {
      return normalizeCharacterLevel(window.localStorage.getItem(WE4LAND_LEVEL_STORAGE_KEY)) ||
        window.GAILEIA_ADVANCED_ALCHEMY?.defaultLevel ||
        3;
    } catch (_error) {
      return 3;
    }
  }

  function saveWe4landLevel() {
    window.localStorage.setItem(WE4LAND_LEVEL_STORAGE_KEY, String(state.we4landLevel));
  }

  async function loadSharedGmOnlyIds() {
    if (!VISIBILITY_API) {
      state.visibilityReady = true;
      return;
    }
    try {
      const response = await fetch(`${VISIBILITY_API}/visibility`, {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`Visibility service returned ${response.status}`);
      const payload = await response.json();
      const knownIds = new Set(entries.map((entry) => entry.id));
      state.gmOnlyIds = new Set(
        (Array.isArray(payload.ids) ? payload.ids : []).filter((id) => knownIds.has(id))
      );
      state.visibilityReady = true;
      state.visibilityCacheAvailable = true;
      state.visibilityMessage = "";
      state.visibilityMessageType = "";
      saveGmOnlyIds();
      renderCatalogue();
      route();
    } catch (error) {
      state.visibilityReady = state.visibilityCacheAvailable;
      state.visibilityMessage = state.visibilityCacheAvailable
        ? "Shared visibility is temporarily unavailable. Showing the last synchronized PC view on this device."
        : "Player visibility could not be loaded. Entries remain hidden until the shared service reconnects.";
      state.visibilityMessageType = "error";
      renderCatalogue();
      route();
      console.warn("Shared GM visibility could not be loaded.", error);
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
    const payload = await response.json();
    state.gmOnlyIds = new Set(Array.isArray(payload.ids) ? payload.ids : [...state.gmOnlyIds]);
    state.visibilityCacheAvailable = true;
    saveGmOnlyIds();
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
      entry.traits.join(" "),
      entry.contentHtml.replace(/<[^>]+>/g, " ")
    ];

    if (includeGmFields) {
      fields.push(entry.levelLabel, entry.headingLabel);
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
    if (state.mode === "gm") return true;
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

  function linkRulesTerms(container) {
    const links = window.GAILEIA_RULE_LINKS;
    if (!links || typeof links !== "object") return;
    const lookup = new Map(Object.entries(links).map(([term, url]) => [normalize(term), url]));
    const terms = [...lookup.keys()].sort((left, right) => right.length - left.length);
    if (terms.length === 0) return;
    const matcher = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "giu");
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.nodeValue.trim()) continue;
      if (node.parentElement.closest("a, code, script, style, .source-note, [data-no-rule-link]")) continue;
      nodes.push(node);
    }

    nodes.forEach((node) => {
      const text = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      let changed = false;
      matcher.lastIndex = 0;
      let match;
      while ((match = matcher.exec(text))) {
        const before = text[match.index - 1] || "";
        const after = text[match.index + match[0].length] || "";
        if (/[\p{L}\p{N}]/u.test(before) || /[\p{L}\p{N}]/u.test(after)) continue;
        fragment.append(text.slice(cursor, match.index));
        const anchor = document.createElement("a");
        anchor.href = lookup.get(normalize(match[0]));
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        anchor.textContent = match[0];
        fragment.append(anchor);
        cursor = match.index + match[0].length;
        changed = true;
      }
      if (!changed) return;
      fragment.append(text.slice(cursor));
      node.replaceWith(fragment);
    });
  }

  function filteredEntries() {
    if (!state.visibilityReady && state.mode === "pc") return [];
    if (!state.showAll && state.categories.size === 0) return [];
    const query = normalize(state.query.trim());
    return entries
      .filter((entry) => state.mode === "gm" || !isGmOnly(entry))
      .filter((entry) => state.showAll || state.categories.has(entry.category))
      .filter((entry) => {
        const formulaFilters = window.GAILEIA_FORMULA_FILTERS;
        return !formulaFilters || formulaFilters.matches(entry, state.formulaFilters);
      })
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

  function visibilityControlMarkup(entry, className = "card-visibility-toggle") {
    if (state.mode !== "gm") return "";
    if (entry.gmOnly) {
      return `<span class="${className} is-locked" title="This entry is permanently GM-only">GM Only by design</span>`;
    }

    const marked = isGmOnly(entry);
    const saving = state.visibilitySavingId === entry.id;
    return `
      <button
        class="${className}"
        type="button"
        data-visibility-id="${escapeHtml(entry.id)}"
        aria-pressed="${marked}"
        aria-label="${marked ? "Make" : "Remove"} ${escapeHtml(entry.title)} ${marked ? "visible to PCs" : "from PC view"}"
        ${saving ? "disabled" : ""}
      >${saving ? "Saving…" : marked ? "GM Only" : "PC Visible"}</button>
    `;
  }

  async function setEntryGmOnly(entry, marked) {
    if (!entry || entry.gmOnly || state.visibilitySavingId) return null;

    const previousIds = new Set(state.gmOnlyIds);
    state.visibilitySavingId = entry.id;
    state.visibilityMessage = `Saving ${entry.title}…`;
    state.visibilityMessageType = "pending";
    if (marked) {
      state.gmOnlyIds.add(entry.id);
    } else {
      state.gmOnlyIds.delete(entry.id);
    }
    renderCatalogue();
    renderVisibilityManager();

    try {
      const result = await saveSharedGmOnlyIds();
      state.visibilityMessage = result.shared
        ? marked
          ? `${entry.title} is now GM-only for all PC viewers.`
          : `${entry.title} is now visible to all PC viewers.`
        : marked
          ? `${entry.title} is GM-only on this device. Shared visibility still needs to be connected.`
          : `${entry.title} is PC-visible on this device. Shared visibility still needs to be connected.`;
      state.visibilityMessageType = result.shared ? "success" : "warning";
      return { success: true, shared: result.shared, marked, message: state.visibilityMessage };
    } catch (_error) {
      state.gmOnlyIds = previousIds;
      saveGmOnlyIds();
      state.visibilityMessage = `${entry.title} was not changed because the shared visibility update failed.`;
      state.visibilityMessageType = "error";
      return { success: false, shared: false, marked: isGmOnly(entry), message: state.visibilityMessage };
    } finally {
      state.visibilitySavingId = "";
      renderCatalogue();
      renderVisibilityManager();
    }
  }

  function cardMarkup(entry) {
    const gmOnly = isGmOnly(entry);
    const gmMeta =
      state.mode === "gm"
        ? `<p class="entry-level">${escapeHtml(entry.levelLabel)}</p>`
        : "";
    const visibleTraits = `<ul class="trait-list" aria-label="${escapeHtml(entry.title)} traits">${traitMarkup(entry.traits.slice(0, 6))}</ul>`;
    const gmBadge = state.mode === "gm" && gmOnly ? `<span class="gm-only-badge">GM only</span>` : "";
    const methodBadges = Array.isArray(entry.cardBadges) ? entry.cardBadges : [];
    const ownerBadges = Array.isArray(entry.formulaOwners) ? entry.formulaOwners : [];
    const cardBadges = methodBadges.length || ownerBadges.length
      ? `<ul class="card-badges" aria-label="${escapeHtml(entry.title)} formula method and owners">
          ${methodBadges.map((badge) => `<li>${escapeHtml(badge)}</li>`).join("")}
          ${ownerBadges
            .map(
              (owner) =>
                `<li class="owner-badge" data-owner="${escapeHtml(categorySlug(owner))}">${escapeHtml(owner)}</li>`
            )
            .join("")}
        </ul>`
      : "";

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
        ${cardBadges}
        <h3>${escapeHtml(entry.title)}</h3>
        <div>
          <p class="entry-summary">${escapeHtml(entry.summary)}</p>
          ${visibleTraits}
        </div>
        <div class="card-actions">
          ${cardActionMarkup(entry)}
          ${visibilityControlMarkup(entry)}
        </div>
      </article>
    `;
  }

  function renderFilters() {
    const collectionControls = categories.flatMap((category) =>
      category === "All" ? ["All", "None"] : [category]
    );

    filterList.innerHTML = collectionControls
      .map((category) => {
        const count =
          category === "All"
            ? entries.length
            : entries.filter((entry) => entry.category === category).length;
        const isNone = category === "None";
        return `
          <button
            class="filter-button"
            type="button"
            data-category="${escapeHtml(category)}"
            aria-pressed="${
              category === "All"
                ? state.showAll
                : isNone
                  ? !state.showAll && state.categories.size === 0
                  : state.categories.has(category)
            }"
          >${escapeHtml(category)}${isNone ? "" : ` (${count})`}</button>
        `;
      })
      .join("");

    filterList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category || "All";
        if (category === "None") {
          state.showAll = false;
          state.categories.clear();
          state.formulaFilters.clear();
        } else if (category === "All") {
          state.showAll = !state.showAll;
          state.categories.clear();
          state.formulaFilters.clear();
        } else if (state.categories.has(category)) {
          state.showAll = false;
          state.categories.delete(category);
          if (category === "Formulae") state.formulaFilters.clear();
        } else {
          state.showAll = false;
          state.categories.add(category);
          if (category === "Formulae") state.formulaFilters.clear();
        }
        renderFilters();
        renderCatalogue();
      });
    });
  }

  function renderFormulaFilters() {
    const formulaFilters = window.GAILEIA_FORMULA_FILTERS;
    const formulaeSelected = !state.showAll && state.categories.has("Formulae");
    formulaFilterList.hidden = !formulaeSelected;
    if (!formulaeSelected || !formulaFilters) {
      formulaFilterList.innerHTML = "";
      return;
    }

    formulaFilterList.innerHTML = formulaFilters.options
      .map(
        ({ id, label }) => `
          <button
            class="formula-filter-button"
            type="button"
            data-formula-filter="${escapeHtml(id)}"
            aria-pressed="${id === "all" ? state.formulaFilters.size === 0 : state.formulaFilters.has(id)}"
          >${escapeHtml(label)}</button>
        `
      )
      .join("");

    formulaFilterList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.formulaFilter || "all";
        if (filter === "all") {
          state.formulaFilters.clear();
        } else if (state.formulaFilters.has(filter)) {
          state.formulaFilters.delete(filter);
        } else {
          state.formulaFilters.add(filter);
        }
        renderFormulaFilters();
        renderCatalogue();
      });
    });
  }

  function renderVisibilityManager() {
    if (!visibilityDialog || !visibilityDialog.open) return;

    const query = normalize(state.visibilityManagerQuery.trim());
    const filtered = entries
      .filter((entry) => {
        const marked = isGmOnly(entry);
        if (state.visibilityManagerFilter === "pc" && marked) return false;
        if (state.visibilityManagerFilter === "gm" && !marked) return false;
        if (!query) return true;
        return matchesQuery(
          normalize([entry.title, entry.category, entry.typeLabel, entry.summary].join(" ")),
          query
        );
      })
      .sort((left, right) => {
        const categoryDifference =
          (categoryOrder[left.category] ?? 99) - (categoryOrder[right.category] ?? 99);
        return categoryDifference || left.title.localeCompare(right.title);
      });

    const gmOnlyCount = entries.filter(isGmOnly).length;
    visibilitySummary.textContent = `${entries.length - gmOnlyCount} PC visible · ${gmOnlyCount} GM only`;
    visibilityDialog.querySelectorAll("[data-visibility-filter]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.visibilityFilter === state.visibilityManagerFilter)
      );
    });

    visibilityManagerStatus.hidden = !state.visibilityMessage;
    visibilityManagerStatus.textContent = state.visibilityMessage;
    visibilityManagerStatus.dataset.status = state.visibilityMessageType;

    visibilityManagerList.innerHTML = filtered.length
      ? filtered
          .map(
            (entry) => `
              <div class="visibility-manager-row${isGmOnly(entry) ? " is-gm-only" : ""}">
                <div class="visibility-manager-entry">
                  <p>${escapeHtml(entry.category)} · ${escapeHtml(entry.typeLabel)}</p>
                  <h3>${escapeHtml(entry.title)}</h3>
                </div>
                ${visibilityControlMarkup(entry, "visibility-row-toggle")}
              </div>
            `
          )
          .join("")
      : `<div class="visibility-manager-empty"><p>No entries match this visibility filter.</p></div>`;
  }

  function openVisibilityManager() {
    if (state.mode !== "gm") return;
    state.visibilityManagerQuery = "";
    state.visibilityManagerFilter = "all";
    state.visibilityMessage = VISIBILITY_API
      ? "Changes here are shared with every PC viewer."
      : "Shared visibility is not connected yet; changes currently affect only this device.";
    state.visibilityMessageType = VISIBILITY_API ? "success" : "warning";
    visibilitySearch.value = "";
    visibilityDialog.showModal();
    renderVisibilityManager();
    window.setTimeout(() => visibilitySearch.focus(), 0);
  }

  function renderCatalogue() {
    const visibleEntries = filteredEntries();
    const hasCollectionSelection = state.showAll || state.categories.size > 0;
    catalogueGrid.innerHTML = visibleEntries.map(cardMarkup).join("");
    emptyState.hidden = visibleEntries.length > 0;
    catalogueGrid.hidden = visibleEntries.length === 0;
    resultsHeading.hidden = !hasCollectionSelection;

    if (!state.visibilityReady && state.mode === "pc") {
      emptyState.hidden = false;
      catalogueGrid.hidden = true;
      resultsHeading.hidden = true;
      emptyStateTitle.textContent = VISIBILITY_API ? "Loading player visibility" : "Player visibility unavailable";
      emptyStateMessage.textContent = state.visibilityMessage || "Connecting to the shared visibility service…";
      clearSearch.hidden = true;
    } else if (!hasCollectionSelection) {
      emptyStateTitle.textContent = "Choose a collection";
      emptyStateMessage.textContent = "Select All or one or more collections to browse the compendium.";
      clearSearch.hidden = true;
    } else {
      emptyStateTitle.textContent = "No matching entries";
      emptyStateMessage.textContent = "Try a different search term, Formulae filter, or collection.";
      clearSearch.hidden = visibleEntries.length > 0;
    }

    const label = state.showAll ? "All entries" : [...state.categories].join(" + ");
    resultsTitle.textContent = label;
    resultsCount.textContent = `${visibleEntries.length} ${visibleEntries.length === 1 ? "entry" : "entries"}`;
    renderFormulaFilters();
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
        <p class="kicker">${marked ? "GM-only entry" : "PC view"}</p>
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
    const visibleTraits = `<ul class="trait-list detail-traits" aria-label="Entry traits">${traitMarkup(entry.traits)}</ul>`;
    const gmOnlyButton =
      state.mode === "gm"
        ? entry.gmOnly
          ? `<span class="gm-only-lock">GM Only by design</span>`
          : `<button class="button button-gm" id="gm-only-toggle" type="button" aria-pressed="${gmOnly}">${gmOnly ? "Remove GM Only" : "GM Only"}</button>`
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
        ${visibleTraits}
        <p class="detail-intro">${entry.introHtml || escapeHtml(entry.intro)}</p>
        <div class="detail-body">${entry.contentHtml}</div>
        ${state.mode === "gm" ? `<p class="source-note"><strong>Imported from:</strong> ${escapeHtml(entry.source)}. Mechanical wording was preserved; punctuation, obvious spelling, and presentation were normalized for web reading.</p>` : ""}
      </article>
    `;
  }

  function hydrateAdvancedAlchemyCalculator(container) {
    const panel = container.querySelector("[data-advanced-alchemy]");
    if (!panel) return;

    const input = panel.querySelector("[data-we4land-level]");
    const slotCount = panel.querySelector("[data-alchemy-slot-count]");
    if (!input || !slotCount) return;

    function render(level) {
      input.value = String(level);
      slotCount.textContent = String(advancedAlchemySlots(level));
    }

    render(state.we4landLevel);
    input.addEventListener("input", () => {
      const level = normalizeCharacterLevel(input.value);
      if (level === null) {
        slotCount.textContent = "—";
        return;
      }
      state.we4landLevel = level;
      saveWe4landLevel();
      slotCount.textContent = String(advancedAlchemySlots(level));
    });
    input.addEventListener("blur", () => render(state.we4landLevel));
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
    linkRulesTerms(detailView);
    hydrateAdvancedAlchemyCalculator(detailView);

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
        const status = document.getElementById("gm-only-status");
        status.hidden = false;
        status.textContent = "Saving visibility…";
        gmOnlyToggle.disabled = true;
        const result = await setEntryGmOnly(entry, !isGmOnly(entry));
        if (!result) {
          gmOnlyToggle.disabled = false;
          return;
        }
        gmOnlyToggle.disabled = false;
        gmOnlyToggle.textContent = result.marked ? "Remove GM Only" : "GM Only";
        gmOnlyToggle.setAttribute("aria-pressed", String(result.marked));
        status.textContent = result.message;
        status.dataset.status = result.success ? (result.shared ? "success" : "warning") : "error";
      });
    }
  }

  function route() {
    if (!state.visibilityReady && state.mode === "pc") {
      showCatalogue();
      return;
    }
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
    manageVisibility.hidden = mode !== "gm";
    if (mode === "pc") {
      state.gmPasscode = "";
      if (visibilityDialog.open) visibilityDialog.close();
    }
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
    state.showAll = false;
    state.formulaFilters.clear();
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
  manageVisibility.addEventListener("click", openVisibilityManager);
  closeVisibility.addEventListener("click", () => visibilityDialog.close());
  visibilitySearch.addEventListener("input", () => {
    state.visibilityManagerQuery = visibilitySearch.value;
    renderVisibilityManager();
  });
  visibilityDialog.querySelectorAll("[data-visibility-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.visibilityManagerFilter = button.dataset.visibilityFilter || "all";
      renderVisibilityManager();
    });
  });
  visibilityManagerList.addEventListener("click", async (event) => {
    const toggle = event.target.closest("[data-visibility-id]");
    if (!toggle) return;
    const entry = entries.find((candidate) => candidate.id === toggle.dataset.visibilityId);
    if (!entry) return;
    await setEntryGmOnly(entry, !isGmOnly(entry));
  });
  window.addEventListener("hashchange", route);
  catalogueGrid.addEventListener("click", async (event) => {
    const visibilityToggle = event.target.closest("[data-visibility-id]");
    if (visibilityToggle) {
      event.preventDefault();
      event.stopPropagation();
      const entry = entries.find((candidate) => candidate.id === visibilityToggle.dataset.visibilityId);
      if (entry) await setEntryGmOnly(entry, !isGmOnly(entry));
      return;
    }
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
