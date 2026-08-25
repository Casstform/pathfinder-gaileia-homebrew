(function () {
  "use strict";

  const entries = Array.isArray(window.HOMEBREW_ENTRIES) ? window.HOMEBREW_ENTRIES : [];

  function findEntry(id) {
    return entries.find((entry) => entry.id === id);
  }

  function prependStatLines(id, lines) {
    const entry = findEntry(id);
    if (!entry) return;
    entry.contentHtml = entry.contentHtml.replace(
      '<dl class="stat-block">',
      `<dl class="stat-block">${lines}`
    );
  }

  prependStatLines(
    "antler-ammunition",
    `
        <div class="stat-line"><dt>Price</dt><dd>7 gp</dd></div>
        <div class="stat-line"><dt>Ammunition</dt><dd>Arrows and bolts</dd></div>
        <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>`
  );

  prependStatLines(
    "cryomister",
    `
        <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>`
  );

  prependStatLines(
    "demortification-oil",
    `
        <div class="stat-line"><dt>Price</dt><dd>25 gp</dd></div>`
  );

  prependStatLines(
    "life-boosting-oil",
    `
        <div class="stat-line"><dt>Price</dt><dd>12 gp</dd></div>`
  );

  const lifeBoostingOil = findEntry("life-boosting-oil");
  if (lifeBoostingOil) {
    lifeBoostingOil.traits = lifeBoostingOil.traits.filter((trait) => trait !== "Magical");
    if (!lifeBoostingOil.traits.includes("Alchemical")) lifeBoostingOil.traits.push("Alchemical");
  }

  const galvanicDerringer = findEntry("galvanic-derringer");
  if (galvanicDerringer) {
    galvanicDerringer.contentHtml = galvanicDerringer.contentHtml.replace(
      '<div class="stat-line"><dt>Reload</dt><dd>0</dd></div>',
      '<div class="stat-line"><dt>Range</dt><dd>30 feet</dd></div>\n          <div class="stat-line"><dt>Reload</dt><dd>0</dd></div>'
    );
  }

  const provisionalRunesmithRule =
    "Until a final campaign conversion is adopted, Runesmith uses property-rune benefits while ABP supplies the numerical bonus to hit.";
  const finalRunesmithRule =
    "A weapon’s property-rune capacity equals the wielder’s current ABP attack-potency value. Runesmith runes remain separate and consume no property-rune slots.";

  ["house-rules-players", "house-rules-gms"].forEach((id) => {
    const entry = findEntry(id);
    if (!entry) return;
    entry.contentHtml = entry.contentHtml.replace(provisionalRunesmithRule, finalRunesmithRule);
  });
})();
