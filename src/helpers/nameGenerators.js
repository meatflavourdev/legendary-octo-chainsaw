// nameGenerator

const adjectivesAnimals = [
  'furry',
  'ferocious',
  'dangerous',
  'poisonous',
  'tame',
  'agile',
  'clever',
  'aggressive',
  'tiny',
  'domestic',
  'wild',
  'herbivorous',
  'carnivorous',
  'Adorable',
  'Aggressive',
  'Agile',
  'Beautiful',
  'Bossy',
  'Candid',
  'Carnivorous',
  'Clever',
  'Cold',
  'Cold-Blooded',
  'Colorful',
  'Cuddly',
  'Curious',
  'Cute',
  'Dangerous',
  'Deadly',
  'Domestic',
  'Dominant',
  'Energetic',
  'Fast',
  'Feisty',
  'Ferocious',
  'Fierce',
  'Fluffy',
  'Friendly',
  'Furry',
  'Fuzzy',
  'Grumpy',
  'Hairy',
  'Heavy',
  'Herbivorous',
  'Jealous',
  'Large',
  'Lazy',
  'Loud',
  'Lovable',
  'Loving',
  'Malicious',
  'Maternal',
  'Mean',
  'Messy',
  'Nocturnal',
  'Noisy',
  'Nosy',
  'Picky',
  'Playful',
  'Poisonous',
  'Quick',
  'Rough',
  'Sassy',
  'Scaly',
  'Short',
  'Shy',
  'Slimy',
  'Slow',
  'Small',
  'Smart',
  'Smelly',
  'Soft',
  'Spikey',
  'Stinky',
  'Strong',
  'Stubborn',
  'Submissive',
  'Tall',
  'Tame',
  'Tenacious',
  'Territorial',
  'Tiny',
  'Vicious',
  'Warm',
  'Wild',
];

const adjectivesAnonymous = [
  'mysterious',
  'cryptic',
  'curious',
  'enigmatic',
  'inexplicable',
  'inscrutable',
  'mystifying',
  'obscure',
  'perplexing',
  'puzzling',
  'secretive',
  'strange',
  'eldritch',
  'unknown',
  'anonymous',
  'unidentified',
  'nameless',
  'unnamed',
  'unfamiliar',
  'incognito',
  'unspecified',
  'concealed',
  'distant',
  'exotic',
  'remote',
  'unsung',
  'untold',
  'undubbed',
  'unsigned',
  'unrevealed',
  'unmarked',
  'pseudonymous',
  'unusual',
  'intangible',
  'untraceable',
  'impenetrable',
  'esoteric',
  'recondite',
  'unfathomable',
  'bewildering',
  'labyrinthine',
  'muddled',
  'paradoxical',
  'perplexing',
  'puzzling',
  'baffling',
  'nondescript'
];

const adjectivesConcepts = [
  'unprecedented',
  'newfangled',
  'dangerous',
  'introspective',
  'brilliant',
  'notional',
  'clever',
  'weird',
  'audacious',
  'theoretical',
  'dynamic',
  'indeterminate',
  'puzzling',
  'philophical',
  'tenuous',
  'unknowable',
  'Beautiful',
  'frightening',
  'Candid',
  'original',
  'Clever',
  'fleeting',
  'unconvential',
  'Colorful',
  'incontrivertable',
  'complex',
  'mathematical',
  'workable',
  'delightful',
  'Non-Coporeal',
  'scietific',
  'Energetic',
  'dubious',
  'pragmatic',
  'probabilistic',
  'monolithic',
  'nonsensical',
  'comprehensive',
  'unabiguous',
  'poetical',
  'operational',
  'meaningless',
  'lunatic',
  'fascinating',
  'technological',
  'fundamental',
  'strategic',
  'transcendental',
  'objective',
  'awesome',
  'Self-Contained',
  'unimaginable',
  'suprising',
  'modern',
  'Extradimensional',
  'universal',
  'alien',
  'intellectual',
  'misanthropic',
  'problematic',
  'remarkable',
  'fashionable',
  'startling',
  'interesting',
  'kooky',
  'incompatible',
  'schematic',
  'relativistic',
  'earthshaking',
  'reactionary',
  'einsteinian',
  'straightforward',
  'ludricrous',
  'anomalous',
  'elusive',
  'aerodynamic',
  'irrational',
  'amorphous',
  'nebulous',
  'dangerous',
  'clever',
  'tiny',
  'wild',
  'Beautiful',
  'Clever',
  'Colorful',
  'Curious',
  'Heavy',
  'Large',
  'Malicious',
  'Playful',
];

