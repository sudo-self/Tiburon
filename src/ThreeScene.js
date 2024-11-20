import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
camera.position.set(0, 1, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const scene = new THREE.Scene();


const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("/textures/floor.jpeg");
const wallTexture = textureLoader.load("/textures/wall.jpeg");
const windowTexture = textureLoader.load("/textures/window.png");

const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), wallMaterial);
leftWall.position.set(-2.5, 1.25, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), wallMaterial);
backWall.position.set(0, 1.25, -2.5);
scene.add(backWall);

const pointLight = new THREE.PointLight(0xffaa88, 1, 10);
pointLight.position.set(0, 2, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const couchMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a  });
const couchBase = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.3, 1),
  couchMaterial,
);
couchBase.position.set(1.0, 0.2, 2);
scene.add(couchBase);

const backrestMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a  });
const backrest = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.5, 0.2),
  backrestMaterial,
);
backrest.position.set(1.0, 0.6, 2.4);
scene.add(backrest);

const armrestGeometry = new THREE.BoxGeometry(0.2, 0.5, 1);
const armrest1 = new THREE.Mesh(armrestGeometry, couchMaterial);
const armrest2 = armrest1.clone();
armrest1.position.set(-.4, 0.45, 2);
armrest2.position.set(2.5, 0.45, 2);
scene.add(armrest1, armrest2);

const cushionMaterial = new THREE.MeshStandardMaterial({ color: 0x50C878 });
const cushionGeometry = new THREE.BoxGeometry(1.3, 0.25, 0.9);

const cushion1 = new THREE.Mesh(cushionGeometry, cushionMaterial);
const cushion2 = cushion1.clone();
const cushion3 = cushion1.clone();

cushion1.position.set(0.3, 0.4, 2);
cushion2.position.set(1.0, 0.4, 2);
cushion3.position.set(1.8, 0.4, 2);
scene.add(cushion1, cushion2, cushion3);

const footrestMaterial = new THREE.MeshStandardMaterial({ color:  0x4a4a4a });
const footrest = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.3, 1),
  footrestMaterial,
);
footrest.position.set(1.9, 0.1, 1.0);
scene.add(footrest);

const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
const table = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 0.3, 0.9),
  tableMaterial,
);
table.position.set(0, 0.45, 0);
scene.add(table);


const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.45, 24);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });


const legs = [];
const legPositions = [
  { x: -0.7, z: 0.4 },
  { x: 0.7, z: 0.4 },
  { x: -0.7, z: -0.4 },
  { x: 0.7, z: -0.4 }
];

for (let i = 0; i < 4; i++) {
  const leg = new THREE.Mesh(legGeometry, legMaterial);

  leg.position.set(legPositions[i].x, 0.45 - 0.45 / 2, legPositions[i].z);
  legs.push(leg);
}

scene.add(...legs);



const loader = new GLTFLoader();
loader.load(
  "/textures/macbook.glb",
  (gltf) => {
    const macbook = gltf.scene;
    macbook.scale.set(0.2, 0.2, 0.2);
    macbook.position.set(0, 0.6, 0);
    scene.add(macbook);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the MacBook model:", error);
  },
);

const models = [
  {
    url: "/textures/mountain_bike.glb",
    position: [1.2, 0.6, -1.8],
    scale: [1.2, 1.0, 1.0],
    rotationY: 0,
  },
  {
    url: "/textures/fire_truck.glb",
    position: [-2, 0, -2.1],
    scale: [1.0, 1.0, 1.0],
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/babys_highchair.glb",
    position: [0.1, 0, -1.9],
    scale: [0.3, 0.3, 0.3],
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/laundry_basket.glb",
    position: [2.0, 0.5, -8.4],
    scale: [0.9, 0.9, 0.9],
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/stuff_Bear.glb",
    position: [-1.75, 0.1, 2],
    scale: [1.6, 1.6, 1.6],
    rotationY: Math.PI / 1.89,
  },
  {
    url: "/textures/samsung_tv_remote_control.glb",
    position: [0.5, 0.6, 2],
    scale: [0.1, 0.1, 0.1],
    rotationX: -Math.PI / 8,
    rotationZ: Math.PI / 8,
  },

  {
    url: "/textures/free_iphone.glb",
    position: [1.3, 0.2, 1.0],
    scale: [0.001, 0.001, 0.001],
    rotationX: -Math.PI / 6,
    rotationZ: Math.PI / 3,
  },
  
  {
    url: "/textures/igame_wifi_router",
    position: [2.3, 1.2, 2.0],
    scale: [0.05, 0.05, 0.05],
    rotationX: -Math.PI / 6,
    rotationZ: Math.PI / 3,
  },
  
];

