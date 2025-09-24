import { useEffect, useRef } from "react";
import { CactiController } from "./classes/cacti-controller";
import { Ground } from "./classes/ground";
import { Player } from "./classes/player";
import { Score } from "./classes/score";
import { getGameConstants } from "./constants";
import "./style.css";

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // let animationId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 799;
    const MOBILE_GAME_WIDTH = Math.max(window.innerWidth * 0.8, 200); // ancho mínimo 400px para móviles

    const {
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
    } = getGameConstants(isMobile ? MOBILE_GAME_WIDTH : 800); // usa 800 en desktop

    let scaleRatio: number;
    let prevTime: number | null = null;
    let gameSpeed = GAME_DIFFICULTY_SPEED_START;
    let gameOver = false;
    let restartEvent = false;
    let waitingToStart = true;

    let player!: Player;
    let ground!: Ground;
    let cactiController!: CactiController;
    let score!: Score;

    function createSprites() {
      const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
      const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
      const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
      const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

      player = new Player(
        ctx!,
        playerWidthInGame,
        playerHeightInGame,
        minJumpHeightInGame,
        maxJumpHeightInGame,
        scaleRatio
      );
      ground = new Ground(
        ctx!,
        GROUND_WIDTH * scaleRatio,
        GROUND_HEIGHT * scaleRatio,
        GAME_SPEED,
        scaleRatio
      );

      const cactiImages = CACTI_CONFIG.map((cacti) => {
        const image = new Image();
        image.src = cacti.image;
        return {
          image,
          width: cacti.width * scaleRatio,
          height: cacti.height * scaleRatio,
        };
      });

      cactiController = new CactiController(
        ctx!,
        canvas!,
        cactiImages,
        scaleRatio,
        GAME_SPEED
      );
      score = new Score(ctx!, scaleRatio);
    }

    function setScreen() {
      const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
      );
      const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
      );

      scaleRatio =
        screenWidth / GAME_WIDTH < screenHeight / GAME_HEIGHT
          ? screenWidth / GAME_WIDTH
          : screenHeight / GAME_HEIGHT;

      canvas!.width = GAME_WIDTH * scaleRatio;
      canvas!.height = GAME_HEIGHT * scaleRatio;

      createSprites();
    }

    function resetListeners() {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
      window.addEventListener("mousedown", reset, { once: true });
    }

    function showText(text: string) {
      const fontSize = 40 * scaleRatio;
      ctx!.font = `${fontSize}px Verdana`;
      ctx!.fillStyle = "grey";
      ctx!.fillText(text, canvas!.width / 14, canvas!.height / 2);
    }

    function setupGameReset() {
      if (!restartEvent) {
        restartEvent = true;
        setTimeout(() => resetListeners(), 1000);
      }
    }

    function updateGameSpeed(frameTimeDelta: number) {
      gameSpeed += frameTimeDelta * GAME_DIFFICULTY_SPEED_INCREMENT;
    }

    function clearScreen() {
      ctx!.fillStyle = "white";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
    }

    function reset() {
      restartEvent = false;
      gameOver = false;
      waitingToStart = false;
      ground.reset();
      cactiController.reset();
      score.reset();
      gameSpeed = GAME_DIFFICULTY_SPEED_START;
    }

    function gameLoop(frameTime: number) {
      if (prevTime === null) {
        prevTime = frameTime;
        requestAnimationFrame(gameLoop);
        return;
      }

      const frameTimeDelta = frameTime - prevTime;
      prevTime = frameTime;
      clearScreen();

      if (!gameOver && !waitingToStart) {
        ground.update(gameSpeed, frameTimeDelta);
        cactiController.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
      }

      if (!gameOver && cactiController.collideWith(player)) {
        gameOver = true;
        setupGameReset();
        score.setHighScore();
      }

      player.draw();
      cactiController.draw();
      ground.draw();
      score.draw();

      if (gameOver) showText("Tap Screen or Press Space To Start");
      if (waitingToStart) showText("Tap Screen or Press Space To Start");

      requestAnimationFrame(gameLoop);
    }

    setScreen();
    resetListeners();
    requestAnimationFrame(gameLoop);

    window.addEventListener("resize", setScreen);
    window.addEventListener("orientationchange", setScreen);

    return () => {
      window.removeEventListener("resize", setScreen);
      window.removeEventListener("orientationchange", setScreen);
      // mouse
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
      // touch
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchend", () => {});
      // keyboard
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("keyup", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} id="game" className="w-full h-full" />;
}
