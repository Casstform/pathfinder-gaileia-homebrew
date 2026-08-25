import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = { window: {}, console };
vm.createContext(context);

for (const file of [
  "preview/assets/js/content.js",
  "preview/assets/js/catalogue-updates.js",
  "preview/assets/js/feedback3-data.js",
  "preview/assets/js/feedback4-data.js",
  "preview/assets/js/feedback5-data.js",
  "preview/assets/js/feedback6-data.js",
  "preview/assets/js/feedback7-data.js"
]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const entries = context.window.HOMEBREW_ENTRIES;
const categories = context.window.HOMEBREW_CATEGORIES;
const advancedAlchemy = context.window.GAILEIA_ADVANCED_ALCHEMY;
const formulaFilters = context.window.GAILEIA_FORMULA_FILTERS;
const rulesLinks = context.window.GAILEIA_RULE_LINKS;
const traitLinks = context.window.GAILEIA_TRAIT_URLS;
const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
const ids = entries.map((entry) => entry.id);

assert.equal(entries.length, 69, "expected 69 catalogue entries after removing Rebel's Revolver");
assert.equal(new Set(ids).size, ids.length, "entry IDs must be unique");
assert.equal(categories.length - 1, 14, "expected 14 collections");
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

assert.equal(formulae.length, 11, "expected eleven formulae after Feedback 5");
assert.equal(advancedFormulae.length, 4, "expected four Advanced Alchemy formulae");
assert.equal(regularFormulae.length, 7, "expected seven regular crafting formulae");
assert.equal(entries.filter((entry) => entry.typeLabel === "Character").length, 4);
assert.equal(byId["translate-chip"].headingLabel, "Focus 2");
assert.equal(byId["universal-directive"].headingLabel, "Focus 1");
assert.equal(byId["tiger-stance-razor-claws"].category, "Saraik");
assert.equal(byId["yellow-bullet"].title, "Citrine Bullet");
assert.match(byId["echoes-of-a-signal"].contentHtml, /href="#save-point-spell">save point<\/a>/);
assert.doesNotMatch(byId["echoes-of-a-signal"].contentHtml, /final selected version/i);
assert.match(byId["seeker-rifle"].contentHtml, /1d8 bludgeoning/);
assert.match(byId["rebels-revolver-restored"].contentHtml, /Martial Weapons/);
assert.match(byId["we4land-venting-and-submersion"].contentHtml, /Conditions\.aspx\?ID=92/);

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
  assert.match(entry.contentHtml, /10% of Initial Cost/);
}

const expectedCrafting = {
  "formula-quicksilver-mutagen-lesser": [13, 2, 2, 0.2],
  "formula-dread-ampoule-lesser": [13, 1.5, 1.5, 0.15],
  "formula-glue-bomb-lesser": [13, 1.5, 1.5, 0.15],
  "formula-smoke-ball-lesser": [13, 1.5, 1.5, 0.15],
  "formula-non-lethal-ammunition": [13, 1.5, 1.5, 0.15],
  "formula-antler-ammunition": [16, 3.5, 3.5, 0.35],
  "formula-creepy-crawly-crock": [13, 5, 5, 1]
};

for (const [id, [dc, initial, final, tenPercent]] of Object.entries(expectedCrafting)) {
  assert.equal(byId[id].crafting.dc, dc, `${id} has the wrong crafting DC`);
  assert.equal(byId[id].crafting.initial, initial, `${id} has the wrong initial cost`);
  assert.equal(byId[id].crafting.final, final, `${id} has the wrong final cost`);
  assert.equal(byId[id].crafting.tenPercent, tenPercent, `${id} has the wrong 10% cost`);
}

assert.match(byId["formula-antler-ammunition"].contentHtml, /#entry\/antler-ammunition/);
assert.match(byId["formula-non-lethal-ammunition"].contentHtml, /#entry\/non-lethal-ammunition/);

const formulaArchiveLinks = {
  "formula-dread-ampoule-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3292",
  "formula-glue-bomb-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3295",
  "formula-quicksilver-mutagen-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3319",
  "formula-smoke-ball-lesser": "https://2e.aonprd.com/Equipment.aspx?ID=3360"
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
  all: 11,
  advanced: 4,
  regular: 7,
  ritsa: 1,
  we4land: 10
};
for (const [filter, count] of Object.entries(expectedFormulaFilterCounts)) {
  assert.equal(
    formulae.filter((entry) => formulaFilters.matches(entry, filter)).length,
    count,
    `${filter} Formulae filter has the wrong count`
  );
}

const expectedCombinedFormulaFilterCounts = [
  [["ritsa", "we4land"], 11],
  [["regular", "advanced"], 11],
  [["ritsa", "advanced"], 0],
  [["ritsa", "regular"], 1],
  [["we4land", "advanced"], 4],
  [["we4land", "regular"], 6],
  [["ritsa", "we4land", "advanced"], 4],
  [["ritsa", "we4land", "regular"], 7]
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
assert.equal(entries.filter((entry) => entry.category === "Items").length, 28);
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

assert.equal(formulae.filter((entry) => entry.formulaOwners.includes("WE4LAND")).length, 10);
assert.equal(formulae.filter((entry) => entry.formulaOwners.includes("Ritsa")).length, 1);

for (const retiredFormulaId of [
  "formula-alchemists-toolkit",
  "formula-black-powder-dose-or-round",
  "formula-earplugs",
  "formula-silencer"
]) {
  assert.ok(!byId[retiredFormulaId], `${retiredFormulaId} should not remain in the current formula list`);
}

const appSource = fs.readFileSync("preview/assets/js/app.js", "utf8");
const htmlSource = fs.readFileSync("preview/index.html", "utf8");
assert.match(appSource, /showAll:\s*false/, "catalogue must start with All deselected");
assert.match(appSource, /if \(!state\.showAll && state\.categories\.size === 0\) return \[\]/, "zero-selection state must show no entries");
assert.match(appSource, /resultsHeading\.hidden = !hasCollectionSelection/, "results heading must hide with no collection selected");
assert.match(appSource, /formulaFilters:\s*new Set\(\)/, "Formulae filters must allow multiple selections");
assert.match(appSource, /state\.formulaFilters\.clear\(\)/, "Formulae filters must reset to All");
assert.match(appSource, /function linkRulesTerms\(container\)/, "rules terms need automatic Archives of Nethys links");
assert.match(appSource, /linkRulesTerms\(detailView\)/, "rules-term linking must run on entry pages");
assert.match(appSource, /\[data-no-rule-link\]/, "marked headings must opt out of automatic rules links");
assert.match(htmlSource, /assets\/js\/feedback5-data\.js/);
assert.match(htmlSource, /assets\/js\/feedback6-data\.js/);
assert.match(htmlSource, /assets\/js\/feedback7-data\.js/);
assert.match(htmlSource, /id="entry-total">69</);
assert.match(htmlSource, /id="collection-total">14</);
assert.match(htmlSource, /id="formula-filters"/);

console.log("Preview catalogue validation passed: 69 entries, 14 collections, and all Feedback 3–7 data invariants intact.");
