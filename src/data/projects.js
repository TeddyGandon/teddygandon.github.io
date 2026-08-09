// Personal / side projects, chronological: the first shipped game, the
// open-source platform built after it, then the game running on top of it.
export const sideProjects = [
  {
    name: "Drifter's Tales",
    kind: 'Game · Steam',
    url: 'https://store.steampowered.com/app/1935960/Drifters_Tales/',
    description:
      'A dark fantasy card battler told across thirteen branching narrative stories inspired by classic game books. Tactical, board-based combat against pattern-based opponents, built from a deck of 80 unique cards, rather than an endless roguelike grind.',
    note: 'Released July 2022. Solo-developed, single-player and multiplayer, published under The First Spine.',
  },
  {
    name: 'The First Spine (platform)',
    kind: 'Open source · GitHub',
    url: 'https://github.com/thefirstspine-org',
    description:
      'The open-source backend behind both games: independent NestJS microservices for matchmaking and game-instance orchestration, real-time WebSocket messaging, and player chat rooms, plus the shared type packages and deployment tooling that hold it together.',
    note: '21 repositories, TypeScript/NestJS/Docker, MPL-2.0.',
  },
  {
    name: 'The First Spine — Arena',
    kind: 'Game · Steam · Early Access',
    url: 'https://store.steampowered.com/app/3307700/The_First_Spine__Arena/',
    description:
      'A free-to-play PvP duel where two wizards summon creatures and cast spells across a 7×7 grid shaped by environmental hazards. Level-based matchmaking, seasonal ruleset rotations, and cross-platform play, built on the platform above.',
    note: 'Early Access since May 2026, free to play.',
  },
];