const nounsAnimals = [
  'Aardvark',
  'Albatross',
  'Alligator',
  'Alpaca',
  'Ant',
  'Anteater',
  'Antelope',
  'Ape',
  'Armadillo',
  'Donkey',
  'Baboon',
  'Badger',
  'Barracuda',
  'Bat',
  'Bear',
  'Beaver',
  'Bee',
  'Bison',
  'Boar',
  'Buffalo',
  'Butterfly',
  'Camel',
  'Capybara',
  'Caribou',
  'Cassowary',
  'Cat',
  'Caterpillar',
  'Cattle',
  'Chamois',
  'Cheetah',
  'Chicken',
  'Chimpanzee',
  'Chinchilla',
  'Chough',
  'Clam',
  'Cobra',
  'Cockroach',
  'Cod',
  'Cormorant',
  'Coyote',
  'Crab',
  'Crane',
  'Crocodile',
  'Crow',
  'Curlew',
  'Deer',
  'Dinosaur',
  'Dog',
  'Dogfish',
  'Dolphin',
  'Dotterel',
  'Dove',
  'Dragonfly',
  'Duck',
  'Dugong',
  'Dunlin',
  'Eagle',
  'Echidna',
  'Eel',
  'Eland',
  'Elephant',
  'Elk',
  'Emu',
  'Falcon',
  'Ferret',
  'Finch',
  'Fish',
  'Flamingo',
  'Fly',
  'Fox',
  'Frog',
  'Gaur',
  'Gazelle',
  'Gerbil',
  'Giraffe',
  'Gnat',
  'Gnu',
  'Goat',
  'Goldfinch',
  'Goldfish',
  'Goose',
  'Gorilla',
  'Goshawk',
  'Grasshopper',
  'Grouse',
  'Guanaco',
  'Gull',
  'Hamster',
  'Hare',
  'Hawk',
  'Hedgehog',
  'Heron',
  'Herring',
  'Hippopotamus',
  'Hornet',
  'Horse',
  'Human',
  'Hummingbird',
  'Hyena',
  'Ibex',
  'Ibis',
  'Jackal',
  'Jaguar',
  'Jay',
  'Jellyfish',
  'Kangaroo',
  'Kingfisher',
  'Koala',
  'Kookabura',
  'Kouprey',
  'Kudu',
  'Lapwing',
  'Lark',
  'Lemur',
  'Leopard',
  'Lion',
  'Llama',
  'Lobster',
  'Locust',
  'Loris',
  'Louse',
  'Lyrebird',
  'Magpie',
  'Mallard',
  'Manatee',
  'Mandrill',
  'Mantis',
  'Marten',
  'Meerkat',
  'Mink',
  'Mole',
  'Mongoose',
  'Monkey',
  'Moose',
  'Mosquito',
  'Mouse',
  'Mule',
  'Narwhal',
  'Newt',
  'Nightingale',
  'Octopus',
  'Okapi',
  'Opossum',
  'Oryx',
  'Ostrich',
  'Otter',
  'Owl',
  'Oyster',
  'Panther',
  'Parrot',
  'Partridge',
  'Peafowl',
  'Pelican',
  'Penguin',
  'Pheasant',
  'Pig',
  'Pigeon',
  'Pony',
  'Porcupine',
  'Porpoise',
  'Quail',
  'Quelea',
  'Quetzal',
  'Rabbit',
  'Raccoon',
  'Rail',
  'Ram',
  'Rat',
  'Raven',
  'Red deer',
  'Red panda',
  'Reindeer',
  'Rhinoceros',
  'Rook',
  'Salamander',
  'Salmon',
  'Sand Dollar',
  'Sandpiper',
  'Sardine',
  'Scorpion',
  'Seahorse',
  'Seal',
  'Shark',
  'Sheep',
  'Shrew',
  'Skunk',
  'Snail',
  'Snake',
  'Sparrow',
  'Spider',
  'Spoonbill',
  'Squid',
  'Squirrel',
  'Starling',
  'Stingray',
  'Stinkbug',
  'Stork',
  'Swallow',
  'Swan',
  'Tapir',
  'Tarsier',
  'Termite',
  'Tiger',
  'Toad',
  'Trout',
  'Turkey',
  'Turtle',
  'Viper',
  'Vulture',
  'Wallaby',
  'Walrus',
  'Wasp',
  'Weasel',
  'Whale',
  'Wildcat',
  'Wolf',
  'Wolverine',
  'Wombat',
  'Woodcock',
  'Woodpecker',
  'Worm',
  'Wren',
  'Yak',
  'Zebra',
];
const nounsAnimalAvatars = [
  {
    name: 'parrot',
    url: 'avatar/svg/001-parrot_transparent.svg',
  },
  {
    name: 'penguin',
    url: 'avatar/svg/002-penguin_transparent.svg',
  },
  {
    name: 'giraffe',
    url: 'avatar/svg/003-giraffe_transparent.svg',
  },
  {
    name: 'bear',
    url: 'avatar/svg/004-bear_transparent.svg',
  },
  {
    name: 'puffer Fish',
    url: 'avatar/svg/005-puffer-fish_transparent.svg',
  },
  {
    name: 'sloth',
    url: 'avatar/svg/006-sloth_transparent.svg',
  },
  {
    name: 'gorilla',
    url: 'avatar/svg/007-gorilla_transparent.svg',
  },
  {
    name: 'fox',
    url: 'avatar/svg/008-fox_transparent.svg',
  },
  {
    name: 'zebra',
    url: 'avatar/svg/009-zebra_transparent.svg',
  },
  {
    name: 'bat',
    url: 'avatar/svg/010-bat_transparent.svg',
  },
  {
    name: 'owl',
    url: 'avatar/svg/011-owl_transparent.svg',
  },
  {
    name: 'crab',
    url: 'avatar/svg/012-crab_transparent.svg',
  },
  {
    name: 'llama',
    url: 'avatar/svg/013-llama_transparent.svg',
  },
  {
    name: 'snake',
    url: 'avatar/svg/014-snake_transparent.svg',
  },
  {
    name: 'wolf',
    url: 'avatar/svg/015-wolf_transparent.svg',
  },
  {
    name: 'lion',
    url: 'avatar/svg/016-lion_transparent.svg',
  },
  {
    name: 'goat',
    url: 'avatar/svg/017-goat_transparent.svg',
  },
  {
    name: 'rabbit',
    url: 'avatar/svg/018-rabbit_transparent.svg',
  },
  {
    name: 'ferret',
    url: 'avatar/svg/019-ferret_transparent.svg',
  },
  {
    name: 'mouse',
    url: 'avatar/svg/020-mouse_transparent.svg',
  },
  {
    name: 'turtle',
    url: 'avatar/svg/021-turtle_transparent.svg',
  },
  {
    name: 'hen',
    url: 'avatar/svg/022-hen_transparent.svg',
  },
  {
    name: 'pig',
    url: 'avatar/svg/023-pig_transparent.svg',
  },
  {
    name: 'hedgehog',
    url: 'avatar/svg/024-hedgehog_transparent.svg',
  },
  {
    name: 'walrus',
    url: 'avatar/svg/025-walrus_transparent.svg',
  },
  {
    name: 'skunk',
    url: 'avatar/svg/026-skunk_transparent.svg',
  },
  {
    name: 'frog',
    url: 'avatar/svg/027-frog_transparent.svg',
  },
  {
    name: 'chameleon',
    url: 'avatar/svg/028-chameleon_transparent.svg',
  },
  {
    name: 'squirrel',
    url: 'avatar/svg/029-squirrel_transparent.svg',
  },
  {
    name: 'rhino',
    url: 'avatar/svg/030-rhino_transparent.svg',
  },
  {
    name: 'ostrich',
    url: 'avatar/svg/031-ostrich_transparent.svg',
  },
  {
    name: 'hippopotamus',
    url: 'avatar/svg/032-hippopotamus_transparent.svg',
  },
  {
    name: 'koala',
    url: 'avatar/svg/033-koala_transparent.svg',
  },
  {
    name: 'camel',
    url: 'avatar/svg/034-camel_transparent.svg',
  },
  {
    name: 'beaver',
    url: 'avatar/svg/035-beaver_transparent.svg',
  },
  {
    name: 'dog',
    url: 'avatar/svg/036-dog_transparent.svg',
  },
  {
    name: 'turkey',
    url: 'avatar/svg/037-turkey_transparent.svg',
  },
  {
    name: 'deer',
    url: 'avatar/svg/038-deer_transparent.svg',
  },
  {
    name: 'cow',
    url: 'avatar/svg/039-cow_transparent.svg',
  },
  {
    name: 'elephant',
    url: 'avatar/svg/040-elephant_transparent.svg',
  },
  {
    name: 'chicken',
    url: 'avatar/svg/041-chicken_transparent.svg',
  },
  {
    name: 'duck',
    url: 'avatar/svg/042-duck_transparent.svg',
  },
  {
    name: 'wild Boar',
    url: 'avatar/svg/043-wild-boar_transparent.svg',
  },
  {
    name: 'bee',
    url: 'avatar/svg/044-bee_transparent.svg',
  },
  {
    name: 'horse',
    url: 'avatar/svg/045-horse_transparent.svg',
  },
  {
    name: 'sheep',
    url: 'avatar/svg/046-sheep_transparent.svg',
  },
  {
    name: 'panda',
    url: 'avatar/svg/047-panda_transparent.svg',
  },
  {
    name: 'monkey',
    url: 'avatar/svg/048-monkey_transparent.svg',
  },
  {
    name: 'cat',
    url: 'avatar/svg/049-cat_transparent.svg',
  },
  {
    name: 'octopus',
    url: 'avatar/svg/050-octopus_transparent.svg',
  },
  {
    name: 'Croodleweeper',
    url: 'avatar/svg/051-croodleweeper_transparent.svg',
  },
  {
    name: 'Abgan Spaarg',
    url: 'avatar/svg/052-purple-spaarg_transparent.svg',
  },
  {
    name: 'Gaseous Lifeform',
    url: 'avatar/svg/053-gaseous-lifeform_transparent.svg',
  },
  {
    name: "Dark Ka'flam",
    url: 'avatar/svg/054-dark-kaflam_transparent.svg',
  },
  {
    name: "Seeing P'kleb",
    url: 'avatar/svg/055-seeing-pkleb_transparent.svg',
  },
  {
    name: "MonoReplicator",
    url: 'avatar/svg/056-monoreplicator_transparent.svg',
  },
  {
    name: "Fiery Bopalorn",
    url: 'avatar/svg/057-fiery-bopalorn_transparent.svg',
  },
  {
    name: "Brain-Jar",
    url: 'avatar/svg/058-brain-jar_transparent.svg',
  },
  {
    name: "Opal ThwAAr'P",
    url: 'avatar/svg/059-opal-thwaarp_transparent.svg',
  },
  {
    name: "Three-eyed Klaxonian",
    url: 'avatar/svg/060-three-eyed-klaxonian_transparent.svg',
  },
  {
    name: "Yellow Bweeeb",
    url: 'avatar/svg/061-yellow-bweeeb_transparent.svg',
  },
];

