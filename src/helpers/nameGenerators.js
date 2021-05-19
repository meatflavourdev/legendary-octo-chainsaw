// nameGenerator

const adjectivesAnimals = [
  'Adorable',
  'aggressive',
  'Aggressive',
  'agile',
  'Agile',
  'Beautiful',
  'Bossy',
  'Candid',
  'carnivorous',
  'Carnivorous',
  'clever',
  'Clever',
  'Cold-Blooded',
  'Cold',
  'Colorful',
  'Cuddly',
  'Curious',
  'Cute',
  'dangerous',
  'Dangerous',
  'Deadly',
  'domestic',
  'Domestic',
  'Dominant',
  'Energetic',
  'Fast',
  'Feisty',
  'ferocious',
  'Ferocious',
  'Fierce',
  'Fluffy',
  'Friendly',
  'furry',
  'Furry',
  'Fuzzy',
  'Grumpy',
  'Hairy',
  'Heavy',
  'herbivorous',
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
  'poisonous',
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
  'tame',
  'Tame',
  'Tenacious',
  'Territorial',
  'tiny',
  'Tiny',
  'Vicious',
  'Warm',
  'wild',
  'Wild',
];

const adjectivesAnonymous = [
  'abberant',
  'abnormal',
  'anomalous',
  'anonymous',
  'atypical',
  'baffling',
  'bewildering',
  'bizzare',
  'concealed',
  'cryptic',
  'curious',
  'deviant',
  'deviating',
  'different',
  'distant',
  'divergent',
  'eccentric',
  'eldritch',
  'enigmatic',
  'esoteric',
  'exceptional',
  'exotic',
  'foreign',
  'heteroclite',
  'heterodox',
  'heteromorphic',
  'idosyncratic',
  'impenetrable',
  'incognito',
  'incongruous',
  'inexplicable',
  'inscrutable',
  'intangible',
  'irregular',
  'labyrinthine',
  'muddled',
  'mysterious',
  'mystifying',
  'nameless',
  'nonconforming',
  'nondescript',
  'nonstandard',
  'obscure',
  'odd',
  'oddball',
  'offbeat',
  'outlandish',
  'paradoxical',
  'peculiar',
  'perplexing',
  'pseudonymous',
  'puzzling',
  'queer',
  'rare',
  'recondite',
  'remote',
  'secretive',
  'singular',
  'strange',
  'uncanny',
  'uncommon',
  'undubbed',
  'unfamiliar',
  'unfathomable',
  'unidentified',
  'unknown',
  'unmarked',
  'unnamed',
  'unnatural',
  'unorthodox',
  'unrepresentative',
  'unrevealed',
  'unsigned',
  'unspecified',
  'unsung',
  'untold',
  'untraceable',
  'unusual',
  'weird',
];

const adjectivesConcepts = [
  'aerodynamic',
  'alien',
  'amorphous',
  'anomalous',
  'audacious',
  'awesome',
  'Beautiful',
  'Beautiful',
  'brilliant',
  'Candid',
  'clever',
  'Clever',
  'clever',
  'Clever',
  'Colorful',
  'Colorful',
  'complex',
  'comprehensive',
  'Curious',
  'dangerous',
  'dangerous',
  'delightful',
  'dubious',
  'dynamic',
  'earthshaking',
  'einsteinian',
  'elusive',
  'Energetic',
  'Extradimensional',
  'fascinating',
  'fashionable',
  'fleeting',
  'frightening',
  'fundamental',
  'Heavy',
  'incompatible',
  'incontrivertable',
  'indeterminate',
  'intellectual',
  'interesting',
  'introspective',
  'irrational',
  'kooky',
  'Large',
  'ludricrous',
  'lunatic',
  'Malicious',
  'mathematical',
  'meaningless',
  'misanthropic',
  'modern',
  'monolithic',
  'nebulous',
  'newfangled',
  'Non-Coporeal',
  'nonsensical',
  'notional',
  'objective',
  'operational',
  'original',
  'philophical',
  'Playful',
  'poetical',
  'pragmatic',
  'probabilistic',
  'problematic',
  'puzzling',
  'reactionary',
  'relativistic',
  'remarkable',
  'schematic',
  'scietific',
  'Self-Contained',
  'startling',
  'straightforward',
  'strategic',
  'suprising',
  'technological',
  'tenuous',
  'theoretical',
  'tiny',
  'transcendental',
  'unabiguous',
  'unconvential',
  'unimaginable',
  'universal',
  'unknowable',
  'unprecedented',
  'weird',
  'wild',
  'workable',
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
  'Donkey',
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
  {
    name: "Raccoon",
    url: 'avatar/svg/062-raccoon_transparent.svg',
  },
];

const nounsConcepts = [
  'abstraction',
  'analysis',
  'approach',
  'aspect',
  'assumption',
  'attribute',
  'brainchild',
  'brainwave',
  'charter',
  'communique',
  'concept',
  'conception',
  'consideration',
  'construct',
  'creation',
  'credo',
  'definition',
  'design',
  'doctrine',
  'document',
  'dream',
  'element',
  'embodiment',
  'ethos',
  'example',
  'explanation',
  'figment',
  'formulation',
  'fundamental',
  'generalization',
  'gestalt',
  'hypothesis',
  'information',
  'inkling',
  'instance',
  'intellection',
  'interpretation',
  'metaphor',
  'method',
  'methodology',
  'misnomer',
  'mode',
  'model',
  'Modus Operandi',
  'notion',
  'ontology',
  'paradigm',
  'paradox',
  'perception',
  'philosophy',
  'picture',
  'plan',
  'postulate',
  'precept',
  'predicate',
  'principle',
  'procedure',
  'program',
  'proof',
  'prototype',
  'rationale',
  'representation',
  'representation',
  'schema',
  'speculation',
  'strategy',
  'structure',
  'supposition',
  'technique',
  'tenet',
  'theme',
  'theorem',
  'theory',
  'thought',
  'universality',
  'version',
  'view',
  'vision',
  'visualization',
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
