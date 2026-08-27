import { useEffect, useRef, useState } from 'react';

const W = 22;
const H = 10;
const TICK = 160;

const DIRS = {
  arrowup: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  arrowdown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  arrowleft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  arrowright: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

// Playable ASCII snake rendered as text. onEnd(score) fires on game over / quit.
export const SnakeGame = ({ onEnd }) => {
  const [, force] = useState(0);
  const game = useRef(null);
  const onEndRef = useRef(onEnd);
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const state = {
      snake: [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 12, y: 5 },
      score: 0,
      over: false,
    };
    game.current = state;

    const placeFood = () => {
      let f;
      do {
        f = {
          x: Math.floor(Math.random() * W),
          y: Math.floor(Math.random() * H),
        };
      } while (state.snake.some((seg) => seg.x === f.x && seg.y === f.y));
      state.food = f;
    };
    placeFood();

    const end = () => {
      if (state.over) return;
      state.over = true;
      clearInterval(interval);
      window.removeEventListener('keydown', onKey);
      onEndRef.current && onEndRef.current(state.score);
    };

    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
      }
      if (k === 'q') {
        end();
        return;
      }
      const nd = DIRS[k];
      if (!nd) return;
      // ignore direct reversals
      if (nd.x === -state.dir.x && nd.y === -state.dir.y) return;
      state.nextDir = nd;
    };

    const step = () => {
      state.dir = state.nextDir;
      const head = {
        x: state.snake[0].x + state.dir.x,
        y: state.snake[0].y + state.dir.y,
      };
      if (
        head.x < 0 ||
        head.x >= W ||
        head.y < 0 ||
        head.y >= H ||
        state.snake.some((seg) => seg.x === head.x && seg.y === head.y)
      ) {
        end();
        return;
      }
      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 10;
        placeFood();
      } else {
        state.snake.pop();
      }
      force((n) => n + 1);
    };

    const interval = setInterval(step, TICK);
    window.addEventListener('keydown', onKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const st = game.current;
  let text = '';
  if (st) {
    for (let y = 0; y < H; y++) {
      let row = '';
      for (let x = 0; x < W; x++) {
        if (st.snake.some((seg) => seg.x === x && seg.y === y)) row += '█';
        else if (st.food.x === x && st.food.y === y) row += '✳';
        else row += '·';
      }
      text += row + '\n';
    }
  }

  return (
    <div>
      <pre
        style={{
          margin: '4px 0',
          fontFamily: 'inherit',
          fontSize: 14,
          lineHeight: 1.15,
          color: 'var(--green)',
          letterSpacing: 2,
        }}
      >
        {text}
      </pre>
      <div style={{ fontSize: 12, color: 'var(--dim)' }}>
        steer: arrows / WASD · q to quit · score {st ? st.score : 0}
      </div>
    </div>
  );
};
