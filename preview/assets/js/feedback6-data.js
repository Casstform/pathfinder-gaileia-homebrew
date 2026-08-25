(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const sourceTitle = "Feedback for Homebrew GitHub Site | Tabletop Projects – Feedback 6";
  const sessionSource = "Session Zero Preface | PF2";
  const aon = {
    automaticBonusProgression: "https://2e.aonprd.com/Rules.aspx?ID=2741",
    absorbFamiliar: "https://2e.aonprd.com/Familiars.aspx?ID=129",
    animist: "https://2e.aonprd.com/Classes.aspx?ID=64",
    automaton: "https://2e.aonprd.com/Ancestries.aspx?ID=48",
    battleMedicine: "https://2e.aonprd.com/Feats.aspx?ID=760",
    benediction: "https://2e.aonprd.com/Spells.aspx?ID=2345",
    clumsy: "https://2e.aonprd.com/Conditions.aspx?ID=61",
    controlled: "https://2e.aonprd.com/Conditions.aspx?ID=62",
    crafting: "https://2e.aonprd.com/Skills.aspx?ID=37",
    divineLance: "https://2e.aonprd.com/Spells.aspx?ID=1498",
    dispelMagic: "https://2e.aonprd.com/Spells.aspx?ID=1493",
    drained: "https://2e.aonprd.com/Conditions.aspx?ID=68",
    dying: "https://2e.aonprd.com/Conditions.aspx?ID=69",
    enfeebled: "https://2e.aonprd.com/Conditions.aspx?ID=71",
    fatigued: "https://2e.aonprd.com/Conditions.aspx?ID=73",
    gunslinger: "https://2e.aonprd.com/Classes.aspx?ID=20",
    heal: "https://2e.aonprd.com/Spells.aspx?ID=1554",
    light: "https://2e.aonprd.com/Spells.aspx?ID=1585",
    magicalCrafting: "https://2e.aonprd.com/Feats.aspx?ID=812",
    medicine: "https://2e.aonprd.com/Skills.aspx?ID=42",
    mending: "https://2e.aonprd.com/Spells.aspx?ID=1597",
    monk: "https://2e.aonprd.com/Classes.aspx?ID=60",
    nature: "https://2e.aonprd.com/Skills.aspx?ID=43",
    occultism: "https://2e.aonprd.com/Skills.aspx?ID=44",
    oracle: "https://2e.aonprd.com/Classes.aspx?ID=61",
    oracleCosmos: "https://2e.aonprd.com/Mysteries.aspx?ID=15",
    raiseDead: "https://2e.aonprd.com/Spells.aspx?ID=1645",
    reincarnate: "https://2e.aonprd.com/Rituals.aspx?ID=35",
    rehydration: "https://2e.aonprd.com/Feats.aspx?ID=2312",
    religion: "https://2e.aonprd.com/Skills.aspx?ID=46",
    resurrect: "https://2e.aonprd.com/Rituals.aspx?ID=20",
    ritsaPractice: "https://2e.aonprd.com/Practices.aspx?ID=4",
    scrolls: "https://2e.aonprd.com/Rules.aspx?ID=3197",
    society: "https://2e.aonprd.com/Skills.aspx?ID=47",
    sprayOfStars: "https://2e.aonprd.com/Spells.aspx?ID=2075",
    survival: "https://2e.aonprd.com/Skills.aspx?ID=49",
    unusualTreatment: "https://2e.aonprd.com/Feats.aspx?ID=5234",
    wayPistolero: "https://2e.aonprd.com/Ways.aspx?ID=2"
  };

  function link(label, url) {
    return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
  }

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function removeEntry(id) {
    const index = entries.findIndex((entry) => entry.id === id);
    if (index >= 0) return entries.splice(index, 1)[0];
    return null;
  }

  window.HOMEBREW_CATEGORIES = [
    "All",
    "Animist",
    "Calendar",
    "Fauna/Flora",
    "Formulae",
    "House Rules",
    "Items",
    "Language",
    "Maps",
    "Oziza",
    "Ritsa",
    "Saraik",
    "Spells",
    "Subsystems",
    "WE4LAND"
  ];

  const playerRulesHtml = `
    <p class="rules-lede">These 21 rulings collect the campaign-wide player rules identified in the homebrew rules review and Session Zero Primer.</p>

    <h2>Magic, Revival, and Items</h2>
    <ol class="house-rule-list">
      <li data-house-rule><h3>Meaningful Revival Costs</h3><p>The normal valuables required by ${link("reincarnate", aon.reincarnate)}, ${link("resurrect", aon.resurrect)}, ${link("raise dead", aon.raiseDead)}, and similar magic are replaced by a meaningful tribute or sacrifice. Player characters pay no component cost when they cast the magic themselves; hiring an NPC still requires paying for spellcasting service.</p></li>
      <li data-house-rule><h3>Accessible Scroll Casting</h3><p>A player character can attempt to cast from a ${link("scroll", aon.scrolls)} even when the spell is not on their spell list by succeeding at a DC 16 flat check.</p></li>
      <li data-house-rule><h3>Spherical Areas</h3><p>On a physical battle mat, spell areas that would normally be spheres are treated as cylinders for measurement and template placement.</p></li>
      <li data-house-rule><h3>Magic-Item Sizing</h3><p>Magic items do not automatically resize to fit their wearer or wielder.</p></li>
      <li data-house-rule><h3>Magic-Item Wear</h3><p>Magic items are subject to ordinary damage, maintenance, and wear.</p></li>
      <li data-house-rule><h3>Repairing Magic Items</h3><p>${link("Mending", aon.mending)} can affect a magic item when the caster has ${link("Magical Crafting", aon.magicalCrafting)} and succeeds at that item's ${link("Crafting", aon.crafting)} DC.</p></li>
    </ol>

    <h2 data-no-rule-link>Automatic Bonus Progression</h2>
    <ol class="house-rule-list" start="7">
      <li data-house-rule><h3>Campaign ABP</h3><p>The campaign uses ${link("Automatic Bonus Progression", aon.automaticBonusProgression)}. Fundamental potency, striking, and resilient runes—and equivalent permanent numerical bonuses from magical items—are replaced by character progression.</p></li>
      <li data-house-rule><h3>Temporary Item Bonuses</h3><p>Temporary item bonuses still apply normally.</p></li>
      <li data-house-rule><h3>Bombs and ABP</h3><p>Alchemical bombs benefit from ABP attack potency, but they do not gain additional weapon-damage dice from ABP.</p></li>
      <li data-house-rule><h3>Gate Attenuators</h3><p>Gate attenuators are treated as nonmagical for this campaign's ABP interaction.</p></li>
      <li data-house-rule><h3>Major Gate Attenuators</h3><p>Major gate attenuators do not grant their normal Apex attribute boost.</p></li>
      <li data-house-rule><h3>Runesmith Conversion</h3><p>Until a final campaign conversion is adopted, Runesmith uses property-rune benefits while ABP supplies the numerical bonus to hit.</p></li>
    </ol>

    <h2>Characters and Table Play</h2>
    <ol class="house-rule-list" start="13">
      <li data-house-rule><h3>Nonlethal by Default</h3><p>Damage dealt by a player character is nonlethal by default unless that player declares otherwise.</p></li>
      <li data-house-rule><h3>Private Character Knowledge</h3><p>Information about a character remains private until that character shares it in play.</p></li>
      <li data-house-rule><h3>Secret Social Conflict</h3><p>Opposed social checks between player characters are resolved through trust and roleplay. Secret checks are reserved for situations in which the characters genuinely mistrust one another.</p></li>
      <li data-house-rule><h3>Physical Player Conflict</h3><p>Physical conflict between player characters requires serious narrative justification and group consent.</p></li>
      <li data-house-rule><h3>Survival Resources</h3><p>Food, water, and related survival resources are tracked while the party is outside civilization; use the ${link("Survival", aon.survival)} rules when they become relevant.</p></li>
      <li data-house-rule><h3>NPC Construction</h3><p>NPCs and monsters do not have to follow player-character construction rules, including PC action economy, magic, death, class features, or ancestry abilities.</p></li>
      <li data-house-rule><h3>Flexible Features and Flavour</h3><p>Players can propose flavourful changes to features. Mechanical changes require a conversation and GM approval.</p></li>
      <li data-house-rule><h3>Unique Character Options</h3><p>A class or ancestry might be unique in the setting or to a particular character. Two player characters can still share a class when the group agrees it fits.</p></li>
      <li data-house-rule><h3>Potions</h3><p>Potions are alchemical and nonmagical unless a specific item says otherwise.</p></li>
    </ol>
  `;

  const retiredHouseRules = removeEntry("campaign-house-rules");
  let detailedGmRules = retiredHouseRules ? retiredHouseRules.contentHtml : "";
  detailedGmRules = detailedGmRules
    .replaceAll("<em>reincarnate</em>", link("<em>reincarnate</em>", aon.reincarnate))
    .replaceAll("<em>resurrect</em>", link("<em>resurrect</em>", aon.resurrect))
    .replaceAll("<em>raise dead</em>", link("<em>raise dead</em>", aon.raiseDead))
    .replace("<h3>Resurrection</h3>", `<h3>${link("Resurrection", aon.resurrect)}</h3>`)
    .replace("<h3>Raise Dead</h3>", `<h3>${link("Raise Dead", aon.raiseDead)}</h3>`)
    .replace("<h3>Scrolls</h3>", `<h3>${link("Scrolls", aon.scrolls)}</h3>`)
    .replace("<h3>Mending</h3>", `<h3>${link("Mending", aon.mending)}</h3>`)
    .replace("the Magical Crafting feat", `the ${link("Magical Crafting", aon.magicalCrafting)} feat`)
    .replace("the Crafting DC", `the ${link("Crafting", aon.crafting)} DC`)
    .replaceAll("<dd>Nature (expert)</dd>", `<dd>${link("Nature", aon.nature)} (expert)</dd>`)
    .replaceAll("<dd>Religion (expert)</dd>", `<dd>${link("Religion", aon.religion)} (expert)</dd>`)
    .replace("<dd>Occultism, Religion, or GM discretion</dd>", `<dd>${link("Occultism", aon.occultism)}, ${link("Religion", aon.religion)}, or GM discretion</dd>`)
    .replace("<dd>Medicine, Society, or GM discretion</dd>", `<dd>${link("Medicine", aon.medicine)}, ${link("Society", aon.society)}, or GM discretion</dd>`)
    .replaceAll("clumsy 2", `${link("clumsy 2", aon.clumsy)}`)
    .replaceAll("drained 2", `${link("drained 2", aon.drained)}`)
    .replaceAll("enfeebled 2", `${link("enfeebled 2", aon.enfeebled)}`)
    .replaceAll("clumsy 1", `${link("clumsy 1", aon.clumsy)}`)
    .replaceAll("drained 1", `${link("drained 1", aon.drained)}`)
    .replaceAll("enfeebled 1", `${link("enfeebled 1", aon.enfeebled)}`);

  entries.push(
    {
      id: "house-rules-players",
      title: "House Rules for Players",
      category: "House Rules",
      typeLabel: "Campaign Rules",
      levelLabel: "Player Reference",
      headingLabel: "Player Reference",
      traits: ["Campaign", "Player Reference"],
      summary: "Twenty-one consolidated campaign rulings for players, including revival, ABP, item, and table-play conventions.",
      intro: "The player-facing source of truth for Gaileia's campaign-wide rules.",
      source: `${sourceTitle}; ${sessionSource}; Homebrew Rules | PF2; Mechanics Codex`,
      contentHtml: playerRulesHtml
    },
    {
      id: "house-rules-gms",
      title: "House Rules for GMs",
      category: "House Rules",
      typeLabel: "GM Rules",
      levelLabel: "GM Reference",
      headingLabel: "GM Reference",
      traits: ["Campaign", "GM Reference"],
      gmOnly: true,
      summary: "The complete player rules plus detailed aspect-based revival procedures and GM adjudication material.",
      intro: "The full GM reference, including every player-facing ruling and the existing detailed revival mechanics.",
      source: `${sourceTitle}; ${sessionSource}; Homebrew Rules | PF2; Mechanics Codex`,
      contentHtml: `${playerRulesHtml}<h2>Detailed GM Mechanics</h2>${detailedGmRules}`
    },
    {
      id: "ritsa-nature-for-medicine",
      title: "Ritsa's Nature for Medicine",
      category: "Ritsa",
      typeLabel: "Character Rule",
      levelLabel: "Ritsa",
      headingLabel: "Character Rule",
      traits: ["Healing", "Medicine", "Nature"],
      summary: "Ritsa can substitute Nature for specific medical checks while still meeting Medicine proficiency prerequisites normally.",
      intro: "A campaign-specific expansion of Ritsa's natural healing practice.",
      source: sourceTitle,
      contentHtml: `
        <section class="rules-subcard">
          <h2>Prerequisites</h2>
          <p>Ritsa must meet all ${link("Medicine", aon.medicine)} proficiency prerequisites normally. Substituting ${link("Nature", aon.nature)} for a check does not change which proficiency a feat or action requires.</p>
        </section>
        <h2>Nature Substitution</h2>
        <p>When Ritsa provides medical treatment or first aid through natural methods, she can roll Nature in place of the Medicine check. This includes:</p>
        <ul>
          <li>using Nature to ${link("Administer First Aid", aon.medicine)};</li>
          <li>qualifying for and performing ${link("Battle Medicine", aon.battleMedicine)} with Nature; and</li>
          <li>using ${link("Unusual Treatment", aon.unusualTreatment)} with Nature.</li>
        </ul>
      `
    },
    {
      id: "ritsa-familiars",
      title: "Ritsa's Familiars",
      category: "Ritsa",
      typeLabel: "Character Rule",
      levelLabel: "Ritsa",
      headingLabel: "Character Rule",
      traits: ["Animist", "Familiar"],
      summary: "Every familiar Ritsa manifests must carry Absorb Familiar as one of its innate abilities.",
      intro: "A persistent rule for Ritsa's apparition familiars, regardless of their form or type.",
      source: sourceTitle,
      contentHtml: `
        <h2>Required Ability</h2>
        <p>No matter the familiar's form or type, one of its innate abilities must be ${link("Absorb Familiar", aon.absorbFamiliar)}.</p>
        <p>If the familiar already has one or more natural innate abilities, Ritsa can replace one of those abilities with Absorb Familiar. The familiar can become a mark carried on Ritsa's body; changing between familiar and mark takes 1 minute and has the concentrate trait.</p>
      `
    },
    {
      id: "oziza-spells",
      title: "Oziza's Spells",
      category: "Oziza",
      typeLabel: "Spell Appearance",
      levelLabel: "Oziza",
      headingLabel: "Spell Reference",
      traits: ["Divine", "Oracle", "Spells"],
      summary: "A tracker for Oziza's personalized spell appearances and any campaign-specific damage-type changes.",
      intro: "Oziza's magic manifests through water, frost, pale-blue light, and luminous ripples.",
      source: sourceTitle,
      contentHtml: `
        <div class="table-wrap">
          <table>
            <thead><tr><th>Spell</th><th>Appearance</th><th>Normal Damage</th><th>Current Damage</th></tr></thead>
            <tbody>
              <tr><td>${link("Spray of Stars", aon.sprayOfStars)}</td><td>Water caustics emanate outward.</td><td>Fire</td><td>Electricity</td></tr>
              <tr><td>${link("Divine Lance", aon.divineLance)}</td><td>Frosty energy.</td><td>Spirit</td><td>Cold</td></tr>
              <tr><td>${link("Heal", aon.heal)}</td><td>A burst of light.</td><td>—</td><td>—</td></tr>
              <tr><td>${link("Light", aon.light)}</td><td>An orb of pale, bright-blue light.</td><td>—</td><td>—</td></tr>
              <tr><td>${link("Benediction", aon.benediction)}</td><td>Rippling waves radiate outward.</td><td>—</td><td>—</td></tr>
              <tr><td>${link("Dispel Magic", aon.dispelMagic)}</td><td>An intense, summoning flash of light.</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "oziza-rehydration",
      title: "Oziza's Rehydration",
      category: "Oziza",
      typeLabel: "Granted Feat",
      levelLabel: "Character Creation",
      headingLabel: "Granted Feat",
      traits: ["Azarketi", "Water"],
      summary: "Oziza receives Rehydration as a free feat at character creation.",
      intro: "A campaign-granted feat that helps Oziza meet her ancestry's hydration needs away from open water.",
      source: sourceTitle,
      contentHtml: `
        <h2>${link("Rehydration", aon.rehydration)}</h2>
        <p>Oziza gains Rehydration for free at character creation. Once per day, she can spend 1 hour resting to draw moisture from the air; this counts as submerging her body in water for her Hydration requirement. At the GM's discretion, an exceptionally dry environment might not contain enough moisture for this to work.</p>
      `
    },
    {
      id: "gaileian-calendar",
      title: "Gaileian Calendar",
      category: "Calendar",
      typeLabel: "Campaign Calendar",
      levelLabel: "External Site",
      headingLabel: "Gaileia",
      traits: ["Calendar", "Gaileia", "Time"],
      summary: "Open the live Gaileian Calendar to follow the campaign's dates, months, seasons, and events.",
      intro: "A companion calendar for tracking time in Gaileia.",
      source: "Fantasy Calendar",
      externalUrl: "https://app.fantasy-calendar.com/calendars/efd86919d920668ad5ca0f40f70c3031",
      externalLabel: "Open calendar",
      pcAccessible: true,
      contentHtml: "<p>Open the companion calendar to follow dates, seasons, and campaign events in Gaileia.</p>"
    }
  );

  const oziza = findEntry("oziza-character");
  if (oziza && !oziza.featSummaries.some((feat) => feat.name === "Rehydration")) {
    oziza.featSummaries.push({
      name: "Rehydration",
      kind: "Campaign-Granted Feat",
      level: 1,
      url: aon.rehydration,
      description: "Free at character creation. Once per day, spend 1 hour resting to draw moisture from the air; this counts as submerging in water for Hydration. It might fail in exceptionally dry areas at the GM's discretion."
    });
  }

  const characterFeatures = {
    "oziza-character": [
      { name: "Divine Spellcasting", kind: "Oracle Feature", url: aon.oracle, description: "Oziza casts divine spells spontaneously using Charisma and a spell repertoire." },
      { name: "Cosmos Mystery", kind: "Oracle Mystery", url: aon.oracleCosmos, description: "Her mystery grants the Nature skill, cosmic spells, and the Spray of Stars revelation spell." },
      { name: "Curse of the Sky's Call", kind: "Oracular Curse", url: aon.oracleCosmos, description: `While cursebound, Oziza is ${link("enfeebled", aon.enfeebled)} by her cursebound value and takes an equal status penalty against forced movement.` },
      { name: "Revelation Spells", kind: "Oracle Feature", url: aon.oracle, description: "Revelation spells are focus spells tied to Oziza's mystery and automatically heighten with her level." },
      { name: "Oracular Curse", kind: "Oracle Feature", url: aon.oracle, description: "Cursebound abilities increase her cursebound value; Refocusing reduces it and restores a Focus Point." },
      { name: "Signature Spells", kind: "Oracle Feature", url: aon.oracle, description: "One spell of each available rank is a signature spell and can be heightened freely." },
      { name: "Low-Light Vision", kind: "Azarketi Feature", url: "https://2e.aonprd.com/Ancestries.aspx?ID=41", description: "Oziza sees in dim light as though it were bright light and ignores concealment caused only by dim light." },
      { name: "Hydration", kind: "Azarketi Feature", url: "https://2e.aonprd.com/Ancestries.aspx?ID=41", description: "She normally must submerge once every 24 hours; her campaign-granted Rehydration feat provides another way to satisfy this need." }
    ],
    "ritsa-character": [
      { name: "Apparition Attunement", kind: "Animist Feature", url: aon.animist, description: "During daily preparations, Ritsa attunes to two apparitions and designates one as her primary apparition." },
      { name: "Animist & Apparition Spellcasting", kind: "Animist Feature", url: aon.animist, description: "She prepares divine animist spells and spontaneously casts spells supplied by her attuned apparitions." },
      { name: "Vessel Spells", kind: "Animist Feature", url: aon.animist, description: "Her primary apparition supplies a vessel focus spell; changing the primary apparition while Refocusing changes the vessel spell available." },
      { name: "Shaman", kind: "Animistic Practice", url: aon.ritsaPractice, description: "Ritsa forms unusually close bonds that let an apparition inhabit a familiar's physical form." },
      { name: "Invocation of Embodiment", kind: "Shaman Feature", url: aon.ritsaPractice, description: "This grants Spirit Familiar at 1st level and Enhanced Familiar at 2nd level." },
      { name: "Primary Apparition", kind: "Animist Feature", url: aon.animist, description: "The primary apparition grants its vessel spell and can be changed among currently attuned apparitions when Ritsa Refocuses." },
      { name: "Second Apparition", kind: "Animist Feature", url: aon.animist, description: "The second attuned apparition contributes Lore and apparition spells even while it is not primary." },
      { name: "Darkvision", kind: "Goblin Feature", url: "https://2e.aonprd.com/Ancestries.aspx?ID=4", description: "Ritsa can see in darkness and dim light, though darkness remains black and white." },
      { name: "Fortitude Expertise", kind: "Animist Feature", url: aon.animist, description: "At 3rd level, Ritsa's Fortitude save proficiency increases to expert." }
    ],
    "saraik-character": [
      { name: "Flurry of Blows", kind: "Monk Feature", url: aon.monk, description: "One action makes two unarmed Strikes; if both hit the same target, combine their damage against resistances and weaknesses." },
      { name: "Powerful Fist", kind: "Monk Feature", url: aon.monk, description: "Saraik's fist deals 1d6 damage, and his unarmed attacks can deal lethal damage without the normal penalty." },
      { name: "Claws", kind: "Lizardfolk Feature", url: "https://2e.aonprd.com/Ancestries.aspx?ID=15", description: "He has a 1d4 slashing claw attack in the brawling group with the agile and finesse traits." },
      { name: "Aquatic Adaptation", kind: "Lizardfolk Feature", url: "https://2e.aonprd.com/Ancestries.aspx?ID=15", description: "His reptilian biology grants Breath Control as a bonus feat." },
      { name: "Incredible Movement", kind: "Monk Feature", url: aon.monk, description: "While unarmored, Saraik gains a +10-foot status bonus to Speed at 3rd level." },
      { name: "Mystic Strikes", kind: "Monk Feature", url: aon.monk, description: "His unarmed attacks are magical for bypassing resistance to nonmagical attacks." },
      { name: "Expert Saving Throws", kind: "Monk Proficiency", url: aon.monk, description: "Saraik begins expert in Fortitude, Reflex, and Will saves." },
      { name: "Expert Unarmored Defense", kind: "Monk Proficiency", url: aon.monk, description: "Saraik begins expert in unarmored defense and relies on mobility rather than armor." }
    ],
    "we4land-character": [
      { name: "Way of the Pistolero", kind: "Gunslinger Way", url: aon.wayPistolero, description: "WE4LAND fights through mobility, bravado, one-handed firearms, and a distinctive slinger's reload." },
      { name: "Raconteur's Reload", kind: "Slinger's Reload", url: aon.wayPistolero, description: "Reload, then either Create a Diversion with Deception or Demoralize with Intimidation." },
      { name: "Ten Paces", kind: "Initial Deed", url: aon.wayPistolero, description: "When initiative is rolled, gain +2 to initiative and draw a one-handed firearm or crossbow; the first action of the first turn can include a free Step up to 10 feet." },
      { name: "Slinger's Precision", kind: "Gunslinger Feature", url: aon.gunslinger, description: "Non-repeating crossbows deal +2 precision damage and non-repeating firearms deal +1d4 precision damage." },
      { name: "Stubborn", kind: "Gunslinger Feature", url: aon.gunslinger, description: `Will saves become expert. After a failure against a ${link("controlled", aon.controlled)} effect, WE4LAND can attempt a second save at the start of the next turn.` },
      { name: "Automaton Core", kind: "Automaton Feature", url: aon.automaton, description: `WE4LAND is a living creature without normal construct immunities, benefits from vitality healing, and becomes ${link("dying", aon.dying)} rather than being destroyed at 0 Hit Points.` },
      { name: "Constructed Body", kind: "Automaton Feature", url: aon.automaton, description: `WE4LAND need not eat, drink, or sleep, but needs 2 hours of aware standby each day or becomes ${link("fatigued", aon.fatigued)}. He still needs breathable air to vent magical exhaust.` },
      { name: "Low-Light Vision", kind: "Automaton Feature", url: aon.automaton, description: "WE4LAND sees in dim light as though it were bright light." }
    ]
  };

  function summaryMarkup(items, heading, className) {
    return `
      <h2>${heading}</h2>
      <ol class="feat-summary-list${className ? ` ${className}` : ""}">
        ${items.map((item) => `
          <li class="feat-summary">
            <div class="feat-summary-heading">
              <h3><a href="${item.url}" target="_blank" rel="noreferrer">${item.name}</a></h3>
              <p>${item.kind}${Number.isFinite(item.level) ? ` · Level ${item.level}` : ""}</p>
            </div>
            <p>${item.description}</p>
          </li>
        `).join("")}
      </ol>
    `;
  }

  const characterTitles = {
    "oziza-character": "Oziza Features",
    "ritsa-character": "Ritsa Features",
    "saraik-character": "Saraik Features",
    "we4land-character": "WE4LAND Features"
  };

  Object.entries(characterFeatures).forEach(([id, features]) => {
    const entry = findEntry(id);
    if (!entry) return;
    entry.title = characterTitles[id];
    entry.featureSummaries = features;
    entry.summary = entry.summary.replace("with feats current", "with features and feats current");
    entry.source = entry.source.includes(sourceTitle) ? entry.source : `${entry.source}; ${sourceTitle}`;
    const baseDetails = entry.contentHtml.split(/\s*<h2>Current Feats<\/h2>/)[0];
    entry.contentHtml = `${baseDetails}${summaryMarkup(features, "Current Features", "feature-summary-list")}${summaryMarkup(entry.featSummaries, "Current Feats", "")}`;
  });

  window.GAILEIA_RULE_LINKS = {
    "Absorb Familiar": aon.absorbFamiliar,
    "Administer First Aid": aon.medicine,
    "Automatic Bonus Progression": aon.automaticBonusProgression,
    "Battle Medicine": aon.battleMedicine,
    "Cast a Spell": "https://2e.aonprd.com/Actions.aspx",
    "Climb": "https://2e.aonprd.com/Skills.aspx?ID=36",
    "Crafting": aon.crafting,
    "Create a Diversion": "https://2e.aonprd.com/Skills.aspx?ID=38",
    "Demoralize": "https://2e.aonprd.com/Skills.aspx?ID=40",
    "Diplomacy": "https://2e.aonprd.com/Skills.aspx?ID=39",
    "Earn Income": "https://2e.aonprd.com/Skills.aspx?General=true&ID=2",
    "flat check": "https://2e.aonprd.com/Rules.aspx?ID=333",
    "Focus Points": "https://2e.aonprd.com/Rules.aspx?ID=276",
    "Focus Point": "https://2e.aonprd.com/Rules.aspx?ID=276",
    "Interact": "https://2e.aonprd.com/Actions.aspx?ID=80",
    "Intimidation": "https://2e.aonprd.com/Skills.aspx?ID=40",
    "Magical Crafting": aon.magicalCrafting,
    "Medicine": aon.medicine,
    "Mending": aon.mending,
    "multiple attack penalty": "https://2e.aonprd.com/Rules.aspx?ID=322",
    "Nature": aon.nature,
    "Occultism": aon.occultism,
    "Refocus": "https://2e.aonprd.com/Actions.aspx?ID=2621",
    "Refocusing": "https://2e.aonprd.com/Actions.aspx?ID=2621",
    "Rehydration": aon.rehydration,
    "Religion": aon.religion,
    "Repair": aon.crafting,
    "resistance": "https://2e.aonprd.com/Rules.aspx?ID=2318",
    "Seek": "https://2e.aonprd.com/Actions.aspx",
    "Society": aon.society,
    "Spray of Stars": aon.sprayOfStars,
    "Step": "https://2e.aonprd.com/Actions.aspx?ID=87",
    "Stride": "https://2e.aonprd.com/Actions.aspx?ID=88",
    "Strike": "https://2e.aonprd.com/Actions.aspx?ID=89",
    "Strikes": "https://2e.aonprd.com/Actions.aspx?ID=89",
    "Subsist": aon.survival,
    "Survival": aon.survival,
    "Treat Disease": aon.medicine,
    "Treat Poison": aon.medicine,
    "Treat Wounds": aon.medicine,
    "Unusual Treatment": aon.unusualTreatment,
    "weakness": "https://2e.aonprd.com/Rules.aspx?ID=2317",
    "weaknesses": "https://2e.aonprd.com/Rules.aspx?ID=2317",
    "blinded": "https://2e.aonprd.com/Conditions.aspx?ID=59",
    "clumsy": aon.clumsy,
    "concealed": "https://2e.aonprd.com/Conditions.aspx?ID=60",
    "controlled": aon.controlled,
    "dazzled": "https://2e.aonprd.com/Conditions.aspx?ID=65",
    "deafened": "https://2e.aonprd.com/Conditions.aspx?ID=66",
    "doomed": "https://2e.aonprd.com/Conditions.aspx?ID=67",
    "drained": aon.drained,
    "dying": aon.dying,
    "enfeebled": aon.enfeebled,
    "fatigued": aon.fatigued,
    "frightened": "https://2e.aonprd.com/Conditions.aspx?ID=76",
    "grabbed": "https://2e.aonprd.com/Conditions.aspx?ID=77",
    "hidden": "https://2e.aonprd.com/Conditions.aspx?ID=79",
    "immobilized": "https://2e.aonprd.com/Conditions.aspx?ID=81",
    "invisible": "https://2e.aonprd.com/Conditions.aspx?ID=83",
    "off-guard": "https://2e.aonprd.com/Conditions.aspx?ID=58",
    "prone": "https://2e.aonprd.com/Conditions.aspx?ID=88",
    "restrained": "https://2e.aonprd.com/Conditions.aspx?ID=90",
    "sickened": "https://2e.aonprd.com/Conditions.aspx?ID=91",
    "slowed": "https://2e.aonprd.com/Conditions.aspx?ID=92",
    "stunned": "https://2e.aonprd.com/Conditions.aspx?ID=93",
    "unconscious": "https://2e.aonprd.com/Conditions.aspx?ID=95",
    "wounded": "https://2e.aonprd.com/Conditions.aspx?ID=97"
  };

  entries.forEach((entry) => {
    for (const item of [...(entry.featureSummaries || []), ...(entry.featSummaries || [])]) {
      if (item.name && item.url) window.GAILEIA_RULE_LINKS[item.name] = item.url;
    }
  });

  window.GAILEIA_FORMULA_FILTERS = {
    options: [
      { id: "all", label: "All" },
      { id: "advanced", label: "Advanced Alchemy" },
      { id: "regular", label: "Regular Crafting" },
      { id: "ritsa", label: "Ritsa" },
      { id: "we4land", label: "WE4LAND" }
    ],
    matches(entry, selectedFilters) {
      if (entry.category !== "Formulae") return true;
      const filters = selectedFilters instanceof Set
        ? [...selectedFilters]
        : Array.isArray(selectedFilters)
          ? selectedFilters
          : selectedFilters && selectedFilters !== "all"
            ? [selectedFilters]
            : [];
      if (filters.length === 0 || filters.includes("all")) return true;
      return filters.some((filter) => {
        if (filter === "advanced") return Boolean(entry.advancedAlchemy);
        if (filter === "regular") return Boolean(entry.regularCrafting);
        return Array.isArray(entry.formulaOwners) && entry.formulaOwners.some(
          (owner) => owner.toLocaleLowerCase() === filter
        );
      });
    }
  };
})();
