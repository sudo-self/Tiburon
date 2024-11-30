// JesseJesse.com

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { MathUtils, Vector3 } from "three";

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
camera.position.set(0, 1, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;


const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

const sun = new Vector3();
const phi = MathUtils.degToRad(90);
const theta = MathUtils.degToRad(180);
sun.setFromSphericalCoords(1, phi, theta);

sky.material.uniforms.sunPosition.value.copy(sun);


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.copy(sun).multiplyScalar(450000);
scene.add(directionalLight);


const loader = new GLTFLoader();
let fireTruck;


loader.load(
  "/textures/fire_truck.glb",
  (gltf) => {
    fireTruck = gltf.scene;

    fireTruck.position.set(-1.9, 0.01, -2.1);
    fireTruck.scale.set(0.18, 0.18, 0.18);
    fireTruck.rotation.y = Math.PI / -2;

  
    fireTruck.traverse((child) => {
      if (child.isMesh) {
    
        child.material.roughness = 0.6;
        child.material.metalness = 0.1;
      }
    });

 
    scene.add(fireTruck);

    console.log("Fire truck loaded successfully with modified materials!");


    const ambientLight = new THREE.AmbientLight(0x505050, 0.4);
    scene.add(ambientLight);

   
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  },
  undefined,
  (error) => {
    console.error("Error loading the fire truck model:", error);
  }
);


const wallTexture = new THREE.TextureLoader().load('/textures/wall.jpeg');
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });


const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), wallMaterial);
leftWall.position.set(-2.5, 1.25, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);


const backWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), wallMaterial);
backWall.position.set(0, 1.25, -2.5);
scene.add(backWall);

const secondBackWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), wallMaterial);
secondBackWall.position.set(5, 1, 2.9);
scene.add(secondBackWall);


const tooltip = document.createElement("div");
tooltip.style.position = "fixed";
tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
tooltip.style.color = "#fff";
tooltip.style.padding = "5px";
tooltip.style.borderRadius = "3px";
tooltip.style.display = "none";
document.body.appendChild(tooltip);


window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick, false);

function onMouseMove(event) {

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  const raycaster = new THREE.Raycaster();
  raycaster.ray.origin.set(camera.position.x, camera.position.y, camera.position.z);
  raycaster.ray.direction.set(mouse.x, mouse.y, 1).normalize();


  const intersects = raycaster.intersectObject(fireTruck);

  if (intersects.length > 0) {
    tooltip.style.display = "block";


    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;


    let left = event.clientX + 10;
    let top = event.clientY + 10;
  
    if (left + tooltipWidth > window.innerWidth) {
      left = event.clientX - tooltipWidth - 10;
    }

 
    if (top + tooltipHeight > window.innerHeight) {
      top = event.clientY - tooltipHeight - 10;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.innerHTML = "Press 1 to Open Garage";
  } else {
    tooltip.style.display = "none";
  }
}

function onMouseClick() {
  const raycaster = new THREE.Raycaster();
  raycaster.ray.origin.set(camera.position.x, camera.position.y, camera.position.z);
  raycaster.ray.direction.set(0, 0, 1).normalize();
  const intersects = raycaster.intersectObject(fireTruck);
  if (intersects.length > 0) {
    console.log("Truck clicked!");
  }
}

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

const speed = 0.2;
const rotationSpeed = 0.04;

function setupControls() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "s") movement.forward = true;
    if (event.key === "w") movement.backward = true;
    if (event.key === "a") movement.left = true;
    if (event.key === "d") movement.right = true;
  });

  window.addEventListener("keyup", (event) => {
    if (event.key === "s") movement.forward = false;
    if (event.key === "w") movement.backward = false;
    if (event.key === "a") movement.left = false;
    if (event.key === "d") movement.right = false;
  });
}

