# Release Checkpoint

Checkpoint date: August 27, 2026

## Current state

The dependency-free Gaileia Compendium is published from
`Casstform/pathfinder-gaileia-homebrew` on the `main` branch. The current
root production catalogue contains 85 distinct entries in 14 collections. The former
`/preview/` URL now redirects to this production page while preserving entry hashes:

| Collection | Entries |
| --- | ---: |
| Animist | 1 |
| Calendar | 1 |
| Fauna/Flora | 8 |
| Formulae | 25 |
| House Rules | 2 |
| Items | 29 |
| Language | 1 |
| Maps | 1 |
| Oziza | 4 |
| Ritsa | 3 |
| Saraik | 3 |
| Spells | 2 |
| Subsystems | 2 |
| WE4LAND | 3 |

`Echoes of a Signal` remains locked to `forbidding ward` as its cantrip and
`save point` as its 8th-rank spell.

## Completed quality phases

1. **Layout review:** mobile, desktop, keyboard accessibility, and printing were reviewed; the user approved the layouts.
2. **Automated validation:** `.github/workflows/validate-compendium.yml` runs JavaScript syntax checks and `scripts/validate-compendium.mjs` for every push and pull request to `main`.
3. **Mechanics review:** the user reviewed the incomplete-mechanics recommendations in `Phase 3 responses.xlsx`; the accepted corrections are preserved in the canonical entry data and protected by automated assertions.

## Preventative maintenance

On August 26, 2026, the successive Feedback 3–7 and Phase 3 runtime layers were consolidated. The canonical source structure is now:

- `content/entries.json` for all catalogue entries;
- `content/collections.json` for collection order, symbols, Formulae filters, and Advanced Alchemy settings;
- `content/reference-links.json` for trait and rules-term references;
- `assets/js/visibility-config.js` for PC/GM visibility settings;
- `scripts/build-catalogue-data.mjs` for deterministic generation of `assets/js/catalogue-data.js`.

The automated workflow rejects a pull request when the generated catalogue file is stale.

## Shared visibility controls

On August 26, 2026, visibility management was extended to every catalogue card, including the Gaileia map, Goblish Translator, and Gaileian Calendar external links. GM view also includes a searchable **Manage visibility** panel for changing any entry without opening its detail page.

Shared visibility is stored by the separately hosted `gaileia-visibility-service` companion Site at <https://gaileia-visibility-service.casstform.chatgpt.site>. Its protected endpoint validates the existing GM passcode before accepting changes. PC browsers read the shared list before rendering entries, while the last synchronized browser copy provides a bounded fallback if the service is temporarily unavailable.

The earlier undeployed Cloudflare Worker placeholder was removed from this repository so future maintenance has only one authoritative shared-visibility service.

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
- All 85 entry IDs are unique and use one of the 14 declared collections.
- Internal entry links resolve to existing entries.
- External entry links use HTTPS.
- Formula ownership, crafting costs, filters, and character-feature summaries are checked automatically.
- House-rule counts, links, and GM visibility are checked automatically.
- Card-level visibility controls, the GM visibility manager, and fail-closed shared-state loading are checked automatically.
- The three reference bullets have explicit regression assertions preventing accidental removal or mechanical rewriting.

See `SOURCE_INVENTORY.md` for the original source inventory and subsequent review decisions.
