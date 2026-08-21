(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];

  window.HOMEBREW_CATEGORIES = [
    "All",
    "Animist",
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

  window.GAILEIA_TRAIT_URLS = {
    agile: "https://2e.aonprd.com/Traits.aspx?ID=526",
    alchemical: "https://2e.aonprd.com/Traits.aspx?ID=528",
    animist: "https://2e.aonprd.com/Traits.aspx?ID=836",
    apparition: "https://2e.aonprd.com/Traits.aspx?ID=837",
    aura: "https://2e.aonprd.com/Traits.aspx?ID=542",
    automaton: "https://2e.aonprd.com/Traits.aspx?ID=398",
    azarketi: "https://2e.aonprd.com/Traits.aspx?ID=742",
    capacity: "https://2e.aonprd.com/Traits.aspx?ID=845",
    cold: "https://2e.aonprd.com/Traits.aspx?ID=555",
    concealable: "https://2e.aonprd.com/Traits.aspx?ID=560",
    concentrate: "https://2e.aonprd.com/Traits.aspx?ID=561",
    concussive: "https://2e.aonprd.com/Traits.aspx?ID=846",
    construct: "https://2e.aonprd.com/Traits.aspx?ID=563",
    consumable: "https://2e.aonprd.com/Traits.aspx?ID=564",
    downtime: "https://2e.aonprd.com/Traits.aspx?ID=580",
    electricity: "https://2e.aonprd.com/Traits.aspx?ID=586",
    environmental: "https://2e.aonprd.com/Traits.aspx?ID=591",
    exploration: "https://2e.aonprd.com/Traits.aspx?ID=595",
    fatal: "https://2e.aonprd.com/Traits.aspx?ID=597",
    finesse: "https://2e.aonprd.com/Traits.aspx?ID=602",
    fire: "https://2e.aonprd.com/Traits.aspx?ID=604",
    focus: "https://2e.aonprd.com/Traits.aspx?ID=511",
    gadget: "https://2e.aonprd.com/Traits.aspx?ID=405",
    goblin: "https://2e.aonprd.com/Traits.aspx?ID=618",
    gunslinger: "https://2e.aonprd.com/Traits.aspx?ID=406",
    healing: "https://2e.aonprd.com/Traits.aspx?ID=623",
    human: "https://2e.aonprd.com/Traits.aspx?ID=627",
    humanoid: "https://2e.aonprd.com/Traits.aspx?ID=628",
    invested: "https://2e.aonprd.com/Traits.aspx?ID=637",
    kickback: "https://2e.aonprd.com/Traits.aspx?ID=409",
    linguistic: "https://2e.aonprd.com/Traits.aspx?ID=642",
    lizardfolk: "https://2e.aonprd.com/Traits.aspx?ID=226",
    magical: "https://2e.aonprd.com/Traits.aspx?ID=644",
    manipulate: "https://2e.aonprd.com/Traits.aspx?ID=104",
    mental: "https://2e.aonprd.com/Traits.aspx?ID=106",
    mindless: "https://2e.aonprd.com/Traits.aspx?ID=108",
    monk: "https://2e.aonprd.com/Traits.aspx?ID=112",
    necromancy: "https://2e.aonprd.com/Traits.aspx?ID=117",
    nonlethal: "https://2e.aonprd.com/Traits.aspx?ID=661",
    oil: "https://2e.aonprd.com/Traits.aspx?ID=663",
    oracle: "https://2e.aonprd.com/Traits.aspx?ID=817",
    potion: "https://2e.aonprd.com/Traits.aspx?ID=672",
    rare: "https://2e.aonprd.com/Traits.aspx?ID=683",
    repeating: "https://2e.aonprd.com/Traits.aspx?ID=374",
    unarmed: "https://2e.aonprd.com/Traits.aspx?ID=719",
    uncommon: "https://2e.aonprd.com/Traits.aspx?ID=721",
    unwieldy: "https://2e.aonsrd.com/search/?q=Unwieldy&include-types=trait&display=full",
    versatile: "https://2e.aonprd.com/Traits.aspx?ID=727",
    vitality: "https://2e.aonprd.com/Traits.aspx?ID=729",
    volley: "https://2e.aonprd.com/Traits.aspx?ID=730",
    water: "https://2e.aonprd.com/Traits.aspx?ID=732"
  };

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function updateEntry(id, changes) {
    const entry = findEntry(id);
    if (entry) Object.assign(entry, changes);
  }

  function replaceInEntry(id, replacements) {
    const entry = findEntry(id);
    if (!entry) return;
    let html = entry.contentHtml;
    replacements.forEach(([from, to]) => {
      html = html.replace(from, to);
    });
    entry.contentHtml = html;
  }

  const deletedIds = new Set([
    "healing-potion-custom",
    "mystery-scale",
    "mystery-white-balm",
    "rebels-revolver",
    "wand-of-allfood",
    "wand-of-shielded-arm"
  ]);

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (deletedIds.has(entries[index].id)) entries.splice(index, 1);
  }

  entries.forEach((entry) => {
    if (entry.category === "Sara") entry.category = "Saraik";
    entry.traits = entry.traits.filter((trait) => !["3rd Party", "House Rule"].includes(trait));
  });

  const listingUpdates = {
    "alternate-chase-rules": { title: "Alternate Chase" },
    "amalas-kickback": { typeLabel: "Alchemy" },
    "antler-ammunition": { typeLabel: "Ammunition" },
    "anvil-construct": { typeLabel: "Creature" },
    "automatons-flamethrower": { typeLabel: "Firearm" },
    "bull-et": { typeLabel: "Ammunition" },
    "camp-meal-and-cooking-rules": { title: "Camp Meal & Cooking" },
    "campaign-house-rules": { title: "Campaign House" },
    cryomister: { typeLabel: "Mechanism" },
    "demortification-oil": { typeLabel: "Alchemy" },
    "echoes-of-a-signal": { typeLabel: "Apparition" },
    "enregalia-vetericus-encyclopedia-volume-mdccxiii": { typeLabel: "Literature" },
    "flare-cartridge": { typeLabel: "Ammunition" },
    "forge-construct": { typeLabel: "Creature" },
    "galvanic-derringer": { typeLabel: "Firearm" },
    "goblish-translator": {
      typeLabel: "Translator",
      summary: "Translate from Goblish to Common and back again!"
    },
    "hydrant-construct": { typeLabel: "Creature" },
    "itchy-scale": { typeLabel: "Alchemy" },
    "life-boosting-oil": { typeLabel: "Alchemy" },
    "lumberjack-construct": { typeLabel: "Creature" },
    "merciful-balm": { typeLabel: "Alchemy" },
    "mixer-construct": { typeLabel: "Creature" },
    "seam-coil-bullet": { typeLabel: "Ammunition" },
    "tiger-stance-razor-claws": { typeLabel: "Unarmed", category: "Saraik" },
    "tongs-construct": { typeLabel: "Creature" },
    "tourist-brochure-gaius-city": { typeLabel: "Literature" },
    "vitae-petal-tea-leaves": { typeLabel: "Alchemy" },
    "walking-cauldron": { typeLabel: "Attuned" },
    "we4land-venting-and-submersion": { title: "Venting & Submersion" },
    "wrecking-ball-construct": { typeLabel: "Creature" },
    "yellow-bullet": { title: "Citrine Bullet", typeLabel: "Ammunition" }
  };

  Object.entries(listingUpdates).forEach(([id, changes]) => updateEntry(id, changes));

  replaceInEntry("echoes-of-a-signal", [
    [
      '<li><span class="spell-rank">8th</span><strong>save point</strong> <span>(final selected version; included below)</span></li>',
      '<li><span class="spell-rank">8th</span><a href="#save-point-spell">save point</a></li>'
    ],
    ["<h2>Final 8th-Rank Spell</h2>", '<h2 id="save-point-spell" tabindex="-1">8th-Rank Spell</h2>']
  ]);

  updateEntry("amalas-kickback", {
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
      </dl>
      <p>You pour the oil onto a weapon when activating it. If that weapon damaged a creature within the last 10 minutes, the most recent creature damaged by the weapon regains an equal number of Hit Points.</p>
      <p>The alchemy relies on the malice behind the attack, so the weapon must have been used against an enemy of the attacker. A willing ally can't take damage from a friend's weapon merely to enable this healing.</p>
    `
  });

  updateEntry("bull-et", {
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
      </dl>
      <p>Firing this ammunition transformed the projectile into a life-sized bison.</p>
    `
  });

  replaceInEntry("non-lethal-ammunition", [["minimum of (x)d4", "minimum of 1d4"]]);

  updateEntry("flare-pistol", {
    contentHtml: findEntry("flare-pistol").contentHtml.replace(
      "<dd>Flare cartridge</dd>",
      '<dd><a href="#entry/flare-cartridge">Flare cartridge</a></dd>'
    )
  });

  updateEntry("flare-cartridge", {
    contentHtml: findEntry("flare-cartridge").contentHtml.replace(
      "<dd>Loaded in a flare pistol</dd>",
      '<dd>Loaded in a <a href="#entry/flare-pistol">flare pistol</a></dd>'
    )
  });

  updateEntry("galvanic-derringer", {
    contentHtml: findEntry("galvanic-derringer").contentHtml.replaceAll(
      "bottled lightning",
      '<a href="https://2e.aonprd.com/Equipment.aspx?ID=3290" target="_blank" rel="noreferrer">bottled lightning</a>'
    )
  });

  updateEntry("automatons-flamethrower", {
    contentHtml: findEntry("automatons-flamethrower").contentHtml
      .replaceAll(
        "alchemist's fire",
        '<a href="https://2e.aonprd.com/Equipment.aspx?ID=3287" target="_blank" rel="noreferrer">alchemist\'s fire</a>'
      )
      .replace(
        "<p><strong>Fire, Manipulate</strong></p>",
        '<ul class="trait-list inline-traits" aria-label="Fire Flamethrower traits"><li class="trait"><a href="https://2e.aonprd.com/Traits.aspx?ID=604" target="_blank" rel="noreferrer">Fire</a></li><li class="trait"><a href="https://2e.aonprd.com/Traits.aspx?ID=104" target="_blank" rel="noreferrer">Manipulate</a></li></ul>'
      )
  });

  updateEntry("merciful-balm", {
    contentHtml: findEntry("merciful-balm").contentHtml.replace(
      "the nonlethal trait",
      'the <a href="https://2e.aonprd.com/Traits.aspx?ID=661" target="_blank" rel="noreferrer">nonlethal</a> trait'
    )
  });

  updateEntry("rebels-revolver-restored", {
    contentHtml: findEntry("rebels-revolver-restored").contentHtml
      .replace(
        '<div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>',
        '<div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div><div class="stat-line"><dt>Group</dt><dd><a href="https://2e.aonprd.com/WeaponGroups.aspx?ID=16" target="_blank" rel="noreferrer">Firearm</a></dd></div>'
      )
  });

  updateEntry("seam-coil-bullet", {
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
      </dl>
      <p>This bullet was fired during WE4LAND’s M.A.G.E. certification with Hadi at the Innspiration. When fired, it split into two, with an arc of electricity appearing briefly between the two fragments.</p>
    `
  });

  updateEntry("seeker-rifle", {
    headingLabel: "1d8 B",
    contentHtml: findEntry("seeker-rifle").contentHtml
      .replace("Not specified in the current Pathbuilder source", "1d8 bludgeoning")
      .replace(
        '<div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>',
        '<div class="stat-line"><dt>Proficiency</dt><dd>Advanced Weapons</dd></div><div class="stat-line"><dt>Group</dt><dd><a href="https://2e.aonprd.com/WeaponGroups.aspx?ID=16" target="_blank" rel="noreferrer">Firearm</a></dd></div>'
      )
  });

  updateEntry("tiger-stance-razor-claws", {
    intro: "A specialized set of razor claws designed for Tiger Stance attacks.",
    contentHtml: findEntry("tiger-stance-razor-claws").contentHtml.replace(
      '<div class="stat-line"><dt>Group</dt><dd>Brawling</dd></div>',
      '<div class="stat-line"><dt>Group</dt><dd><a href="https://2e.aonprd.com/WeaponGroups.aspx?ID=4" target="_blank" rel="noreferrer">Brawling</a></dd></div>'
    ),
    introHtml: 'A specialized set of razor claws designed for <a href="https://2e.aonprd.com/Feats.aspx?ID=5983" target="_blank" rel="noreferrer">Tiger Stance</a> attacks.'
  });

  updateEntry("yellow-bullet", {
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
      </dl>
    `
  });

  const firearmIds = [
    "rebels-revolver-damaged",
    "automatons-flamethrower",
    "flare-pistol",
    "galvanic-derringer"
  ];
  firearmIds.forEach((id) => {
    const entry = findEntry(id);
    if (!entry) return;
    entry.contentHtml = entry.contentHtml.replace(
      '<div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>',
      '<div class="stat-line"><dt>Group</dt><dd><a href="https://2e.aonprd.com/WeaponGroups.aspx?ID=16" target="_blank" rel="noreferrer">Firearm</a></dd></div>'
    );
  });

  updateEntry("we4land-venting-and-submersion", {
    contentHtml: findEntry("we4land-venting-and-submersion").contentHtml
      .replace("<td>Clumsy</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=61" target="_blank" rel="noreferrer">Clumsy</a></td>')
      .replace("<td>Drained</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=68" target="_blank" rel="noreferrer">Drained</a></td>')
      .replace("<td>Enfeebled</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=71" target="_blank" rel="noreferrer">Enfeebled</a></td>')
      .replace("<td>Fatigued</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=73" target="_blank" rel="noreferrer">Fatigued</a></td>')
      .replace("<td>Off-Guard</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=58" target="_blank" rel="noreferrer">Off-Guard</a></td>')
      .replace("<td>Slowed</td>", '<td><a href="https://2e.aonprd.com/Conditions.aspx?ID=92" target="_blank" rel="noreferrer">Slowed</a></td>')
  });

  function characterEntry({ id, name, category, ancestry, heritage, className, background, feats, source }) {
    const featRows = feats
      .map(
        ([feat, kind, level]) =>
          `<tr><td>${feat}</td><td>${kind}</td><td>${level === null ? "—" : level}</td></tr>`
      )
      .join("");
    return {
      id,
      title: name,
      category,
      typeLabel: "Character",
      levelLabel: "Level 3",
      headingLabel: "Level 3",
      traits: [ancestry, className, "Character"],
      summary: `A level-3 ${ancestry} ${className.toLocaleLowerCase()} with feats current to the attached Pathbuilder export.`,
      intro: `${name} is a level-3 ${ancestry} ${className.toLocaleLowerCase()} with the ${heritage} heritage and ${background} background.`,
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Ancestry</dt><dd>${ancestry}</dd></div>
          <div class="stat-line"><dt>Heritage</dt><dd>${heritage}</dd></div>
          <div class="stat-line"><dt>Class</dt><dd>${className}</dd></div>
          <div class="stat-line"><dt>Background</dt><dd>${background}</dd></div>
          <div class="stat-line"><dt>Level</dt><dd>3</dd></div>
        </dl>
        <h2>Current Feats</h2>
        <div class="table-wrap"><table><thead><tr><th>Feat</th><th>Type</th><th>Level</th></tr></thead><tbody>${featRows}</tbody></table></div>
      `
    };
  }

  entries.push(
    characterEntry({
      id: "oziza-character",
      name: "Oziza",
      category: "Oziza",
      ancestry: "Azarketi",
      heritage: "Benthic Azarketi",
      className: "Oracle",
      background: "Otherworldly Mission",
      source: "Oziza Level 3 6-8-26.json",
      feats: [
        ["Oracular Warning", "Awarded Feat", 1],
        ["Benthic Azarketi", "Heritage", 1],
        ["Hydraulic Deflection", "Ancestry Feat", 1],
        ["Bargain Hunter", "Skill Feat", 2],
        ["Cantrip Expansion", "Class Feat", 2],
        ["Untrained Improvisation", "General Feat", 3]
      ]
    }),
    characterEntry({
      id: "ritsa-character",
      name: "Ritsa",
      category: "Ritsa",
      ancestry: "Goblin",
      heritage: "Changeling",
      className: "Animist",
      background: "Herbalist",
      source: "Ritsa Level 3 6-8-26.json",
      feats: [
        ["Spirit Familiar", "Awarded Feat", 1],
        ["Natural Medicine", "Awarded Feat", 1],
        ["Enhanced Familiar", "Awarded Feat", 2],
        ["Alchemical Crafting", "Awarded Feat", 2],
        ["Changeling", "Heritage", 1],
        ["Dream May", "Ancestry Feat", 1],
        ["Battle Medicine", "Skill Feat", 2],
        ["Herbalist Dedication", "Class Feat", 2],
        ["Untrained Improvisation", "General Feat", 3]
      ]
    }),
    characterEntry({
      id: "saraik-character",
      name: "Saraik",
      category: "Saraik",
      ancestry: "Lizardfolk",
      heritage: "Cliffscale Lizardfolk",
      className: "Monk",
      background: "Astrologer",
      source: "Saraik Level 3 6-8-26.json",
      feats: [
        ["Breath Control", "Awarded Feat", 1],
        ["Oddity Identification", "Awarded Feat", 1],
        ["Combat Climber", "Awarded Feat", 1],
        ["Cliffscale Lizardfolk", "Heritage", 1],
        ["Tiger Stance", "Class Feat", 1],
        ["Parthenogenic Hatchling", "Ancestry Feat", 1],
        ["Dubious Knowledge", "Skill Feat", 2],
        ["Stunning Blows", "Class Feat", 2],
        ["Ancestral Paragon", "General Feat", 3],
        ["Bone Magic", "Ancestry Feat", 3]
      ]
    }),
    characterEntry({
      id: "we4land-character",
      name: "WE4LAND – PU373",
      category: "WE4LAND",
      ancestry: "Automaton",
      heritage: "Sharpshooter Automaton",
      className: "Gunslinger",
      background: "Gambler",
      source: "WE4LAND Level 3 20-08-2026.json",
      feats: [
        ["Lie to Me", "Awarded Feat", 1],
        ["Alchemical Crafting", "Awarded Feat", 1],
        ["Sharpshooter Automaton", "Heritage", 1],
        ["Munitions Crafter", "Class Feat", 1],
        ["Arcane Eye", "Ancestry Feat", 1],
        ["Intimidating Glare", "Skill Feat", 2],
        ["Dual-Weapon Reload", "Class Feat", 2],
        ["Fleet", "General Feat", 3]
      ]
    }),
    {
      id: "universal-directive",
      title: "Universal Directive",
      category: "Spells",
      typeLabel: "Focus Spell",
      levelLabel: "Focus 1",
      headingLabel: "Focus 1",
      traits: ["Rare", "Animist", "Aura", "Concentrate", "Focus", "Mental"],
      summary: "Project a coded signal that lets allies Step and strengthens saves against signal-like effects.",
      intro: "You project a coded signal that coordinates those who heed it.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd><span class="action-icon" aria-label="one action">◆</span></dd></div>
          <div class="stat-line"><dt>Area</dt><dd>20-foot emanation</dd></div>
          <div class="stat-line"><dt>Duration</dt><dd>Sustained up to 1 minute</dd></div>
        </dl>
        <p>When you Cast this Spell and the first time you Sustain it each round, choose one ally in the emanation. That ally can immediately Step as a free action. An ally can benefit from rallying signal only once per round.</p>
        <p>While within the emanation, you and your allies gain a +1 status bonus to saves against auditory, linguistic, and sonic effects.</p>
        <p><strong>Heightened (4th)</strong> The emanation increases to 25 feet.</p>
        <p><strong>Heightened (7th)</strong> When you Cast or Sustain the spell, you can choose two different allies.</p>
      `
    },
    {
      id: "translate-chip",
      title: "Translate Chip",
      category: "WE4LAND",
      typeLabel: "Focus Spell",
      levelLabel: "Focus 2",
      headingLabel: "Focus 2",
      traits: ["Concentrate", "Focus", "Manipulate"],
      summary: "Temporarily let one creature understand a language it can hear or read.",
      intro: "A tuned linguistic module translates one spoken or written language for a nearby creature.",
      source: "Translate-Chip-Focus-Spell (1).json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd><span class="action-icon" aria-label="two actions">◆◆</span></dd></div>
          <div class="stat-line"><dt>Range</dt><dd>30 feet</dd></div>
          <div class="stat-line"><dt>Target</dt><dd>1 creature</dd></div>
          <div class="stat-line"><dt>Duration</dt><dd>1 hour</dd></div>
        </dl>
        <p>The target can understand the meaning of a single language it is hearing or reading when you Cast the Spell. This doesn't let it understand codes, language couched in metaphor, and the like, subject to GM discretion.</p>
        <p>If the target can hear multiple languages and knows that, it can choose which language to understand; otherwise, choose one of the languages randomly.</p>
        <blockquote class="flavour-quote"><p>“I modulated the transistor and updated the Wernicke-mimicking module. The transistor should keep the amperage within thresholds for the downstream capacitor, so long as you don’t overuse it. Otherwise, you’ll blow the fuse.”</p><footer>— Thumb</footer></blockquote>
      `
    }
  );

  const formulaNames = [
    "Alchemist's Toolkit",
    "Black Powder (Dose or Round)",
    "Dread Ampoule (Lesser)",
    "Earplugs",
    "Elemental Ammunition - Acid (Lesser)",
    "Elemental Ammunition - Cold (Lesser)",
    "Elemental Ammunition - Electricity (Lesser)",
    "Elemental Ammunition - Poison (Lesser)",
    "Glue Bomb (Lesser)",
    "Quicksilver Mutagen (Lesser)",
    "Silencer",
    "Smoke Ball (Lesser)"
  ];

  function slug(value) {
    return value
      .toLocaleLowerCase()
      .replaceAll("'", "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  formulaNames.forEach((name) => {
    const searchUrl = `https://2e.aonprd.com/Search.aspx?q=${encodeURIComponent(name)}`;
    entries.push({
      id: `formula-${slug(name)}`,
      title: name,
      category: "Formulae",
      typeLabel: "Formula",
      levelLabel: name.includes("(Lesser)") ? "Lesser" : "Known Formula",
      headingLabel: "Formula",
      traits: ["Formula"],
      summary: `WE4LAND knows the formula for ${name}.`,
      intro: `This formula appears in WE4LAND's current Pathbuilder formula list.`,
      source: "WE4LAND Level 3 20-08-2026.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Formula</dt><dd>${name}</dd></div><div class="stat-line"><dt>Known By</dt><dd>WE4LAND – PU373</dd></div></dl><p><a href="${searchUrl}" target="_blank" rel="noreferrer">Find this item on Archives of Nethys</a>.</p>`
    });
  });
})();
