// src/components/loadingScreen/constants.ts
export function getGameConstants(GAME_WIDTH: number, GAME_HEIGHT: number) {
  const PLAYER_WIDTH = GAME_WIDTH * (88 / 1200);
  const PLAYER_HEIGHT = GAME_HEIGHT * (94 / 200);
  const MAX_JUMP_HEIGHT = GAME_HEIGHT;
  const MIN_JUMP_HEIGHT = GAME_HEIGHT * 0.75;
  const GROUND_WIDTH = GAME_WIDTH * 3;
  const GROUND_HEIGHT = GAME_HEIGHT * 0.12;
  const GAME_SPEED = 0.5;
  const GAME_DIFFICULTY_SPEED_START = 0.75;
  const GAME_DIFFICULTY_SPEED_INCREMENT = 0.00001;

  const CACTI_CONFIG = [
    {
      width: GAME_WIDTH * (48 / 800),
      height: GAME_HEIGHT * (100 / 200),
      image: "/imgs/cactus_1.png",
    },
    {
      width: GAME_WIDTH * (98 / 800),
      height: GAME_HEIGHT * (100 / 200),
      image: "/imgs/cactus_2.png",
    },
    {
      width: GAME_WIDTH * (68 / 800),
      height: GAME_HEIGHT * (70 / 200),
      image: "/imgs/cactus_3.png",
    },
  ];

  return {
    GAME_WIDTH,
    GAME_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    MAX_JUMP_HEIGHT,
    MIN_JUMP_HEIGHT,
    GROUND_WIDTH,
    GROUND_HEIGHT,
    GAME_SPEED,
    GAME_DIFFICULTY_SPEED_START,
    GAME_DIFFICULTY_SPEED_INCREMENT,
    CACTI_CONFIG,
  };
}