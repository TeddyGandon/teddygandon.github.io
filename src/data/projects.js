// Personal / side projects, chronological: the first shipped game, the
// open-source platform built after it, then the game running on top of it.
export const sideProjects = [
  {
    name: "Drifter's Tales",
    kind: 'Game · Steam',
    url: 'https://store.steampowered.com/app/1935960/Drifters_Tales/',
    cta: 'View on Steam',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1935960/ss_426c4b6349636fe3797e7a4eaeafd63d9cfa5204.1920x1080.jpg',
    imageAlt: "Screenshot of Drifter's Tales",
    description:
      'A dark fantasy card battler told across thirteen branching narrative stories inspired by classic game books. Tactical, board-based combat against pattern-based opponents, built from a deck of 80 unique cards, rather than an endless roguelike grind.',
    note: 'Released July 2022. Solo-developed, single-player and multiplayer, published under The First Spine.',
  },
  {
    name: 'The First Spine - Arena',
    kind: 'Game · Steam · Early Access',
    url: 'https://store.steampowered.com/app/3307700/The_First_Spine__Arena/',
    cta: 'View on Steam',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3307700/bb9f8ba81d41c087ad8186de793a296d4583b526/ss_bb9f8ba81d41c087ad8186de793a296d4583b526.1920x1080.jpg',
    imageAlt: 'Screenshot of The First Spine — Arena',
    description:
      'A free-to-play PvP duel where two wizards summon creatures and cast spells across a 7×7 grid shaped by environmental hazards. Level-based matchmaking, seasonal ruleset rotations, and cross-platform play, built on the platform above.',
    note: 'Early Access since May 2026, free to play.',
  },
  {
    name: 'The First Spine (platform)',
    kind: 'Open source · GitHub',
    url: 'https://github.com/thefirstspine-org',
    cta: 'View on GitHub',
    image: 'https://cms.thefirstspine.fr/uploads/modern_simple_overlap_circle_lines_gradient_texture_on_dark_background_with_copy_space_vector_31cd645cdc.jpg',
    imageAlt: 'Abstract illustration for The First Spine platform',
    description:
      'The open-source backend behind both games: independent NestJS microservices for matchmaking and game-instance orchestration, real-time WebSocket messaging, and player chat rooms, plus the shared type packages and deployment tooling that hold it together.',
    note: '21 repositories, TypeScript/NestJS/Docker, MPL-2.0.',
  },
];
