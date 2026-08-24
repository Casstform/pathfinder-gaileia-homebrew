import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = { window: {}, console };
vm.createContext(context);

for (const file of [
  "preview/assets/js/content.js",
  "preview/assets/js/catalogue-updates.js",
  "preview/assets/js/feedback3-data.js",
  "preview/assets/js/feedback4-data.js"
]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const entries = context.window.HOMEBREW_ENTRIES;
const categories = context.window.HOMEBREW_CATEGORIES;
const advancedAlchemy = context.window.GAILEIA_ADVANCED_ALCHEMY;
const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
const ids = entries.map((entry) => entry.id);

assert.equal(entries.length, 56, "expected 56 catalogue entries");
assert.equal(new Set(ids).size, ids.length, "entry IDs must be unique");
assert.equal(categories.length - 1, 13, "expected 13 collections");
assert.equal(advancedAlchemy.defaultLevel, 3);
assert.equal(advancedAlchemy.slotsForLevel(1), 5);
assert.equal(advancedAlchemy.slotsForLevel(3), 6);
assert.equal(advancedAlchemy.slotsForLevel(20), 14);
assert.deepEqual(
  Array.from(categories),
  [
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
}

const formulae = entries.filter((entry) => entry.category === "Formulae");
const advancedFormulae = formulae.filter((entry) => entry.advancedAlchemy);
const regularFormulae = formulae.filter((entry) => entry.regularCrafting);

assert.equal(formulae.length, 10, "expected the ten formulae specified in Feedback 4");
assert.equal(advancedFormulae.length, 4, "expected four Advanced Alchemy formulae");
assert.equal(regularFormulae.length, 6, "expected six regular crafting formulae");
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
  "formula-antler-ammunition": [16, 3.5, 3.5, 0.35]
};

for (const [id, [dc, initial, final, tenPercent]] of Object.entries(expectedCrafting)) {
  assert.equal(byId[id].crafting.dc, dc, `${id} has the wrong crafting DC`);
  assert.equal(byId[id].crafting.initial, initial, `${id} has the wrong initial cost`);
  assert.equal(byId[id].crafting.final, final, `${id} has the wrong final cost`);
  assert.equal(byId[id].crafting.tenPercent, tenPercent, `${id} has the wrong 10% cost`);
}

assert.match(byId["formula-antler-ammunition"].contentHtml, /#entry\/antler-ammunition/);
assert.match(byId["formula-non-lethal-ammunition"].contentHtml, /#entry\/non-lethal-ammunition/);

for (const retiredFormulaId of [
  "formula-alchemists-toolkit",
  "formula-black-powder-dose-or-round",
  "formula-earplugs",
  "formula-silencer"
]) {
  assert.ok(!byId[retiredFormulaId], `${retiredFormulaId} should not remain in the current formula list`);
}

console.log("Preview catalogue validation passed: 56 entries, 13 collections, and all Feedback 3–4 data invariants intact.");
