"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo animado em canvas: grade de pontos com "sinais" que percorrem a grade
 * como trilhas de circuito. Fica atrás do conteúdo (aria-hidden, sem eventos)
 * e usa máscara CSS (`maskClassName`) para enfraquecer a área onde há texto.
 * Respeita prefers-reduced-motion (desenha um quadro estático) e pausa fora da tela.
 */

type Variant = "light" | "dark";

const palettes: Record<
  Variant,
  { line: string; dot: string; node: string; pulses: string[] }
> = {
  light: {
    line: "rgba(29, 78, 137, 0.05)",
    dot: "rgba(29, 78, 137, 0.24)",
    node: "rgba(29, 78, 137, 0.35)",
    pulses: ["14, 165, 233", "29, 78, 137", "14, 116, 196"],
  },
  dark: {
    line: "rgba(255, 255, 255, 0.04)",
    dot: "rgba(255, 255, 255, 0.14)",
    node: "rgba(34, 211, 238, 0.45)",
    pulses: ["34, 211, 238", "14, 165, 233", "125, 211, 252"],
  },
};

const CELL = 40;
const TRAIL = 180;
const TAIL_BUCKETS = 8;

type Point = { x: number; y: number };

type Pulse = {
  path: Point[]; // cantos já percorridos + posição atual no fim
  dir: Point;
  speed: number;
  color: string;
  segmentsLeft: number;
  untilTurn: number;
  fading: number; // 0 enquanto anda; depois 1 → 0 ao terminar
  done: boolean;
};