models.forEach(({ url, position, scale, rotationY, rotationX, rotationZ }) => {
  new GLTFLoader().load(
    url,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(...scale);
      model.position.set(...position);
      if (rotationY) model.rotation.y = rotationY;
      if (rotationX) model.rotation.x = rotationX;
      if (rotationZ) model.rotation.z = rotationZ;
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(
        `An error occurred while loading the model at ${url}:`,
        error,
      );
    },
  );
});

const pretzelPositions = [
  { x: -1.8, y: 0.01, z: -2.2 },
  { x: -1.6, y: 0.01, z: -1.6 },
  { x: -1.4, y: 0.01, z: -1.4 },
  { x: -1.2, y: 0.01, z: -1.2 },
];

pretzelPositions.forEach((position, index) => {
  new GLTFLoader().load("/textures/pretzel.glb", (gltf) => {
    const pretzel = gltf.scene;
    pretzel.scale.set(0.05, 0.05, 0.05);
    pretzel.position.set(position.x, position.y, position.z);
    pretzel.rotation.set(-Math.PI / 4, Math.PI / 4, 0);
    scene.add(pretzel);
  });
});


loader.load(
  "/textures/window.glb",
  (gltf) => {
    const windowModel = gltf.scene;

    windowModel.position.set(-2.3, 0.5, 0.03);
    windowModel.scale.set(0.08, 0.06, 0.05);
    windowModel.rotation.set(0, Math.PI / 2, 0);

    scene.add(windowModel);
    createSteamEffect(windowModel.position);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the window.glb model:", error);
  }
);

function createSteamEffect(position) {
  const particleCount = 200;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
  });

  
  const positions = [];
  for (let i = 0; i < particleCount; i++) {
    const x = position.x + (Math.random() - 0.5) * 0.5;
    const y = position.y + Math.random() * 1.5;
    const z = position.z + (Math.random() - 0.5) * 0.5;
    positions.push(x, y, z);
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);


  function animateParticles() {
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] += 0.01;
      if (positions[i] > position.y + 1.5) positions[i] = position.y;
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}


    models.forEach(({ url, position, scale, rotationY, rotationX, rotationZ }) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(...scale);
          model.position.set(...position);
          if (rotationY) model.rotation.y = rotationY;
          if (rotationX) model.rotation.x = rotationX;
          if (rotationZ) model.rotation.z = rotationZ;
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error(`An error occurred while loading the model at ${url}:`, error);
        }
      );
    });


const video = document.createElement("video");
video.src = "/textures/video.mp4";
video.crossOrigin = "anonymous";
video.loop = true;
video.muted = true;
video.autoplay = true;

video.play().catch((error) => {
  console.error("Video playback error:", error);
});

const videoTexture = new THREE.VideoTexture(video);
videoTexture.needsUpdate = true; 

const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const videoScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  videoMaterial
);
videoScreen.position.set(0, 1.5, -2.4);
scene.add(videoScreen);


const windowMaterial = new THREE.MeshBasicMaterial({ map: windowTexture });
const windowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.5),
  windowMaterial
);
windowPlane.position.set(-2.4, 1.65, 0);
windowPlane.rotation.y = Math.PI / 2;
scene.add(windowPlane);


window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


function animate() {
  if (video.readyState >= video.HAVE_CURRENT_DATA) {
    videoTexture.needsUpdate = true;
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