function updateMovement() {
  if (!fireTruck) return;


  if (movement.forward) {
    fireTruck.translateZ(-speed);
  }


  if (movement.backward) {
    fireTruck.translateZ(speed);
  }


  if (movement.left) {
    fireTruck.rotation.y += rotationSpeed;
  }

  if (movement.right) {
    fireTruck.rotation.y -= rotationSpeed;
  }
}

function animateScene() {
  requestAnimationFrame(animateScene);

  updateMovement();
  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupControls();
animateScene();


const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("/textures/stone.jpg");
const windowTexture = textureLoader.load("/textures/window.png");
const photoTexture = textureLoader.load("/textures/jj.jpeg");
const rockyTexture = textureLoader.load("/textures/rocky_terrain.webp");
const carpetTexture = new THREE.TextureLoader().load("/textures/carpet.jpg");

const planeMaterial = new THREE.MeshStandardMaterial({ map: rockyTexture });


const planeGeometry = new THREE.PlaneGeometry(50, 50);
const ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor1 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), floorMaterial);
floor1.rotation.x = -Math.PI / 2;
floor1.receiveShadow = true;
floor1.position.set(0, 0.01, 0);
scene.add(floor1);


const floor3 = floor1.clone();
floor3.position.set(0, 0.01, 5);
scene.add(floor3);


const floor4 = floor1.clone();
floor4.position.set(5, 0.01, 5);
scene.add(floor4);


const carpetMaterial = new THREE.MeshStandardMaterial({ map: carpetTexture });
const secondFloor = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), carpetMaterial);
secondFloor.rotation.x = -Math.PI / 2;
secondFloor.receiveShadow = true;
secondFloor.position.y = 2.5;
secondFloor.position.z = 4.3;
scene.add(secondFloor);


const pointLight = new THREE.PointLight(0xffaa88, 1, 10);
pointLight.position.set(0, 2, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const couchMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
const couchBase = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.3, 1),
  couchMaterial,
);
couchBase.position.set(1.0, 0.2, 2);
scene.add(couchBase);

const backrestMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
const backrest = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.5, 0.2),
  backrestMaterial,
);
backrest.position.set(1.0, 0.6, 2.4);
scene.add(backrest);

const armrestGeometry = new THREE.BoxGeometry(0.2, 0.5, 1);
const armrest1 = new THREE.Mesh(armrestGeometry, couchMaterial);
const armrest2 = armrest1.clone();
armrest1.position.set(-0.4, 0.45, 2);
armrest2.position.set(2.4, 0.45, 2);
scene.add(armrest1, armrest2);

const cushionMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6600 });
const cushionGeometry = new THREE.BoxGeometry(1.3, 0.25, 0.9);

const cushion1 = new THREE.Mesh(cushionGeometry, cushionMaterial);
const cushion2 = new THREE.Mesh(cushionGeometry, cushionMaterial);

cushion1.position.set(0.3, 0.4, 2);
cushion2.position.set(1.7, 0.4, 2);

scene.add(cushion1, cushion2);

const footrestMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
const footrest = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.3, 1),
  footrestMaterial,
);
footrest.position.set(1.9, 0.2, 1.0);
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
  { x: 0.7, z: -0.4 },
];

for (let i = 0; i < 4; i++) {
  const leg = new THREE.Mesh(legGeometry, legMaterial);

  leg.position.set(legPositions[i].x, 0.45 - 0.45 / 2, legPositions[i].z);
  legs.push(leg);
}

scene.add(...legs);

const photoGeometry = new THREE.PlaneGeometry(1.5, 1);
const photoMaterial = new THREE.MeshStandardMaterial({
  map: photoTexture,
  side: THREE.DoubleSide,
  roughness: 0.5,
  metalness: 0.2,
});

const photo = new THREE.Mesh(photoGeometry, photoMaterial);
photo.scale.set(0.5, 0.5, 1);
photo.position.set(1.7, 1.6, -2.4);
photo.rotation.y = Math.PI / 100;
scene.add(photo);


