(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const sourceTitle = "Feedback for Homebrew GitHub Site | Tabletop Projects – Feedback 5";

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function formulaHeader(name, knownBy, relatedEntryId) {
    return `
      <dl class="stat-block">
        <div class="stat-line"><dt>Formula</dt><dd>${name}</dd></div>
        <div class="stat-line"><dt>Known By</dt><dd>${knownBy}</dd></div>
        <div class="stat-line"><dt>Item Entry</dt><dd><a href="#entry/${relatedEntryId}">${name}</a></dd></div>
      </dl>
    `;
  }

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

  function regularFormulaContent({ name, knownBy, relatedEntryId, dc, initial, final, tenPercent }) {
    return `
      ${formulaHeader(name, knownBy, relatedEntryId)}
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

  const formulaArchiveLinks = {
    "formula-dread-ampoule-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3292",
    "formula-glue-bomb-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3295",
    "formula-quicksilver-mutagen-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3319",
    "formula-smoke-ball-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3360"
  };

  entries
    .filter((entry) => entry.category === "Formulae")
    .forEach((entry) => {
      entry.formulaOwners = ["WE4LAND"];
      const directUrl = formulaArchiveLinks[entry.id];
      if (directUrl) {
        entry.contentHtml = entry.contentHtml.replace(
          /href="https:\/\/2e\.aonprd\.com\/Search\.aspx\?q=[^"]+"/,
          `href="${directUrl}"`
        );
      }
    });

  entries.push(
    {
      id: "creepy-crawly-crock",
      title: "Creepy-Crawly Crock",
      category: "Items",
      typeLabel: "Alchemy",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Alchemical", "Unique"],
      summary: "A self-sustaining alchemical culture that produces one harmless edible insect each day.",
      intro: "This squat ceramic jar is stoppered with cork and pockmarked with tiny air holes.",
      source: `Creepy-Crawly-Crock.json; ${sourceTitle}`,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>10 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>L</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        </dl>
        <p>Inside is a peculiar self-sustaining alchemical culture of eggs, spores, nutrient paste, and substances its inventor isn't confident they can identify. When properly tended, the culture produces a steady—but thankfully very small—supply of edible insects.</p>
        <section class="rules-subcard">
          <h3>Feed the Culture <span class="action-icon" aria-label="one action">◆</span></h3>
          <p>During your daily preparations, place a negligible amount of edible organic material in the crock, such as a bread crumb, vegetable shred, dried herb, or ration scrap. The culture produces one harmless Tiny insect: a beetle, cricket, cockroach, grub, mealworm, moth, or similar creature.</p>
          <p>The insect is alive and suitable food for a creature that eats insects. It is sterile, has no monetary value, cannot produce useful venom, poison, reagents, or other valuable substances, and has no attacks or mechanically significant abilities. If uneaten, it dies harmlessly at the beginning of your next daily preparations.</p>
        </section>
      `
    },
    {
      id: "formula-creepy-crawly-crock",
      title: "Creepy-Crawly Crock",
      category: "Formulae",
      typeLabel: "Formula",
      levelLabel: "Crafting DC 13",
      headingLabel: "Crafting DC 13",
      traits: ["Formula"],
      cardBadges: ["Regular Crafting"],
      formulaOwners: ["Ritsa"],
      regularCrafting: true,
      crafting: { dc: 13, initial: 5, final: 5, tenPercent: 1 },
      summary: "Ritsa’s regular crafting formula for a Creepy-Crawly Crock, with a crafting DC of 13.",
      intro: "A regular crafting formula known by Ritsa.",
      source: `Creepy-Crawly-Crock.json; ${sourceTitle}`,
      contentHtml: regularFormulaContent({
        name: "Creepy-Crawly Crock",
        knownBy: "Ritsa",
        relatedEntryId: "creepy-crawly-crock",
        dc: 13,
        initial: 5,
        final: 5,
        tenPercent: 1
      })
    }
  );

  const characterFeats = {
    "oziza-character": [
      {
        name: "Oracular Warning",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=6056",
        description: "Free Action—Trigger: you roll initiative. Allies within 20 feet gain a +2 status bonus to initiative and temporary HP equal to half your level for 1 minute. The initiative bonus rises to +3 at cursebound 2 and +4 at cursebound 3."
      },
      {
        name: "Benthic Azarketi",
        kind: "Heritage",
        level: 1,
        url: "https://2e.aonprd.com/Heritages.aspx?ID=194",
        description: "Gain cold resistance equal to half your level. Wet conditions don't make environmental cold more severe for you, and abrupt changes in water pressure have no harmful effect."
      },
      {
        name: "Hydraulic Deflection",
        kind: "Ancestry Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=2299",
        description: "One Action—Raise a moving sheet of water that grants a +1 circumstance bonus to AC until the start of your next turn."
      },
      {
        name: "Bargain Hunter",
        kind: "Skill Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=758",
        description: "Use Diplomacy to Earn Income by finding bargains. When you buy an item, reduce its price by the income you earned; if selected during character creation, begin with 2 additional gp."
      },
      {
        name: "Cantrip Expansion",
        kind: "Class Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=4580",
        description: "Add two extra cantrips from the oracle spell list to your spell repertoire."
      },
      {
        name: "Untrained Improvisation",
        kind: "General Feat",
        level: 3,
        url: "https://2e.aonprd.com/Feats.aspx?ID=861",
        description: "Add a proficiency bonus to untrained skill checks: level – 2 now, level – 1 at 5th level, and your full level at 7th. This does not permit actions that require trained proficiency."
      }
    ],
    "ritsa-character": [
      {
        name: "Spirit Familiar",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=7123",
        description: "During daily preparations, manifest one attuned apparition as a familiar. If it is destroyed, you lose the other benefits of that apparition until your next daily preparations; dispersing the apparition also destroys the familiar."
      },
      {
        name: "Natural Medicine",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5182",
        description: "Use Nature instead of Medicine to Treat Wounds, including higher DCs allowed by your Nature proficiency. This substitution doesn't cover other Medicine actions or prerequisites; fresh wilderness ingredients can grant a +2 circumstance bonus."
      },
      {
        name: "Enhanced Familiar",
        kind: "Awarded Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=318",
        description: "During daily preparations, choose four familiar or master abilities for your familiar instead of two."
      },
      {
        name: "Alchemical Crafting",
        kind: "Awarded Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=752",
        description: "You can use Craft to create alchemical items and immediately gain formulas for four common 1st-level alchemical items."
      },
      {
        name: "Changeling",
        kind: "Heritage",
        level: 1,
        url: "https://2e.aonprd.com/Heritages.aspx?ID=82",
        description: "Gain the changeling trait and access to changeling ancestry feats. The heritage normally grants low-light vision, or darkvision if you already have low-light vision; Ritsa's goblin darkvision already covers this sense."
      },
      {
        name: "Dream May",
        kind: "Ancestry Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=1326",
        description: "Gain a +2 circumstance bonus to saves against sleep and dream effects. A full night's rest restores HP equal to twice your level × Constitution modifier and reduces drained and doomed by 2 instead of 1."
      },
      {
        name: "Battle Medicine",
        kind: "Skill Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=760",
        description: "One Action—With a healer's toolkit, attempt the Treat Wounds DC to restore the same HP in combat. It doesn't remove wounded, and that target becomes immune to your Battle Medicine for 1 day; this immunity is separate from Treat Wounds."
      },
      {
        name: "Herbalist Dedication",
        kind: "Class Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=6339",
        description: "Gain advanced alchemy for healing consumables, preparing four daily items minus two when outside the wilderness. Become expert in Nature, remember qualifying formulas, and can use Nature plus a healer's toolkit to Craft healing alchemical consumables."
      },
      {
        name: "Untrained Improvisation",
        kind: "General Feat",
        level: 3,
        url: "https://2e.aonprd.com/Feats.aspx?ID=861",
        description: "Add a proficiency bonus to untrained skill checks: level – 2 now, level – 1 at 5th level, and your full level at 7th. This does not permit actions that require trained proficiency."
      }
    ],
    "saraik-character": [
      {
        name: "Breath Control",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=763",
        description: "Hold your breath for 25 times as long as normal. Gain a +1 circumstance bonus to saves against inhaled threats, and a success on such a save becomes a critical success."
      },
      {
        name: "Oddity Identification",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5185",
        description: "Immediately recognize magic with the mental, fortune, misfortune, detection, prediction, revelation, or scrying traits. Identify or Recall Knowledge about those effects with Occultism without the usual penalty and with a +2 circumstance bonus."
      },
      {
        name: "Combat Climber",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=768",
        description: "You aren't off-guard while Climbing and can Climb while one hand is occupied, provided the other hand and both legs remain available."
      },
      {
        name: "Cliffscale Lizardfolk",
        kind: "Heritage",
        level: 1,
        url: "https://2e.aonprd.com/Heritages.aspx?ID=49",
        description: "Gain Combat Climber. Sticky pads let you Climb without using your hands while barefoot, and a successful Climb check becomes a critical success."
      },
      {
        name: "Tiger Stance",
        kind: "Class Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5983",
        description: "One Action—While unarmored, enter a stance that grants tiger claw attacks (1d8 slashing; agile, finesse, nonlethal, unarmed). Critical hits add 1d4 persistent bleed; with Speed 20 feet or higher, you can Step 10 feet."
      },
      {
        name: "Parthenogenic Hatchling",
        kind: "Ancestry Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5636",
        description: "Gain a +1 circumstance bonus to saves against disease; a success becomes a critical success, and other effects that improve the save also turn a critical failure into a failure. You take thirst damage every 2 hours and starvation damage every 2 days."
      },
      {
        name: "Dubious Knowledge",
        kind: "Skill Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=776",
        description: "When you fail—but don't critically fail—a Recall Knowledge check, you learn one true fact and one false fact without knowing which is which."
      },
      {
        name: "Stunning Blows",
        kind: "Class Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5989",
        description: "When both Flurry of Blows Strikes target the same creature and at least one deals damage, it attempts a Fortitude save against your class DC. Failure causes stunned 1; critical failure causes stunned 3. This has the incapacitation trait."
      },
      {
        name: "Ancestral Paragon",
        kind: "General Feat",
        level: 3,
        url: "https://2e.aonprd.com/Feats.aspx?ID=753",
        description: "Gain one 1st-level ancestry feat. Saraik used this selection to gain Bone Magic."
      },
      {
        name: "Bone Magic",
        kind: "Ancestry Feat",
        level: 3,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5632",
        description: "Gain guidance as an occult innate cantrip usable at will. It automatically heightens to a rank equal to half your level, rounded up."
      }
    ],
    "we4land-character": [
      {
        name: "Lie to Me",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=811",
        description: "During a back-and-forth conversation, use your Deception DC instead of Perception DC against another creature's Lie if it is higher. This doesn't apply to speeches or other one-way communication."
      },
      {
        name: "Alchemical Crafting",
        kind: "Awarded Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=752",
        description: "You can use Craft to create alchemical items and immediately gain formulas for four common 1st-level alchemical items."
      },
      {
        name: "Sharpshooter Automaton",
        kind: "Heritage",
        level: 1,
        url: "https://2e.aonprd.com/Heritages.aspx?ID=186",
        description: "Automaton Aim—One Action: reduce the range penalty for your next ranged attack this turn from –2 to 0 in the second range increment. Use the action twice to similarly remove the –4 penalty in the third increment."
      },
      {
        name: "Munitions Crafter",
        kind: "Class Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=3158",
        description: "Become trained in Crafting and gain advanced alchemy for bombs and ammunition, preparing 4 + half your level items daily. Gain formulas for black powder plus four common or uncommon 1st-level bombs or ammunition; ammunition is made in batches of four."
      },
      {
        name: "Arcane Eye",
        kind: "Ancestry Feat",
        level: 1,
        url: "https://2e.aonprd.com/Feats.aspx?ID=3092",
        description: "Gain darkvision through your magical eye. Its later enhancement can reveal invisible creatures once per hour if you obtain the required augmentation feat."
      },
      {
        name: "Intimidating Glare",
        kind: "Skill Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5162",
        description: "Demoralize with a glare rather than speech. The action loses the auditory trait, gains the visual trait, and ignores the penalty for not sharing a language."
      },
      {
        name: "Dual-Weapon Reload",
        kind: "Class Feat",
        level: 2,
        url: "https://2e.aonprd.com/Feats.aspx?ID=3294",
        description: "While wielding two one-handed weapons in separate hands, with at least one ranged weapon, reload a one-handed ranged weapon without needing a free hand."
      },
      {
        name: "Fleet",
        kind: "General Feat",
        level: 3,
        url: "https://2e.aonprd.com/Feats.aspx?ID=5150",
        description: "Increase your Speed by 5 feet."
      }
    ]
  };

  function featSummaryMarkup(feats) {
    return `
      <h2>Current Feats</h2>
      <ol class="feat-summary-list">
        ${feats
          .map(
            (feat) => `
              <li class="feat-summary">
                <div class="feat-summary-heading">
                  <h3><a href="${feat.url}" target="_blank" rel="noreferrer">${feat.name}</a></h3>
                  <p>${feat.kind} · Level ${feat.level}</p>
                </div>
                <p>${feat.description}</p>
              </li>
            `
          )
          .join("")}
      </ol>
    `;
  }

  Object.entries(characterFeats).forEach(([id, feats]) => {
    const entry = findEntry(id);
    if (!entry) return;
    entry.featSummaries = feats;
    entry.source = entry.source.includes(sourceTitle) ? entry.source : `${entry.source}; ${sourceTitle}`;
    entry.contentHtml = entry.contentHtml.replace(
      /\s*<h2>Current Feats<\/h2>[\s\S]*$/,
      featSummaryMarkup(feats)
    );
  });

  window.GAILEIA_FORMULA_FILTERS = {
    options: [
      { id: "all", label: "All" },
      { id: "advanced", label: "Advanced Alchemy" },
      { id: "regular", label: "Regular Crafting" },
      { id: "ritsa", label: "Ritsa" },
      { id: "we4land", label: "WE4LAND" }
    ],
    matches(entry, filter) {
      if (entry.category !== "Formulae" || filter === "all") return true;
      if (filter === "advanced") return Boolean(entry.advancedAlchemy);
      if (filter === "regular") return Boolean(entry.regularCrafting);
      return Array.isArray(entry.formulaOwners) && entry.formulaOwners.some(
        (owner) => owner.toLocaleLowerCase() === filter
      );
    }
  };
})();
