// src/components/loadingScreen/constants.ts
export function getGameConstants(GAME_WIDTH: number) {
  const GAME_HEIGHT = GAME_WIDTH * 0.25; // aspecto 4:1

  // Player más pequeño
  const PLAYER_WIDTH = GAME_WIDTH * 0.075;   // antes 0.11 → más pequeño
  const PLAYER_HEIGHT = PLAYER_WIDTH * 0.9;

  // Altura del salto
  const MAX_JUMP_HEIGHT = GAME_HEIGHT;
  const MIN_JUMP_HEIGHT = GAME_HEIGHT * 0.75;

  // Suelo
  const GROUND_WIDTH = GAME_WIDTH ;
  const GROUND_HEIGHT = GAME_HEIGHT * 0.12;

  // Velocidad y dificultad
  const GAME_SPEED = 0.5;
  const GAME_DIFFICULTY_SPEED_START = 0.75;
  const GAME_DIFFICULTY_SPEED_INCREMENT = 0.00001;

  // Cactus más pequeños
  const CACTI_CONFIG = [
    { width: GAME_WIDTH * 0.045, height: GAME_HEIGHT * 0.37, image: "/imgs/cactus_1.png" },
    { width: GAME_WIDTH * 0.098, height: GAME_HEIGHT * 0.37, image: "/imgs/cactus_2.png" },
    { width: GAME_WIDTH * 0.07, height: GAME_HEIGHT * 0.26, image: "/imgs/cactus_3.png" },
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