const frameGeometry = new THREE.PlaneGeometry(1.6, 1.1);
const frameMaterial = new THREE.MeshStandardMaterial({
  emissive: getRandomNeonColor(),
  emissiveIntensity: 0.8,
  roughness: 0.5,
  metalness: 0.2,
  side: THREE.DoubleSide,
});

function getRandomNeonColor() {
  const colors = [
    0x39ff14, // neon green
    0xff073a, // neon red
    0x0fa9ff, // neon blue
    0xfa00ff, // neon purple
    0xfff700, // neon yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const light = new THREE.PointLight(getRandomNeonColor(), 1.5, 10);
light.position.set(1.7, 1.6, -2.8);
scene.add(light);


function changeLightColor() {
  light.color.set(getRandomNeonColor());
}

setInterval(changeLightColor, 2000);


let gameBoy = null;
let iphone = null;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const popupElement = document.createElement('div');
popupElement.style.position = 'absolute';
popupElement.style.padding = '10px';
popupElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
popupElement.style.color = 'white';
popupElement.style.borderRadius = '5px';
popupElement.style.display = 'none';
popupElement.style.maxWidth = '90%';
popupElement.style.wordWrap = 'break-word';
popupElement.style.zIndex = '1000';
document.body.appendChild(popupElement);

const iframe = document.createElement('iframe');
iframe.style.position = 'absolute';
iframe.style.width = window.innerWidth < 600 ? '90%' : '80%';
iframe.style.height = window.innerWidth < 600 ? '70%' : '80%';
iframe.style.border = 'none';
iframe.style.display = 'none';
iframe.style.zIndex = '1001';
document.body.appendChild(iframe);

const closeButton = document.createElement('button');
closeButton.innerText = 'EXIT';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.left = '10px';
closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
closeButton.style.color = 'white';
closeButton.style.border = 'none';
closeButton.style.padding = '15px';
closeButton.style.borderRadius = '5px';
closeButton.style.cursor = 'pointer';
closeButton.style.fontSize = '16px';
closeButton.style.zIndex = '1002';
closeButton.style.display = 'none';
document.body.appendChild(closeButton);

loader.load('/textures/game_boy.glb', (gltf) => {
  gameBoy = gltf.scene;
  gameBoy.position.set(0.3, 0.64, -0.1);
  gameBoy.scale.set(1.5, 1.5, 1.5);
  gameBoy.rotation.x = -Math.PI / 2;
  gameBoy.rotation.z = Math.PI / 8;
  scene.add(gameBoy);
});

loader.load('/textures/free_iphone.glb', (gltf) => {
  iphone = gltf.scene;
  iphone.position.set(1.3, 0.2, 1.0);
  iphone.scale.set(0.001, 0.001, 0.001);
  iphone.rotation.x = -Math.PI / 6;
  iphone.rotation.z = Math.PI / 3;
  scene.add(iphone);
});

function getMousePosition(event) {
  let x = event.clientX || event.touches[0].clientX;
  let y = event.clientY || event.touches[0].clientY;
  return {
    x: (x / window.innerWidth) * 2 - 1,
    y: -(y / window.innerHeight) * 2 + 1
  };
}

let chess = null;


loader.load('/textures/chess_coines.glb', (gltf) => {
  chess = gltf.scene;
  chess.position.set(-0.3, 0.8, -2.0);
  chess.scale.set(0.03, 0.03, 0.03);
  chess.rotation.x = -Math.PI / 55;
  chess.rotation.z = Math.PI / 55;
  chess.rotation.y = Math.PI / 2;
  scene.add(chess);
});

function onMove(event) {
  const { x, y } = getMousePosition(event);
  mouse.set(x, y);
  raycaster.setFromCamera(mouse, camera);

  if (gameBoy || iphone || chess) {
    const intersectsGameBoy = gameBoy ? raycaster.intersectObject(gameBoy, true) : [];
    const intersectsIphone = iphone ? raycaster.intersectObject(iphone, true) : [];
    const intersectsChess = chess ? raycaster.intersectObject(chess, true) : [];

    if (intersectsGameBoy.length > 0) {
      popupElement.style.display = 'block';
      popupElement.innerHTML = 'Game Boy';
      popupElement.style.left = `${event.clientX + window.scrollX + 10}px`;
      popupElement.style.top = `${event.clientY + window.scrollY + 10}px`;
    } else if (intersectsIphone.length > 0) {
      popupElement.style.display = 'block';
      popupElement.innerHTML = 'iPad';
      popupElement.style.left = `${event.clientX + window.scrollX + 10}px`;
      popupElement.style.top = `${event.clientY + window.scrollY + 10}px`;
    } else if (intersectsChess.length > 0) {
      popupElement.style.display = 'block';
      popupElement.innerHTML = 'Play Chess';
      popupElement.style.left = `${event.clientX + window.scrollX + 10}px`;
      popupElement.style.top = `${event.clientY + window.scrollY + 10}px`;
    } else {
      popupElement.style.display = 'none';
    }
  }
}

function onClick(event) {
  const { x, y } = getMousePosition(event);
  mouse.set(x, y);
  raycaster.setFromCamera(mouse, camera);

  if (gameBoy || iphone || chess) {
    const intersectsGameBoy = gameBoy ? raycaster.intersectObject(gameBoy, true) : [];
    const intersectsIphone = iphone ? raycaster.intersectObject(iphone, true) : [];
    const intersectsChess = chess ? raycaster.intersectObject(chess, true) : [];

    if (intersectsGameBoy.length > 0) {
      iframe.src = 'https://marioallstars.vercel.app';
      iframe.style.display = 'block';
      iframe.style.left = `${(window.innerWidth - iframe.offsetWidth) / 2}px`;
      iframe.style.top = `${(window.innerHeight - iframe.offsetHeight) / 2}px`;
      closeButton.style.display = 'block';
      enableOutsideClickListener();
    } else if (intersectsIphone.length > 0) {
      iframe.src = 'https://imac.jessejesse.com';
      iframe.style.display = 'block';
      iframe.style.left = `${(window.innerWidth - iframe.offsetWidth) / 2}px`;
      iframe.style.top = `${(window.innerHeight - iframe.offsetHeight) / 2}px`;
      closeButton.style.display = 'block';
      enableOutsideClickListener();
    } else if (intersectsChess.length > 0) {
      iframe.src = 'https://www.chessonlinefree.com/play-chess-online#google_vignette';
      iframe.style.display = 'block';
      iframe.style.left = `${(window.innerWidth - iframe.offsetWidth) / 2}px`;
      iframe.style.top = `${(window.innerHeight - iframe.offsetHeight) / 2}px`;
      closeButton.style.display = 'block';
      enableOutsideClickListener();
    }
  }
}

function enableOutsideClickListener() {
  window.addEventListener('click', outsideClick);
}

function outsideClick(event) {
  if (!iframe.contains(event.target) && !closeButton.contains(event.target)) {
    iframe.style.display = 'none';
    closeButton.style.display = 'none';
    window.removeEventListener('click', outsideClick);
  }
}

closeButton.addEventListener('click', () => {
  iframe.style.display = 'none';
  closeButton.style.display = 'none';
  window.removeEventListener('click', outsideClick);
});


window.addEventListener('mousemove', onMove, false);
window.addEventListener('click', onClick, false);
window.addEventListener('touchmove', (event) => {
  event.preventDefault();
  onMove(event);
}, { passive: false });
window.addEventListener('touchstart', (event) => {
  event.preventDefault();
  onClick(event);
}, { passive: false });


window.addEventListener('resize', () => {
  iframe.style.width = window.innerWidth < 600 ? '90%' : '80%';
  iframe.style.height = window.innerWidth < 600 ? '70%' : '80%';
});


let mixer;
let doorAction;
let doorOpen = false;
let doorSquare;

loader.load(
  '/textures/garage_door.glb',
  (gltf) => {
      const garageDoor = gltf.scene;
        garageDoor.position.set(-2.44, 0.4, -2.08);
        garageDoor.scale.set(0.2, 0.2, 0.2);
        garageDoor.rotation.y = Math.PI / 2;
        scene.add(garageDoor);

   
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(garageDoor);
      gltf.animations.forEach((clip) => {
        doorAction = mixer.clipAction(clip);
        doorAction.loop = THREE.LoopOnce;
        doorAction.clampWhenFinished = true;
      });
    }

 
    camera.position.z = 5;
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);



document.addEventListener('keydown', (event) => {
  if (!mixer) return;

  if (event.key === '1' || event.key === '1') {
    if (!doorOpen) {
    
      doorAction.reset();
      doorAction.play();
      doorOpen = true;
    }
  } else if (event.key === '2' || event.key === '2') {
    if (doorOpen) {
     
      doorAction.time = doorAction.getClip().duration;
      doorAction.play();
      doorOpen = false;
    }
  }
});


const animateGarageDoor = () => {
  requestAnimationFrame(animateGarageDoor);


  if (mixer) {
    mixer.update(0.02);
  }

  renderer.render(scene, camera);
};

animateGarageDoor();

loader.load(
  "/textures/macbook.glb",
  (gltf) => {
    const macbook = gltf.scene;
    macbook.scale.set(0.2, 0.2, 0.2);
    macbook.position.set(-0.3, 0.6, 0.2);
    scene.add(macbook);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the MacBook model:", error);
  }
);


const models = [
  {
    url: "/textures/mountain_bike.glb",
    position: [1.5, 0.6, 3.2],
    scale: [1.2, 0.9, 0.9],
    rotationY: 10,
  },

  {
    url: "/textures/apple_watch.glb",
    position: [0.1, 0.61, 0.2],
    scale: [0.06, 0.06, 0.06],
    rotationY: Math.PI / 18,
    rotationX: -Math.PI / 18,
  },

    {
    url: "/textures/aviators.glb",
    position: [2.0, 0.6, 2.0],
    scale: [0.0009, 0.0009, 0.0009],
    rotationZ: Math.PI / 55,
    rotationY: Math.PI / -2,
    rotationX: Math.PI / -55,
  },
  
  {
    url: "/textures/modern_kitchen.glb",
    position: [6.0, 0.1, 5.8],
    scale: [0.4, 0.4, 0.4],
    rotationZ: Math.PI / 60,
    rotationY: Math.PI,
    rotationX: 0,
  },

  {
    url: "/textures/vape.glb",
    position: [0.3, 0.61, 0.2],
    scale: [0.2, 0.2, 0.2],
    rotationY: 1,
  },
  
  {
    url: "/textures/railing.glb",
      position: [27.2, 1.6, -5.8],
    scale: [0.5, 0.4, 0.5],
    rotationY: 3.15,
  },
  
  {
    url: "/textures/a10.glb",
      position: [2.2, 10.6, -15.8],
    scale: [0.06, 0.06, 0.06],
    rotationY: 2,
    rotationX: -2,
      
  },
  
  {
    url: "/textures/the_piano.glb",
      position: [2.1, 3.0, 4.4],
    scale: [0.4, 0.4, 0.4],
    rotationY: -14.15,
  },
  
  {
    url: "/textures/railing.glb",
      position: [-4.5, 1.6, -23.0],
    scale: [0.5, 0.4, 0.5],
    rotationY: -14.15,
  },
  
  {
    url: "/textures/sofa.glb",
      position: [-.5, 2.9, 2.5],
    scale: [1.0, 1.0, 1.0],
    rotationY: -12.55,
  },
  
  {
    url: "/textures/up_window.glb",
      position: [-2.4, 2.6, 6.0],
    scale: [.5, 0.5, 0.5],
    rotationY: -14.1,
  },
  {
    url: "/textures/up_window.glb",
      position: [4.4, 0.8, 2.9],
    scale: [.5, 0.5, 0.5],
    rotationY: -153.95,
  },
  
  {
    url: "/textures/up_window.glb",
      position: [2.5, .8, -1.6],
    scale: [.6, 0.6, 0.6],
    rotationY: -174.3,
  },
  
  {
    url: "/textures/humvee.glb",
      position: [-18.1, 0.1, 2.5],
    scale: [.005, .005, .005],
    rotationY: -12.55,
  },
  
  {
    url: "/textures/retro_tv.glb",
      position: [-1.0, 2.0, 3.6],
    scale: [.03, .03, .03],
    rotationY: -41.6,
  },

  
  
  {
    url: "/textures/ps5_customized.glb",
    position: [-1.0, 0.03, -2.0],
    scale: [0.3, 0.3, 0.3],
    rotationY: 0,
  },
  
 

  {
    url: "/textures/kitchen_table.glb",
    position: [0.4, 0.6, -2.4],
    scale: [0.01, 0.01, 0.01],
    rotationY: 0,
  },

  {
    url: "/textures/playstation_shapes.glb",
    position: [-0.2, 0.8, -2.4],
    scale: [0.1, 0.1, 0.1],
    rotationY: 0,
  },

  {
    url: "/textures/nike_shoes.glb",
    position: [-1.9, 0.009, -0.5],
    scale: [0.02, 0.02, 0.02],
    rotationY: Math.PI / 2,
  },
  
    {
    url: "/textures/donnie.glb",
    position: [-2.2, 0, -1.2],
    scale: [0.4, 0.4, 0.4],
    rotationY: Math.PI / 2,
  },
  
  
    {
    url: "/textures/runway.glb",
    position: [-21, 0, -8.2],
    scale: [0.01, 0.01, 0.03],
    rotationY: Math.PI / 2,
  },
  
  {
  url: "/textures/runway.glb",
  position: [-21, 0.01, 2.2],
  scale: [0.01, 0.01, 0.03],
  rotationY: Math.PI / 2,
},
  
 
  
    {
    url: "/textures/bookshelf_speaker.glb",
    position: [-2.4, 1.5, -1.6],
    scale: [0.4, 0.4, 0.4],
    rotationY: Math.PI / 2,
  },
    {
    url: "/textures/chest_speaker.glb",
    position: [-2.43, 1.75, -1.6],
    scale: [2.5, 2.5, 2.5],
    rotationY: Math.PI / -2,
  },
  
  {
    url: "/textures/babys_highchair.glb",
    position: [0.1, 0, -1.9],
    scale: [0.3, 0.3, 0.3],
    rotationY: Math.PI / 2,
  },

    {
    url: "/textures/red_energy.glb",
    position: [-2.3, 1.06, -0.3],
    scale: [1.5, 1.5, 1.5],
    rotationY: Math.PI / 4,
  },
  
    {
    url: "/textures/rug.glb",
    position: [0.1, 0, 1.0],
    scale: [0.9, 0.9, 0.9],
    rotationY: Math.PI / 40,
  },
  
  {
    url: "/textures/laundry_basket.glb",
    position: [2.0, 0.5, -8.4],
    scale: [0.9, 0.9, 0.9],
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/stuff_Bear.glb",
    position: [-1.75, 0.05, 2],
    scale: [1.6, 1.6, 1.6],
    rotationY: Math.PI / 2.5,
  },
  
  {
    url: "/textures/pool_table.glb",
    position: [-1.5, 0.05, 9.65],
    scale: [.01, .01, .01],
    rotationY: Math.PI / 2.5,
  },
  {
    url: "/textures/lamp_02.glb",
    position: [1.0, 1.0, 5.5],
    scale: [.4, .4, .4],
    rotationY: Math.PI / 2.5,
  },
  {
    url: "/textures/lamp_02.glb",
    position: [1.5, 1.0, 5.5],
    scale: [.4, .4, .4],
    rotationY: Math.PI / 2.5,
  },


  {
    url: "/textures/pirate_flag.glb",
    position: [-2.2, 0.03, 1.1],
    scale: [0.004, 0.004, 0.004],
    rotationY: Math.PI / -1.3,
  },
  
  {
    url: "/textures/samsung_tv_remote_control.glb",
    position: [0.5, 0.6, 2],
    scale: [0.1, 0.1, 0.1],
    rotationX: -Math.PI / 8,
    rotationZ: Math.PI / 8,
  },
    {
    url: "/textures/chinese_stairs.glb",
    position: [3.8, 0.1, 1.4],
    scale: [0.003, 0.003, 0.003],
    rotationY: Math.PI / -2,
  },

  {
    url: "/textures/hoodie.glb",
    position: [2.3, 0.5, 2.0],
    scale: [0.8, 0.8, 0.8],
    rotationX: -Math.PI / 2,
    rotationZ: Math.PI / 8,
  },
  
    {
    url: "/textures/woodtable.glb",
    position: [1.9, 0.01, -2.2],
    scale: [0.5, 0.5, 0.5],
    rotationZ: Math.PI / 84,
  },
  
  {
  url: "/textures/candy_real.glb",
  position: [0.8, 0.36, -1.1],
  scale: [0.1, 0.1, 0.1],
  rotationZ: Math.PI / 80,
},
  
  {
    url: "/textures/bmx.glb",
    position: [0.6, 0.5, 2.7],
    scale: [0.3, 0.3, 0.3],
    rotationY: Math.PI / 12,
  },

  {
    url: "/textures/bronco.glb",
    position: [0.6, 0.65, -2.2],
    scale: [0.004, 0.004, 0.004],
    rotationX: -Math.PI / 55,
    rotationZ: Math.PI / 55,
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/flash_light.glb",
    position: [0.3, 0.65, -2.0],
    scale: [0.9, 0.9, 0.9],
    rotationX: -Math.PI / 55,
    rotationZ: Math.PI / 55,
    rotationY: Math.PI / 2,
  },

  {
    url: "/textures/chess_coines.glb",
    position: [-0.3, 0.8, -2.0],
    scale: [0.03, 0.03, 0.03],
    rotationX: -Math.PI / 55,
    rotationZ: Math.PI / 55,
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/coffe_maker.glb",
    position: [0.7, 0.75, -0.1],
    scale: [0.01, 0.01, 0.01],
    rotationY: Math.PI / 5,
  },
  {
    url: "/textures/c_cup.glb",
    position: [0.5, 0.65, -0.1],
    scale: [0.03, 0.03, 0.03],
    rotationY: Math.PI / 5,
  },
  
  {
    url: "/textures/d_tags.glb",
    position: [0.6, 0.63, 0.2],
    scale: [0.0002, 0.0002, 0.0002],
    rotationY: Math.PI / 5,
  },

  {
    url: "/textures/pirate_poster.glb",
    position: [-1.7, 0.9, -2.5],
    scale: [0.2, 0.2, 0.2],
    rotationY: Math.PI / -2,
  },
  
  {
    url: "/textures/side_roof.glb",
    position: [-5.0, -0.1, -10.75],
    scale: [0.039, 0.058, 0.059],
    rotationY: Math.PI / 1,
  },
  

  {
    url: "/textures/jj.jpeg",
    position: [-1.4, 0.9, -2.5],
    scale: [0.2, 0.2, 0.2],
    rotationY: Math.PI / -2,
  },
  
    {
    url: "/textures/frame.glb",
    position: [1.7, 1.6, -2.55],
    scale: [5.4, 3.2, 5.4],
    rotationY: Math.PI / -100,
  },
];

let object = {
  url: "/textures/dji_mini_2.glb",
  position: [-1.5, 0.5, -2.0],
  scale: [1.4, 0.8, 1.2],
  rotationY: 0,
};

let model;

function animateObject() {
  const amplitude = 0.4;
  const frequency = 0.5;

  if (model) {
    model.position.y =
      object.position[1] + amplitude * Math.sin(frequency * Date.now() * 0.001);

    model.rotation.y += 0.02;
  }

  requestAnimationFrame(animateObject);
}

animateObject();

new GLTFLoader().load(
  object.url,
  (gltf) => {
    model = gltf.scene;
    model.scale.set(...object.scale);
    model.position.set(...object.position);
    if (object.rotationY) model.rotation.y = object.rotationY;
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error(
      `An error occurred while loading the model at ${object.url}:`,
      error,
    );
  },
);

const pretzelPositions = [
  { x: -1.6, y: 0.05, z: -1.6 },
  { x: -1.4, y: 0.05, z: -1.4 },
  { x: -1.2, y: 0.05, z: -1.2 },
];

pretzelPositions.forEach((position) => {
  new GLTFLoader().load("/textures/pretzel.glb", (gltf) => {
    const pretzel = gltf.scene;
    pretzel.scale.set(0.05, 0.05, 0.05);
    pretzel.position.set(position.x, position.y, position.z);
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
    console.error(
      "An error occurred while loading the window.glb model:",
      error,
    );
  },
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
    new THREE.Float32BufferAttribute(positions, 3),
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

 
      if (url === "/textures/flash_light.glb") {
        const light = new THREE.SpotLight(0xffffff, 5);
        light.position.set(0, 2, 0);
        light.angle = Math.PI / 4;
        light.penumbra = 0.5;
        light.distance = 5;
        light.castShadow = true;
        light.visible = false;
        scene.add(light);

     
        window.addEventListener("mousemove", (event) => {
     
          const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );

        
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

     
          const intersects = raycaster.intersectObject(model, true);

          
          console.log("Intersecting:", intersects.length);

        
          if (intersects.length > 0) {
            console.log("Light ON");
            light.visible = true;
          } else {
            console.log("Light OFF");
            light.visible = false;
          }
        });
      }

   
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(
        `An error occurred while loading the model at ${url}:`,
        error
      );
    }
  );
});

