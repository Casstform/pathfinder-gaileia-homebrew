# Canonical compendium content

These files are the source of truth for the production compendium:

- `entries.json` contains every published catalogue entry.
- `collections.json` controls collection names, order, symbols, formula filters, and Advanced Alchemy settings.
- `reference-links.json` contains Archives of Nethys links used for traits and automatically linked rules terms.
- `assets/js/visibility-config.js` separately controls the client-side PC/GM visibility integration.

Do not edit `assets/js/catalogue-data.js` directly. After changing a canonical JSON file, regenerate it with:

```bash
node scripts/build-catalogue-data.mjs
```

Then run:

```bash
node scripts/build-catalogue-data.mjs --check
node scripts/validate-compendium.mjs
```

Every significant new rule or deliberately preserved exception should receive a targeted assertion in `scripts/validate-compendium.mjs`.
