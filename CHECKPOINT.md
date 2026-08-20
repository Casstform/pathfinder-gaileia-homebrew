# Release Checkpoint

Checkpoint date: August 20, 2026

## Current state

The dependency-free GitHub Pages project is complete and ready to place in an empty repository. It contains 33 distinct catalogue entries:

- 1 apparition
- 19 items
- 8 creatures
- 1 spell
- 4 rules pages

`Echoes of a Signal` is locked to `forbidding ward` as its cantrip and `save point` as its 8th-rank spell.

## Verified

- JavaScript syntax passes for `assets/js/content.js` and `assets/js/app.js`.
- All 33 entry IDs are unique and every required data field is populated.
- Category counts are 1 apparition, 19 items, 8 creatures, 1 spell, and 4 rules pages.
- Short search terms use word-aware matching; `oil` returns the four oil entries instead of also matching words such as `roiling`, `spoils`, and `coil`.
- Search checks resolve the WE4LAND corrosion rule and Walking Cauldron investment text.
- Every entry fragment and both HTML pages have balanced markup.
- All external links opened in a new tab include `rel="noreferrer"`.
- A local HTTP server returned status 200 for the two HTML pages and every CSS/JavaScript asset.
- A Playwright test script was prepared, but this workspace has no Chromium executable. The same scenarios should be run against the final GitHub Pages URL as the post-deployment smoke test.

## Source decisions

- The newer of two Forge JSON records is published; the older draft is superseded.
- The broken Rebel's Revolver JSON was merged into the existing damaged-revolver entry.
- Clearly official Paizo reference cards and unfinished idea documents are not presented as original homebrew.
- Source omissions are visible on the affected pages rather than filled with guessed mechanics: Amala's Kickback, the two wands, Healing Potion, and the three magical bullets.

See `SOURCE_INVENTORY.md` for the complete entry-by-entry provenance record.

## Only remaining publication action

Create one empty public GitHub repository, without initializing a README, `.gitignore`, or license. The suggested name is `pf2e-homebrew-compendium`. Once its repository URL is available, upload the contents of this project to the repository root and enable Pages from `main` / `root` as described in `README.md`.

No further Google Drive search is required to publish this checkpoint.
