import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './play.css';

const GOOD_ITEMS = ['🫐', '🍓', '🍇', '🍒', '🍑', '🍎', '🍉', '🍊'];
const BAD_ITEMS = ['👹', '👺', '👿', '☠️', '🤡', '💩'];

export default function Play() {
  const [gameState, setGameState] = useState('start'); 
  const [items, setItems] = useState([]);
  const [jarCount, setJarCount] = useState(0);
  const [jarItems, setJarItems] = useState([]);
  const [missed, setMissed] = useState(0);
  const [showMissFlash, setShowMissFlash] = useState(false);

  const jarPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
  const [jarRenderPos, setJarRenderPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
  const itemIdCounter = useRef(0);
  const animationFrameRef = useRef();
  const spawnIntervalRef = useRef();


  useEffect(() => {

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';

    const handleMouseMove = (e) => {
      jarPos.current = { x: e.clientX, y: e.clientY };
      setJarRenderPos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      jarPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setJarRenderPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      if (navbar) navbar.style.display = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnItem = () => {
      const isBad = Math.random() < 0.4; 
      const itemList = isBad ? BAD_ITEMS : GOOD_ITEMS;
      const emoji = itemList[Math.floor(Math.random() * itemList.length)];

      const newItem = {
        id: itemIdCounter.current++,
        emoji,
        isBad,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: -50,
        speed: 6 + Math.random() * 3, 
      };

      setItems((prev) => [...prev, newItem]);
    };

    spawnIntervalRef.current = setInterval(spawnItem, 350); 
    return () => clearInterval(spawnIntervalRef.current);
  }, [gameState]);

  const catchGoodItem = useCallback((emoji) => {
    setJarCount((prev) => prev + 1);
    setJarItems((prev) => [...prev.slice(-7), emoji]);
  }, []);

  const catchBadItem = useCallback(() => {
    setGameState('lose');
  }, []);

  useEffect(() => {
    if (jarCount >= 15 && gameState === 'playing') {
      setGameState('win');
    }
  }, [jarCount, gameState]);

  useEffect(() => {
    if (missed >= 5 && gameState === 'playing') {
      setGameState('lose');
    }
  }, [missed, gameState]);

  useEffect(() => {
    if (gameState !== 'playing') {
      cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const gameLoop = () => {
      const jarRect = {
        left: jarPos.current.x - 40,
        right: jarPos.current.x + 40,
        top: jarPos.current.y - 50,
        bottom: jarPos.current.y + 50,
      };

      setItems((prevItems) => {
        const updatedItems = [];

        for (const item of prevItems) {
          const newY = item.y + item.speed;

          if (
            item.x > jarRect.left &&
            item.x < jarRect.right &&
            newY > jarRect.top &&
            newY < jarRect.bottom
          ) {
            if (item.isBad) {
              catchBadItem();
            } else {
              catchGoodItem(item.emoji);
            }
            continue;
          }

          if (newY > window.innerHeight + 50) {
            if (!item.isBad) {
              setMissed((prev) => prev + 1);
              setShowMissFlash(true);
              setTimeout(() => setShowMissFlash(false), 300);
            }
            continue;
          }

          updatedItems.push({ ...item, y: newY });
        }

        return updatedItems;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [gameState, catchGoodItem, catchBadItem]);

  const startGame = () => {
    setJarCount(0);
    setJarItems([]);
    setItems([]);
    setMissed(0);
    setGameState('playing');
  };

  return (
    <div className="catch-container">
      <Link to="/" className="catch-back">← Exit</Link>
      <AnimatePresence>
        {gameState === 'start' && (
          <motion.div
            className="catch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <h1 className="catch-title">🍓 Fruits Jar 🍓</h1>
              <p className="catch-subtitle">catch 15 fruits. avoid the baddies. good luck.</p>
              <p className="catch-difficulty">INSANESUPERDIFFICULTIMPOSSIBLE MODE</p>
              <motion.button
                className="catch-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                Play!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {gameState === 'playing' && (
        <div className="catch-header">
          <div className="catch-missed">💔 {missed}/5</div>
          <div className="catch-progress">{jarCount} / 15</div>
        </div>
      )}

      {showMissFlash && <div className="catch-miss-flash">MISS!</div>}

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="catch-falling-item"
            style={{ left: item.x, top: item.y }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {gameState === 'playing' && (
        <motion.div
          className="catch-jar"
          style={{ left: jarRenderPos.x, top: jarRenderPos.y }}
          animate={{ x: '-50%', y: '-50%' }}
        >
          <div className="catch-jar-opening" />
          <div className="catch-jar-body">
            <motion.div
              className="catch-jar-fill"
              animate={{ height: `${(jarCount / 15) * 100}%` }}
            />
            <div className="catch-jar-items">
              {jarItems.map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {gameState === 'win' && (
          <motion.div
            className="catch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 8 }}
            >
              <div className="catch-win-emoji">🏆</div>
              <h2 className="catch-win-title">YOU WIN!</h2>
              <p className="catch-win-sub">wait... you actually beat it??</p>
              <motion.button
                className="catch-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'lose' && (
          <motion.div
            className="catch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <div className="catch-win-emoji">💥</div>
              <h2 className="catch-lose-title">BOOM!</h2>
              <p className="catch-win-sub">told you it was impossible</p>
              <motion.button
                className="catch-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
