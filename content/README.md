# Canonical compendium content

These files are the source of truth for the `/preview/` compendium:

- `entries.json` contains every published catalogue entry.
- `collections.json` controls collection names, order, symbols, formula filters, and Advanced Alchemy settings.
- `reference-links.json` contains Archives of Nethys links used for traits and automatically linked rules terms.
- `preview/assets/js/visibility-config.js` separately controls the client-side PC/GM visibility integration.

Do not edit `preview/assets/js/catalogue-data.js` directly. After changing a canonical JSON file, regenerate it with:

```bash
node scripts/build-preview-data.mjs
```

Then run:

```bash
node scripts/build-preview-data.mjs --check
node scripts/validate-preview.mjs
```

Every significant new rule or deliberately preserved exception should receive a targeted assertion in `scripts/validate-preview.mjs`.
