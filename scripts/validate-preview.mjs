import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = { window: {}, console };
vm.createContext(context);

for (const file of [
  "preview/assets/js/content.js",
  "preview/assets/js/catalogue-updates.js",
  "preview/assets/js/feedback3-data.js"
]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const entries = context.window.HOMEBREW_ENTRIES;
const categories = context.window.HOMEBREW_CATEGORIES;
const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
const ids = entries.map((entry) => entry.id);

assert.equal(entries.length, 58, "expected 58 catalogue entries");
assert.equal(new Set(ids).size, ids.length, "entry IDs must be unique");
assert.equal(categories.length - 1, 13, "expected 13 collections");
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

assert.equal(entries.filter((entry) => entry.category === "Formulae").length, 12);
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

console.log("Preview catalogue validation passed: 58 entries, 13 collections, all Feedback 3 data invariants intact.");
