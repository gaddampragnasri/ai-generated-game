import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, isPaused, isGameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 5, y: 5 });
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-sm glitch-border rounded-lg">
      <div className="flex justify-between w-full mb-4 font-pixel text-2xl">
        <div className="text-[var(--color-neon-cyan)]">SCORE: {score.toString().padStart(4, '0')}</div>
        <div className="text-[var(--color-neon-magenta)] uppercase">
          {isGameOver ? 'SYSTEM FAILURE' : isPaused ? 'IDLE' : 'EXECUTING...'}
        </div>
      </div>

      <div 
        className="relative grid bg-black/60 border border-[var(--color-neon-cyan)]/30"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(80vw, 400px)',
          height: 'min(80vw, 400px)'
        }}
      >
        {/* Food */}
        <motion.div
          className="absolute bg-[var(--color-neon-magenta)] shadow-[0_0_10px_var(--color-neon-magenta)]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={`${i}-${segment.x}-${segment.y}`}
            className="absolute"
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              backgroundColor: i === 0 ? 'var(--color-neon-cyan)' : 'rgba(0, 243, 255, 0.5)',
              boxShadow: i === 0 ? '0 0 10px var(--color-neon-cyan)' : 'none',
              zIndex: 10
            }}
          />
        ))}

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20"
            >
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-pixel text-[var(--color-neon-magenta)] glitch-text mb-4">GAME OVER</h2>
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-[var(--color-neon-cyan)] text-black font-bold hover:bg-[var(--color-neon-magenta)] transition-colors"
                  >
                    REBOOT
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-pixel text-[var(--color-neon-cyan)] mb-4">PAUSED</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="px-6 py-2 border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] font-bold hover:bg-[var(--color-neon-cyan)] hover:text-black transition-all"
                  >
                    RESUME
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-xs text-[var(--color-neon-cyan)]/50 font-mono text-center">
        USE ARROW KEYS TO NAVIGATE // SPACE TO PAUSE
      </div>
    </div>
  );
}
