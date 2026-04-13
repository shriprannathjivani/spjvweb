import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three-stdlib";

type Temple = {
  id: number;
  year: string;
  title: string;
  desc: string;
  visited: boolean;
  x: number;
  z: number;
};

export default function initScene(canvas: HTMLCanvasElement) {
  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 40, 80);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 1);
  sun.position.set(-100, 100, -100);
  scene.add(sun);

  // GROUND
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(5000, 5000),
    new THREE.MeshStandardMaterial({ color: "#3f7d3f" })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // DATA
  const locations: Temple[] = [
    { id: 1, year: "1st Day", title: "प्रथम सृष्टि सर्जन", desc: "Creation", visited: false, x: 0, z: -200 },
    { id: 2, year: "Dwapar", title: "कृष्ण लीला", desc: "Divine", visited: false, x: 200, z: -500 }
  ];

  document.getElementById("total-count")!.innerText = String(locations.length);

  // MODELS
  const loader = new GLTFLoader();

  let player: THREE.Object3D | null = null;
  let mixer: THREE.AnimationMixer | null = null;
  let walk: THREE.AnimationAction | null = null;

  loader.load("/models/shriji_Walking.glb", (gltf) => {
    player = gltf.scene;
    player.scale.set(12, 12, 12);
    scene.add(player);

    mixer = new THREE.AnimationMixer(player);
    walk = mixer.clipAction(gltf.animations[0]);
    walk.play();
  });

  // TEMPLES
  const temples: THREE.Mesh[] = [];

  locations.forEach((loc) => {
    const t = new THREE.Mesh(
      new THREE.BoxGeometry(30, 40, 30),
      new THREE.MeshStandardMaterial({ color: "orange" })
    );
    t.position.set(loc.x, 20, loc.z);
    t.userData = loc;
    scene.add(t);
    temples.push(t);
  });

  // ARROW
  const arrow = new THREE.Mesh(
    new THREE.ConeGeometry(3, 10, 4),
    new THREE.MeshStandardMaterial({ color: "gold" })
  );
  arrow.rotation.x = Math.PI / 2;
  scene.add(arrow);

  // INPUT
  const keys: Record<string, boolean> = {};
  window.onkeydown = (e) => (keys[e.code] = true);
  window.onkeyup = (e) => (keys[e.code] = false);

  let currentTemple: Temple | null = null;

  function updateUI(found: Temple) {
    const ui = document.getElementById("info-card")!;
    (document.getElementById("ui-title")!).innerText = found.title;
    (document.getElementById("ui-year")!).innerText = found.year;
    (document.getElementById("ui-desc")!).innerText = found.desc;

    ui.classList.remove("hidden");

    document.getElementById("found-count")!.innerText =
      String(locations.filter((l) => l.visited).length);

    const toast = document.getElementById("discovery-toast")!;
    toast.style.opacity = "1";
    setTimeout(() => (toast.style.opacity = "0"), 2000);
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = 0.016;
    if (mixer) mixer.update(delta);

    if (player) {
      const speed = keys["ShiftLeft"] ? 2 : 1;

      if (keys["KeyW"]) player.position.z -= speed;
      if (keys["KeyS"]) player.position.z += speed;
      if (keys["KeyA"]) player.position.x -= speed;
      if (keys["KeyD"]) player.position.x += speed;

      camera.position.lerp(
        new THREE.Vector3(player.position.x, 50, player.position.z + 100),
        0.1
      );
      camera.lookAt(player.position);

      // ARROW
      const next = locations.find((l) => !l.visited);
      if (next) {
        arrow.visible = true;
        arrow.position.set(player.position.x, 30, player.position.z);
        arrow.lookAt(next.x, 30, next.z);
      }

      // TEMPLE CHECK
      let foundTemple: Temple | null = null;

      temples.forEach((t) => {
        const dist = player!.position.distanceTo(t.position);
        if (dist < 40) {
          const data = t.userData as Temple;
          foundTemple = data;

          if (!data.visited) {
            data.visited = true;
            updateUI(data);
          }
        }
      });

      if (foundTemple) {
        // if (!currentTemple || currentTemple.id !== foundTemple.id) {
        //   currentTemple = foundTemple;
        // }
      } else {
        currentTemple = null;
        document.getElementById("info-card")!.classList.add("hidden");
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  return () => renderer.dispose();
}