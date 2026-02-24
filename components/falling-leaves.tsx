"use client";

import { useEffect, useRef } from "react";

type Axis = "X" | "Y" | "Z";

interface Leaf {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  rotation: {
    axis: Axis;
    value: number;
    speed: number;
    x: number;
  };
  xSpeedVariation: number;
  ySpeed: number;
}

class LeafScene {
  viewport: HTMLElement;
  world: HTMLDivElement;
  leaves: Leaf[] = [];

  width: number;
  height: number;
  timer = 0;

  // 🔥 30 FPS throttle
  lastFrame = 0;
  frameInterval = 1000 / 30;

  running = true;

    options = {
        numLeaves: 15,
        wind: {
            magnitude: 1.2,
            maxSpeed: 12,
            duration: 300,
            start: 0,
            speed: (t: number, y: number) => 0,
        },
    };

  constructor(el: HTMLElement) {
    this.viewport = el;
    this.world = document.createElement("div");
    this.world.className = "leaf-scene";

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 📱 Mobile optimization
    if (window.innerWidth < 768) {
      this.options.numLeaves = 8;
    }
  }

  resetLeaf(leaf: Leaf) {
    // Spawn across full screen width
    leaf.x = Math.random() * this.width;
    leaf.y = -Math.random() * this.height;
    leaf.z = Math.random() * 100;

    // Rotation
    leaf.rotation.speed = Math.random() * 4 + 1;
    const axisRoll = Math.random();

    leaf.rotation.axis =
      axisRoll > 0.66 ? "X" : axisRoll > 0.33 ? "Y" : "Z";

    leaf.rotation.x = Math.random() * 360;
    leaf.rotation.value = Math.random() * 360;

    // Motion (as requested)
    leaf.xSpeedVariation = Math.random() * 0.6 - 0.3; // -0.3 → 0.3
    leaf.ySpeed = Math.random() * 0.6 + 0.6; // 0.6 → 1.2
  }

  updateLeaf(leaf: Leaf) {
    const windSpeed = this.options.wind.speed(
      this.timer - this.options.wind.start,
      leaf.y
    );

    leaf.x += windSpeed + leaf.xSpeedVariation;
    leaf.y += leaf.ySpeed;
    leaf.rotation.value += leaf.rotation.speed;

    leaf.el.style.transform = `
      translate3d(${leaf.x}px, ${leaf.y}px, ${leaf.z}px)
      rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)
    `;

    // Reset when out of view
    if (
      leaf.y > this.height + 40 ||
      leaf.x < -40 ||
      leaf.x > this.width + 40
    ) {
      this.resetLeaf(leaf);
    }
  }

  updateWind() {
    if (
      this.timer === 0 ||
      this.timer > this.options.wind.start + this.options.wind.duration
    ) {
      const wind = this.options.wind;

      wind.magnitude = Math.random() * wind.maxSpeed;
      wind.duration = wind.magnitude * 40 + 60;
      wind.start = this.timer;

      const screenHeight = this.height;

      wind.speed = function (t: number, y: number) {
        const a =
          (this.magnitude / 2) *
          ((screenHeight - y) / screenHeight);
        return a * Math.sin((2 * Math.PI * t) / this.duration);
      };
    }
  }

  init() {
    this.viewport.appendChild(this.world);
    this.world.style.perspective = "400px";

    for (let i = 0; i < this.options.numLeaves; i++) {
      const leaf: Leaf = {
        el: document.createElement("div"),
        x: 0,
        y: 0,
        z: 0,
        rotation: { axis: "X", value: 0, speed: 0, x: 0 },
        xSpeedVariation: 0,
        ySpeed: 0,
      };

      leaf.el.className = "leaf";
      this.resetLeaf(leaf);
      this.leaves.push(leaf);
      this.world.appendChild(leaf.el);
    }

    // Pause animation when tab hidden
    document.addEventListener("visibilitychange", () => {
      this.running = !document.hidden;
    });

    // Resize handling
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }

  render = (time: number) => {
    if (!this.running) {
      requestAnimationFrame(this.render);
      return;
    }

    if (time - this.lastFrame < this.frameInterval) {
      requestAnimationFrame(this.render);
      return;
    }

    this.lastFrame = time;
    this.updateWind();
    this.leaves.forEach((leaf) => this.updateLeaf(leaf));
    this.timer++;

    requestAnimationFrame(this.render);
  };
}

export default function FallingLeaves() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new LeafScene(ref.current);
    scene.init();
    requestAnimationFrame(scene.render);

    return () => {
      ref.current!.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-5 overflow-hidden"
    />
  );
}
