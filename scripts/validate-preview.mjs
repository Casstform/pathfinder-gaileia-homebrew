import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const buildCheck = spawnSync(process.execPath, ["scripts/build-preview-data.mjs", "--check"], {
  encoding: "utf8"
});
assert.equal(buildCheck.status, 0, buildCheck.stderr || buildCheck.stdout);

const context = { window: {}, console };
vm.createContext(context);

for (const file of ["preview/assets/js/catalogue-data.js"]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const entries = context.window.HOMEBREW_ENTRIES;
const categories = context.window.HOMEBREW_CATEGORIES;
const advancedAlchemy = context.window.GAILEIA_ADVANCED_ALCHEMY;
const formulaFilters = context.window.GAILEIA_FORMULA_FILTERS;
const rulesLinks = context.window.GAILEIA_RULE_LINKS;
const traitLinks = context.window.GAILEIA_TRAIT_URLS;
const collectionsConfig = context.window.GAILEIA_COLLECTIONS_CONFIG;
const categorySymbols = context.window.GAILEIA_CATEGORY_SYMBOLS;
const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
const ids = entries.map((entry) => entry.id);

assert.equal(entries.length, 82, "expected 82 catalogue entries after Feedback 8");
assert.equal(new Set(ids).size, ids.length, "entry IDs must be unique");
assert.equal(categories.length - 1, 14, "expected 14 collections");
assert.equal(collectionsConfig.schemaVersion, 1);
assert.equal(Object.keys(categorySymbols).length, 14);
assert.equal(advancedAlchemy.defaultLevel, 3);
assert.equal(advancedAlchemy.slotsForLevel(1), 5);
assert.equal(advancedAlchemy.slotsForLevel(3), 6);
assert.equal(advancedAlchemy.slotsForLevel(20), 14);
assert.deepEqual(
  Array.from(categories),
  [
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
  ],
  "collections must be alphabetized"
);

for (const removedId of [
  "healing-potion-custom",
  "mystery-scale",
  "mystery-white-balm",
  "rebels-revolver",
  "wand-of-allfood",
  "wand-of-shielded-arm"
]) {
  assert.ok(!byId[removedId], `${removedId} should be deleted`);
}

for (const entry of entries) {
  assert.ok(entry.title && entry.category && entry.typeLabel, `${entry.id} is missing required metadata`);
  assert.ok(categories.includes(entry.category), `${entry.id} uses unknown collection ${entry.category}`);
  assert.ok(!entry.traits.includes("3rd Party"), `${entry.id} still has the 3rd Party trait`);
  assert.ok(!entry.traits.includes("House Rule"), `${entry.id} still has the House Rule trait`);
  for (const match of entry.contentHtml.matchAll(/href="#entry\/([^"]+)"/g)) {
    assert.ok(byId[match[1]], `${entry.id} links to missing entry ${match[1]}`);
  }
  if (entry.externalUrl) assert.match(entry.externalUrl, /^https:\/\//, `${entry.id} needs an HTTPS external URL`);
}

assert.ok(rulesLinks && typeof rulesLinks === "object", "rules-term link map must be present");
for (const [term, url] of Object.entries(rulesLinks)) {
  assert.ok(term.length > 2, "rules-term link labels must be useful");
  assert.match(url, /^https:\/\/2e\.aonprd\.com\//, `${term} must use Archives of Nethys`);
}

const formulae = entries.filter((entry) => entry.category === "Formulae");
const advancedFormulae = formulae.filter((entry) => entry.advancedAlchemy);
const regularFormulae = formulae.filter((entry) => entry.regularCrafting);

assert.equal(formulae.length, 22, "expected twenty-two formulae after Feedback 9");
assert.equal(advancedFormulae.length, 4, "expected four Advanced Alchemy formulae");
assert.equal(regularFormulae.length, 18, "expected eighteen regular crafting formulae");
assert.equal(entries.filter((entry) => entry.typeLabel === "Character").length, 4);
assert.equal(byId["translate-chip"].headingLabel, "Focus 2");
assert.equal(byId["universal-directive"].headingLabel, "Focus 1");
assert.equal(byId["tiger-stance-razor-claws"].category, "Saraik");
assert.equal(byId["yellow-bullet"].title, "Citrine Bullet");
assert.match(byId["yellow-bullet"].contentHtml, /<dt>Price<\/dt><dd>3 gp<\/dd>/);
assert.match(byId["bull-et"].contentHtml, /transformed the projectile into a life-sized bison/);
assert.match(byId["seam-coil-bullet"].contentHtml, /split into two, with an arc of electricity/);
assert.match(byId["echoes-of-a-signal"].contentHtml, /href="#save-point-spell">save point<\/a>/);
assert.doesNotMatch(byId["echoes-of-a-signal"].contentHtml, /final selected version/i);
assert.match(byId["seeker-rifle"].contentHtml, /1d8 bludgeoning/);
assert.match(byId["rebels-revolver-restored"].contentHtml, /Martial Weapons/);
assert.match(byId["we4land-venting-and-submersion"].contentHtml, /Conditions\.aspx\?ID=92/);

assert.match(byId["antler-ammunition"].contentHtml, /<dt>Price<\/dt><dd>7 gp<\/dd>/);
assert.match(byId["antler-ammunition"].contentHtml, /<dt>Ammunition<\/dt><dd>Arrows and bolts<\/dd>/);
assert.match(byId["antler-ammunition"].contentHtml, /<dt>Bulk<\/dt><dd>—<\/dd>/);
assert.match(byId.cryomister.contentHtml, /<dt>Price<\/dt><dd>3 gp<\/dd>/);
assert.match(byId["demortification-oil"].contentHtml, /<dt>Price<\/dt><dd>25 gp<\/dd>/);
assert.match(byId["galvanic-derringer"].contentHtml, /<dt>Range<\/dt><dd>30 feet<\/dd>/);
assert.match(byId["life-boosting-oil"].contentHtml, /<dt>Price<\/dt><dd>12 gp<\/dd>/);
assert.ok(byId["life-boosting-oil"].traits.includes("Alchemical"));
assert.ok(!byId["life-boosting-oil"].traits.includes("Magical"));
assert.match(
  byId["house-rules-players"].contentHtml,
  /property-rune capacity equals the wielder’s current ABP attack-potency value/
);
assert.match(byId["house-rules-players"].contentHtml, /consume no property-rune slots/);
assert.match(byId["house-rules-gms"].contentHtml, /consume no property-rune slots/);
assert.doesNotMatch(byId["house-rules-players"].contentHtml, /Until a final campaign conversion is adopted/);

for (const entry of advancedFormulae) {
  assert.deepEqual(Array.from(entry.cardBadges), ["Advanced Alchemy"]);
  assert.deepEqual(Array.from(entry.formulaOwners), ["WE4LAND"]);
  assert.match(entry.contentHtml, /Equipment\.aspx\?ID=1897/);
  assert.match(entry.contentHtml, /4 ammunition rounds/);
  assert.match(entry.contentHtml, /expires after 24 hours/);
  assert.match(entry.contentHtml, /data-we4land-level/);
}

for (const entry of regularFormulae) {
  assert.deepEqual(Array.from(entry.cardBadges), ["Regular Crafting"]);
  assert.match(entry.contentHtml, /requires <strong>1 day<\/strong>, a workshop/);
  assert.match(entry.contentHtml, /Critical Failure/);
  assert.match(entry.contentHtml, /Critical Success/);
  assert.match(entry.contentHtml, /10% of (?:Initial|Item) Cost/);
}

const expectedCrafting = {
  "formula-quicksilver-mutagen-lesser": [13, 2, 2, 0.2],
  "formula-dread-ampoule-lesser": [13, 1.5, 1.5, 0.15],
  "formula-glue-bomb-lesser": [13, 1.5, 1.5, 0.15],
  "formula-smoke-ball-lesser": [13, 1.5, 1.5, 0.15],
  "formula-non-lethal-ammunition": [13, 1.5, 1.5, 0.15],
  "formula-antler-ammunition": [16, 3.5, 3.5, 0.35],
  "formula-creepy-crawly-crock": [13, 5, 5, 1],
  "formula-flamethrower": [23, 18, 18, 3.5],
  "formula-flare-cartridge": [20, 2, 2, 0.4],
  "formula-flare-pistol": [20, 1.5, 1.5, 0.3],
  "formula-galvanic-derringer": [21, 12.5, 12.5, 2.5],
  "formula-rebels-revolver": [19, 10, 10, 2],
  "formula-seeker-rifle": [21, 4, 4, 0.8],
  "formula-inubrix-ammunition": [33, 25, 25, 5],
  "formula-alchemists-fire-lesser": [15, 1.5, 1.5, 0.3],
  "formula-bottled-lightning-lesser": [15, 1.5, 1.5, 0.3],
  "formula-silencer": [14, 0.05, 0.05, 0.01],
  "formula-earplugs": [12, 0.05, 0.05, 0.01]
};

for (const [id, [dc, initial, final, tenPercent]] of Object.entries(expectedCrafting)) {
  assert.equal(byId[id].crafting.dc, dc, `${id} has the wrong crafting DC`);
  assert.equal(byId[id].crafting.initial, initial, `${id} has the wrong initial cost`);
  assert.equal(byId[id].crafting.final, final, `${id} has the wrong final cost`);
  assert.equal(byId[id].crafting.tenPercent, tenPercent, `${id} has the wrong 10% cost`);
}

const expectedCraftingBreakdowns = {
  "formula-alchemists-fire-lesser": "15 (15 from item level)",
  "formula-antler-ammunition": "16 (16 from item level)",
  "formula-bottled-lightning-lesser": "15 (15 from item level)",
  "formula-creepy-crawly-crock": "13 (13 from item level)",
  "formula-dread-ampoule-lesser": "13 (13 from item level)",
  "formula-earplugs": "12 (14 from item level, -2 from previous crafting)",
  "formula-flamethrower": "23 (18 from item level, +5 from rare)",
  "formula-flare-cartridge": "20 (15 from item level, +5 from rare)",
  "formula-flare-pistol": "20 (15 from item level, +5 from rare)",
  "formula-galvanic-derringer": "21 (16 from item level, +5 from rare)",
  "formula-glue-bomb-lesser": "13 (15 from item level, -2 from previous crafting)",
  "formula-inubrix-ammunition": "33 (28 from item level, +5 from rare)",
  "formula-non-lethal-ammunition": "13 (15 from item level, -2 from previous crafting)",
  "formula-quicksilver-mutagen-lesser": "13 (15 from item level, -2 from previous crafting)",
  "formula-rebels-revolver": "19 (16 from item level, +5 from rare, -2 from previous crafting)",
  "formula-seeker-rifle": "21 (16 from item level, +5 from rare)",
  "formula-silencer": "14 (14 from item level, +2 from uncommon, -2 from previous crafting)",
  "formula-smoke-ball-lesser": "13 (15 from item level, -2 from previous crafting)"
};

for (const [id, dcText] of Object.entries(expectedCraftingBreakdowns)) {
  assert.ok(
    byId[id].contentHtml.includes(`<dt>Crafting DC</dt><dd>${dcText}</dd>`),
    `${id} is missing its Crafting DC breakdown`
  );
}

assert.match(byId["formula-antler-ammunition"].contentHtml, /#entry\/antler-ammunition/);
assert.match(byId["formula-non-lethal-ammunition"].contentHtml, /#entry\/non-lethal-ammunition/);

const formulaArchiveLinks = {
  "formula-dread-ampoule-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3292",
  "formula-glue-bomb-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3295",
  "formula-quicksilver-mutagen-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3319",
  "formula-smoke-ball-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3360",
  "formula-alchemists-fire-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3287",
  "formula-bottled-lightning-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3290",
  "formula-silencer": "https://2e.aonprd.com/Equipment.aspx?ID=1206",
  "formula-earplugs": "https://2e.aonprd.com/Equipment.aspx?ID=1203"
};

for (const [id, url] of Object.entries(formulaArchiveLinks)) {
  assert.match(byId[id].contentHtml, new RegExp(url.replace(/[.?]/g, "\\$&")), `${id} must use its direct Archives of Nethys link`);
  assert.doesNotMatch(byId[id].contentHtml, /Search\.aspx/, `${id} must not use a search link`);
}

const crock = byId["creepy-crawly-crock"];
assert.equal(crock.category, "Items");
assert.equal(crock.typeLabel, "Alchemy");
assert.equal(crock.levelLabel, "Item 1");
assert.deepEqual(Array.from(crock.traits), ["Alchemical", "Unique"]);
assert.match(crock.contentHtml, /<dt>Price<\/dt><dd>10 gp<\/dd>/);
assert.match(crock.contentHtml, /<dt>Bulk<\/dt><dd>L<\/dd>/);
assert.match(crock.contentHtml, /Held in 1 hand/);
assert.match(crock.contentHtml, /Feed the Culture/);
assert.match(crock.contentHtml, /one harmless Tiny insect/);
assert.match(crock.contentHtml, /dies harmlessly at the beginning of your next daily preparations/);

const crockFormula = byId["formula-creepy-crawly-crock"];
assert.deepEqual(Array.from(crockFormula.formulaOwners), ["Ritsa"]);
assert.match(crockFormula.contentHtml, /<dt>Known By<\/dt><dd>Ritsa<\/dd>/);
assert.match(crockFormula.contentHtml, /#entry\/creepy-crawly-crock/);

assert.equal(typeof formulaFilters.matches, "function");
const expectedFormulaFilterCounts = {
  all: 22,
  advanced: 4,
  regular: 18,
  ritsa: 1,
  we4land: 21
};
for (const [filter, count] of Object.entries(expectedFormulaFilterCounts)) {
  assert.equal(
    formulae.filter((entry) => formulaFilters.matches(entry, filter)).length,
    count,
    `${filter} Formulae filter has the wrong count`
  );
}

const expectedCombinedFormulaFilterCounts = [
  [["ritsa", "we4land"], 22],
  [["regular", "advanced"], 22],
  [["ritsa", "advanced"], 0],
  [["ritsa", "regular"], 1],
  [["we4land", "advanced"], 4],
  [["we4land", "regular"], 17],
  [["ritsa", "we4land", "advanced"], 4],
  [["ritsa", "we4land", "regular"], 18]
];
for (const [filters, count] of expectedCombinedFormulaFilterCounts) {
  assert.equal(
    formulae.filter((entry) => formulaFilters.matches(entry, filters)).length,
    count,
    `${filters.join(" + ")} Formulae filters must combine as a union`
  );
}

const expectedCharacterFeatCounts = {
  "oziza-character": 7,
  "ritsa-character": 9,
  "saraik-character": 10,
  "we4land-character": 8
};
let featTotal = 0;
for (const [id, count] of Object.entries(expectedCharacterFeatCounts)) {
  const character = byId[id];
  assert.equal(character.featSummaries.length, count, `${id} has the wrong number of feat summaries`);
  assert.match(character.contentHtml, /class="feat-summary-list/);
  for (const feat of character.featSummaries) {
    assert.match(feat.url, /^https:\/\/2e\.aonprd\.com\/(Feats|Heritages)\.aspx\?ID=\d+$/);
    assert.ok(feat.description.length >= 25, `${id}: ${feat.name} needs a useful description`);
    assert.match(character.contentHtml, new RegExp(`>${feat.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/a>`));
  }
  featTotal += character.featSummaries.length;
}
assert.equal(featTotal, 34, "expected 34 linked feat summaries across the four characters");

const expectedCharacterFeatures = {
  "oziza-character": ["Oziza Features", 8],
  "ritsa-character": ["Ritsa Features", 9],
  "saraik-character": ["Saraik Features", 8],
  "we4land-character": ["WE4LAND Features", 8]
};
for (const [id, [title, count]] of Object.entries(expectedCharacterFeatures)) {
  const character = byId[id];
  assert.equal(character.title, title);
  assert.equal(character.featureSummaries.length, count, `${id} has the wrong feature count`);
  assert.match(character.contentHtml, /<h2>Current Features<\/h2>/);
  assert.match(character.contentHtml, /<h2>Current Feats<\/h2>/);
  for (const feature of character.featureSummaries) {
    assert.match(feature.url, /^https:\/\/2e\.aonprd\.com\/(Ancestries|Classes|Mysteries|Practices|Ways)\.aspx\?ID=\d+$/);
    assert.ok(feature.description.length >= 25, `${id}: ${feature.name} needs a useful description`);
  }
}

assert.ok(byId["oziza-character"].featSummaries.some((feat) => feat.name === "Rehydration"));
assert.match(byId["oziza-character"].contentHtml, /Feats\.aspx\?ID=2312/);

assert.ok(!byId["campaign-house-rules"], "the retired Campaign House entry must be removed");
const houseRules = entries.filter((entry) => entry.category === "House Rules");
assert.equal(houseRules.length, 2, "House Rules must contain only the Player and GM entries");
assert.deepEqual(
  Array.from(houseRules, (entry) => entry.id).sort(),
  ["house-rules-gms", "house-rules-players"]
);
assert.equal(byId["house-rules-gms"].gmOnly, true, "the GM rules must be GM-only by default");
assert.equal((byId["house-rules-players"].contentHtml.match(/data-house-rule/g) || []).length, 21);
assert.equal((byId["house-rules-gms"].contentHtml.match(/data-house-rule/g) || []).length, 21);
assert.match(byId["house-rules-players"].contentHtml, /<h2 data-no-rule-link>Automatic Bonus Progression<\/h2>/);
assert.match(byId["house-rules-gms"].contentHtml, /<h2 data-no-rule-link>Automatic Bonus Progression<\/h2>/);
assert.match(byId["house-rules-gms"].contentHtml, /Four Aspects of a Soul/);
assert.match(byId["house-rules-gms"].contentHtml, /Revitalize/);
assert.match(byId["house-rules-gms"].contentHtml, /Rituals\.aspx\?ID=20/);
assert.match(byId["house-rules-players"].contentHtml, /Rules\.aspx\?ID=2741/);
assert.match(byId["house-rules-players"].contentHtml, /Skills\.aspx\?ID=49/);
assert.match(byId["house-rules-players"].contentHtml, /Skills\.aspx\?ID=37/);

assert.match(byId["ritsa-nature-for-medicine"].contentHtml, /Skills\.aspx\?ID=42/);
assert.match(byId["ritsa-nature-for-medicine"].contentHtml, /Feats\.aspx\?ID=760/);
assert.match(byId["ritsa-nature-for-medicine"].contentHtml, /Feats\.aspx\?ID=5234/);
assert.match(byId["ritsa-familiars"].contentHtml, /Familiars\.aspx\?ID=72&Abilities=true/);

const ozizaSpells = byId["oziza-spells"].contentHtml;
for (const spellId of [2075, 1498, 1554, 1585, 2345, 1493]) {
  assert.match(ozizaSpells, new RegExp(`Spells\\.aspx\\?ID=${spellId}`));
}
assert.match(ozizaSpells, /<td>Fire<\/td><td>Electricity<\/td>/);
assert.match(ozizaSpells, /<td>Spirit<\/td><td>Cold<\/td>/);
assert.match(byId["oziza-rehydration"].contentHtml, /Feats\.aspx\?ID=2312/);

assert.equal(byId["gaileian-calendar"].category, "Calendar");
assert.equal(
  byId["gaileian-calendar"].externalUrl,
  "https://app.fantasy-calendar.com/calendars/efd86919d920668ad5ca0f40f70c3031"
);
assert.equal(byId["gaileian-calendar"].pcAccessible, true);

const feedback7NewEntries = [
  "tiger-stance-claws",
  "enregalia-vetericus-encyclopedia-volume-mccxxxiv",
  "enregalia-vetericus-encyclopedia-volume-mmmmcccxxi",
  "necklace-of-knives",
  "pompous-mask"
];
for (const id of feedback7NewEntries) {
  assert.ok(byId[id], `Feedback 7 entry ${id} is missing`);
  assert.match(byId[id].source, /Compendium-Items-25-8-26\.json/);
}
assert.equal(entries.filter((entry) => entry.category === "Items").length, 29);
assert.equal(entries.filter((entry) => entry.category === "Oziza").length, 4);
assert.equal(entries.filter((entry) => entry.category === "Saraik").length, 3);
assert.equal(byId["tiger-stance-claws"].category, "Saraik");
assert.equal(byId["walking-cauldron"].title, "Stu the Walking Cauldron");
assert.match(byId["walking-cauldron"].contentHtml, /<dt>Bulk<\/dt><dd>4<\/dd>/);
assert.match(byId["walking-cauldron"].contentHtml, /<dt>Price<\/dt><dd>12 gp<\/dd>/);
assert.match(byId["flare-pistol"].contentHtml, /DC 15 Fortitude save/);
assert.match(byId["flare-pistol"].contentHtml, /Critical Failure/);
assert.match(byId["enregalia-vetericus-encyclopedia-volume-mdccxiii"].contentHtml, /Karen/);
assert.match(byId["itchy-scale"].contentHtml, /large gills along your neck/);

const finalCatalogueText = entries.map((entry) => [
  entry.title,
  entry.summary,
  entry.intro,
  entry.contentHtml
].join("\n")).join("\n");
assert.doesNotMatch(finalCatalogueText, /Absorb Familiar/);
assert.equal(rulesLinks["Absorb Familiar"], undefined);
assert.equal(
  rulesLinks["Tattoo Transformation"],
  "https://2e.aonprd.com/Familiars.aspx?ID=72&Abilities=true"
);
assert.match(byId["ritsa-familiars"].contentHtml, /Tattoo Transformation/);
assert.match(byId["ritsa-familiars"].contentHtml, /Familiars\.aspx\?ID=72&Abilities=true/);
assert.equal(traitLinks.conjuration, "https://2e.aonprd.com/Traits.aspx?ID=33");
assert.equal(traitLinks.transmutation, "https://2e.aonprd.com/Traits.aspx?ID=157");

const inubrix = byId["inubrix-ammunition"];
assert.equal(inubrix.category, "Items");
assert.equal(inubrix.levelLabel, "Item 11");
assert.equal(inubrix.headingLabel, "Item 11");
assert.deepEqual(Array.from(inubrix.traits), ["Consumable", "Precious", "Rare"]);
assert.match(inubrix.contentHtml, /<dt>Price<\/dt><dd>50 gp<\/dd>/);
assert.match(inubrix.contentHtml, /<dt>Bulk<\/dt><dd>—<\/dd>/);
assert.match(inubrix.contentHtml, /reduces the weapon's damage die by 1 size/);
assert.match(inubrix.contentHtml, /don't trigger the Shield Block reaction from a metal shield/);
assert.match(inubrix.contentHtml, /normally deal 1d4 damage can't be crafted from inubrix/);

const chitinousServants = byId["buzzing-servants"];
assert.equal(chitinousServants.title, "Chitinous Servants");
assert.deepEqual(Array.from(chitinousServants.traits), ["Rare", "Concentrate", "Manipulate"]);
assert.match(chitinousServants.intro, /chitinous swarm or calcium carbonate growth/);
assert.match(chitinousServants.contentHtml, /<dt>Rank<\/dt><dd>Spell 2<\/dd>/);
assert.match(chitinousServants.contentHtml, /<dt>Actions<\/dt><dd><span class="action-icon" aria-label="three actions">◆◆◆<\/span><\/dd>/);
assert.doesNotMatch(chitinousServants.contentHtml, /<dt>Cast<\/dt>/);
assert.match(chitinousServants.contentHtml, /may grow in, leaving the original swarm or growth as is/);

const universalDirective = byId["universal-directive"];
assert.match(universalDirective.contentHtml, /<dt>Rank<\/dt><dd>Focus 1<\/dd>/);
assert.match(universalDirective.contentHtml, /<dt>Actions<\/dt>/);
assert.doesNotMatch(universalDirective.contentHtml, /<dt>Cast<\/dt>/);

const albatrabbitTattoo = byId["oziza-albatrabbit-tattoo"];
assert.equal(albatrabbitTattoo.category, "Oziza");
assert.deepEqual(Array.from(albatrabbitTattoo.traits), ["Invested", "Magical", "Tattoo"]);
assert.match(albatrabbitTattoo.contentHtml, /<dt>Price<\/dt><dd>60 gp<\/dd>/);
assert.match(albatrabbitTattoo.contentHtml, /<dt>Bulk<\/dt><dd>-<\/dd>/);
assert.match(albatrabbitTattoo.contentHtml, /<dt>Frequency<\/dt><dd>Once per day<\/dd>/);
assert.match(albatrabbitTattoo.contentHtml, /Spells\.aspx\?ID=1711/);
assert.match(albatrabbitTattoo.contentHtml, /A sudden, unexpected wind pushes you forward/);
assert.match(albatrabbitTattoo.contentHtml, /<dt>Rank<\/dt><dd>Spell 1<\/dd>/);
assert.match(albatrabbitTattoo.contentHtml, /<dt>Actions<\/dt><dd><span class="action-icon" aria-label="two actions">◆◆<\/span><\/dd>/);
assert.doesNotMatch(albatrabbitTattoo.contentHtml, /<p>This tattoo, skillfully etched/);
assert.doesNotMatch(albatrabbitTattoo.contentHtml, /<p><strong>Spell 1<\/strong><\/p>/);

for (const id of [
  "formula-flamethrower",
  "formula-flare-cartridge",
  "formula-flare-pistol",
  "formula-galvanic-derringer",
  "formula-rebels-revolver",
  "formula-seeker-rifle",
  "formula-inubrix-ammunition",
  "formula-alchemists-fire-lesser",
  "formula-bottled-lightning-lesser",
  "formula-silencer",
  "formula-earplugs"
]) {
  assert.match(byId[id].source, /Feedback 9/);
  assert.deepEqual(Array.from(byId[id].formulaOwners), ["WE4LAND"]);
  assert.match(byId[id].contentHtml, /10% of Item Cost/);
}
assert.equal(byId["formula-rebels-revolver"].title, "Rebel's Revolver");
assert.equal(byId["formula-flamethrower"].title, "Automaton's Flamethrower");
assert.match(byId["formula-rebels-revolver"].contentHtml, /#entry\/rebels-revolver-restored/);

assert.equal(formulae.filter((entry) => entry.formulaOwners.includes("WE4LAND")).length, 21);
assert.equal(formulae.filter((entry) => entry.formulaOwners.includes("Ritsa")).length, 1);

for (const retiredFormulaId of [
  "formula-alchemists-toolkit",
  "formula-black-powder-dose-or-round"
]) {
  assert.ok(!byId[retiredFormulaId], `${retiredFormulaId} should not remain in the current formula list`);
}

const appSource = fs.readFileSync("preview/assets/js/app.js", "utf8");
const cssSource = fs.readFileSync("preview/assets/css/styles.css", "utf8");
const htmlSource = fs.readFileSync("preview/index.html", "utf8");
const visibilitySource = fs.readFileSync("preview/assets/js/visibility-config.js", "utf8");
const canonicalEntries = JSON.parse(fs.readFileSync("content/entries.json", "utf8"));
const canonicalCollections = JSON.parse(fs.readFileSync("content/collections.json", "utf8"));
assert.equal(canonicalEntries.entries.length, entries.length);
assert.deepEqual(
  Array.from(canonicalCollections.collections, (collection) => collection.name),
  Array.from(categories)
);
assert.match(appSource, /showAll:\s*false/, "catalogue must start with All deselected");
assert.match(appSource, /if \(!state\.showAll && state\.categories\.size === 0\) return \[\]/, "zero-selection state must show no entries");
assert.match(appSource, /resultsHeading\.hidden = !hasCollectionSelection/, "results heading must hide with no collection selected");
assert.match(appSource, /category === "All" \? \["All", "None"\]/, "collection controls must place None after All");
assert.match(appSource, /if \(category === "None"\) \{\s*state\.showAll = false;\s*state\.categories\.clear\(\);\s*state\.formulaFilters\.clear\(\);/s, "None must clear every collection selection");
assert.match(appSource, /formulaFilters:\s*new Set\(\)/, "Formulae filters must allow multiple selections");
assert.match(appSource, /state\.formulaFilters\.clear\(\)/, "Formulae filters must reset to All");
assert.match(appSource, /function linkRulesTerms\(container\)/, "rules terms need automatic Archives of Nethys links");
assert.match(appSource, /linkRulesTerms\(detailView\)/, "rules-term linking must run on entry pages");
assert.match(appSource, /\[data-no-rule-link\]/, "marked headings must opt out of automatic rules links");
assert.match(appSource, /window\.GAILEIA_CATEGORY_SYMBOLS/);
assert.match(htmlSource, /assets\/js\/catalogue-data\.js/);
assert.doesNotMatch(htmlSource, /feedback\d-data|phase3-data|catalogue-updates|assets\/js\/content\.js/);
assert.match(visibilitySource, /window\.GAILEIA_VISIBILITY_CONFIG/);
assert.match(visibilitySource, /gmPasscodeSha256/);
assert.match(
  visibilitySource,
  /https:\/\/gaileia-visibility-service\.casstform\.chatgpt\.site/,
  "shared visibility service must stay connected"
);
assert.match(appSource, /function visibilityControlMarkup\(entry,/);
assert.match(appSource, /function renderVisibilityManager\(\)/);
assert.match(appSource, /async function setEntryGmOnly\(entry, marked\)/);
assert.match(appSource, /if \(!state\.visibilityReady && state\.mode === "pc"\) return \[\]/);
assert.match(appSource, /data-visibility-id/);
assert.match(appSource, /entry\.traits\.join\(" "\)/, "PC search must include the traits players can now see");
assert.equal((appSource.match(/const visibleTraits = `<ul class="trait-list/g) || []).length, 2, "traits must render on both catalogue cards and entry pages in PC and GM views");
assert.match(cssSource, /\.trait \{[\s\S]*?height: 23px;[\s\S]*?min-height: 23px;/, "all trait chips must use one explicit height");
assert.match(cssSource, /\.trait a \{[\s\S]*?height: 100%;[\s\S]*?min-height: 0;/, "linked trait labels must fill the same chip height");
assert.match(cssSource, /\.detail-body \.trait-list > \.trait \{[\s\S]*?margin-top: 0;/, "generic detail-list spacing must not stagger trait chips");
assert.doesNotMatch(
  appSource,
  /if \(entry\.externalUrl \|\| state\.mode === "gm"\) return true/,
  "external links must not bypass GM-only restrictions"
);
assert.match(htmlSource, /id="manage-visibility"/);
assert.match(htmlSource, /id="visibility-dialog"/);
assert.match(htmlSource, /id="visibility-manager-list"/);
assert.match(htmlSource, /id="entry-total">82</);
assert.match(htmlSource, /id="collection-total">14</);
assert.match(htmlSource, /id="formula-filters"/);

console.log("Preview catalogue validation passed: 82 entries, 14 collections, and canonical data is current.");
