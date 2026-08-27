# Gaileia Compendium

A dependency-free, searchable, print-friendly Pathfinder Second Edition compendium for Gaileia. GitHub Pages serves the catalogue directly. A small companion service stores shared PC/GM visibility choices so the GM can manage player access entirely inside the site.

- Live compendium: <https://casstform.github.io/pathfinder-gaileia-homebrew/>
- Legacy `/preview/` links redirect to the live compendium and preserve entry hashes.
- Repository: <https://github.com/Casstform/pathfinder-gaileia-homebrew>
- Current catalogue: 82 entries in 14 collections

## Canonical content

Future changes should update the canonical files instead of adding another feedback overlay:

| File | Purpose |
| --- | --- |
| `content/entries.json` | All catalogue entries and their final rendered rules content |
| `content/collections.json` | Collection order, names, symbols, Formulae filters, and Advanced Alchemy settings |
| `content/reference-links.json` | Trait links and automatically linked rules terms |
| `assets/js/visibility-config.js` | Client-side PC/GM visibility configuration |
| `assets/js/catalogue-data.js` | Generated browser data; never edit directly |

The former `content.js`, catalogue update, Feedback 3–7, and Phase 3 layers have been consolidated into this structure. Their history remains available in Git.

## PC and GM visibility

GM view provides two synchronized ways to change an entry's visibility:

- Every catalogue card has a **PC Visible / GM Only** control. This includes external-link cards such as Gaileia, Goblish Translator, and Gaileian Calendar.
- **Manage visibility** in the masthead opens a searchable list of all entries with All, PC visible, and GM only filters.

Ordinary entry pages retain their existing GM Only button. Entries with `"gmOnly": true` in canonical data are locked GM-only by design and cannot be exposed from the interface.

The authoritative shared list is stored by the companion service at <https://gaileia-visibility-service.casstform.chatgpt.site>. PC browsers load that list before showing catalogue entries; GM updates require the existing passcode. Browser storage is only a last-synchronized fallback, not the shared source of truth.

The companion service is an OpenAI-hosted Site named `gaileia-visibility-service`. Its passcode hash is protected as a runtime secret, and only `https://casstform.github.io` is permitted as a browser origin. Like the rest of this public GitHub Pages project, visibility is an interface convenience rather than encryption of the published catalogue source.

## Add or change an entry

1. Edit `content/entries.json`. Keep the existing schema and use a unique, stable, lower-case `id`.
2. If a collection, symbol, Formulae filter, trait link, or rules-term link changes, update the corresponding canonical configuration file.
3. Regenerate the browser data:

   ```bash
   node scripts/build-catalogue-data.mjs
   ```

4. Run the same checks used by GitHub Actions:

   ```bash
   node scripts/build-catalogue-data.mjs --check
   node scripts/validate-compendium.mjs
   ```

5. Publish through a branch and pull request. Merge only after **Validate compendium** succeeds, then verify the deployed GitHub Pages files.

Important content decisions should receive a targeted assertion in `scripts/validate-compendium.mjs`. Generic checks already enforce unique IDs, declared collections, required metadata, valid internal entry links, HTTPS external links, Formulae behavior, House Rules structure, character summaries, and the current catalogue totals.

## Change-request handoff

The preferred user workflow is:

1. Fill one row per request in the **Gaileia Compendium Change Queue** workbook.
2. Mark complete requests **Ready to Publish**.
3. Attach that workbook, the **Gaileia Compendium Update Workflow** document, and every exact source file or direct source link.
4. Ask ChatGPT: `See the attachments. Apply every row marked Ready to Publish to the Gaileia Compendium.`

Do not make a broad Google Drive search a prerequisite. A missing or unreadable source becomes a named gap while every complete request proceeds independently.

## Local testing

Open `index.html` in a browser. Ordinary deferred scripts are used, so catalogue browsing works without a local server.

## Project layout

```text
content/
  entries.json
  collections.json
  reference-links.json
assets/
  css/styles.css
  img/gaileia-globe.webp
  js/
    app.js
    catalogue-data.js
    visibility-config.js
preview/
  index.html  # compatibility redirect
scripts/
  build-catalogue-data.mjs
  validate-compendium.mjs
.github/workflows/
  validate-compendium.yml
CHECKPOINT.md
SOURCE_INVENTORY.md
```

## Publishing and legal note

GitHub Pages deploys the production compendium from `main` and the repository root. `.nojekyll` ensures the files are published unchanged.

The repository contains web-ready transcriptions, not private source files. This is unofficial fan-made material for personal campaign use. Pathfinder and Starfinder are trademarks of Paizo Inc.; this project is not affiliated with or endorsed by Paizo.
