(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const sourceTitle = "Feedback for Homebrew GitHub Site | Tabletop Projects";
  const elementalAmmunitionUrl = "https://2e.aonprd.com/Equipment.aspx?ID=1897";

  window.GAILEIA_ADVANCED_ALCHEMY = {
    defaultLevel: 3,
    slotsForLevel(level) {
      return 4 + Math.ceil(level / 2);
    }
  };

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function removeEntries(ids) {
    const retiredIds = new Set(ids);
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      if (retiredIds.has(entries[index].id)) entries.splice(index, 1);
    }
  }

  function formulaHeader(name, itemUrl, relatedEntryId) {
    const relatedItem = relatedEntryId
      ? `<div class="stat-line"><dt>Item Entry</dt><dd><a href="#entry/${relatedEntryId}">${name}</a></dd></div>`
      : "";
    const archiveLink = relatedEntryId
      ? ""
      : `<p><a href="${itemUrl}" target="_blank" rel="noreferrer">Open the corresponding item on Archives of Nethys</a>.</p>`;
    return `
      <dl class="stat-block">
        <div class="stat-line"><dt>Formula</dt><dd>${name}</dd></div>
        <div class="stat-line"><dt>Known By</dt><dd>WE4LAND – PU373</dd></div>
        ${relatedItem}
      </dl>
      ${archiveLink}
    `;
  }

  function advancedAlchemyContent(name) {
    return `
      ${formulaHeader(name, elementalAmmunitionUrl)}
      <section class="rules-subcard advanced-alchemy-panel" data-advanced-alchemy>
        <p class="formula-kicker">Advanced Alchemy Formula</p>
        <h3>Daily Preparation</h3>
        <p>WE4LAND constructs this ammunition during daily preparation. Preparation takes 1 hour, and the created ammunition expires after 24 hours.</p>
        <p>Each Advanced Alchemy slot used creates <strong>4 ammunition rounds</strong>.</p>
        <div class="alchemy-calculator">
          <label for="we4land-level">
            <span>WE4LAND’s current level</span>
            <input id="we4land-level" data-we4land-level type="number" min="1" max="20" step="1" inputmode="numeric" value="3">
          </label>
          <p class="alchemy-slot-display" aria-live="polite">
            <strong data-alchemy-slot-count>6</strong>
            <span>Advanced Alchemy slots</span>
          </p>
        </div>
        <p class="calculation-note">Slots equal 4 plus half WE4LAND’s level, rounded up. The entered level is remembered in this browser and shared across all four Advanced Alchemy formula pages.</p>
      </section>
    `;
  }

  const advancedAlchemyFormulae = [
    ["formula-elemental-ammunition-acid-lesser", "Elemental Ammunition - Acid (Lesser)"],
    ["formula-elemental-ammunition-cold-lesser", "Elemental Ammunition - Cold (Lesser)"],
    ["formula-elemental-ammunition-electricity-lesser", "Elemental Ammunition - Electricity (Lesser)"],
    ["formula-elemental-ammunition-poison-lesser", "Elemental Ammunition - Poison (Lesser)"]
  ];

  advancedAlchemyFormulae.forEach(([id, name]) => {
    const entry = findEntry(id);
    if (!entry) return;
    Object.assign(entry, {
      typeLabel: "Formula",
      levelLabel: "Advanced Alchemy",
      headingLabel: "Advanced Alchemy",
      cardBadges: ["Advanced Alchemy"],
      advancedAlchemy: true,
      summary: `An Advanced Alchemy formula WE4LAND can prepare as four ${name.replace("Elemental Ammunition - ", "").replace(" (Lesser)", "").toLocaleLowerCase()} rounds per slot.`,
      intro: "This elemental ammunition formula is part of WE4LAND’s Advanced Alchemy repertoire.",
      source: `${entry.source}; ${sourceTitle}`,
      contentHtml: advancedAlchemyContent(name)
    });
  });

  removeEntries([
    "formula-alchemists-toolkit",
    "formula-black-powder-dose-or-round",
    "formula-earplugs",
    "formula-silencer"
  ]);

  const craftingResultsTable = `
    <h3>Crafting Results</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Result</th><th>Consequence</th></tr></thead>
        <tbody>
          <tr><td>Critical Failure</td><td>Waste the day. Waste 10% of the initial cost.</td></tr>
          <tr><td>Failure</td><td>Waste the day. Start over.</td></tr>
          <tr><td>Success</td><td>Pay the final cost. Make the item.</td></tr>
          <tr><td>Critical Success</td><td>Reduce the total cost by an amount determined by the GM.</td></tr>
        </tbody>
      </table>
    </div>
  `;

  function regularFormulaContent({ name, dc, initial, final, tenPercent, itemUrl, relatedEntryId }) {
    return `
      ${formulaHeader(name, itemUrl, relatedEntryId)}
      <section class="rules-subcard crafting-panel">
        <p class="formula-kicker">Regular Crafting Formula</p>
        <h3>Crafting Requirements</h3>
        <p>Crafting this item requires <strong>1 day</strong>, a workshop, and the appropriate crafting tools.</p>
        <dl class="stat-block crafting-costs">
          <div class="stat-line"><dt>Crafting DC</dt><dd>${dc}</dd></div>
          <div class="stat-line"><dt>Initial Cost</dt><dd>${initial} gp</dd></div>
          <div class="stat-line"><dt>Final Cost</dt><dd>${final} gp</dd></div>
          <div class="stat-line"><dt>10% of Initial Cost</dt><dd>${tenPercent} gp</dd></div>
        </dl>
        ${craftingResultsTable}
      </section>
    `;
  }

  const regularFormulae = [
    {
      id: "formula-quicksilver-mutagen-lesser",
      name: "Quicksilver Mutagen (Lesser)",
      dc: 13,
      initial: "2",
      final: "2",
      tenPercent: "0.2"
    },
    {
      id: "formula-dread-ampoule-lesser",
      name: "Dread Ampoule (Lesser)",
      dc: 13,
      initial: "1.5",
      final: "1.5",
      tenPercent: "0.15"
    },
    {
      id: "formula-glue-bomb-lesser",
      name: "Glue Bomb (Lesser)",
      dc: 13,
      initial: "1.5",
      final: "1.5",
      tenPercent: "0.15"
    },
    {
      id: "formula-smoke-ball-lesser",
      name: "Smoke Ball (Lesser)",
      dc: 13,
      initial: "1.5",
      final: "1.5",
      tenPercent: "0.15"
    },
    {
      id: "formula-non-lethal-ammunition",
      name: "Non-Lethal Ammunition",
      dc: 13,
      initial: "1.5",
      final: "1.5",
      tenPercent: "0.15",
      relatedEntryId: "non-lethal-ammunition"
    },
    {
      id: "formula-antler-ammunition",
      name: "Antler Ammunition",
      dc: 16,
      initial: "3.5",
      final: "3.5",
      tenPercent: "0.35",
      relatedEntryId: "antler-ammunition"
    }
  ];

  regularFormulae.forEach((formula) => {
    let entry = findEntry(formula.id);
    if (!entry) {
      entry = {
        id: formula.id,
        title: formula.name,
        category: "Formulae",
        typeLabel: "Formula",
        levelLabel: "Known Formula",
        headingLabel: "Formula",
        traits: ["Formula"],
        summary: `WE4LAND knows how to craft ${formula.name}.`,
        intro: "A regular crafting formula known by WE4LAND.",
        source: sourceTitle,
        contentHtml: ""
      };
      entries.push(entry);
    }

    const itemUrl = formula.relatedEntryId
      ? `#entry/${formula.relatedEntryId}`
      : `https://2e.aonprd.com/Search.aspx?q=${encodeURIComponent(formula.name)}`;
    Object.assign(entry, {
      typeLabel: "Formula",
      levelLabel: `Crafting DC ${formula.dc}`,
      headingLabel: `Crafting DC ${formula.dc}`,
      cardBadges: ["Regular Crafting"],
      regularCrafting: true,
      crafting: {
        dc: formula.dc,
        initial: Number(formula.initial),
        final: Number(formula.final),
        tenPercent: Number(formula.tenPercent)
      },
      summary: `A regular crafting formula with DC ${formula.dc} and a ${formula.initial} gp initial cost.`,
      intro: "This formula uses WE4LAND’s regular one-day crafting process rather than Advanced Alchemy.",
      source: entry.source.includes(sourceTitle) ? entry.source : `${entry.source}; ${sourceTitle}`,
      contentHtml: regularFormulaContent({ ...formula, itemUrl })
    });
  });
})();
