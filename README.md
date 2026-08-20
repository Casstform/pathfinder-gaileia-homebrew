# PF2e Homebrew Compendium

A dependency-free, searchable, print-friendly static site for Pathfinder Second Edition homebrew. It is designed to work directly on GitHub Pages: there is no package installation, site generator, database, or build command.

## Included material

- 1 Animist apparition: **Echoes of a Signal**
- 19 items and formulae
- 8 creature stat blocks
- 1 custom spell
- 4 campaign rules pages
- Search, category filters, accessible keyboard navigation, responsive layouts, stable hash links, and print styling

The final Echoes spell progression uses **forbidding ward** as its cantrip and **save point** as its 8th-rank spell.

## Preview locally

Open `index.html` in a browser. Because the project uses ordinary deferred scripts rather than JavaScript modules, search, filters, and entry pages work even when the file is opened directly.

## Publish with GitHub Pages

1. Create a repository and place all files from this folder at the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.
5. GitHub will show the public address in the same Pages settings panel after deployment.

The `.nojekyll` file tells GitHub Pages to publish the static files as-is. GitHub's current instructions are available in [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Add or edit homebrew

All catalogue text lives in `assets/js/content.js`. Each entry is one object in `window.HOMEBREW_ENTRIES` with these fields:

- `id`: unique lower-case URL name
- `title`: display name
- `category`: `Apparitions`, `Items`, `Creatures`, `Spells`, or `Rules`
- `typeLabel`, `levelLabel`, `headingLabel`: card and rules-header labels
- `traits`: filterable/searchable trait names
- `summary`: short catalogue description
- `intro`: italic opening text on the entry page
- `source`: private source-file title for provenance
- `contentHtml`: the formatted rules text

To add an entry, duplicate the nearest similar object, change every field, and ensure its `id` is unique. The catalogue count, category counts, search index, entry page, and shareable hash link update automatically.

## Project layout

```text
index.html
404.html
assets/
  css/styles.css
  js/app.js
  js/content.js
SOURCE_INVENTORY.md
```

## Content note

This repository contains only the web-ready transcriptions. The private Google Drive source files are not bundled or exposed. Official spell names link to Archives of Nethys where a current page was available; the selected `save point` text is preserved inside the Echoes entry because no current Archives of Nethys page was found for that version.

This is unofficial fan-made game material. Pathfinder and Starfinder are trademarks of Paizo Inc.; this project is not affiliated with or endorsed by Paizo.
