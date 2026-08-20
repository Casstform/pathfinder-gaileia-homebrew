(function () {
  "use strict";

  window.HOMEBREW_CATEGORIES = ["All", "Apparitions", "Items", "Creatures", "Spells", "Rules"];

  window.HOMEBREW_ENTRIES = [
    {
      id: "echoes-of-a-signal",
      title: "Echoes of a Signal",
      category: "Apparitions",
      typeLabel: "Animist Apparition",
      levelLabel: "Apparition",
      headingLabel: "Apparition",
      traits: ["Uncommon", "Animist", "Apparition"],
      summary: "A fragmented transmission that coordinates allies through a teleplastic network.",
      intro:
        "A scattered transmission ricochets through the airwaves. If it once carried a directive, a plea, or a premonitory message, it is nearly unintelligible in its current state, regardless of whether it reached its intended recipients—whoever they once may have been.",
      source: "Echoes of a Signal HTML (final source; spell list verified August 20, 2026)",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Apparition Skills</dt><dd>Construct Lore, Vehicle Lore</dd></div>
          <div class="stat-line"><dt>Vessel Spell</dt><dd><em>universal directive</em></dd></div>
          <div class="stat-line"><dt>Avatar</dt><dd>Teleplastic Network</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>50 feet, fly 70 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd><span class="action-icon" aria-label="one action">◆</span> constructive interference (agile, electricity, reach 15 feet, versatile sonic), Damage 6d6+6 electricity</dd></div>
          <div class="stat-line"><dt>Ranged</dt><dd><span class="action-icon" aria-label="one action">◆</span> amplified transmission (mental, range 120 feet, versatile electricity), Damage 6d6+6 mental</dd></div>
        </dl>

        <h2>Apparition Spells</h2>
        <ul class="spell-list">
          <li><span class="spell-rank">Cantrip</span><a href="https://2e.aonprd.com/Spells.aspx?ID=1535" target="_blank" rel="noreferrer">forbidding ward</a></li>
          <li><span class="spell-rank">1st</span><a href="https://2e.aonsrd.com/Spells/93" target="_blank" rel="noreferrer">enhance weapon</a></li>
          <li><span class="spell-rank">2nd</span><a href="https://2e.aonprd.com/Spells.aspx?ID=308" target="_blank" rel="noreferrer">status</a></li>
          <li><span class="spell-rank">3rd</span><a href="https://2e.aonprd.com/Spells.aspx?ID=1553" target="_blank" rel="noreferrer">haste</a></li>
          <li><span class="spell-rank">4th</span><a href="https://2e.aonsrd.com/spells/210-peaceful-bubble" target="_blank" rel="noreferrer">peaceful bubble</a></li>
          <li><span class="spell-rank">5th</span><a href="https://2e.aonprd.com/Spells.aspx?ID=1728" target="_blank" rel="noreferrer">truespeech</a></li>
          <li><span class="spell-rank">6th</span><a href="https://2e.aonprd.com/Spells.aspx?ID=1526" target="_blank" rel="noreferrer">field of life</a></li>
          <li><span class="spell-rank">7th</span><a href="https://2e.aonsrd.com/spells/222-planar-seal" target="_blank" rel="noreferrer">planar seal</a></li>
          <li><span class="spell-rank">8th</span><strong>save point</strong> <span>(final selected version; included below)</span></li>
          <li><span class="spell-rank">9th</span><a href="https://2e.aonprd.com/Spells.aspx?ID=1537" target="_blank" rel="noreferrer">foresight</a></li>
        </ul>

        <h2>Vessel Spell</h2>
        <section class="rules-subcard">
          <h3>Universal Directive <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Focus 1</strong></p>
          <ul class="trait-list" aria-label="Universal Directive traits">
            <li class="trait" data-trait="uncommon">Uncommon</li>
            <li class="trait">Animist</li>
            <li class="trait">Aura</li>
            <li class="trait">Concentrate</li>
            <li class="trait">Focus</li>
            <li class="trait">Mental</li>
          </ul>
          <dl class="stat-block">
            <div class="stat-line"><dt>Area</dt><dd>20-foot emanation</dd></div>
            <div class="stat-line"><dt>Duration</dt><dd>Sustained up to 1 minute</dd></div>
          </dl>
          <p>You project a coded signal that coordinates those who heed it. When you Cast this Spell and the first time you Sustain it each round, choose one ally in the emanation. That ally can immediately Step as a free action. An ally can benefit from rallying signal only once per round. While within the emanation, you and your allies gain a +1 status bonus to saves against auditory, linguistic, and sonic effects.</p>
          <p><strong>Heightened (4th)</strong> The emanation increases to 25 feet.</p>
          <p><strong>Heightened (7th)</strong> When you Cast or Sustain the spell, you can choose two different allies.</p>
        </section>

        <h2>Final 8th-Rank Spell</h2>
        <section class="rules-subcard">
          <h3>Save Point</h3>
          <p><strong>Spell 8</strong></p>
          <ul class="trait-list" aria-label="Save Point traits">
            <li class="trait">Concentrate</li>
            <li class="trait">Manipulate</li>
          </ul>
          <dl class="stat-block">
            <div class="stat-line"><dt>Cast</dt><dd>10 minutes</dd></div>
            <div class="stat-line"><dt>Traditions</dt><dd>Occult</dd></div>
            <div class="stat-line"><dt>Range</dt><dd>Touch</dd></div>
            <div class="stat-line"><dt>Targets</dt><dd>1 willing creature</dd></div>
            <div class="stat-line"><dt>Duration</dt><dd>1 day</dd></div>
          </dl>
          <p>You imprint perfect recollection of the target's physical body, later recalling this record and reconstructing its body as it was when you cast this spell. The record includes the target's current Hit Points, augmentations, attribute modifiers, and any afflictions or conditions it had.</p>
          <p>If the target dies of anything other than old age, it can recall its recorded body. This process takes 1 minute, after which its remaining corpse disappears and the target is reformed as the recorded body in the corpse's space. It reforms in any of the target's equipment and apparel such that the new body is wearing it. It reforms in the position in which it was recorded and can choose to pick up any equipment it dropped in the space when it died, assuming the equipment is still there. If it can't occupy that space, it appears as close to the space as possible, though it must still retrieve its equipment.</p>
          <p>It retains its mind as it was at the time of the body's death, so it regains no expended spells, Focus Points, or uses of special abilities. Any mental effects affecting the target at the time of its death persist in its new body.</p>
          <p>Retrieving the body from the record or having the duration expire removes the stored information from the record, requiring you to cast this spell again. Casting the spell replaces any previous record you've stored with prior castings—you can store only one copy of any creature using this spell at a time.</p>
        </section>
      `
    },
    {
      id: "life-boosting-oil",
      title: "Life-Boosting Oil",
      category: "Items",
      typeLabel: "Alchemical Item",
      levelLabel: "Item 3",
      headingLabel: "Item 3",
      traits: ["Uncommon", "Consumable", "Healing", "Alchemical", "Oil"],
      summary: "A quick-acting oil that provides four rounds of fast healing after its wearer is injured.",
      intro: "This clear oil has a slight red gloss and a pungent smell of iron.",
      source: "Life Boosting Oil.pdf",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 2 hands</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
        </dl>
        <p>Applied, the oil gives you fast healing 3, starting the first time you take damage.</p>
        <p>Once started, the fast healing lasts 4 rounds. Regardless, the oil expires 8 hours after being removed from its container.</p>
        <section class="rules-subcard">
          <p><strong>Fast Healing</strong> Regain 3 Hit Points each round at the beginning of your turn.</p>
        </section>
      `
    },
    {
      id: "demortification-oil",
      title: "Demortification Oil",
      category: "Items",
      typeLabel: "Alchemical Item",
      levelLabel: "Item 5",
      headingLabel: "Item 5",
      traits: ["Rare", "Consumable", "Alchemical", "Necromancy", "Oil"],
      summary: "An odorous restorative oil that reverses a corpse's decay or fortifies a corporeal undead creature.",
      intro: "This oil has a grey-brown appearance, separating into brown-pink sediment, red-grey fluid, and an oily yellow top layer. Its smell is putrid.",
      source: "Demortification Oil.pdf",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 2 hands</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Interact</dd></div>
        </dl>
        <p>When you spread this oil on an intact corpse that has been dead no longer than 1 week, its decay fades and the corpse is restored to the condition it was in as it was dying.</p>
        <p>This cannot undo damage done to a corpse after death, such as consumption by scavengers.</p>
        <p>Applied to a non-incorporeal undead creature, the oil grants that creature a +1 item bonus to Armor Class for 1 hour.</p>
      `
    },
    {
      id: "antler-ammunition",
      title: "Antler Ammunition",
      category: "Items",
      typeLabel: "Alchemical Ammunition",
      levelLabel: "Item 2",
      headingLabel: "Item 2",
      traits: ["Consumable", "Alchemical"],
      summary: "Bony projections erupt from a struck target and attempt to pin it to a nearby surface.",
      intro: "When activated antler ammunition hits a target, bony, antler-like projections grow in an attempt to pin the target.",
      source: "Antler Ammunition.pdf",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
        </dl>
        <p>The target must succeed at a DC 16 Reflex save or become stuck to the surface, taking the critical specialization effect of a bow.</p>
        <p>If the hit with the antler ammunition is a critical hit and you have access to the critical specialization of your weapon, the DC of the Athletics check increases to 15.</p>
        <h2>Bow Critical Specialization</h2>
        <p>If the target of the critical hit is adjacent to a surface, it gets stuck to that surface by the projectile. The target is immobilized and must spend an Interact action to attempt a DC 10 Athletics check to pull the projectile free; it can't move from its space until it succeeds.</p>
        <p>The creature doesn't become stuck if it is incorporeal, is liquid (like a water elemental or some oozes), or could otherwise escape without effort.</p>
      `
    },
    {
      id: "non-lethal-ammunition",
      title: "Non-Lethal Ammunition",
      category: "Items",
      typeLabel: "Ammunition",
      levelLabel: "Item 2",
      headingLabel: "Item 2",
      traits: ["Rare", "Consumable", "Nonlethal", "3rd Party"],
      summary: "A rubberized round that trades stopping power and effective range for nonlethal damage.",
      intro: "A rubberized round that inflicts nonlethal damage.",
      source: "Non-Lethal Ammunition Pathbuilder.png",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>4 gp</dd></div>
        </dl>
        <p>When used, the damage die of the weapon is decreased by one die, to a minimum of (x)d4.</p>
        <p>Targets are treated as one range increment farther away.</p>
      `
    },
    {
      id: "tiger-stance-razor-claws",
      title: "Tiger Stance Razor Claws",
      category: "Items",
      typeLabel: "Unarmed Weapon",
      levelLabel: "Item 1",
      headingLabel: "1d8 S",
      traits: ["Agile", "Finesse", "Nonlethal", "Unarmed", "Versatile (P)", "3rd Party"],
      summary: "Razor claws for Tiger Stance that add persistent bleed damage on a damaging critical hit.",
      intro: "A specialized set of razor claws designed for Tiger Stance attacks.",
      source: "Tigerstance Razor Claws Pathbuilder.png",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d8 slashing</dd></div>
          <div class="stat-line"><dt>Proficiency</dt><dd>Unarmed Attacks</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Brawling</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>0 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>0</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1+</dd></div>
        </dl>
        <p>On a critical success with your tiger claws, if you deal damage, the target takes 1d4 persistent bleed damage.</p>
      `
    },
    {
      id: "rebels-revolver-damaged",
      title: "Rebel's Revolver; Damaged",
      category: "Items",
      typeLabel: "Firearm",
      levelLabel: "Item 1",
      headingLabel: "1d4 P",
      traits: ["Concealable", "Fatal d8", "Capacity 5", "Rare", "3rd Party"],
      summary: "A damaged, short-ranged version of the Rebel's Revolver with a five-round capacity.",
      intro: "This elegant bronze revolver has a smooth handle that merges into a rotating cylinder and narrow barrel. A shallow inlay decorates the handle with patterns of flames roiling in bronze. Its barrel has been sundered, leaving an ugly, jagged break.",
      source: "Damaged Rebel's Revolver Pathbuilder.png and RebelsRevolverBroken-1749871686.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d4 piercing</dd></div>
          <div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>15 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>30 feet</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
        </dl>
      `
    },
    {
      id: "rebels-revolver",
      title: "Rebel's Revolver",
      category: "Items",
      typeLabel: "Firearm",
      levelLabel: "Item 2",
      headingLabel: "1d6 P",
      traits: ["Capacity 4", "Concussive", "Fatal d10", "Rare", "3rd Party"],
      summary: "A beautiful brass four-chambered revolver, reverse engineered with a calculated, efficient design.",
      intro: "A beautiful, brassy, four-chambered revolver reverse engineered with a calculated, efficient design.",
      source: "Rebel's Revolver Pathbuilder.png",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Damage</dt><dd>1d6 piercing</dd></div>
          <div class="stat-line"><dt>Proficiency</dt><dd>Martial Weapons</dd></div>
          <div class="stat-line"><dt>Group</dt><dd>Firearm</dd></div>
          <div class="stat-line"><dt>Price</dt><dd>15 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Hands</dt><dd>1</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>80 feet</dd></div>
          <div class="stat-line"><dt>Reload</dt><dd>1</dd></div>
        </dl>
      `
    },
    {
      id: "vitae-petal-tea-leaves",
      title: "Vitae Petal Tea Leaves",
      category: "Items",
      typeLabel: "Alchemical Consumable",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Alchemical", "Consumable", "Healing", "Potion", "Vitality"],
      summary: "Healing tea leaves that can be steeped twice, producing a weaker restorative drink on their second use.",
      intro: "Dry vitae petals prepared as restorative tea leaves.",
      source: "Vitae Petal Leaves.png",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>6 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Manipulate</dd></div>
        </dl>
        <p>After brewing for 10 minutes, this tea can be consumed to restore 1d8 Hit Points. It may be re-steeped to produce a weaker tea that restores 1d4 Hit Points.</p>
        <p><em>Best before Neebar 31st. Keep dry until use.</em></p>
      `
    },
    {
      id: "buzzing-servants",
      title: "Buzzing Servants",
      category: "Spells",
      typeLabel: "Spell",
      levelLabel: "Spell 2",
      headingLabel: "Spell 2",
      traits: ["Rare", "Concentrate", "Manipulate"],
      summary: "Call forth a durable swarm or growth that can be moved through nearby squares while sustained.",
      intro: "Call forth a swarm or growth in an unoccupied square.",
      source: "Buzzing Servants.pdf",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd><span class="action-icon" aria-label="three actions">◆◆◆</span></dd></div>
          <div class="stat-line"><dt>Traditions</dt><dd>Arcane, divine, primal</dd></div>
          <div class="stat-line"><dt>Range</dt><dd>30 feet</dd></div>
          <div class="stat-line"><dt>Targets</dt><dd>One unoccupied 5-foot square</dd></div>
          <div class="stat-line"><dt>Duration</dt><dd>Sustained up to 1 minute</dd></div>
        </dl>
        <p>The swarm or growth has Hardness 10 and 40 Hit Points. It decays over 24 hours.</p>
        <p>When you Sustain the spell, you can choose another unoccupied square in range that the swarm or growth may move to. Any amount of area or splash damage to the square it occupies interrupts the swarm or growth, ending any further movement.</p>
      `
    },
    {
      id: "alternate-chase-rules",
      title: "Alternate Chase Rules",
      category: "Rules",
      typeLabel: "Encounter Rules",
      levelLabel: "Subsystem",
      headingLabel: "Chases",
      traits: ["House Rule", "Chase", "Exploration"],
      summary: "A round-based pursuit subsystem using movement, speed modifiers, complications, successes, and setbacks.",
      intro: "The party that initiates the chase goes first.",
      source: "Alternate Chase Rules for PF2",
      contentHtml: `
        <h2>Assumptions</h2>
        <ul>
          <li>Unless initiated in combat, the quarry starts between one and three Strides away.</li>
          <li>The quarry continually uses all of its movement to get away.</li>
          <li>People, walls, furniture, and other obstacles interrupt line of sight. The quarry is considered hidden during the chase.</li>
          <li>If you can't use move actions—such as while immobilized, grabbed, restrained, or unconscious—you drop out of the chase.</li>
        </ul>

        <h2>Rounds</h2>
        <ul>
          <li>Each round represents 1 minute of pursuit.</li>
          <li>Your turn represents moving as fast as possible in pursuit and ends with overcoming a complication.</li>
          <li>You must use at least 1 action to move on your turn or drop out of the chase after that turn.</li>
          <li>For every additional move action you use, gain +1 to your speed modifier.</li>
          <li>If you can't move during your turn, you drop out of the chase.</li>
        </ul>

        <h2>Speed</h2>
        <ul>
          <li>The base Speed is the Speed of the slowest quarry.</li>
          <li>For every 5 feet of difference between the base Speed and an individual's Speed, adjust that individual's speed modifier by 1: positive when faster than the base Speed and negative when slower.</li>
          <li>Add your speed modifier to your complication check.</li>
        </ul>

        <h2>Complications</h2>
        <ul>
          <li>A complication is an event the participant must address, usually with a skill check. Saving throws may instead happen to the participant.</li>
          <li>Failure uses up the participant's action.</li>
          <li>Success leaves the participant with an action to use outside the complication.</li>
          <li>Succeeding at the complication gives the participant one success.</li>
          <li>Failing the complication gives the participant one setback.</li>
        </ul>

        <h2>Setbacks</h2>
        <ul>
          <li>You can tolerate a number of setbacks equal to your Constitution modifier or 1, whichever is higher.</li>
          <li>For every setback beyond that limit, you gain the slowed condition.</li>
          <li>If another chase participant damages you, you gain one setback.</li>
        </ul>

        <h2>Ending the Chase</h2>
        <h3>Quarry</h3>
        <p>On the round after the quarry earns three successes, it has a chance to flee. The quarry makes an opposed check appropriate to its approach: Athletics to keep running, Stealth to hide, Society to work through a city, Survival to slip through the woods, and so on.</p>
        <p>The check is made against the closest pursuer—the pursuer with the fewest setbacks. On a success, the quarry flees. On a failure, it faces the next complication with one fewer action because it used that action to flee.</p>
        <h3>Pursuers</h3>
        <p>On the round after a pursuer earns three successes, it can try to stop the quarry. If the pursuer prevents the quarry from taking move actions—for example by leaving it immobilized, grabbed, restrained, or unconscious—the chase ends.</p>
        <p>If the quarry is adversarial, this leads to combat and the pursuers act first. If it is neutral or hospitable, this leads to conversation.</p>
        <p>If the pursuer fails to prevent the quarry from moving, the pursuer faces the next complication with one fewer action because it used that action to stop the quarry.</p>
      `
    },
    {
      id: "campaign-house-rules",
      title: "Campaign House Rules",
      category: "Rules",
      typeLabel: "Campaign Rules",
      levelLabel: "House Rules",
      headingLabel: "Rules",
      traits: ["House Rule", "Spells", "Rituals", "Items"],
      summary: "Campaign rulings for aspect-based revival, scroll use, spell areas, mending, and magic-item durability.",
      intro: "A compact collection of campaign-wide rulings for spells and magic items.",
      source: "Homebrew Rules | PF2 and Mechanics Codex",
      contentHtml: `
        <h2>Spell Mechanics</h2>
        <h3>Bringing Characters Back</h3>
        <p>The normal valuables required by <em>reincarnate</em>, <em>resurrect</em>, <em>raise dead</em>, and similar magic are replaced with a meaningful tribute or sacrifice. The offering should be narratively important rather than a simple wealth tax.</p>
        <p>Possible tributes include sacrificing a limb, a favored weapon, another life, or a commissioned likeness of the deceased. There are intentionally no hard-and-fast rules: be creative and make the cost matter to the story.</p>
        <p>These spells have no component cost when cast by a player character. Hiring an NPC to cast one still requires paying for the NPC's spellcasting service.</p>

        <h3>Four Aspects of a Soul</h3>
        <p>The Mechanics Codex makes the tribute concrete: returning a creature to life can use up to four aspects of that creature—one each representing <strong>emotion, imagination, memory, and sense</strong>. The normal strict secondary-caster requirement is removed. Each contributor performs an appropriate secondary check, with room for the GM to approve another skill.</p>
        <ul>
          <li>Each additional aspect lowers both the primary and secondary DCs.</li>
          <li>A failed check consumes the aspect used for it; that aspect can't be used in another attempt.</li>
          <li>A critical failure destroys all contributed aspects, preventing their future use.</li>
        </ul>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Check</th><th>1 Aspect</th><th>2 Aspects</th><th>3 Aspects</th><th>4 Aspects</th></tr></thead>
            <tbody>
              <tr><td rowspan="2">Revitalize</td><td>Primary</td><td>27</td><td>25</td><td>20</td><td>17</td></tr>
              <tr><td>Secondary</td><td>22</td><td>19</td><td>15</td><td>12</td></tr>
              <tr><td rowspan="2">Resurrection</td><td>Primary</td><td>32</td><td>29</td><td>25</td><td>22</td></tr>
              <tr><td>Secondary</td><td>27</td><td>24</td><td>20</td><td>17</td></tr>
              <tr><td>Raise Dead</td><td>Primary</td><td>33</td><td>30</td><td>26</td><td>23</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Revitalize</h3>
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd>4 hours; up to 4 aspects</dd></div>
          <div class="stat-line"><dt>Primary Check</dt><dd>Nature (expert)</dd></div>
          <div class="stat-line"><dt>Secondary Checks</dt><dd>Occultism, Religion, or GM discretion</dd></div>
          <div class="stat-line"><dt>Range & Target</dt><dd>10 feet; one dead creature up to 8th level that died within the past week</dd></div>
        </dl>
        <p>This renamed version of <em>reincarnate</em> returns the soul in a new body. Roll 1d20 for its ancestry category: 1–14 produces a common ancestry; 15–20 produces an uncommon or rare ancestry. The GM selects regionally appropriate possibilities and randomly determines the result.</p>
        <ul>
          <li><strong>Critical Success</strong> The target returns in an adult body at full Hit Points, with the spells and pool points it had when it died.</li>
          <li><strong>Success</strong> The target returns at 1 Hit Point with no prepared spells or pool points and is clumsy 2, drained 2, and enfeebled 2 for 1 week. These conditions can't be reduced early.</li>
          <li><strong>Failure</strong> The target does not return.</li>
          <li><strong>Critical Failure</strong> The soul becomes trapped in an unintelligent animal no higher than half the target's level, with Intelligence 1 (–5), and can't use its own abilities.</li>
        </ul>
        <p><strong>Heightening</strong> Maximum target level: 10 at 4th rank; 12 at 5th; 14 at 6th (dead no longer than 1 month); 16 at 7th (1 month); 18 at 8th (1 year); 20 at 9th (1 decade).</p>

        <h3>Resurrection</h3>
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd>1 day; up to 4 aspects</dd></div>
          <div class="stat-line"><dt>Primary Check</dt><dd>Religion (expert)</dd></div>
          <div class="stat-line"><dt>Secondary Checks</dt><dd>Medicine, Society, or GM discretion</dd></div>
          <div class="stat-line"><dt>Range & Target</dt><dd>10 feet; one dead creature up to 10th level that died within the past year</dd></div>
        </dl>
        <ul>
          <li><strong>Critical Success</strong> The target returns at full Hit Points with the spells and pool points it had when it died, retains long-term debilitations, and gains a +1 status bonus to attack rolls, Perception, saves, and skill checks for 1 week.</li>
          <li><strong>Success</strong> The target returns at 1 Hit Point with no prepared spells or pool points, retains long-term debilitations, and is clumsy 1, drained 1, and enfeebled 1 for 1 week. These conditions can't be reduced early.</li>
          <li><strong>Failure</strong> The attempt is unsuccessful.</li>
          <li><strong>Critical Failure</strong> Something goes horribly wrong, such as possession, undeath, or another fate chosen by the GM.</li>
        </ul>
        <p><strong>Heightening</strong> Maximum target level: 12 at 6th rank; 14 at 7th (dead no longer than 1 decade); 16 at 8th; 18 at 9th (dead no longer than 1 century); 20 at 10th (no death-time limit).</p>

        <h3>Raise Dead</h3>
        <dl class="stat-block">
          <div class="stat-line"><dt>Cast</dt><dd>10 minutes; up to 4 aspects</dd></div>
          <div class="stat-line"><dt>Primary Check</dt><dd>Religion (expert)</dd></div>
          <div class="stat-line"><dt>Range & Target</dt><dd>10 feet; one dead creature up to 13th level that died within the past 3 days</dd></div>
        </dl>
        <p>On a successful return, the creature has 1 Hit Point, no prepared spells, spell slots, pool points, or other daily resources, and retains any long-term debilitations. It is clumsy 2, drained 2, and enfeebled 2 for 1 week; these conditions can't be reduced early.</p>
        <p><strong>Heightening</strong> Maximum target level: 15 at 7th rank; 17 at 8th; 19 at 9th; 21 at 10th.</p>

        <h3>Scrolls</h3>
        <p>A player character can attempt to cast a scroll with a DC 16 flat check. This keeps scrolls usable in a group without an appropriate spellcaster and creates a dramatic choice between using a scroll now or saving it to learn later.</p>

        <h3>Spell Areas</h3>
        <p>When playing on a physical mat, spell areas that would otherwise be spheres are treated as cylinders. This keeps measurement and template placement simple and imaginable at the table.</p>

        <h2>Specific Spells</h2>
        <h3>Mending</h3>
        <p><em>Mending</em> can affect a magic item when the caster has the Magical Crafting feat and succeeds at the Crafting DC for that item.</p>

        <h2>Item Mechanics</h2>
        <p>Magic items do not automatically adjust to a creature's size and are not immune to ordinary damage and wear.</p>
        <p>This creates useful reasons for martial characters to spend money and for characters to invest in Crafting.</p>
      `
    },
    {
      id: "camp-meal-and-cooking-rules",
      title: "Camp Meal & Cooking Rules",
      category: "Rules",
      typeLabel: "Exploration Rules",
      levelLabel: "Subsystem",
      headingLabel: "Cooking",
      traits: ["House Rule", "Downtime", "Exploration", "Survival"],
      summary: "Rules for basic and special meals, favorite dishes, harvesting ingredients, Subsisting, and ingredient decay.",
      intro: "Turn rations and harvested ingredients into meaningful camp meals with lasting benefits.",
      source: "Camp Meal & Cooking Rules | PF2 and Mechanics Codex",
      contentHtml: `
        <h2>Cook Basic Meal</h2>
        <dl class="stat-block">
          <div class="stat-line"><dt>Time</dt><dd>2 hours</dd></div>
          <div class="stat-line"><dt>Ingredients</dt><dd>2 basic ingredients per serving, harvested while Subsisting or supplied from rations</dd></div>
          <div class="stat-line"><dt>Rations</dt><dd>1 day's rations per serving</dd></div>
          <div class="stat-line"><dt>Check</dt><dd>DC 22 Survival or DC 18 Cooking Lore</dd></div>
        </dl>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Result</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td>Critical Success</td><td>Recover Hit Points equal to twice your level multiplied by your Constitution modifier. Gain a +1 status bonus to all saves until your next daily preparations.</td></tr>
              <tr><td>Success</td><td>Gain a +1 status bonus to all saves until your next daily preparations.</td></tr>
              <tr><td>Failure</td><td>The meal tastes good but provides no mechanical benefit.</td></tr>
              <tr><td>Critical Failure</td><td>Become sickened 1 until you rest and complete your next daily preparations.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Cook Special Meal</h2>
        <dl class="stat-block">
          <div class="stat-line"><dt>Time</dt><dd>2 hours</dd></div>
          <div class="stat-line"><dt>Ingredients</dt><dd>The special and/or basic ingredient unique to the dish, per serving</dd></div>
          <div class="stat-line"><dt>Rations</dt><dd>1 day's rations per serving</dd></div>
          <div class="stat-line"><dt>Check</dt><dd>Survival or Cooking Lore against the DC of the meal</dd></div>
          <div class="stat-line"><dt>Duration</dt><dd>Unless otherwise stated, 24 hours or until the next rest</dd></div>
        </dl>
        <p>The result depends on the meal. Fresh special ingredients are level 3 items of light Bulk worth 5 gp.</p>

        <h2>Favorite Meals</h2>
        <ul>
          <li>A character can declare a favorite meal after experiencing that meal's success effect twice or its critical success effect once.</li>
          <li>The character gains the meal's favorite-meal benefit starting with the next time they consume it.</li>
          <li>A character can have only one favorite meal.</li>
          <li>To change favorites, the character must first experience the new meal's critical success effect twice.</li>
        </ul>

        <h2>Harvesting</h2>
        <ul>
          <li>Attempt a Survival check against the standard DC for the creature's level.</li>
          <li>A success produces 1 special ingredient usable for the corresponding recipe; a critical success produces 2.</li>
          <li>Only one attempt can be made per creature, and each attempt takes 10 minutes.</li>
        </ul>

        <h2>Subsist</h2>
        <p>Attempt once per day after spending 8 hours in the area. Otherwise, apply a –5 penalty.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Proficiency</th><th>DC</th><th>Example Environment</th></tr></thead>
            <tbody>
              <tr><td>Untrained</td><td>10</td><td>Lush forest, calm weather, large city</td></tr>
              <tr><td>Trained</td><td>15</td><td>Typical hillside, village</td></tr>
              <tr><td>Expert</td><td>20</td><td>Typical mountains, rural hamlet</td></tr>
              <tr><td>Master</td><td>30</td><td>Typical desert, city under siege</td></tr>
              <tr><td>Legendary</td><td>40</td><td>Barren wasteland, city of undead</td></tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Result</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td>Critical Success</td><td>Find enough for yourself and another creature, or find higher-quality supplies for yourself.</td></tr>
              <tr><td>Success</td><td>Find enough for yourself.</td></tr>
              <tr><td>Failure</td><td>Become fatigued until you find food and shelter.</td></tr>
              <tr><td>Critical Failure</td><td>Something bad happens, and you take a –2 circumstance penalty to Subsist for 1 week.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ingredient Decay</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Ingredient</th><th>Days Until Decayed</th></tr></thead>
            <tbody>
              <tr><td>Body part</td><td>2</td></tr>
              <tr><td>Undead part</td><td>7</td></tr>
              <tr><td>Bones</td><td>—</td></tr>
              <tr><td>Feathers</td><td>—</td></tr>
              <tr><td>Ears</td><td>14</td></tr>
              <tr><td>Hair</td><td>—</td></tr>
              <tr><td>Head</td><td>3</td></tr>
              <tr><td>Hides or pelts</td><td>10</td></tr>
              <tr><td>Liquid, vial</td><td>7</td></tr>
              <tr><td>Liquid, slime</td><td>14</td></tr>
              <tr><td>Poisons or venoms</td><td>14</td></tr>
              <tr><td>Tattoos</td><td>5</td></tr>
              <tr><td>Wings</td><td>7</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Mechanics Codex: Foraging</h2>
        <p>When foraging, attempt a Subsist check for the day's effort. For each point by which the result exceeds the DC, you obtain one ingredient, provided the environment can supply it. A basic ingredient costs 4 sp—the same price as a ration—when purchased.</p>

        <h2>General Expiry & Decomposition</h2>
        <p>The Mechanics Codex also supplies the following broader timeline. It does not specify which table takes priority when this overlaps with the more specific ingredient-decay table above.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Material or Stage</th><th>Time</th><th>Result</th></tr></thead>
            <tbody>
              <tr><td>Plant matter</td><td>2d6 days</td><td>Spoils</td></tr>
              <tr><td>Raw meat</td><td>2d6 hours</td><td>Spoils</td></tr>
              <tr><td>Skin</td><td>24 + 1d20 hours</td><td>Spoils</td></tr>
              <tr><td>Internal organs decompose</td><td>24 + 2d20 hours</td><td>Rigor, blisters, and loosening skin</td></tr>
              <tr><td>Bloat</td><td>2d4 days</td><td>Body size doubles; odor, insects, and foamy leakage</td></tr>
              <tr><td>Active decay starts</td><td>8–10 days</td><td>Color change</td></tr>
              <tr><td>Active decay</td><td>10+ days</td><td>Nails and teeth loosen; body liquefies</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "cryomister",
      title: "Cryomister",
      category: "Items",
      typeLabel: "Gadget",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Uncommon", "Cold", "Consumable", "Gadget"],
      summary: "A thrown cooling device that freezes a small area into temporary difficult terrain.",
      intro: "A metallic device that disperses a heavy, rapidly cooling mist across nearby surfaces.",
      source: "Cryomister-1749879414.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Interact</dd></div>
          <div class="stat-line"><dt>Placement</dt><dd>Adjacent square or tossed up to 20 feet</dd></div>
        </dl>
        <p>On activation, the cryomister creates a 5-foot burst of ice. The affected area is difficult terrain for 1 minute. At the GM's discretion, this duration can be shorter in unusually hot conditions or longer in unusually cold conditions. Fire damage to an affected square removes the difficult terrain there.</p>
        <p>The cooling mist deals 1 cold splash damage to creatures in the area when activated. A creature moving through the area can attempt a DC 17 Acrobatics check to ignore the difficult terrain and move at its normal Speed.</p>
        <p>If thrown onto a liquid, the device instead creates a floating piece of ice for the same duration. The ice can support one Medium creature.</p>
      `
    },
    {
      id: "amalas-kickback",
      title: "Amala's Kickback",
      category: "Items",
      typeLabel: "Alchemical Oil",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Rare", "Consumable", "Healing", "Alchemical", "Oil", "Magical"],
      summary: "An oil that turns the lingering malice of a recent weapon strike into healing for its victim.",
      intro: "This oil is poured onto a weapon that has recently damaged an enemy.",
      source: "AmalasKickback-1749875183.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
        </dl>
        <p>You pour the oil onto a weapon when activating it. If that weapon damaged a creature within the last 10 minutes, the most recent creature damaged by the weapon regains the listed number of Hit Points.</p>
        <p>The alchemy relies on the malice behind the attack, so the weapon must have been used against an enemy of the attacker. A willing ally can't take damage from a friend's weapon merely to enable this healing.</p>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied JSON and rendered card refer to a “listed number” of Hit Points but do not include that number. No value has been invented here.</p>
        </section>
      `
    },
    {
      id: "wand-of-allfood",
      title: "Wand of Allfood",
      category: "Items",
      typeLabel: "Magic Wand",
      levelLabel: "Item 3",
      headingLabel: "Item 3",
      traits: ["Magical", "Wand"],
      summary: "A cherry-wood wand with a coral core, identified by its source as a wand of allfood.",
      intro: "Cherry wood surrounds a bone-like core made from coral.",
      source: "WandofAllfood-1749873249.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd>Cast a Spell</dd></div>
          <div class="stat-line"><dt>Frequency</dt><dd>Once per day, plus overcharge</dd></div>
          <div class="stat-line"><dt>Effect</dt><dd>Cast the spell at the indicated rank</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record does not state the spell's rank or reproduce its spell text.</p>
        </section>
      `
    },
    {
      id: "wand-of-shielded-arm",
      title: "Wand of Shielded Arm",
      category: "Items",
      typeLabel: "Magic Wand",
      levelLabel: "Item 3",
      headingLabel: "Item 3",
      traits: ["Magical", "Wand"],
      summary: "An ivory wand with a troll-hair core and a gold endcap, identified as a wand of shielded arm.",
      intro: "This ivory wand contains a troll-hair core and is capped with gold at its base.",
      source: "WandofShieldedArm-1749873118.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd>Cast a Spell</dd></div>
          <div class="stat-line"><dt>Frequency</dt><dd>Once per day, plus overcharge</dd></div>
          <div class="stat-line"><dt>Effect</dt><dd>Cast the spell at the indicated rank</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record does not state the spell's rank or reproduce its spell text.</p>
        </section>
      `
    },
    {
      id: "healing-potion-custom",
      title: "Healing Potion",
      category: "Items",
      typeLabel: "Alchemical Consumable",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Consumable", "Healing", "Alchemical", "Potion", "Vitality"],
      summary: "A steel flask of viscous red liquid with a rancid-sweet aroma.",
      intro: "A steel flask with wooden decoration holds a viscous red liquid; opening it releases a rancid-sweet aroma.",
      source: "HealingPotion-1749872849.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>4 gp</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record provides the item's presentation but no healing amount or other effect. No missing mechanics have been inferred.</p>
        </section>
      `
    },
    {
      id: "merciful-balm",
      title: "Merciful Balm",
      category: "Items",
      typeLabel: "Alchemical Oil",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Consumable", "Alchemical", "Oil"],
      summary: "A thick herbal paste that temporarily makes a weapon nonlethal.",
      intro: "This thick, sticky paste smells strongly of herbs and pine resin.",
      source: "MercifulBalm-1749872695.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 2 hands</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>Light</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> (Manipulate)</dd></div>
        </dl>
        <p>You anoint a weapon with the balm. That weapon gains the nonlethal trait for 1 hour.</p>
      `
    },
    {
      id: "itchy-scale",
      title: "Itchy Scale",
      category: "Items",
      typeLabel: "Alchemical Consumable",
      levelLabel: "Item 2",
      headingLabel: "Item 2",
      traits: ["Uncommon", "Consumable", "Alchemical"],
      summary: "A swallowed scale that temporarily extends how long you can hold your breath.",
      intro: "This dark, iridescent scale is about the size of a small coin.",
      source: "ItchyScale-1749872602.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>5 gp</dd></div>
          <div class="stat-line"><dt>Usage</dt><dd>Held in 1 hand</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Interact</dd></div>
        </dl>
        <p>When you swallow the scale, your skin immediately develops scales. For 1 hour, you can hold your breath for 15 rounds plus your Constitution modifier instead of 5 rounds plus your Constitution modifier before drowning. At the end of the hour, the scales wither and fall away.</p>
      `
    },
    {
      id: "bull-et",
      title: "BULL-et",
      category: "Items",
      typeLabel: "Magical Ammunition",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Rare", "Consumable", "Magical"],
      summary: "A magical cartridge whose silver projectile is sculpted into a bison's head.",
      intro: "Its silver projectile is worked into a bison's head, above a marbled brown-amber cartridge resembling petrified wood.",
      source: "BULL-et-1749872282.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record contains appearance and price only; it does not specify a mechanical effect.</p>
        </section>
      `
    },
    {
      id: "yellow-bullet",
      title: "Yellow Bullet",
      category: "Items",
      typeLabel: "Magical Ammunition",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Rare", "Consumable", "Magical"],
      summary: "A magical round formed entirely from yellow, quartz-like crystal.",
      intro: "The whole round is made from yellow quartz-like crystal and ends in a rounded tip.",
      source: "YellowBullet-1749872134.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record contains appearance and price only; it does not specify a mechanical effect.</p>
        </section>
      `
    },
    {
      id: "seam-coil-bullet",
      title: "Seam-Coil Bullet",
      category: "Items",
      typeLabel: "Magical Ammunition",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Rare", "Consumable", "Magical"],
      summary: "A magical cartridge with a split-looking projectile and a tightly wound coil casing.",
      intro: "The projectile has a barely visible seam down its middle, while its cartridge case resembles a tightly wound coil.",
      source: "Seam-CoilBullet-1749872014.json and matching stat card",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Price</dt><dd>3 gp</dd></div>
          <div class="stat-line"><dt>Bulk</dt><dd>—</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Source note:</strong> The supplied record contains appearance and price only; it does not specify a mechanical effect.</p>
        </section>
      `
    },
    {
      id: "sibyl",
      title: "Sibyl",
      category: "Creatures",
      typeLabel: "Creature",
      levelLabel: "Creature 3",
      headingLabel: "Creature 3",
      traits: ["Human", "Humanoid"],
      summary: "A divinely frenzied oracle whose foresight protects against divination magic.",
      intro: "A mortal oracle with lifesense, spontaneous divine magic, and a dangerous divine frenzy.",
      source: "_MConverter.eu_Sibyl - actor-creature.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+9; lifesense 60 feet</dd></div>
          <div class="stat-line"><dt>Languages</dt><dd>Common</dd></div>
          <div class="stat-line"><dt>Skills & Abilities</dt><dd>Str +0, Dex +3, Con –1, Int +2, Wis +2, Cha +4</dd></div>
          <div class="stat-line"><dt>Items</dt><dd>Bundle of herbs, dagger</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>18</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +6, Ref +8, Will +12</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>40</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>25 feet</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Foresight <span class="action-icon" aria-label="reaction">↺</span></h3>
          <p><strong>Trigger</strong> The sibyl becomes the target of a spell with the detection, prediction, revelation, or scrying trait.</p>
          <p><strong>Effect</strong> The sibyl gains a +2 circumstance bonus to its saving throw or AC against the triggering spell.</p>
        </section>
        <h2>Offense</h2>
        <dl class="stat-block">
          <div class="stat-line"><dt>Melee</dt><dd>Dagger +10 (agile, finesse, versatile S), Damage 1d4+4 piercing</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Fist +10 (agile, finesse, nonlethal, unarmed), Damage 1d4+4 bludgeoning</dd></div>
          <div class="stat-line"><dt>Ranged</dt><dd>Dagger +10 (agile, thrown 10 feet, versatile S), Damage 1d4+4 piercing</dd></div>
          <div class="stat-line"><dt>Divine Spells</dt><dd>DC 21, spell attack +11</dd></div>
        </dl>
        <p><strong>2nd</strong> <em>augury, darkness, sudden blight</em>; <strong>1st</strong> <em>command, concordant choir, fear, mindlink</em>; <strong>Cantrips (2nd)</strong> <em>detect magic, divine lance, guidance, haunting hymn, know the way</em>.</p>
        <p><strong>Oracle Focus Spell</strong> (DC 21, spell attack +11) <em>brain drain</em>.</p>
        <section class="rules-subcard">
          <h3>Divine Frenzy <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Traits</strong> Concentrate, Divine, Emotion, Mental; <strong>Requirements</strong> The sibyl isn't fatigued or already in a frenzy.</p>
          <p>The sibyl enters a divine frenzy for 1 minute and can't voluntarily end it. During the frenzy, it takes a –2 penalty to Perception checks and Will saves and gains a +2 status bonus to its spell DC and spell attack modifier. It can't use concentrate actions except to Cast a Spell or Seek. The frenzy ends if the sibyl becomes unconscious or the encounter ends.</p>
        </section>
      `
    },
    {
      id: "mixer-construct",
      title: "Mixer",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Huge", "Construct", "Mindless"],
      summary: "A huge construction automaton that pours cement and leaves foes slowed in its wake.",
      intro: "A massive, mindless mixer built to haul and pour cement.",
      source: "Mixer1749858809.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+3; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +9, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +5, Dex +0, Con +4, Int –5, Wis +0, Cha –5</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +9, Ref +5, Will +3</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>35; Weaknesses fire 5</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>30 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Fist +9, Damage 2d6+1 bludgeoning</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove a small appendage.</p>
        </section>
        <section class="rules-subcard">
          <h3>Pour Cement <span class="action-icon" aria-label="two actions">◆◆</span></h3>
          <p><strong>Earth</strong> The mixer dumps cement in a 30-foot cone. Creatures in the area attempt a DC 15 basic Reflex save against 2d6 bludgeoning damage. The area becomes greater difficult terrain. A creature that fails is slowed 1 for 1 round.</p>
        </section>
        <section class="rules-subcard">
          <h3>Messy Strike</h3>
          <p><strong>Earth</strong> When the mixer lands a critical hit, the target is slowed 1 for 1 round.</p>
        </section>
      `
    },
    {
      id: "hydrant-construct",
      title: "Hydrant",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Huge", "Construct", "Mindless"],
      summary: "A huge water-projecting automaton that drenches fires and shoves creatures with a powerful spout.",
      intro: "A massive, mindless hydrant construct built to control fires and project high-pressure water.",
      source: "Hydrant1749858774.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+3; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +9, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +5, Dex +0, Con +4, Int –5, Wis +0, Cha –5</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +9, Ref +5, Will +3</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>35; Resistances bludgeoning 10, piercing 10, slashing 10; Weaknesses cold 5</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental, water</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>20 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Fist +9 (grab +9, pull +9, push +9), Damage 2d8+2 bludgeoning</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove a small appendage.</p>
        </section>
        <section class="rules-subcard">
          <h3>Drench <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Water</strong> The hydrant extinguishes all fires in either a 5-foot emanation or a 15-foot line.</p>
        </section>
        <section class="rules-subcard">
          <h3>Spout <span class="action-icon" aria-label="two actions">◆◆</span></h3>
          <p><strong>Water</strong> The hydrant spews a 30-foot line of water. Creatures in the line attempt a DC 15 basic Reflex save against 2d8 bludgeoning damage. On a failure, the hydrant also shoves the creature in a direction of its choosing.</p>
        </section>
      `
    },
    {
      id: "tongs-construct",
      title: "Tongs",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Medium", "Construct", "Mindless"],
      summary: "An all-terrain automaton with grasping tongs, a fiery belch, and a disarming greeting.",
      intro: "A mindless utility construct that can climb, swim, grapple, and deliver a pre-programmed greeting.",
      source: "Tongs1749858009.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+4; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +6, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +4, Dex –1, Con +4, Int –4, Wis +2, Cha –1</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +8, Ref +3, Will +6</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>26</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>30 feet, climb 30 feet, swim 30 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Tongs +10 (grapple), Damage 0</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove one of Tongs's limbs.</p>
        </section>
        <section class="rules-subcard">
          <h3>Fiery Belch <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Fire</strong> Tongs spews hot air and embers into an adjacent space. Creatures there attempt a DC 13 basic Reflex save against 1d6 fire damage.</p>
        </section>
        <section class="rules-subcard">
          <h3>Pre-Programmed Greeting <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Auditory, Mental</strong> Tongs delivers a programmed greeting to an adjacent creature. The creature attempts a DC 17 Will save. On a failure, it is off-guard against Tongs's next action, then becomes immune to this effect.</p>
        </section>
      `
    },
    {
      id: "wrecking-ball-construct",
      title: "Wrecking Ball",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Medium", "Construct", "Mindless"],
      summary: "A slow but heavily resistant construct that barrels through occupied spaces.",
      intro: "A compact demolition construct built to trample obstacles and creatures alike.",
      source: "WreckingBall1749856493.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+4; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +6, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +4, Dex –1, Con +4, Int –4, Wis +2, Cha –1</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +8, Ref +3, Will +6</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>26; Resistances bludgeoning 10, piercing 10, slashing 10</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>15 feet</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove one of the construct's limbs.</p>
        </section>
        <section class="rules-subcard">
          <h3>Wrecking Ball <span class="action-icon" aria-label="three actions">◆◆◆</span></h3>
          <p><strong>Knockdown</strong> The construct Strides twice, trampling through creatures' spaces. A creature whose space it enters attempts a DC 15 basic Reflex save against 1d8+4 bludgeoning damage. The attack gains Knockdown (+6): on a success the target is prone; on a critical success it is prone and takes 1d6 bludgeoning damage; on a critical failure the acting construct is prone.</p>
        </section>
      `
    },
    {
      id: "forge-construct",
      title: "Forge",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Large", "Construct", "Mindless"],
      summary: "A mobile forge that exhales searing embers, repairs itself, and attacks with heated tools.",
      intro: "A mindless, mobile forge fitted with hammers, tongs, and a hot-coal launcher.",
      source: "Forge1749855980.json (newer of two supplied Forge records)",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+4; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +6, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +4, Dex –1, Con +4, Int –4, Wis +2, Cha –1</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +8, Ref +3, Will +6</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>26; Resistance slashing 10; Weaknesses water 5, cold 5</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>25 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Hammer +8, Damage 1d6+3 bludgeoning</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Tongs +6 (grapple), Damage 1d4+2 fire</dd></div>
          <div class="stat-line"><dt>Ranged</dt><dd>Hot Coal +3, Damage 1d4+2 fire</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove one of the forge's limbs.</p>
        </section>
        <section class="rules-subcard">
          <h3>Fiery Belch <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Fire</strong> The forge spews hot air and embers in a 15-foot cone. Creatures in the cone attempt a DC 13 basic Reflex save against 5d6 fire damage.</p>
        </section>
        <section class="rules-subcard">
          <h3>Repair <span class="action-icon" aria-label="one action">◆</span></h3>
          <p><strong>Manipulate</strong> The forge repairs itself, regaining 1d12 Hit Points.</p>
        </section>
      `
    },
    {
      id: "lumberjack-construct",
      title: "Lumberjack",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Medium", "Construct", "Mindless"],
      summary: "A timber-working automaton armed with a saw and throwable lengths of lumber.",
      intro: "A mindless utility construct designed for heavy forestry work.",
      source: "Lumberjack1749855895.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+4; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +6, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +4, Dex –1, Con +4, Int –4, Wis +2, Cha –1</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +8, Ref +3, Will +6</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>26; Weaknesses fire 5</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>25 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Saw +8, Damage 1d6+3 bludgeoning</dd></div>
          <div class="stat-line"><dt>Ranged</dt><dd>Two by Four +3, Damage 1d4+2 bludgeoning</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove one of the lumberjack's limbs.</p>
        </section>
      `
    },
    {
      id: "anvil-construct",
      title: "Anvil",
      category: "Creatures",
      typeLabel: "Construct",
      levelLabel: "Creature 1",
      headingLabel: "Creature 1",
      traits: ["Medium", "Construct", "Mindless"],
      summary: "A slow, sturdy construct that charges with a hammer and knocks enemies prone.",
      intro: "A mindless, mobile anvil built to ram targets and strike with an attached hammer.",
      source: "Anvil1749854826.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Perception</dt><dd>+4; darkvision</dd></div>
          <div class="stat-line"><dt>Skills</dt><dd>Athletics +6, Stealth +3 (+7 in urban environments)</dd></div>
          <div class="stat-line"><dt>Abilities</dt><dd>Str +4, Dex –1, Con +4, Int –4, Wis +2, Cha –1</dd></div>
          <div class="stat-line"><dt>AC</dt><dd>15</dd></div>
          <div class="stat-line"><dt>Saves</dt><dd>Fort +8, Ref +3, Will +6</dd></div>
          <div class="stat-line"><dt>HP</dt><dd>26; Resistances bludgeoning 10, slashing 10</dd></div>
          <div class="stat-line"><dt>Immunities</dt><dd>Bleed, death effects, disease, doomed, drained, fatigued, healing, necromancy, nonlethal attacks, paralyzed, poison, sickened, unconscious, mental</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>15 feet</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Hammer +8, Damage 1d8+4 bludgeoning</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Tongs +6 (grapple), Damage 0</dd></div>
          <div class="stat-line"><dt>Melee</dt><dd>Knockdown +6 (trip), Damage 0</dd></div>
        </dl>
        <section class="rules-subcard">
          <h3>Detachable</h3>
          <p>A trained creature can attempt a DC 18 Thievery check to Disable a Device and remove one of the anvil's limbs.</p>
        </section>
        <section class="rules-subcard">
          <h3>Ram <span class="action-icon" aria-label="two actions">◆◆</span></h3>
          <p><strong>Knockdown</strong> The anvil Strides twice and then makes a hammer Strike. The Strike gains Knockdown: on a success the target is prone; on a critical success it is prone and takes 1d6 bludgeoning damage; on a critical failure the anvil is prone.</p>
        </section>
      `
    },
    {
      id: "we4land-venting-and-submersion",
      title: "WE4LAND: Venting & Submersion",
      category: "Rules",
      typeLabel: "Character Rule",
      levelLabel: "House Rule",
      headingLabel: "Automaton",
      traits: ["House Rule", "Automaton", "Environmental", "Water"],
      summary: "Character-specific rules for WE4LAND's weight, underwater venting, overheating, and post-submersion corrosion.",
      intro: "WE4LAND's construction makes submersion a problem of buoyancy, heat management, and corrosion rather than ordinary breathing.",
      source: "WE4LAND and Venting (Google Doc)",
      contentHtml: `
        <h2>Weight & Buoyancy</h2>
        <ul>
          <li>Using aluminum as the assumed material density, WE4LAND weighs about three times as much as a typical person: 18 Bulk, approximately halfway between the Large and Huge Bulk guidelines.</li>
          <li>Venting provides enough buoyancy that WE4LAND does not rapidly sink.</li>
          <li>Venting functions only while WE4LAND is conscious and online.</li>
        </ul>

        <h2>Venting Underwater</h2>
        <p>WE4LAND's cooling system requires airflow and was designed for a thin upper atmosphere. When submerged or otherwise unable to vent, WE4LAND risks overheating.</p>
        <dl class="stat-block">
          <div class="stat-line"><dt>Initial Capacity</dt><dd>7 rounds (5 + Constitution modifier)</dd></div>
          <div class="stat-line"><dt>End of Each Turn</dt><dd>Reduce remaining capacity by 1, or by 2 if WE4LAND attacked or Cast a Spell that turn</dd></div>
          <div class="stat-line"><dt>Critical Stress</dt><dd>Lose 1 additional round after each critical hit or critical failure against a damaging effect</dd></div>
          <div class="stat-line"><dt>At 0 Rounds</dt><dd>WE4LAND begins overheating</dd></div>
        </dl>
        <section class="rules-subcard">
          <p><strong>Rounds remaining:</strong> ______ / 7</p>
        </section>

        <h2>Overheating</h2>
        <p>If WE4LAND takes any action while overheating, it must attempt a DC 20 Fortitude save at the end of that turn.</p>
        <ul>
          <li><strong>Failure</strong> WE4LAND takes 1d10 fire damage.</li>
          <li>After the first check, the DC increases by 5 and the damage increases by 1d10 for each subsequent check.</li>
          <li>These cumulative increases remain until maintenance is performed.</li>
          <li>Maintenance can be performed only while WE4LAND is not submerged.</li>
        </ul>

        <h2>Corrosion</h2>
        <p>Immediately after leaving water or another polar substance, WE4LAND must spend at least 1 hour performing preventative maintenance and drying. If this is not done, roll 1d6 and apply the corresponding condition from the source's listed order.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>1d6</th><th>Condition</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Clumsy</td></tr>
              <tr><td>2</td><td>Drained</td></tr>
              <tr><td>3</td><td>Enfeebled</td></tr>
              <tr><td>4</td><td>Fatigued</td></tr>
              <tr><td>5</td><td>Off-Guard</td></tr>
              <tr><td>6</td><td>Slowed</td></tr>
            </tbody>
          </table>
        </div>
        <p>If the result uses a condition value, that value begins at 1 and increases by 1 for each day without maintenance.</p>
      `
    },
    {
      id: "walking-cauldron",
      title: "Walking Cauldron",
      category: "Items",
      typeLabel: "Wondrous Item",
      levelLabel: "Item 1",
      headingLabel: "Item 1",
      traits: ["Invested", "Magical"],
      summary: "A self-propelled cauldron that follows its owner while carrying potion ingredients or liquids.",
      intro: "A five-Bulk cauldron animated to follow its invested owner on ungainly legs.",
      source: "WalkingCauldron-1762715401.json",
      contentHtml: `
        <dl class="stat-block">
          <div class="stat-line"><dt>Bulk</dt><dd>5</dd></div>
          <div class="stat-line"><dt>Speed</dt><dd>25 feet</dd></div>
          <div class="stat-line"><dt>Capacity</dt><dd>Up to 3 Bulk of potion ingredients or other liquids</dd></div>
          <div class="stat-line"><dt>Activate</dt><dd><span class="action-icon" aria-label="one action">◆</span> Command (Auditory, Concentrate)</dd></div>
        </dl>
        <p>Command the cauldron to follow you or stand in place. While following, it does its best to remain within 30 feet of you, but its movements are too imprecise to direct predictably during combat or another situation measured in seconds and exact locations.</p>
        <p>The cauldron can carry up to 3 Bulk of potion ingredients or other liquids while following. If overloaded, or if anything else is placed inside it, the cauldron stands in place and refuses to move for at least 10 minutes after the excess is removed.</p>
        <section class="rules-subcard">
          <h3>Investment</h3>
          <p>Its owner must sacrifice an insect to the cauldron each day to maintain investment.</p>
        </section>
      `
    }
  ];
})();
