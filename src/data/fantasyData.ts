export type CharacterClass = 'Mage' | 'Warrior' | 'Rogue';

export interface PortraitData {
  id: string;
  url: string;
  title: string;
  description: string;
  className: CharacterClass;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  className: CharacterClass;
  title: string;
  race: string;
  weapon: string;
  ability: string;
  backstory: string;
  // Three core player card stats with visual bars
  health: number;
  mana: number;
  strength: number;
  maxStat: number; // e.g. 150 for consistent bar percentage
  stats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    wisdom: number;
    charisma: number;
  };
  quote: string;
  timestamp: number;
  portraitUrl?: string;
  portraitTitle?: string;
}

export const CLASS_PORTRAITS: Record<CharacterClass, PortraitData[]> = {
  Mage: [
    {
      id: 'mage-1',
      url: '/src/assets/images/mage_portrait_1_1793690909798.jpg',
      title: 'Archmage of the Celestial Rift',
      description: 'Hooded arcane wizard with glowing eyes and crystal conduits',
      className: 'Mage'
    },
    {
      id: 'mage-2',
      url: '/src/assets/images/mage_portrait_2_1793690912443.jpg',
      title: 'Sorceress of the Starlight',
      description: 'Celestial enchantress with radiant hair and floating runes',
      className: 'Mage'
    },
    {
      id: 'mage-3',
      url: '/src/assets/images/mage_portrait_3_1793690943943.jpg',
      title: 'Pyromancer of the Primordial Flame',
      description: 'Fiery elemental evoker with searing flame orbs',
      className: 'Mage'
    }
  ],
  Warrior: [
    {
      id: 'warrior-1',
      url: '/src/assets/images/warrior_portrait_1_1793690910414.jpg',
      title: 'Champion of the Golden Lion',
      description: 'Golden plate vanguard with roaring lion crest and war aura',
      className: 'Warrior'
    },
    {
      id: 'warrior-2',
      url: '/src/assets/images/warrior_portrait_2_1793690911614.jpg',
      title: 'Dwarven Rune Guardian',
      description: 'Stalwart mountain defender with braided beard and war hammer',
      className: 'Warrior'
    },
    {
      id: 'warrior-3',
      url: '/src/assets/images/warrior_portrait_3_1793690944901.jpg',
      title: 'Valkyrie Blade-Marshal',
      description: 'Silver plate knight with sapphire crest and engraved broadsword',
      className: 'Warrior'
    }
  ],
  Rogue: [
    {
      id: 'rogue-1',
      url: '/src/assets/images/rogue_portrait_1_1793690910969.jpg',
      title: 'Venomfang Shadow-Blade',
      description: 'Hooded cowl assassin wielding dual poison-coated daggers',
      className: 'Rogue'
    },
    {
      id: 'rogue-2',
      url: '/src/assets/images/rogue_portrait_2_1793690911769.jpg',
      title: 'Twilight Forest Scout',
      description: 'Keen-eyed elf infiltrator with obsidian throwing blade',
      className: 'Rogue'
    },
    {
      id: 'rogue-3',
      url: '/src/assets/images/rogue_portrait_3_1793690944735.jpg',
      title: 'Nightshade Phantom Shinobi',
      description: 'Masked assassin shrouded in purple smoke with throwing kunai',
      className: 'Rogue'
    }
  ]
};

export const FIRST_NAMES = [
  'Aeloria', 'Thorgar', 'Zephyra', 'Kaelen', 'Morwenna', 'Boran', 
  'Seraphina', 'Draven', 'Elowen', 'Ignis', 'Valerius', 'Sylas', 
  'Branwen', 'Rowan', 'Faelynn', 'Orin', 'Vesperia', 'Kieran', 
  'Thalia', 'Soren', 'Astrid', 'Malakor', 'Elion', 'Nyx', 
  'Cassian', 'Gwendolyn', 'Alistair', 'Fenrik', 'Danika', 'Rhiannon',
  'Alden', 'Mireille', 'Theron', 'Lyanna', 'Kazimir', 'Baelor'
];

