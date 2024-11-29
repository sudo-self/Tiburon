# <a href="https://jr-three.vercel.app/">JesseJesse.com</a>
<img width="1190" alt="Screenshot 2024-11-25 at 01 20 50" src="https://github.com/user-attachments/assets/b1e477eb-a889-4f9e-81e1-de2cb0ce307c">
<img width="1372" alt="Screenshot 2024-11-25 at 01 20 06" src="https://github.com/user-attachments/assets/86ae522c-4458-4716-a007-27a9c778713b">

### Model Array

```
const models = [
  {
    url: "/textures/mountain_bike.glb",
    position: [1.5, 0.6, -1.2],
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
    url: "/textures/vape.glb",
    position: [0.3, 0.61, 0.2],
    scale: [0.2, 0.2, 0.2],
    rotationY: 1,
  },

  {
    url: "/textures/ps5_customized.glb",
    position: [-1.0, 0.1, -2.0],
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
    url: "/textures/fire_truck.glb",
    position: [-2, 0, -2.1],
    scale: [1.0, 1.0, 1.0],
    rotationY: Math.PI / 2,
  },
  {
    url: "/textures/donnie.glb",
    position: [-2.4, 0, -1.9],
    scale: [0.4, 0.4, 0.4],
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
    rotationY: Math.PI / 1.89,
  },
  
  {
    url: "/textures/foosball.glb",
    position: [-1.4, 0.05, -0.7],
    scale: [0.45, 0.5, 0.45],
    rotationY: Math.PI / 1.95,
  },
  
  {
    url: "/textures/pirate_flag.glb",
    position: [-1.9, 0.03, 1.1],
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
    url: "/textures/hoodie.glb",
    position: [2.3, 0.4, 2.0],
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
    position: [1.6, 0.5, -0.7],
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

```

### Three JS Scene

```
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
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

```
### App.jsx

```
import React from 'react';
import ThreeScene from './ThreeScene';

const App = () => {
  return (
    <div>
      <h1>Three.js</h1>
      <ThreeScene />
    </div>
  );
};

export default App;


```