const nounsConcepts = [
  'concept',
  'notion',
  'philosophy',
  'abstraction',
  'conception',
  'hypothesis',
  'principle',
  'construct',
  'model',
  'design',
  'ontology',
  'approach',
  'vision',
  'aspect',
  'paradigm',
  'theme',
  'element',
  'metaphor',
  'brainwave',
  'supposition',
  'intellection',
  'consideration',
  'brainchild',
  'view',
  'thought',
  'perception',
  'proof',
  'document',
  'program',
  'method',
  'mode',
  'Modus Operandi',
  'procedure',
  'technique',
  'theorem',
  'tenet',
  'precept',
  'postulate',
  'paradox',
  'doctrine',
  'credo',
  'assumption',
  'explanation',
  'dream',
  'interpretation',
  'inkling',
  'picture',
  'visualization',
  'plan',
  'representation',
  'speculation',
  'version',
  'rationale',
  'generalization',
  'attribute',
  'creation',
  'example',
  'structure',
  'universality',
  'fundamental',
  'definition',
  'embodiment',
  'instance',
  'predicate',
  'figment',
  'ethos',
  'strategy',
  'prototype',
  'misnomer',
  'methodology',
  'formulation',
  'schema',
  'gestalt',
  'charter',
  'information',
  'analysis',
  'representation',
  'communique',
  'theory',
];

