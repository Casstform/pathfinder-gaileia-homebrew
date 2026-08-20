(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const categories = Array.isArray(window.HOMEBREW_CATEGORIES)
    ? window.HOMEBREW_CATEGORIES
    : ["All"];

  const state = {
    category: "All",
    query: ""
  };

  const catalogueView = document.getElementById("catalogue-view");
  const detailView = document.getElementById("detail-view");
  const catalogueGrid = document.getElementById("catalogue-grid");
  const filterList = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const resultsTitle = document.getElementById("results-title");
  const resultsCount = document.getElementById("results-count");
  const entryTotal = document.getElementById("entry-total");
  const emptyState = document.getElementById("empty-state");
  const clearSearch = document.getElementById("clear-search");

  const categoryOrder = {
    Apparitions: 0,
    Items: 1,
    Creatures: 2,
    Spells: 3,
    Rules: 4
  };

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

  function entrySearchText(entry) {
    return normalize(
      [
        entry.title,
        entry.category,
        entry.typeLabel,
        entry.levelLabel,
        entry.summary,
        entry.intro,
        entry.traits.join(" "),
        entry.contentHtml.replace(/<[^>]+>/g, " ")
      ].join(" ")
    );
  }

  entries.forEach((entry) => {
    entry._searchText = entrySearchText(entry);
  });

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
      .filter((entry) => !query || matchesQuery(entry._searchText, query))
      .sort((left, right) => {
        const categoryDifference =
          (categoryOrder[left.category] ?? 99) - (categoryOrder[right.category] ?? 99);
        return categoryDifference || left.title.localeCompare(right.title);
      });
  }

  function cardMarkup(entry) {
    return `
      <article class="entry-card">
        <div class="card-meta">
          <p class="entry-type">${escapeHtml(entry.typeLabel)}</p>
          <p class="entry-level">${escapeHtml(entry.levelLabel)}</p>
        </div>
        <h3>${escapeHtml(entry.title)}</h3>
        <div>
          <p class="entry-summary">${escapeHtml(entry.summary)}</p>
          <ul class="trait-list" aria-label="${escapeHtml(entry.title)} traits">
            ${traitMarkup(entry.traits.slice(0, 5))}
          </ul>
        </div>
        <a class="card-link" href="#entry/${encodeURIComponent(entry.id)}" aria-label="Read ${escapeHtml(
          entry.title
        )}">Read entry</a>
      </article>
    `;
  }

  function renderFilters() {
    filterList.innerHTML = categories
      .map((category) => {
        const count = category === "All" ? entries.length : entries.filter((entry) => entry.category === category).length;
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
    document.title = "PF2e Homebrew Compendium";
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

  function detailMarkup(entry) {
    return `
      <nav class="detail-nav" aria-label="Entry actions">
        <a class="button button-secondary" href="#catalogue">← Back to catalogue</a>
        <div>
          <button class="button button-secondary" id="copy-link" type="button">Copy link</button>
          <button class="button button-primary" id="print-entry" type="button">Print entry</button>
        </div>
      </nav>
      <article class="rules-card">
        <div class="rules-title-row">
          <h1 id="entry-title" tabindex="-1">${escapeHtml(entry.title)}</h1>
          <p class="rules-heading">${escapeHtml(entry.headingLabel)}</p>
        </div>
        <ul class="trait-list" aria-label="Entry traits" style="margin-top: .8rem">
          ${traitMarkup(entry.traits)}
        </ul>
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

    document.title = `${entry.title} | PF2e Homebrew Compendium`;
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

  window.addEventListener("hashchange", route);

  entryTotal.textContent = String(entries.length);
  renderFilters();
  renderCatalogue();
  route();
})();
