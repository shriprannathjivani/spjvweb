"use client";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from "@/components/BaseImage";
import {
  useGLTF,
  useAnimations,
  KeyboardControls,
  useKeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { create } from "zustand";
import * as THREE from "three";

const basePath =
  process.env.NODE_ENV === "production" ? "/spjvweb" : "";

// --- 1. DATA & STATE ---
const CHUNK_SIZE = 120;
const BUTTERFLY_OFFSET = 35;
const ACTIVATION_DIST = 25;

interface Location {
  id: number; year: string; title: string; desc: string;
  x: number; z: number; visited: boolean; locImage: string;
}

interface GameState {
  foundCount: number;
  locations: Location[];
  activeTemple: Location | null; // This tells TS it's a Location or Null
  playerMapData: { x: number; z: number; rot: number };
  showIntro: boolean;           // NEW
  setShowIntro: (val: boolean) => void; // NEW
  setActiveTemple: (loc: Location | null) => void; // NEW
  markVisited: (id: number) => void;
  closePopup: () => void;
  updateMapPosition: (x: number, z: number, rot: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const useGameStore = create<GameState>((set) => ({
  foundCount: 0,
  activeTemple: null,
  showIntro: true, // Start with intro visible
  setShowIntro: (val) => set({ showIntro: val }),
  setActiveTemple: (temple) => set({ activeTemple: temple }),
  toastMessage: null,
  showToast: (msg) => {
    set({ toastMessage: msg });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => set({ toastMessage: null }), 3000);
  },
  playerMapData: { x: 0, z: -225, rot: 0 },
  locations: [
    { id: 1, year: "1st Day", title: "प्रथम सृष्टि सर्जन", desc: "", visited: false, locImage: '/shrijigame/history/history1.jpg' },
    { id: 2, year: "", title: "ब्रज लीला: ११ वर्ष ५२ दिन", desc: "", visited: false, locImage: '/shrijigame/history/history2.jpg' },
    { id: 3, year: "", title: "सृष्टि प्रलय", desc: "", visited: false, locImage: '/shrijigame/history/history3.jpg' },
    { id: 4, year: "", title: "योगमाया में रास लीला", desc: "", visited: false, locImage: '/shrijigame/history/history4.jpg' },
    { id: 5, year: "", title: "योगमाया में ब्रज एवं रास लीला अखंड", desc: "", visited: false, locImage: '/shrijigame/history/history5.jpg' },
    { id: 6, year: "", title: "ब्रह्मात्माओं की पुनः माया खेल मांग", desc: "", visited: false, locImage: '/shrijigame/history/history6.jpg' },
    { id: 7, year: "", title: "पुनः सृष्टि सर्जन", desc: "", visited: false, locImage: '/shrijigame/history/history7.jpg' },
    { id: 8, year: "", title: "लक्ष्मीजी द्वारा तपस्या (७ कल्पांत)", desc: "", visited: false, locImage: '/shrijigame/history/history8.jpg' },
    { id: 9, year: "", title: "शिवजी-उमा संवाद: अमरकथा", desc: "", visited: false, locImage: '/shrijigame/history/history9.jpg' },
    { id: 10, year: "", title: "गोलोकी श्री कृष्ण लीला", desc: "", visited: false, locImage: '/shrijigame/history/history10.jpg' },
    { id: 11, year: "", title: "विष्णु श्री कृष्ण लीला", desc: "", visited: false, locImage: '/shrijigame/history/history11.jpg' },
    { id: 12, year: "", title: "महाभारत एवं गीता उपदेश", desc: "", visited: false, locImage: '/shrijigame/history/history12.jpg' },
    { id: 13, year: "", title: "२८ वाँ कलियुग प्रारंभ", desc: "", visited: false, locImage: '/shrijigame/history/history13.jpg' },
    { id: 14, year: "1630 BC", title: "मुसा पैगम्बर: तोराह", desc: "", visited: false, locImage: '/shrijigame/history/history14.jpg' },
    { id: 15, year: "0 AD", title: "ईशु ख्रिस्त: बाइबल", desc: "", visited: false, locImage: '/shrijigame/history/history15.jpg' },
    { id: 16, year: "610 AD", title: "अरब लीला मोहम्मद रसूल: कुरान", desc: "", visited: false, locImage: '/shrijigame/history/history16.jpg' },
    { id: 17, year: "1678 BC", title: "श्री कृण्णजी की रास लीला", desc: "श्री कृष्णजी का प्राकट्य (द्वापरयुग)", visited: false, locImage: '/shrijigame/history/history17.jpg' },
    { id: 18, year: "600 AD", title: "श्री मद्द भागवत का प्राकट्य", desc: "आदि शंकराचार्यजी द्वारा", visited: false, locImage: '/shrijigame/history/history18.jpg' },
    { id: 19, year: "1600 AD", title: "प्राकट्य", desc: "श्री देवचन्द्रजी का प्राकट्य", visited: false, locImage: '/shrijigame/history/history19.jpg' },
    { id: 20, year: "1620 AD", title: "ब्रह्मज्ञान प्राप्त", desc: "ब्रह्मज्ञान प्राप्त होना", visited: false, locImage: '/shrijigame/history/history20.jpg' }
  ].map((loc, index) => {
    const side = index % 2 === 0 ? 1 : -1;
    return {
      ...loc,
      x: (index * 50 * side),
      z: -(index * 250),
    };
  }),

  markVisited: (id) => set((state) => {
    const loc = state.locations.find(l => l.id === id);
    if (!loc || loc.visited) return state;
    const newLocs = state.locations.map(l => l.id === id ? { ...l, visited: true } : l);
    state.showToast(`Found: \n ${loc.title}`);
    return {
      locations: newLocs,
      foundCount: newLocs.filter(l => l.visited).length,
      // REMOVED: activeTemple: loc (SceneManager handles this now)
    };
  }),
  closePopup: () => set({ activeTemple: null }),
  updateMapPosition: (x, z, rot) => set({ playerMapData: { x, z, rot } }),
}));

// --- 2. PLAYER COMPONENT ---
const Player = ({ playerRef }: { playerRef: React.RefObject<THREE.Group | null> }) => {
  const { scene, animations } = useGLTF(`${basePath}/models/shriji_Walking.glb`);
  const { actions } = useAnimations(animations, scene);
  const [, getKeys] = useKeyboardControls();
  const { camera, controls } = useThree();
  const updateMapPosition = useGameStore(s => s.updateMapPosition);
  const initialPos = useGameStore(s => s.playerMapData); // Get that {x: 0, z: 50}
  // SNAP TO START POSITION ON LOAD
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(0, 0, 125); // Set player position
      playerRef.current.rotation.y = 0;           // Face the temple
    }
    camera.position.set(0, 40, 280);               // Set camera angle from image
    if (controls) {
      // @ts-ignore
      controls.target.set(20, 15, 35);           // Focus camera on player
    }
  }, [camera, controls]);
  useFrame(() => {
    if (!playerRef.current || !actions) return;
    const { forward, backward, left, right, shift } = getKeys();

    const isMoving = forward || backward || left || right;
    const walk = actions[Object.keys(actions)[0]!];

    if (walk) {
      const targetWeight = isMoving ? 1 : 0;
      walk.setEffectiveWeight(THREE.MathUtils.lerp(walk.getEffectiveWeight(), targetWeight, 0.1));
      walk.play();
      walk.timeScale = shift ? 1.6 : 1.0;
    }

    if (isMoving && controls) {
      const moveDir = new THREE.Vector3();
      if (forward) moveDir.z = -1;
      if (backward) moveDir.z = 1;
      if (left) moveDir.x = -1;
      if (right) moveDir.x = 1;
      moveDir.normalize();

      // @ts-ignore
      const azimuth = controls.getAzimuthalAngle();
      const worldMove = moveDir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), azimuth);
      const speed = (shift ? 1.6 : 0.8) * (walk?.getEffectiveWeight() || 1);
      playerRef.current.position.add(worldMove.multiplyScalar(speed));

      const rotationAngle = Math.atan2(worldMove.x, worldMove.z);
      const targetQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);
      playerRef.current.quaternion.rotateTowards(targetQuat, 0.15);
    }

    // UPDATE MAP DATA
    updateMapPosition(playerRef.current.position.x, playerRef.current.position.z, playerRef.current.rotation.y);

    if (controls) {
      const targetPos = playerRef.current.position.clone().add(new THREE.Vector3(0, 15, 0));
      // @ts-ignore
      controls.target.lerp(targetPos, 0.1);
      // @ts-ignore
      controls.update();
    }
  });

  return <primitive ref={playerRef} object={scene} scale={14} castShadow />;
};