const video = document.createElement("video");
video.src = "https://jr-three.vercel.app/textures/video.mp4";
video.crossOrigin = "anonymous";
video.loop = true;
video.muted = true;
video.autoplay = true;
video.playsInline = true;

video.addEventListener("canplaythrough", () => {
  console.log("Video ready to play");
  video.play().catch((e) => console.error("Video play error:", e));
});

video.addEventListener("error", (e) => {
  console.error("Video error:", e);
});

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const videoScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  videoMaterial,
);
videoScreen.position.set(0.1, 1.5, -2.4);

const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const borderThickness = 0.1;
const borderGeometry = new THREE.PlaneGeometry(
  2 + borderThickness,
  1 + borderThickness,
);
const border = new THREE.Mesh(borderGeometry, borderMaterial);
border.position.copy(videoScreen.position);
border.position.z -= 0.01;

scene.add(border);
scene.add(videoScreen);

const windowMaterial = new THREE.MeshBasicMaterial({ map: windowTexture });
const windowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.5),
  windowMaterial,
);
windowPlane.position.set(-2.4, 1.65, 0);
windowPlane.rotation.y = Math.PI / 2;
scene.add(windowPlane);

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  controls.update(delta);

  if (video.readyState >= video.HAVE_CURRENT_DATA) {
    videoTexture.needsUpdate = true;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

console.log('Scene:', scene);
console.log('Camera:', camera);
console.log('Renderer:', renderer);


export default ThreeScene;


  





















  


























  


























  


























  

