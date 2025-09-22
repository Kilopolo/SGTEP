import React, { useEffect, useRef } from "react";
import "./style.css"; // estilos del juego
import { Runner } from "./Runner"; // si usas el Runner.ts del repo

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const runner = new Runner(canvas); // inicializa tu juego
    runner.start(); // si tu Runner tiene un método start

    return () => runner.stop?.(); // cleanup cuando desmonta el componente
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
