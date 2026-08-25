# Release Checkpoint

Checkpoint date: August 25, 2026

## Current state

The dependency-free Gaileia Compendium is published from
`Casstform/pathfinder-gaileia-homebrew` on the `main` branch. The current
`/preview/` catalogue contains 69 distinct entries in 14 collections:

| Collection | Entries |
| --- | ---: |
| Animist | 1 |
| Calendar | 1 |
| Fauna/Flora | 8 |
| Formulae | 11 |
| House Rules | 2 |
| Items | 28 |
| Language | 1 |
| Maps | 1 |
| Oziza | 3 |
| Ritsa | 3 |
| Saraik | 3 |
| Spells | 2 |
| Subsystems | 2 |
| WE4LAND | 3 |

`Echoes of a Signal` remains locked to `forbidding ward` as its cantrip and
`save point` as its 8th-rank spell.

## Completed quality phases

1. **Layout review:** mobile, desktop, keyboard accessibility, and printing were reviewed; the user approved the layouts.
2. **Automated validation:** `.github/workflows/validate-compendium.yml` runs JavaScript syntax checks and `scripts/validate-preview.mjs` for every push and pull request to `main`.
3. **Mechanics review:** the user reviewed the incomplete-mechanics recommendations in `Phase 3 responses.xlsx`; the accepted corrections are encoded in `preview/assets/js/phase3-data.js` and protected by automated assertions.

## Phase 3 decisions

- Citrine Bullet remains an intentionally nonfunctional dud for reference.
- BULL-et and Seam-Coil Bullet remain unchanged as NPC-only reference items.
- Amala's Kickback remains unchanged as the intended toned-down counterpart to Digly's Oil of Sympathy.
- Antler Ammunition now lists its 7 gp price, ammunition type, and Bulk.
- Cryomister now lists its 3 gp price.
- Demortification Oil now lists its 25 gp price.
- Galvanic Derringer now lists its 30-foot range increment.
- Life-Boosting Oil now lists its corrected 12 gp price and remains Alchemical rather than Magical to fit Gaileia's setting.
- Runesmith property-rune capacity now equals the wielder's ABP attack-potency value; Runesmith runes remain separate and consume no property-rune slots.

## Verification baseline

- All JavaScript and module files pass syntax validation.
- All 69 entry IDs are unique and use one of the 14 declared collections.
- Internal entry links resolve to existing entries.
- External entry links use HTTPS.
- Formula ownership, crafting costs, filters, and character-feature summaries are checked automatically.
- House-rule counts, links, and GM visibility are checked automatically.
- The three reference bullets have explicit regression assertions preventing accidental removal or mechanical rewriting.

See `SOURCE_INVENTORY.md` for the original source inventory and subsequent review decisions.