const util = {
  capitalizeFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  aRandom: function (length) {
    return Math.floor(Math.random() * length);
  },
};

const randomAnimal = function () {
  const adjective = adjectivesAnimals[util.aRandom(adjectivesAnimals.length)];
  const noun = nounsAnimals[util.aRandom(nounsAnimals.length)];
  return `${util.capitalizeFirstLetter(adjective)} ${util.capitalizeFirstLetter(noun)}`;
};

const anonymousAnimal = function () {
  const adjective = adjectivesAnonymous[util.aRandom(adjectivesAnonymous.length)];
  const noun = nounsAnimals[util.aRandom(nounsAnimals.length)];
  return `${util.capitalizeFirstLetter(adjective)} ${util.capitalizeFirstLetter(noun)}`;
};

const anonymousAnimalAvatar = function (urlPrefix = './') {
  const adjective = adjectivesAnonymous[util.aRandom(adjectivesAnonymous.length)];
  const noun = nounsAnimalAvatars[util.aRandom(nounsAnimalAvatars.length)];
  return {
    name: `${util.capitalizeFirstLetter(adjective)} ${util.capitalizeFirstLetter(noun.name)}`,
    url: `${urlPrefix}${noun.url}`,
  };
};

const randomConcept = function () {
  const adjective = adjectivesConcepts[util.aRandom(adjectivesConcepts.length)];
  const noun = nounsConcepts[util.aRandom(nounsConcepts.length)];
  return `${util.capitalizeFirstLetter(adjective)} ${util.capitalizeFirstLetter(noun)}`;
};

export {
  randomAnimal,
  anonymousAnimal,
  anonymousAnimalAvatar,
  randomConcept
};
