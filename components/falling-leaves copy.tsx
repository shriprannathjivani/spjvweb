"use client";

import { useEffect, useRef } from "react";

type RotationAxis = "X" | "Y" | "Z";

interface Leaf {
    el: HTMLDivElement;
    x: number;
    y: number;
    z: number;
    rotation: {
        axis: RotationAxis;
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
        this.width = el.offsetWidth;
        this.height = window.innerHeight;
    }

    resetLeaf(leaf: Leaf) {
        leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
        leaf.y = -10;
        leaf.z = Math.random() * 150;

        if (leaf.x > this.width) {
            leaf.x = this.width + 10;
            leaf.y = Math.random() * (this.height / 2);
        }

        if (this.timer === 0) {
            leaf.y = Math.random() * this.height;
        }

        leaf.rotation.speed = Math.random() * 10;
        const axisRoll = Math.random();

        if (axisRoll > 0.5) {
            leaf.rotation.axis = "X";
        } else if (axisRoll > 0.25) {
            leaf.rotation.axis = "Y";
            leaf.rotation.x = Math.random() * 180 + 90;
        } else {
            leaf.rotation.axis = "Z";
            leaf.rotation.x = Math.random() * 360 - 180;
            leaf.rotation.speed = Math.random() * 3;
        }

        leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
        leaf.ySpeed = Math.random() + 0.8;
    }

    updateLeaf(leaf: Leaf) {
        const windSpeed = this.options.wind.speed(
            this.timer - this.options.wind.start,
            leaf.y
        );

        leaf.x -= windSpeed + leaf.xSpeedVariation;
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        let transform = `
      translateX(${leaf.x}px)
      translateY(${leaf.y}px)
      translateZ(${leaf.z}px)
      rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)
    `;

        if (leaf.rotation.axis !== "X") {
            transform += ` rotateX(${leaf.rotation.x}deg)`;
        }

        leaf.el.style.transform = transform;

        if (leaf.x < -10 || leaf.y > this.height + 10) {
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
            wind.duration = wind.magnitude * 50 + (Math.random() * 20 - 10);
            wind.start = this.timer;

            const screenHeight = this.height;

            wind.speed = function (t: number, y: number) {
                const a =
                    (this.magnitude / 2) *
                    ((screenHeight - (2 * y) / 3) / screenHeight);

                return (
                    a *
                    Math.sin((2 * Math.PI * t) / this.duration + (3 * Math.PI) / 2) +
                    a
                );
            };
        }
    }

    init() {
        this.world.className = "leaf-scene";
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

        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
    }

    render = () => {
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

        const scene = new LeafScene(ref.current);
        scene.init();
        scene.render();

        return () => {
            ref.current!.innerHTML = "";
        };
    }, []);

    return (
        <div
    ref={ref}
    className="pointer-events-none fixed inset-0 z-1 overflow-hidden"
  />
    );
}