export const SURNAMES = [
  'Whisperwind', 'Ironbreaker', 'Shadowblade', 'Stormcaller', 'Emberfall',
  'Frostveil', 'Sunstrider', 'Nightwalker', 'Deepdelver', 'Voidweaver',
  'Runeshaper', 'Wolfbane', 'Silverthorn', 'Ashenvale', 'Bloodtusk',
  'Lightbringer', 'Starwatcher', 'Galeheart', 'Oakenshield', 'Duskweaver',
  'Moonshadow', 'Cinderglen', 'Bramblethorn', 'Ravenshade', 'Stonepeak'
];

export const TITLES = [
  'the Undaunted', 'the Silent Blade', 'of the Astral Spire', 'the Ironbound',
  'the Spellforged', 'the Moon-Touched', 'the Unbroken', 'of the Whispering Mist',
  'the Ashen', 'the Sovereign', 'the Keen-Eyed', 'of the Sunken Ruins',
  'the Phantom', 'the Dragon-Hearted', 'the Storm-Blessed'
];

export const RACES = [
  'High Elf', 'Dwarf', 'Human', 'Shadow Elf', 'Half-Orc', 
  'Tiefling', 'Dragonborn', 'Gnome', 'Aasimar', 'Sylph'
];

export const CLASS_DETAILS: Record<
  CharacterClass,
  {
    themeColor: string;
    badgeBg: string;
    borderColor: string;
    glowColor: string;
    cardBorder: string;
    lore: string;
    archetype: string;
    primaryStat: string;
    weapons: string[];
    abilities: string[];
    quotes: string[];
    statWeights: {
      strength: number;
      dexterity: number;
      intelligence: number;
      constitution: number;
      wisdom: number;
      charisma: number;
    };
  }
> = {
  Mage: {
    themeColor: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
    borderColor: 'border-purple-500/60',
    glowColor: 'shadow-[0_0_35px_rgba(168,85,247,0.3)]',
    cardBorder: 'border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.4)]',
    archetype: 'Wielder of Arcane & Elemental Mysteries',
    primaryStat: 'Intelligence',
    lore: 'Channels the primordial currents of the cosmos to shape reality, incinerate foes, and bend time.',
    weapons: ['Starlight Oak Staff', 'Astral Conduit Wand', 'Tome of Celestial Runes', 'Crystal Orb of Azimuth'],
    abilities: ['Arcane Nova', 'Chronoshift', 'Chain Lightning', 'Abyssal Singularity', 'Frostbite Ward'],
    quotes: [
      '"Knowledge is not merely power; it is the fundamental fabric of existence."',
      '"The universe whispers its secrets only to those daring enough to burn."',
      '"Reality is merely a tapestry waiting for my needle."'
    ],
    statWeights: {
      strength: 8,
      dexterity: 12,
      intelligence: 18,
      constitution: 11,
      wisdom: 15,
      charisma: 13
    }
  },
  Warrior: {
    themeColor: 'from-amber-600 to-red-600',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
    borderColor: 'border-amber-500/60',
    glowColor: 'shadow-[0_0_35px_rgba(245,158,11,0.3)]',
    cardBorder: 'border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.4)]',
    archetype: 'Bulwark of Iron & Unrelenting Steel',
    primaryStat: 'Strength',
    lore: 'Tempered in the crucible of battle, boasting unyielding endurance and mastery over martial arms.',
    weapons: ['Dragonflame Greatsword', 'Runed Bastion Shield & Axe', 'Sunforged War Pike', 'Titanic Earthbreaker Maul'],
    abilities: ['Berserker Roar', 'Shield Slam', 'Colossus Cleave', 'Indomitable Stand', 'Whirlwind of Blades'],
    quotes: [
      '"A shield guards the flesh; honor protects the soul."',
      '"My bones may break before my shield falters."',
      '"Stand firm, let the earth tremble beneath their fear, not ours."'
    ],
    statWeights: {
      strength: 18,
      dexterity: 13,
      intelligence: 9,
      constitution: 17,
      wisdom: 11,
      charisma: 12
    }
  },
  Rogue: {
    themeColor: 'from-emerald-500 to-teal-700',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
    borderColor: 'border-emerald-500/60',
    glowColor: 'shadow-[0_0_35px_rgba(16,185,129,0.3)]',
    cardBorder: 'border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.4)]',
    archetype: 'Shadow Walker & Master of Precision',
    primaryStat: 'Dexterity',
    lore: 'Moves like a ghost through twilight, striking from unseen angles with surgical, lethal precision.',
    weapons: ['Dual Viperfang Daggers', 'Silent Obsidian Crossbow', 'Venom-Coated Scian', 'Garrote of Gossamer Silk'],
    abilities: ['Shadowstep', 'Venomous Ambush', 'Smoke Mirage', 'Eviscerating Flurry', 'Phantom Cloak'],
    quotes: [
      '"You will only hear me when it is already too late to turn."',
      '"Darkness is not an absence of light; it is my armor."',
      '"Gold is silent. Steel is decisive."'
    ],
    statWeights: {
      strength: 11,
      dexterity: 18,
      intelligence: 13,
      constitution: 12,
      wisdom: 14,
      charisma: 14
    }
  }
};