// --- 3. BUTTERFLY COMPONENT ---
const Butterfly = ({ playerRef }: { playerRef: React.RefObject<THREE.Group | null> }) => {
  const { scene, animations } = useGLTF(`${basePath}/models/animated_butterfly.glb`);
  const { actions } = useAnimations(animations, scene);
  const bRef = useRef<THREE.Group>(null);
  const locations = useGameStore(s => s.locations);

  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]!]) {
      actions[Object.keys(actions)[0]!]?.play();
    }
  }, [actions]);

  useFrame((state) => {
    if (!bRef.current || !playerRef.current) return;

    // 1. Find the first temple that hasn't been visited yet
    const nextTemple = locations.find(l => !l.visited);

    // If all temples are visited, hide the butterfly guide
    if (!nextTemple) {
      bRef.current.visible = false;
      return;
    } else {
      bRef.current.visible = true;
    }

    // 2. Define the target (the next temple)
    const targetPoint = new THREE.Vector3(nextTemple.x, 20, nextTemple.z);

    // 3. Define the "Start Point" (The player's current position)
    const playerPos = playerRef.current.position.clone();

    // 4. Calculate the direction from Player to Temple
    const directionToTemple = new THREE.Vector3()
      .subVectors(targetPoint, playerPos)
      .normalize();

    // 5. Calculate "Ideal Position" 
    // This places the butterfly 25 units in FRONT of the player, towards the temple
    const guideDistance = 25;
    const idealPosition = playerPos.clone().add(
      directionToTemple.multiplyScalar(guideDistance)
    );

    // Lift the butterfly up so it's at eye level/floating
    idealPosition.y = 18 + Math.sin(state.clock.elapsedTime * 2) * 2;

    // 6. Smoothly move the butterfly to that position (lerp)
    bRef.current.position.lerp(idealPosition, 0.05);

    // 7. Make the butterfly look at the temple it's leading you to
    bRef.current.lookAt(targetPoint);
  });

  return <primitive ref={bRef} object={scene} scale={4} />;
};

