(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];

  window.HOMEBREW_CATEGORIES = [
    "All",
    "Animist",
    "Fauna/Flora",
    "House Rules",
    "Items",
    "Language",
    "Maps",
    "Oziza",
    "Ritsa",
    "Sara",
    "Spells",
    "Subsystems",
    "WE4LAND"
  ];

  function updateEntry(id, changes) {
    const entry = entries.find((candidate) => candidate.id === id);
    if (entry) Object.assign(entry, changes);
  }

  entries.forEach((entry) => {
    if (entry.category === "Apparitions") entry.category = "Animist";
    if (entry.category === "Creatures") entry.category = "Fauna/Flora";
  });

  updateEntry("alternate-chase-rules", { category: "Subsystems" });
  updateEntry("camp-meal-and-cooking-rules", { category: "Subsystems" });
  updateEntry("campaign-house-rules", { category: "House Rules" });
  updateEntry("we4land-venting-and-submersion", { category: "WE4LAND" });

  updateEntry("tiger-stance-razor-claws", {
    traits: ["Agile", "Finesse", "Nonlethal", "Unarmed", "Versatile (P)", "3rd Party"],
    source: "Pathbuilder-GM-Backup-8-8-26.json (current source)",
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Damage</dt><dd>1d8 slashing</dd></div>
        <div class="stat-line"><dt>Proficiency</dt><dd>Unarmed Attacks</dd></div>
        <div class="stat-line"><dt>Group</dt><dd>Brawling</dd></div>
        <div class="stat-line"><dt>Hands</dt><dd>1+</dd></div>
      </dl>
      <p>On a critical success with your tiger claws, if you deal damage, the target takes 1d4 persistent bleed damage.</p>
    `
  });

  updateEntry("rebels-revolver", {
    title: "Rebel's Revolver",
    traits: ["Concealable", "Fatal d10", "Capacity 5", "Rare", "Concussive", "3rd Party"],
    summary: "A concealable five-chambered revolver with a long effective range and a lethal critical profile.",
    intro: "A rare five-chambered revolver designed for concealment without sacrificing range.",
    source: "Pathbuilder-GM-Backup-8-8-26.json (current source)",
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Damage</dt><dd>1d6 piercing</dd></div>
        <div class="stat-line"><dt>Ammunition</dt><dd>Revolver cartridge</dd></div>
        <div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div>
        <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
        <div class="stat-line"><dt>Price</dt><dd>15 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
        <div class="stat-line"><dt>Range</dt><dd>80 feet</dd></div>
        <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
      </dl>
    `
  });

  updateEntry("rebels-revolver-damaged", {
    traits: ["Concealable", "Capacity 5", "Fatal d8", "Rare", "3rd Party"],
    source: "Pathbuilder-GM-Backup-8-8-26.json (current source); earlier damaged-revolver card",
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Damage</dt><dd>1d4 piercing</dd></div>
        <div class="stat-line"><dt>Ammunition</dt><dd>Revolver cartridge</dd></div>
        <div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div>
        <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
        <div class="stat-line"><dt>Price</dt><dd>15 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
        <div class="stat-line"><dt>Range</dt><dd>30 feet</dd></div>
        <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
      </dl>
    `
  });

  updateEntry("vitae-petal-tea-leaves", {
    traits: ["Alchemical", "Consumable", "Healing", "Potion", "Rare", "Vitality"],
    intro: "Deep red-burgundy tea leaves with notes of sweet rot, brown musk, and a slight trace of sweaty metal.",
    source: "Pathbuilder-GM-Backup-8-8-26.json (current source)",
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>6 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Manipulate</dd></div>
      </dl>
      <p>Steep the petals for 10 minutes to produce a restorative tea. When consumed, the imbiber regains 1d8 Hit Points.</p>
      <p>The leaves last from six months to two years in a dark, dry place but lose their potency after brewing. They can be steeped a second time to produce a weaker tea that restores 1d4 Hit Points.</p>
      <p><em>Best before Neeber 31st. Keep dry until use for best effect.</em></p>
    `
  });

  entries.push(
    {
      id: "automatons-flamethrower",
      title: "Automaton's Flamethrower",
      category: "Items",
      typeLabel: "Alchemical Firearm",
      levelLabel: "Item 3",
      headingLabel: "Item 3",
      traits: ["Alchemical", "Fire", "Rare", "Unwieldy", "Versatile (Cone)", "3rd Party"],
      summary: "A configurable line-or-cone projector powered by paired vials of alchemist's fire.",
      intro: "A one-handed flamethrower whose two alchemical sockets feed a switchable line or cone nozzle.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Ammunition</dt><dd>Two vials of alchemist's fire</dd></div>
          <div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>35 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
        </dl>
        <p>Loading two vials, cleaning the tubes, and priming the system takes 1 minute. With an Interact action, you can switch the nozzle between line and cone. The weaker of the two loaded alchemist's fires determines the effect.</p>
        <section class="rules-subcard">
          <h3>Fire Flamethrower <span class="action-icon" aria-label="two actions">◆◆</span></h3>
          <p><strong>Fire, Manipulate</strong></p>
          <p><strong>Requirements</strong> The flamethrower is loaded.</p>
          <p>You expend both loaded vials. Each creature in the area attempts the listed basic Reflex save. A creature that critically fails also takes the listed persistent fire damage instead of the Firearm Specialization critical effect.</p>
          <div class="table-wrap"><table><thead><tr><th>Alchemist's Fire</th><th>Damage</th><th>Save</th><th>Area</th><th>Persistent</th></tr></thead><tbody>
            <tr><td>Lesser</td><td>1d8 fire</td><td>DC 15</td><td>15-foot line or 10-foot cone</td><td>1 fire</td></tr>
            <tr><td>Moderate</td><td>2d8 fire</td><td>DC 17</td><td>30-foot line or 15-foot cone</td><td>2 fire</td></tr>
            <tr><td>Greater</td><td>6d8 fire</td><td>DC 28</td><td>45-foot line or 20-foot cone</td><td>3 fire</td></tr>
            <tr><td>Major</td><td>10d8 fire</td><td>DC 37</td><td>60-foot line or 20-foot cone</td><td>4 fire</td></tr>
          </tbody></table></div>
        </section>
      `
    },
    {
      id: "flare-pistol",
      title: "Flare Pistol",
      category: "Items",
      typeLabel: "Firearm",
      levelLabel: "Item 1",
      headingLabel: "3 Fire",
      traits: ["Nonlethal", "Rare", "3rd Party"],
      summary: "An emergency signal pistol that launches illuminating flares instead of conventional ammunition.",
      intro: "A short, broad-barrelled pistol with a brightly painted grip and an unusually wide muzzle.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>3 fire</dd></div>
          <div class="stat-line"><dt>Ammunition</dt><dd>Flare cartridge</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>60 feet</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
        </dl>
        <p>A flare pistol accepts only flare cartridges. Its Strikes deal nonlethal fire damage and it lacks the fatal and concussive traits common to conventional firearms.</p>
        <section class="rules-subcard">
          <h3>Signal Shot <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Manipulate</strong></p>
          <p><strong>Requirements</strong> You wield a loaded flare pistol containing a primed flare cartridge.</p>
          <p>Fire at an unoccupied point in the air within 120 feet to which you have line of effect. The flare sheds bright light in a 20-foot radius and dim light for another 20 feet for 1 minute. An airborne flare falls 10 feet at the end of each of your turns. Adjacent creatures must succeed at a DC 15 Fortitude save or become dazzled until no longer adjacent.</p>
          <p>You can instead make a normal Strike. On a hit, the flare ignites adjacent to the target. On a failure, the GM places it within 10 feet of the target; on a critical failure, within 20 feet.</p>
        </section>
      `
    },
    {
      id: "galvanic-derringer",
      title: "Galvanic Derringer",
      category: "Items",
      typeLabel: "Alchemical Firearm",
      levelLabel: "Item 2",
      headingLabel: "1d4 Electricity",
      traits: ["Alchemical", "Concealable", "Electricity", "Rare", "Repeating", "3rd Party"],
      summary: "A two-charge electrical derringer that arcs into nearby creatures and leaves its first target exposed.",
      intro: "A concealable firearm whose magazine consumes a vial of bottled lightning to hold two electrical charges.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d4 electricity</dd></div>
          <div class="stat-line"><dt>Magazine</dt><dd>2 charges from any grade of bottled lightning</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>25 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>0</dd></div>
        </dl>
        <p>Installing bottled lightning consumes it and supplies two charges. A charge is expended whenever you Strike, whether or not the Strike hits.</p>
        <section class="rules-subcard"><h3>Arc</h3><p>When you hit, electricity arcs to the two closest creatures within 10 feet of the target. If your attack roll also succeeds against a secondary creature's AC, it takes electricity damage equal to the number of weapon damage dice rolled against the first target.</p></section>
        <section class="rules-subcard"><h3>Shock and Awe</h3><p>The first creature you successfully Strike after loading new bottled lightning is off-guard until the start of your next turn.</p></section>
      `
    },
    {
      id: "rebels-revolver-restored",
      title: "Rebel's Revolver, Restored",
      category: "Items",
      typeLabel: "Firearm",
      levelLabel: "Item 2",
      headingLabel: "1d6 P",
      traits: ["Capacity 4", "Concussive", "Fatal d10", "Rare", "3rd Party"],
      summary: "The restored four-chamber configuration of the Rebel's Revolver.",
      intro: "A fully restored, four-chambered version of the rare brass revolver.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d6 piercing</dd></div>
          <div class="stat-line"><dt>Ammunition</dt><dd>Revolver cartridge</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>20 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>80 feet</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
        </dl>
      `
    },
    {
      id: "seeker-rifle",
      title: "Seeker Rifle",
      category: "Items",
      typeLabel: "Firearm",
      levelLabel: "Item 2",
      headingLabel: "Item 2",
      traits: ["Concussive", "Fatal d12", "Kickback", "Rare", "Volley 30 ft.", "3rd Party"],
      summary: "A long, hard-kicking rifle built for exceptional range and steadied use.",
      intro: "A long rifle whose barrel and ferocious kick make it unsteady without a tripod or other support.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>Not specified in the current Pathbuilder source</dd></div>
          <div class="stat-line"><dt>Ammunition</dt><dd>Firearm ammunition (10 rounds)</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>8 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>2</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>2</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>150 feet</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
        </dl>
      `
    },
    {
      id: "bucket",
      title: "Bucket",
      category: "Items",
      typeLabel: "Adventuring Gear",
      levelLabel: "Item —",
      headingLabel: "Equipment",
      traits: ["3rd Party"],
      summary: "A rope-handled container capable of carrying several litres of liquid.",
      intro: "A typical utility bucket fitted with a rope handle.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Price</dt><dd>5 sp</dd></div><div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div><div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div><div class="stat-line"><dt>Capacity</dt><dd>4–8 litres of liquid</dd></div></dl>`
    },
    {
      id: "enregalia-vetericus-encyclopedia-volume-mdccxiii",
      title: "Enregalia Vetericus' Encyclopedia; Volume MDCCXIII",
      category: "Items",
      typeLabel: "Book",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Uncommon", "3rd Party"],
      summary: "An extraordinarily specific encyclopedia volume devoted to a particular plant or animal.",
      intro: "A dense reference work whose elaborate detail approaches the excessive.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Price</dt><dd>10 gp</dd></div><div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div><div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div></dl><p>This volume winds into elaborate detail on a particular flora or fauna, depending on its volume number.</p><p><em>A dedication honors Taubed: friend, coworker, hazard to doorways and low bridges.</em></p>`
    },
    {
      id: "flare-cartridge",
      title: "Flare Cartridge",
      category: "Items",
      typeLabel: "Alchemical Ammunition",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Alchemical", "Consumable", "Fire", "Rare"],
      summary: "Specialized ammunition that must be primed immediately before use in a flare pistol.",
      intro: "A signal flare cartridge made exclusively for the broad barrel of a flare pistol.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Price</dt><dd>4 gp</dd></div><div class="stat-line"><dt>Usage</dt><dd>Loaded in a flare pistol</dd></div></dl><section class="rules-subcard"><h3>Prime <span class="action-icon" aria-label="one action">◆</span></h3><p><strong>Interact</strong></p><p>Prime a cartridge you hold or one loaded in a flare pistol. You must fire it before the end of your turn. Otherwise, it becomes unprimed but is not consumed. A fired primed cartridge is consumed and ignites after reaching its destination.</p></section>`
    },
    {
      id: "mystery-scale",
      title: "Mystery Scale",
      category: "Items",
      typeLabel: "Unidentified Alchemical Item",
      levelLabel: "Item —",
      headingLabel: "Unidentified",
      traits: ["Alchemical"],
      summary: "A scale reputed to help its user breathe underwater.",
      intro: "A mysterious scale sold with the claim that it helps its bearer breathe underwater.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Price</dt><dd>5 gp</dd></div><div class="stat-line"><dt>Usage</dt><dd>Swallowed</dd></div></dl><p>The current Pathbuilder record provides no further confirmed mechanics.</p>`
    },
    {
      id: "mystery-white-balm",
      title: "Mystery White Balm",
      category: "Items",
      typeLabel: "Unidentified Oil",
      levelLabel: "Item —",
      headingLabel: "Unidentified",
      traits: ["Oil"],
      summary: "An unidentified white balm with a strong scent of herbs and pine resin.",
      intro: "A pale balm smelling strongly of herbs and pine resin.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div><div class="stat-line"><dt>Usage</dt><dd>Held in 2 hands</dd></div></dl><p>The current Pathbuilder record provides no further confirmed mechanics.</p>`
    },
    {
      id: "tourist-brochure-gaius-city",
      title: "Tourist Brochure: Gaius City",
      category: "Items",
      typeLabel: "Map & Guide",
      levelLabel: "Item —",
      headingLabel: "Equipment",
      traits: ["3rd Party"],
      summary: "A tourist map and guide to the notable cultural sites of Gaius City.",
      intro: "A tri-fold brochure depicting an artist's aerial view of Gaius City.",
      source: "Pathbuilder-GM-Backup-8-8-26.json",
      contentHtml: `<dl class="stat-block"><div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div></dl><p>The map marks local cultural points for visitors in a sidebar beside the illustrated city view.</p>`
    },
    {
      id: "goblish-translator",
      title: "Goblish Translator",
      category: "Language",
      typeLabel: "Language Tool",
      levelLabel: "External Site",
      headingLabel: "Goblish",
      traits: ["Goblin", "Language", "Translator"],
      summary: "Translate phrases into Gaileia's consistent, Simlish-inspired Goblish language.",
      intro: "A companion language tool for producing repeatable Goblish translations.",
      source: "Casstform/goblish-translator",
      externalUrl: "https://casstform.github.io/goblish-translator/",
      externalLabel: "Open translator",
      pcAccessible: true,
      contentHtml: `<p>Open the companion translator to convert phrases into Gaileia's consistent, Simlish-inspired Goblish language.</p>`
    },
    {
      id: "gaileia-world-map",
      title: "Gaileia",
      category: "Maps",
      typeLabel: "World Map",
      levelLabel: "External Site",
      headingLabel: "Gaileia",
      traits: ["Gaileia", "Map", "World"],
      summary: "Explore the interactive world map of Gaileia and its campaign geography.",
      intro: "A companion map for exploring the world of Gaileia.",
      source: "Casstform/World-Map-of-Gaileia",
      externalUrl: "https://casstform.github.io/World-Map-of-Gaileia/",
      externalLabel: "Open map",
      pcAccessible: true,
      contentHtml: `<p>Open the companion world map to explore Gaileia and its campaign geography.</p>`
    }
  );
})();
