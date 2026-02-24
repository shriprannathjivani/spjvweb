import { useRef, useEffect, useMemo } from 'react';

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  fontFamily = `font-arya`
}: {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
  characters: string;
  fontFamily?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      baseColor: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  // ✅ Hindi-safe grapheme splitting
  const lettersAndSymbols = useMemo(() => {
    if (!characters) return [' '];

    try {
      const segmenter = new Intl.Segmenter('hi', { granularity: 'grapheme' });
      return [...segmenter.segment(characters)].map(s => s.segment);
    } catch {
      return Array.from(characters);
    }
  }, [characters]);

  const safeColors = glitchColors.length > 0 ? glitchColors : ['#61dca3'];

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return safeColors[Math.floor(Math.random() * safeColors.length)];
  };

  const hexToRgb = (hex?: string) => {
    if (!hex || !hex.startsWith('#')) return null;

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    return {
      columns: Math.ceil(width / charWidth),
      rows: Math.ceil(height / charHeight),
    };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const total = columns * rows;

    letters.current = Array.from({ length: total }, () => {
      const color = getRandomColor();
      return {
        char: getRandomChar(),
        color,
        baseColor: color,
        targetColor: color,
        colorProgress: 1,
      };
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
  };

  const drawLetters = () => {
    if (!context.current) return;

    const ctx = context.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      const letter = letters.current[index];
      if (!letter) continue;

      letter.char = getRandomChar();
      letter.targetColor = getRandomColor();
      letter.baseColor = letter.color;
      letter.colorProgress = smooth ? 0 : 1;

      if (!smooth) {
        letter.color = letter.targetColor;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;

    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const start = hexToRgb(letter.baseColor);
        const end = hexToRgb(letter.targetColor);

        if (start && end) {
          letter.color = interpolateColor(
            start,
            end,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();

    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();
    drawLetters();
    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current!);
      resizeCanvas();
      drawLetters();
      animate();
    };
    const loadFont = async () => {
      await document.fonts.ready;
      resizeCanvas();
      drawLetters();
      animate();
    };

    loadFont();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
    };
  }, [glitchSpeed, smooth, characters, fontFamily]);

  return (

    <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] select-none font-arya">
      <canvas ref={canvasRef} className="block w-full h-full font-arya" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none from-[#fceee8] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none from-[#fdece4] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      )}
    </div>

  );
};

export default LetterGlitch;