type Flash = { x: number; y: number; life: number; color: string };

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const directions: Point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export default function TechBackground({
  variant = "light",
  density = 1,
  maskClassName = "",
}: {
  variant?: Variant;
  density?: number;
  maskClassName?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const palette = palettes[variant];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let pulses: Pulse[] = [];
    let flashes: Flash[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const targetCount = () =>
      Math.max(8, Math.round(((width * height) / 26000) * density));

    function spawn(): Pulse {
      const start = {
        x: randomInt(cols + 1) * CELL,
        y: randomInt(rows + 1) * CELL,
      };
      return {
        path: [start, { ...start }],
        dir: directions[randomInt(4)],
        speed: 70 + Math.random() * 60,
        color: palette.pulses[randomInt(palette.pulses.length)],
        segmentsLeft: 6 + randomInt(10),
        untilTurn: CELL * (1 + randomInt(4)),
        fading: 0,
        done: false,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      pulses = Array.from({ length: targetCount() }, spawn);
      flashes = [];
    }

    function step(pulse: Pulse, dt: number) {
      if (pulse.fading > 0) {
        pulse.fading -= dt * 1.6;
        if (pulse.fading <= 0) pulse.done = true;
        return;
      }
      let move = pulse.speed * dt;
      while (move > 0) {
        const head = pulse.path[pulse.path.length - 1];
        const advance = Math.min(move, pulse.untilTurn);
        head.x += pulse.dir.x * advance;
        head.y += pulse.dir.y * advance;
        pulse.untilTurn -= advance;
        move -= advance;
        if (pulse.untilTurn > 0) break;

        // Chegou a um cruzamento da grade.
        pulse.segmentsLeft -= 1;
        const out =
          head.x < 0 || head.y < 0 || head.x > width || head.y > height;
        if (pulse.segmentsLeft <= 0 || out) {
          flashes.push({ x: head.x, y: head.y, life: 1, color: pulse.color });
          pulse.fading = 1;
          return;
        }
        if (Math.random() < 0.45) {
          const turn = Math.random() < 0.5 ? 1 : -1;
          pulse.dir = { x: -pulse.dir.y * turn, y: pulse.dir.x * turn };
          pulse.path.push({ ...head });
        }
        pulse.untilTurn = CELL;
      }
      trimPath(pulse);
    }

    // Mantém só o trecho final do caminho, do tamanho do rastro.
    function trimPath(pulse: Pulse) {
      let length = 0;
      for (let i = pulse.path.length - 1; i > 0; i--) {
        const a = pulse.path[i];
        const b = pulse.path[i - 1];
        length += Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        if (length > TRAIL && i > 1) {
          pulse.path.splice(0, i - 1);
          return;
        }
      }
    }

    // Ponto a `d` px atrás da cabeça, seguindo o caminho.
    function pointBehind(path: Point[], d: number): Point {
      let remaining = d;
      for (let i = path.length - 1; i > 0; i--) {
        const a = path[i];
        const b = path[i - 1];
        const seg = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        if (remaining <= seg) {
          const t = seg === 0 ? 0 : remaining / seg;
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
        remaining -= seg;
      }
      return path[0];
    }

    function drawGrid() {
      ctx!.strokeStyle = palette.line;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let c = 0; c <= cols; c++) {
        ctx!.moveTo(c * CELL + 0.5, 0);
        ctx!.lineTo(c * CELL + 0.5, height);
      }
      for (let r = 0; r <= rows; r++) {
        ctx!.moveTo(0, r * CELL + 0.5);
        ctx!.lineTo(width, r * CELL + 0.5);
      }
      ctx!.stroke();
      ctx!.fillStyle = palette.dot;
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          ctx!.fillRect(c * CELL - 1, r * CELL - 1, 2, 2);
        }
      }
    }

    function drawPulse(pulse: Pulse) {
      const fade = pulse.fading > 0 ? pulse.fading : 1;
      const head = pulse.path[pulse.path.length - 1];
      ctx!.lineWidth = 2;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      // Amostra o rastro a cada 5 px (seguindo os cantos) e desenha em faixas
      // de opacidade decrescente, da cabeça para a cauda.
      const samples: Point[] = [];
      for (let d = 0; d <= TRAIL; d += 5)
        samples.push(pointBehind(pulse.path, d));
      const perBucket = Math.ceil(samples.length / TAIL_BUCKETS);
      for (let b = 0; b < TAIL_BUCKETS; b++) {
        const first = b * perBucket;
        const lastIndex = Math.min(first + perBucket, samples.length - 1);
        if (first >= lastIndex) break;
        const alpha = (1 - b / TAIL_BUCKETS) * 0.85 * fade;
        ctx!.strokeStyle = `rgba(${pulse.color}, ${alpha})`;
        ctx!.beginPath();
        ctx!.moveTo(samples[first].x, samples[first].y);
        for (let k = first + 1; k <= lastIndex; k++)
          ctx!.lineTo(samples[k].x, samples[k].y);
        ctx!.stroke();
      }
      if (pulse.fading === 0) {
        ctx!.fillStyle = `rgba(${pulse.color}, 0.18)`;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${pulse.color}, 0.95)`;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawFlash(flash: Flash) {
      const size = 3 + (1 - flash.life) * 5;
      ctx!.strokeStyle = `rgba(${flash.color}, ${flash.life * 0.7})`;
      ctx!.lineWidth = 1.2;
      ctx!.strokeRect(flash.x - size, flash.y - size, size * 2, size * 2);
      ctx!.fillStyle = palette.node;
      ctx!.fillRect(flash.x - 2, flash.y - 2, 4, 4);
    }

    function render() {
      ctx!.clearRect(0, 0, width, height);
      drawGrid();
      for (const flash of flashes) drawFlash(flash);
      for (const pulse of pulses) drawPulse(pulse);
    }

    function update(dt: number) {
      for (const pulse of pulses) step(pulse, dt);
      pulses = pulses.map((p) => (p.done ? spawn() : p));
      for (const flash of flashes) flash.life -= dt * 0.9;
      flashes = flashes.filter((f) => f.life > 0);
    }

    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        // Quadro estático: avança a simulação sem animar e desenha uma vez.
        for (let i = 0; i < 90; i++) update(1 / 30);
        render();
        return;
      }
      if (!visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }

    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    intersection.observe(canvas);

    const onVisibility = () =>
      document.hidden ? cancelAnimationFrame(frame) : start();
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", start);
    };
  }, [variant, density]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${maskClassName}`}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
