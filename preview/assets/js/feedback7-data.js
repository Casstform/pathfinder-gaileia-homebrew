(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];
  const source = "Compendium-Items-25-8-26.json (Feedback 7 current source)";
  const tattooTransformationUrl = "https://2e.aonprd.com/Familiars.aspx?ID=72&Abilities=true";

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function updateEntry(id, changes) {
    const entry = findEntry(id);
    if (entry) Object.assign(entry, changes);
  }

  updateEntry("flare-pistol", {
    source,
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Damage</dt><dd>3 fire</dd></div>
        <div class="stat-line"><dt>Ammunition</dt><dd><a href="#entry/flare-cartridge">Flare Cartridge</a></dd></div>
        <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
        <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
        <div class="stat-line"><dt>Range</dt><dd>60 feet</dd></div>
        <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
      </dl>
      <p>This short, broad-barrelled pistol uses a spring-loaded firing pin and a small black-powder charge to launch signal flares. Its brightly painted grip and unusually wide muzzle distinguish it from a conventional firearm.</p>
      <p>A flare pistol can load only flare cartridges. It can't fire ordinary firearm ammunition, and flare cartridges can't be fired from other weapons. Because it is intended as emergency equipment, the pistol lacks the fatal and concussive traits common to many firearms. Its Strikes deal nonlethal fire damage.</p>
      <section class="rules-subcard">
        <h3>Signal Shot <span class="action-icon" aria-label="one action">◆</span></h3>
        <p><strong>Manipulate</strong></p>
        <p><strong>Requirements</strong> You are wielding a loaded flare pistol containing a primed flare cartridge.</p>
        <p>Fire the flare toward an unoccupied point in the air within 120 feet to which you have line of effect. No attack roll is required. The flare ignites there, shedding bright light in a 20-foot radius and dim light for another 20 feet for 1 minute. An airborne flare falls 10 feet at the end of each of your turns.</p>
        <p>Creatures adjacent to the flare must succeed at a DC 15 Fortitude save or become dazzled until they are no longer adjacent to it. In clear conditions at night, the flare is readily visible at a great distance; the GM determines how weather, daylight, terrain, buildings, and other obstructions affect its visibility.</p>
        <h4>Firing at a Creature</h4>
        <p>You can instead make a normal Strike with the flare pistol.</p>
        <ul>
          <li><strong>Critical Success or Success</strong> The target takes the flare pistol's damage. The flare lands in an unoccupied space adjacent to the target chosen by you and ignites.</li>
          <li><strong>Failure</strong> The target takes no damage. The GM places the flare in an unoccupied space within 10 feet of the target, after which it ignites.</li>
          <li><strong>Critical Failure</strong> The target takes no damage. The GM places the flare in an unoccupied space within 20 feet of the target, after which it ignites.</li>
        </ul>
        <p>A creature struck by the flare is considered adjacent to it when it first ignites and must attempt the Fortitude save normally.</p>
      </section>
    `
  });

  updateEntry("rebels-revolver-restored", { source });
  updateEntry("rebels-revolver-damaged", { source });
  updateEntry("tiger-stance-razor-claws", { source });

  updateEntry("enregalia-vetericus-encyclopedia-volume-mdccxiii", {
    source,
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>10 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
        <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
      </dl>
      <p>This book winds into elaborate and near-excessive detail on a very particular flora or fauna colloquially named “Karen,” depending on the volume number.</p>
      <blockquote class="flavour-quote"><p>“Karen, you really shouldn't have f***** with me.”</p><footer>— Front dedication</footer></blockquote>
      <section class="rules-subcard">
        <h3>Read <span class="action-icon" aria-label="one action">◆</span></h3>
        <p><strong>Interact</strong></p>
        <p>Read the book to extract details about a flora or fauna of common or uncommon rarity.</p>
      </section>
    `
  });

  updateEntry("itchy-scale", {
    traits: ["Uncommon", "Consumable", "Magical", "Transmutation"],
    source,
    intro: "This dark, iridescent scale is about the size of a small coin. Swallowing it causes large gills to grow along your neck.",
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>5 gp</dd></div>
        <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
        <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Interact</dd></div>
      </dl>
      <p>When you swallow the scale, you immediately grow large gills along your neck. For 1 hour, you can hold your breath for 15 rounds plus your Constitution modifier instead of 5 rounds plus your Constitution modifier before drowning.</p>
      <p>The scale has no effect in non-aquatic environments that require you to hold your breath. After 1 hour, the gills wither and fall away.</p>
    `
  });

  updateEntry("walking-cauldron", {
    title: "Stu the Walking Cauldron",
    traits: ["Invested", "Magical"],
    summary: "An adorable, self-propelled cauldron that follows its owner and serves as a tool for crafting liquids.",
    intro: "This adorable cauldron has chitinous legs sculpted onto a banded iron body.",
    source,
    contentHtml: `
      <dl class="stat-block">
        <div class="stat-line"><dt>Price</dt><dd>12 gp</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>4</dd></div>
        <div class="stat-line"><dt>Speed</dt><dd>25 feet</dd></div>
        <div class="stat-line"><dt>Capacity</dt><dd>Up to 3 Bulk</dd></div>
        <div class="stat-line"><dt>Crafting</dt><dd>Suitable tool for potions, oils, and other liquids</dd></div>
      </dl>
      <section class="rules-subcard">
        <h3>Command <span class="action-icon" aria-label="one action">◆</span></h3>
        <p><strong>Auditory, Concentrate</strong></p>
        <p>Command the cauldron to follow you or stand in place. While following, it does its best to remain within 30 feet, but its ungainly movements are too imprecise to direct predictably during combat or another situation where seconds and exact locations matter.</p>
        <p>It can carry up to 3 Bulk inside itself while following you. If overloaded, or if you place anything else inside it, it stubbornly refuses to move until at least 10 minutes after you remove the excess.</p>
      </section>
    `
  });

  entries.push(
    {
      id: "tiger-stance-claws",
      title: "Tiger Stance Claws",
      category: "Saraik",
      typeLabel: "Unarmed",
      levelLabel: "Unarmed Attack",
      headingLabel: "1d8 S",
      traits: ["Agile", "Finesse", "Nonlethal", "Unarmed"],
      summary: "Saraik's base Tiger Stance claws, which inflict persistent bleed damage on a damaging critical hit.",
      intro: "The unarmed claw attack granted by Tiger Stance.",
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d8 slashing</dd></div>
          <div class="stat-line"><dt>Proficiency</dt><dd>Unarmed Attacks</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Brawling</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
        </dl>
        <p>On a critical success, if the attack deals damage, the target takes 1d4 persistent bleed damage.</p>
      `
    },
    {
      id: "enregalia-vetericus-encyclopedia-volume-mccxxxiv",
      title: "Enregalia Vetericus' Encyclopedia; Volume MCCXXXIV",
      category: "Items",
      typeLabel: "Literature",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Uncommon"],
      summary: "An unusually detailed encyclopedia volume with a dedication to Taubed.",
      intro: "A dense reference work whose elaborate detail approaches the excessive.",
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>10 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        </dl>
        <p>This book winds into elaborate and near-excessive detail on a very particular flora or fauna, depending on the volume number.</p>
        <blockquote class="flavour-quote"><p>“Taubed: friend, coworker, hazard to doorways and low bridges.”</p><footer>— Front dedication</footer></blockquote>
      `
    },
    {
      id: "enregalia-vetericus-encyclopedia-volume-mmmmcccxxi",
      title: "Enregalia Vetericus' Encyclopedia; Volume MMMMCCCXXI",
      category: "Items",
      typeLabel: "Literature",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Uncommon"],
      summary: "An unusually detailed encyclopedia volume with a grim dedication to the author's parents.",
      intro: "A dense reference work whose elaborate detail approaches the excessive.",
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>10 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
        </dl>
        <p>This book winds into elaborate and near-excessive detail on a very particular flora or fauna, depending on the volume number.</p>
        <blockquote class="flavour-quote"><p>“Thank you to my parents for showing me what true monsters look like.”</p><footer>— Front dedication</footer></blockquote>
        <section class="rules-subcard">
          <h3>Read <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Interact</strong></p>
          <p>Read the book to extract details about a flora or fauna of common or uncommon rarity.</p>
        </section>
      `
    },
    {
      id: "necklace-of-knives",
      title: "Necklace of Knives",
      category: "Items",
      typeLabel: "Attuned",
      levelLabel: "Item 2",
      headingLabel: "Item 2",
      traits: ["Conjuration", "Invested", "Magical"],
      summary: "An invested necklace whose miniature ornaments grow into usable daggers when plucked.",
      intro: "Decorative miniature knives of stone, wood, metal, and bone hang from this necklace.",
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>25 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Worn</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Interact</dd></div>
        </dl>
        <section class="rules-subcard"><h3>Attunement Requirement</h3><p>You must create a dagger to add to the necklace.</p></section>
        <p>You pluck a miniature knife from the necklace, and it grows into a normal dagger for as long as you hold it. One round after it leaves your hand, it shrinks back and returns to the necklace.</p>
      `
    },
    {
      id: "pompous-mask",
      title: "Pompous Mask",
      category: "Items",
      typeLabel: "Attuned",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Uncommon", "Invested", "Magical", "Necromancy"],
      summary: "A death-attuned mask that can avert a recovery check when its wearer is close to death.",
      intro: "A patchwork leather mask with glassy eye discs and a crude ironwork beak.",
      source,
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>5 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Worn mask</dd></div>
        </dl>
        <section class="rules-subcard"><h3>Attunement Requirement</h3><p>You must witness death while wearing the mask.</p></section>
        <p>If you begin your turn with a dying value of 3 or greater, instead of making your recovery check, you lose the dying condition but remain unconscious at 0 Hit Points.</p>
        <p>This ruins the mask, and you're immune to this particular effect for 1 year.</p>
      `
    }
  );

  const ritsaFamiliars = findEntry("ritsa-familiars");
  if (ritsaFamiliars) {
    ritsaFamiliars.summary = "Every familiar Ritsa manifests must carry Tattoo Transformation as one of its innate abilities.";
    ritsaFamiliars.intro = "A persistent rule for Ritsa's apparition familiars, using the specific tattoo-form familiar ability.";
    ritsaFamiliars.source = `${ritsaFamiliars.source}; Feedback 7`;
    ritsaFamiliars.contentHtml = `
      <h2>Required Ability</h2>
      <p>No matter the familiar's form or type, one of its innate abilities must be <a href="${tattooTransformationUrl}" target="_blank" rel="noreferrer">Tattoo Transformation</a>.</p>
      <p>If the familiar already has one or more natural innate abilities, Ritsa can replace one of those abilities with Tattoo Transformation. The familiar can become a tattoo carried on Ritsa's body; changing between familiar and tattoo takes 1 minute and has the concentrate trait.</p>
    `;
  }

  if (window.GAILEIA_RULE_LINKS && typeof window.GAILEIA_RULE_LINKS === "object") {
    delete window.GAILEIA_RULE_LINKS["Absorb Familiar"];
    window.GAILEIA_RULE_LINKS["Tattoo Transformation"] = tattooTransformationUrl;
  }

  if (window.GAILEIA_TRAIT_URLS && typeof window.GAILEIA_TRAIT_URLS === "object") {
    window.GAILEIA_TRAIT_URLS.conjuration = "https://2e.aonprd.com/Traits.aspx?ID=33";
    window.GAILEIA_TRAIT_URLS.transmutation = "https://2e.aonprd.com/Traits.aspx?ID=157";
  }

  if (window.GAILEIA_FORMULA_FILTERS) {
    window.GAILEIA_FORMULA_FILTERS.matches = function matches(entry, selectedFilters) {
      if (entry.category !== "Formulae") return true;
      const filters = selectedFilters instanceof Set
        ? [...selectedFilters]
        : Array.isArray(selectedFilters)
          ? selectedFilters
          : selectedFilters && selectedFilters !== "all"
            ? [selectedFilters]
            : [];
      if (filters.length === 0 || filters.includes("all")) return true;

      const methodFilters = filters.filter((filter) => filter === "advanced" || filter === "regular");
      const ownerFilters = filters.filter((filter) => filter === "ritsa" || filter === "we4land");
      const methodMatches = methodFilters.length === 0 || methodFilters.some((filter) =>
        filter === "advanced" ? Boolean(entry.advancedAlchemy) : Boolean(entry.regularCrafting)
      );
      const ownerMatches = ownerFilters.length === 0 || ownerFilters.some((filter) =>
        Array.isArray(entry.formulaOwners) && entry.formulaOwners.some(
          (owner) => owner.toLocaleLowerCase() === filter
        )
      );
      return methodMatches && ownerMatches;
    };
  }
})();