export const CLASSES: CharacterClass[] = ['Mage', 'Warrior', 'Rogue'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomizeStat(base: number): number {
  const roll = base + Math.floor(Math.random() * 6) - 2;
  return Math.min(20, Math.max(6, roll));
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a cartoon/video game-style portrait for a character based on class & name.
 * If currentPortraitUrl is supplied (e.g. for Regenerate), ensures a different portrait is selected.
 */
export function getPortraitForCharacter(
  className: CharacterClass,
  characterName: string,
  currentPortraitUrl?: string
): PortraitData {
  const pool = CLASS_PORTRAITS[className] || CLASS_PORTRAITS.Mage;
  
  if (currentPortraitUrl) {
    const alternativePool = pool.filter(p => p.url !== currentPortraitUrl);
    if (alternativePool.length > 0) {
      return getRandomItem(alternativePool);
    }
  }
  
  let hash = 0;
  for (let i = 0; i < characterName.length; i++) {
    hash = (hash << 5) - hash + characterName.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

/**
 * Generates a unique 1-to-2-sentence fantasy origin story based on name and class.
 */
export function generateCharacterBackstory(
  name: string,
  className: CharacterClass
): string {
  const firstName = name.split(' ')[0] || name;

  const mageOrigins = [
    `Born beneath a rare stellar convergence above the Astral Spire, ${firstName} decoded the forbidden runes of eternity before ever uttering a spoken incantation.`,
    `Found as an infant enveloped in starlight ribbons within an ancient obsidian observatory, ${name} discovered that ambient magical ley-lines instinctively obey their command.`,
    `Once a humble apprentice archivist, ${firstName} survived the cataclysmic collapse of the Celestial Archive by absorbing a primordial arcane singularity directly into their soul.`,
    `Hailing from the misty valleys of Aethelgard, ${name} studied forbidden chronomancy within the Crystal Vaults until reality itself began whispering its secrets.`,
    `Exiled from the High Arcanum for daring to harmonize shadow flame with celestial frost, ${firstName} created a new discipline of spellcraft that defies the elders.`
  ];

  const mageDestinies = [
    `Now wielding primordial cosmic forces, they wander the fractured realms seeking to prevent the eternal eclipse prophesied in the stars.`,
    `Today, reality bends effortlessly to their fingertips as they seek lost celestial relics to safeguard mortal existence.`,
    `Armed with devastating astral sorcery, they stand as the solitary barrier against encroaching void horrors from beyond the veil.`
  ];

  const warriorOrigins = [
    `Forged in the merciless blizzards of the Frostfang Mountains, ${firstName} became the legendary lone survivor who held the gates of Ironhold against an army of ash drakes.`,
    `Born to a line of renowned royal vanguards, ${name} shattered their commander's dishonorable orders to single-handedly shield an entire village from annihilation.`,
    `Raised in the volcanic depths of the Caldera Forge, ${firstName} was tempered like molten steel through years of brutal gladiatorial warfare.`,
    `Carrying an ancestral broadsword passed down through twenty generations of champions, ${name} survived three mortal wounds to fell the titan of Oakhaven.`,
    `Once the sworn champion of the High King, ${firstName} walked away from the throne when corrupt nobles poisoned the court, choosing the honorable life of a wandering vanguard.`
  ];

  const warriorDestinies = [
    `Now driven by an unbreakable code of martial honor, they carve a path of retribution across kingdoms tainted by tyranny.`,
    `With blood and steel coursing through their veins, they march fearlessly into the darkest battles as an immovable bulwark for the defenseless.`,
    `Today, their thundering war cry rallies desperate legions to improbable victory against overwhelming monstrous hordes.`
  ];

  const rogueOrigins = [
    `Raised in the labyrinthine shadow-alleys of the Sunken Quarter, ${firstName} learned to pick deadbolts and outrun imperial sentries before they were old enough to hold a quill.`,
    `Once the infamous shadow of the Black Feather Guild, ${name} vanished into the night after liberating the royal treasury and distributing it among the starving populace.`,
    `Left for dead in the treacherous Bramble Swamps, ${firstName} survived by communing with phantom ravens and coating twin obsidian daggers in fatal viper venom.`,
    `Trained in complete secrecy by the Twilight Syndicate, ${name} defected upon discovering their masters intended to assassinate the realm's last peacemaker.`,
    `Orphaned during the Night of Red Moons, ${firstName} mastered the lost art of smoke-weaving, leaving no footprints even when walking across fresh snow.`
  ];

  const rogueDestinies = [
    `Now moving like a whisper through twilight, they execute surgical strikes against despots who believe wealth places them above justice.`,
    `Striking from the darkest recesses with lethal precision, they sell their loyalty to none save their own ironclad moral compass.`,
    `Today, their venom-coated blades and unseen footsteps dispense swift retribution in a realm blind to the cries of the oppressed.`
  ];

  if (className === 'Mage') {
    return `${getRandomItem(mageOrigins)} ${getRandomItem(mageDestinies)}`;
  } else if (className === 'Warrior') {
    return `${getRandomItem(warriorOrigins)} ${getRandomItem(warriorDestinies)}`;
  } else {
    return `${getRandomItem(rogueOrigins)} ${getRandomItem(rogueDestinies)}`;
  }
}

export function generateRandomCharacter(): FantasyCharacter {
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const title = getRandomItem(TITLES);
  const fullName = `${firstName} ${surname}`;
  const className = getRandomItem(CLASSES);
  const race = getRandomItem(RACES);
  const details = CLASS_DETAILS[className];

  const stats = {
    strength: randomizeStat(details.statWeights.strength),
    dexterity: randomizeStat(details.statWeights.dexterity),
    intelligence: randomizeStat(details.statWeights.intelligence),
    constitution: randomizeStat(details.statWeights.constitution),
    wisdom: randomizeStat(details.statWeights.wisdom),
    charisma: randomizeStat(details.statWeights.charisma)
  };

  // Generate 3 core player card stats (Health, Mana, Strength) based on class profile
  let health: number;
  let mana: number;
  let strength: number;

  if (className === 'Mage') {
    health = randomInRange(75, 105);
    mana = randomInRange(120, 150);
    strength = randomInRange(50, 80);
  } else if (className === 'Warrior') {
    health = randomInRange(120, 150);
    mana = randomInRange(40, 70);
    strength = randomInRange(125, 150);
  } else {
    // Rogue
    health = randomInRange(90, 120);
    mana = randomInRange(80, 110);
    strength = randomInRange(90, 125);
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: fullName,
    className,
    title,
    race,
    weapon: getRandomItem(details.weapons),
    ability: getRandomItem(details.abilities),
    backstory: generateCharacterBackstory(fullName, className),
    health,
    mana,
    strength,
    maxStat: 150,
    stats,
    quote: getRandomItem(details.quotes),
    timestamp: Date.now(),
    portraitUrl: undefined,
    portraitTitle: undefined
  };
}