// --- 4. SCENE & CHUNK LOGIC (GROUNDED TREES) ---
const SceneManager = ({ playerRef }: { playerRef: React.RefObject<THREE.Group | null> }) => {
  const { scene: treeModel } = useGLTF(`${basePath}/models/single_tree.glb`);
  const { scene: templeModel } = useGLTF(`${basePath}/models/templeindian.glb`);

  // Destructure the necessary state and actions
  const { locations, markVisited, setActiveTemple, activeTemple } = useGameStore();
  const [chunks, setChunks] = useState<string[]>([]);

  const gt = useMemo(() => {
    const tex = new THREE.TextureLoader().load(`${basePath}/shrijigame/grasslight-big.jpg`);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useFrame(() => {
    if (!playerRef.current) return;

    // --- 1. CHUNK LOGIC ---
    const pX = Math.round(playerRef.current.position.x / CHUNK_SIZE);
    const pZ = Math.round(playerRef.current.position.z / CHUNK_SIZE);
    const newChunks = [];
    for (let x = pX - 2; x <= pX + 2; x++) {
      for (let z = pZ - 2; z <= pZ + 2; z++) {
        newChunks.push(`${x},${z}`);
      }
    }

    if (newChunks.join(',') !== chunks.join(',')) {
      setChunks(newChunks);
    }

    // --- 2. PROXIMITY LOGIC ---
    let nearbyTemple: Location | null = null;

    locations.forEach((loc: Location) => {
      // Use a temporary vector to avoid creating new objects in every loop iteration for better performance
      const dist = playerRef.current!.position.distanceTo(new THREE.Vector3(loc.x, 0, loc.z));

      if (dist < ACTIVATION_DIST) {
        nearbyTemple = loc;
        markVisited(loc.id); // This handles the "found" counter and toast
      }
    });

    // --- 3. AUTO-HIDE/SHOW POPUP ---
    // Extract IDs safely to avoid "Property does not exist on type never"
    const currentActiveId = activeTemple ? activeTemple.id : null;
    const nearbyId = nearbyTemple ? (nearbyTemple as Location).id : null;

    if (currentActiveId !== nearbyId) {
      setActiveTemple(nearbyTemple);
    }
  });

  return (
    <>
      <color attach="background" args={[0x87CEEB]} />
      <fog attach="fog" args={[0x87CEEB, 80, 280]} />
      <ambientLight color={0xffffff} intensity={0.7} />
      <directionalLight position={[-100, 30, -100]} color={0xfffdf2} intensity={1.0} castShadow />

      {chunks.map(key => {
        const [cx, cz] = key.split(',').map(Number);
        const treeData = [];

        if (cx !== 0) {
          for (let i = 0; i < 2; i++) {
            const seed = (cx * 100) + (cz * 10) + i;
            treeData.push({
              x: (seededRandom(seed) - 0.5) * CHUNK_SIZE,
              z: (seededRandom(seed + 1) - 0.5) * CHUNK_SIZE,
              scale: 60 + seededRandom(seed + 2) * 0.5,
              rot: seededRandom(seed + 3) * Math.PI
            });
          }
        }

        return (
          <group key={key} position={[cx * CHUNK_SIZE, 0, cz * CHUNK_SIZE]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[CHUNK_SIZE, CHUNK_SIZE]} />
              <meshPhongMaterial map={gt} />
            </mesh>

            {treeData.map((t, i) => (
              <primitive
                key={i}
                object={treeModel.clone()}
                // FIXED: Set y to 0 so trees sit on the ground, not floating at 60
                position={[t.x, 60, t.z]}
                scale={t.scale}
                rotation-y={t.rot}
              />
            ))}
          </group>
        );
      })}

      {locations.map(loc => (
        <primitive key={loc.id} object={templeModel.clone()} position={[loc.x, 0, loc.z]} scale={30} />
      ))}
    </>
  );
};

// --- 5. MINIMAP UI (FIXED 2D COMPONENT) ---
const MiniMapUI = () => {
  const { locations, playerMapData } = useGameStore();
  const SCALE = 0.2; // Match your world scale to map size

  return (
    <div id="minimap" className="absolute bottom-6 right-6 w-40 h-40 pointer-events-auto">
      <div className="map-ring outer"></div>
      <div className="map-ring middle"></div>
      <div className="map-ring inner"></div>
      {/* Radar Background Decorations */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-75 pointer-none" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-50 pointer-none" />

      {/* Moving Layer */}
      <div
        className="relative w-full h-full transition-transform duration-75 ease-linear"
        style={{ transform: `rotate(${-playerMapData.rot}rad)` }}
      >
        {locations.map((loc) => {
          const dx = (loc.x - playerMapData.x) * SCALE;
          const dz = (loc.z - playerMapData.z) * SCALE;

          if (Math.sqrt(dx * dx + dz * dz) > 75) return null;

          return (
            <div
              key={loc.id}
              className="absolute text-[12px] font-bold"
              style={{
                left: `calc(50% + ${dx}px)`,
                top: `calc(50% + ${dz}px)`,
                transform: `translate(-50%, -50%) rotate(${playerMapData.rot}rad)`,
                color: loc.visited ? '#4ade80' : '#fbbf24'
              }}
            >
              ★
            </div>
          );
        })}
      </div>

      {/* Static Player Center Arrow */}
      <div id="player-container" className="absolute left-1/2 top-1/2 w-0 h-0" >
        <svg id="player-arrow-svg" width="30" height="30" viewBox="0 0 100 100">
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <g filter="url(#glow)">
            <path d="M50 10 L25 90 L50 75 Z" fill="#c0392b" />
            <path d="M50 10 L75 90 L50 75 Z" fill="#e74c3c" />
            <path d="M50 10 L25 90 L50 75 L75 90 Z" fill="none" stroke="white" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
};

// --- 6. UI OVERLAY ---
const UI = () => {
  const { foundCount, locations, activeTemple, showIntro, setShowIntro } = useGameStore();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans">
      <div className="">
        <Image src='/shrijigame/gamelogo.svg' width={200} height={200} alt="gamelogo.svg" />
      </div>
      <div id="instructions" className="z-100">WASD to Walk | SHIFT to Run | MOUSE to Look</div>
      <div onClick={() => setShowExitConfirm(true)} id="ExitGame" className="z-100 pointer-events-auto cursor-pointer"></div>

      {/* 2. AUTO-HIDE POPUP */}
      {activeTemple && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4 z-50">
          <div className="relative w-full max-w-3xl h-120 rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <img src={`${basePath}/${activeTemple.locImage}`} className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute bottom-6 left-6 right-6 backdrop-blur-md border border-white/10 rounded-4xl p-8 text-center"
              style={{ background: 'linear-gradient(180deg, rgba(30, 16, 12, 0.7) 0%, rgba(54, 34, 26, 0.8) 100%)' }}
            >
              <span className="text-white font-bold uppercase tracking-widest text-xl">{activeTemple.year}</span>
              <h2 className="text-white font-bold text-3xl mt-2">{activeTemple.title}</h2>
              <p className="text-white/40 text-xs mt-4 uppercase tracking-[0.2em]">Walk away to continue</p>
            </div>
          </div>
        </div>
      )}

      {showExitConfirm && (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-auto z-[100] backdrop-blur-md"

          >
            <div className="absolute inset-0 animate-spin [animation-duration:80s]"
              style={{
                backgroundImage: `url(${basePath}/shrijigame/glow_bg.png)`,
                backgroundSize: '30%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            {/* 1. Main Container: Using the Wood Board as a Background */}
            <div
              className="relative w-[95%] max-w-[450px] h-[400px] flex flex-col items-center justify-center p-12 overflow-visible"
              style={{
                backgroundImage: `url(${basePath}/shrijigame/ui_wood_grass_bg.png)`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >

              {/* 2. Floating Header (The Green Ribbon/Banner) */}
              <div className="w-[80%] drop-shadow-lg relative">
                <Image
                  src="/shrijigame/ui_gold_banner.png"
                  alt="Banner"
                  className="w-full h-auto"
                  height={104}
                  width={283}
                />
                <h2 className="absolute -top-11 font-bold inset-0 flex items-center justify-center text-2xl text-amber-700 ">
                  QUIT GAME
                </h2>
              </div>

              {/* 3. Instructions (Centered on the Wood) */}
              <div className="relative z-10 w-full px-6 -mt-5 h-50 flex justify-center items-center">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 text-[#ffffff] font-black text-3xl text-center">
                    <p className="flex items-center gap-4 bg-black/5  justify-center">
                      Are you sure you want to quit?
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. The Action Button (Matched to your reference style) */}
              <div className="relative z-10 px-10 mt-0 flex gap-4">
                <button
                  onClick={() => {
                    window.location.href = `${basePath}/gamesnquiz`;
                  }}
                  className="cursor-pointer 
                  bg-gradient-to-b from-[#ff6b6b] to-[#c1121f] 
                  text-white font-black px-10 py-3 rounded-2xl 
                  shadow-[0_6px_0_#7f1d1d] 
                  hover:brightness-110 
                  active:translate-y-1 active:shadow-[0_2px_0_#7f1d1d] 
                  transition-all text-2xl uppercase tracking-tighter"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="cursor-pointer 
                  bg-gradient-to-b from-[#6ee7b7] to-[#16a34a] 
                  text-[#3a1f0a] font-black px-10 py-3 rounded-2xl 
                  shadow-[0_6px_0_#166534] 
                  hover:brightness-110 
                  active:translate-y-1 active:shadow-[0_2px_0_#166534] 
                  transition-all text-2xl uppercase tracking-tighter"
                >
                  No
                </button>
              </div>

            </div>
          </div>
        </>
      )}

      <ToastNotification />

      {/* Progress & Minimap */}
      <div id="progress-tracker" className="tracker">
        <p className="text-[#3a1f0a] font-bold mt-8 text-2xl">{foundCount}/{locations.length}</p>
      </div>
      <MiniMapUI />
      {/* --- INTRO SCREEN --- */}
      {showIntro && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-auto z-[100] backdrop-blur-md"

        >
          <div className="absolute inset-0 animate-spin [animation-duration:80s]"
            style={{
              backgroundImage: `url(${basePath}/shrijigame/glow_bg.png)`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
          {/* 1. Main Container: Using the Wood Board as a Background */}
          <div
            className="relative w-[95%] max-w-[600px] h-[650px] flex flex-col items-center justify-center p-12 overflow-visible"
            style={{
              backgroundImage: `url(${basePath}/shrijigame/ui_wood_grass_bg.png)`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >

            {/* 2. Floating Header (The Green Ribbon/Banner) */}
            <div className="w-[80%] drop-shadow-lg relative">
              <Image
                src="/shrijigame/ui_gold_banner.png"
                alt="Banner"
                className="w-full h-auto"
                height={148}
                width={403}
              />
              <h2 className="absolute -top-17 font-bold inset-0 flex items-center justify-center text-3xl text-amber-700">
                How To Play
              </h2>
            </div>

            {/* 3. Instructions (Centered on the Wood) */}
            <div className="relative z-10 w-full px-6 -mt-5 h-50 flex justify-center items-center">
              <div className="flex items-center justify-between">
                <Image src='/shrijigame/intologo.svg' width={200} height={200} alt="gamelogo.svg" />
                <div className="space-y-2 text-[#ffffff] font-black text-2xl text-center">
                  <p className="flex items-center gap-4 bg-black/5  justify-center">
                    <span className="text-3xl filter drop-shadow-sm">🚶</span>
                    <span><b className="text-white">WASD</b> to Explore</span>
                  </p>
                  <p className="flex items-center gap-4 bg-black/5 justify-center">
                    <span className="text-3xl filter drop-shadow-sm">🦋</span>
                    <span>Follow the <b className="text-white">Guide</b></span>
                  </p>
                  <p className="flex items-center gap-4 bg-black/5 justify-center">
                    <span className="text-3xl filter drop-shadow-sm">✨</span>
                    <span>Discover <b className="text-white">History</b></span>
                  </p>
                </div>
              </div>
            </div>

            {/* 4. The Action Button (Matched to your reference style) */}
            <div className="relative z-10 px-10 mt-0">
              <button
                onClick={() => setShowIntro(false)}
                className="cursor-pointer bg-linear-to-b from-[#ffd166] to-[#f7a400] text-[#422006] font-black px-15 py-5 rounded-2xl shadow-[0_6px_0_#b37700] hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#b37700] transition-all text-2xl uppercase tracking-tighter"
              >
                Begin Journey
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

const GoldenPath = ({ playerRef }: { playerRef: React.RefObject<THREE.Group | null> }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const locations = useGameStore((s) => s.locations);

  // Load the "Air/Wind" model (e.g., a leaf or a small wind streak)
  // Use a simple model like a leaf to keep performance high
  const { nodes } = useGLTF(`${basePath}/models/Plant.glb`) as any;

  // Get the geometry from the loaded model
  const windGeometry = useMemo(() => {
    // Find the first mesh in the GLTF and get its geometry
    const mesh = Object.values(nodes).find((node: any) => node.isMesh) as THREE.Mesh;
    return mesh ? mesh.geometry : new THREE.PlaneGeometry(1, 1);
  }, [nodes]);

  const PARTICLE_COUNT = 40;
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const player = playerRef.current || state.scene.getObjectByName("player_model");
    if (!meshRef.current || !player) return;

    const nextTemple = locations.find((l) => !l.visited);
    if (!nextTemple) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    const start = player.position;
    const end = new THREE.Vector3(nextTemple.x, 0, nextTemple.z);
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Flowing logic
      let t = (i / PARTICLE_COUNT + time * 0.15) % 1;
      const pos = new THREE.Vector3().lerpVectors(start, end, t);

      // Organic "Wind" Turbulence
      pos.y = 5 + Math.sin(time * 1.5 + i) * 3;
      pos.x += Math.cos(time * 1.2 + i) * 2;
      pos.z += Math.sin(time * 1.2 + i) * 2;

      // Rotation logic to make it look like air tumbling
      tempObject.position.copy(pos);
      tempObject.rotation.set(time + i, time * 0.5 + i, i);

      // Scaling (fade in and out)
      const scale = Math.sin(t * Math.PI) * 1.5;
      tempObject.scale.setScalar(scale);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[windGeometry, null as any, PARTICLE_COUNT]}
      frustumCulled={false}
    >
      {/* If your model has its own material, you can remove this meshBasicMaterial */}
      <meshBasicMaterial
        color="#ffffff" // White for air/wind look
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

// Pre-load the model just like the butterfly
useGLTF.preload(`${basePath}/models/Plant.glb`);

const ToastNotification = () => {
  const toastMessage = useGameStore((s) => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="absolute top-33 right-6 z-50 pointer-events-none ">
      <div id="Notification" className="line-clamp-3" >{toastMessage}</div>
    </div>
  );
};

export default function ShriJiExperience() {
  const playerRef = useRef<THREE.Group>(null);

  return (
    <div className="w-full h-screen relative bg-[#87CEEB] overflow-hidden font-poppins">

      <KeyboardControls
        map={[
          { name: "forward", keys: ["KeyW", "ArrowUp"] },
          { name: "backward", keys: ["KeyS", "ArrowDown"] },
          { name: "left", keys: ["KeyA", "ArrowLeft"] },
          { name: "right", keys: ["KeyD", "ArrowRight"] },
          { name: "shift", keys: ["Shift"] },
        ]}
      >
        <UI />
        <Canvas shadows camera={{ fov: 45, position: [0, 40, 80] }} >
          <React.Suspense fallback={null}>
            <SceneManager playerRef={playerRef} />
            <Player playerRef={playerRef} />
            <Butterfly playerRef={playerRef} />
            <GoldenPath playerRef={playerRef} />
          </React.Suspense>
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping={true}
            minDistance={40}
            maxDistance={150}
            maxPolarAngle={Math.PI / 2 - 0.1}
          />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}