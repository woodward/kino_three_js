// From: https://www.honeybadger.io/blog/import-maps/#constructing-import-maps-dynamically
// Another reference: https://github.com/WICG/import-maps#dynamic-import-map-example
// const importMap = {
    // "imports": {
//       "three": "./vendor/three.js/build/three.module.js",
//       "three/addons/": "./vendor/three.js/examples/jsm/"
      // "three": "https://unpkg.com/three@0.152.2/build/three.module.js",
      // "three/addons/": "https://unpkg.com/three@0.152.2/examples/jsm/"
    // }
// };

// const im = document.createElement('script');
// im.type = 'importmap';
// im.textContent = JSON.stringify(importMap);
// document.currentScript.after(im);

// import * as THREE from "./vendor/node_modules";
// import * as THREE from "./vendor/three.js/build/three.module.js";
// import "https://unpkg.com/three@0.152.2/examples/jsm/";


// import { OrbitControls } from "./vendor/three.js/examples/jsm/controls/OrbitControls.js";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import "https://unpkg.com/three@0.147.0/build/three.min.js";
import "https://unpkg.com/three@0.147.0/examples/js/controls/OrbitControls.js";


export function init(ctx, data) {
  // simpleCube(ctx);
  pendulums(ctx);
}

async function pendulums(ctx) {  
  ctx.root.innerHTML = `
  <div style='width: 896px; height: 700px;'>
    <h1>Pendulums</h1>
    <canvas id='sceneCanvas' style='width: 100%; height: 100%;' />
  </div>
  `
  const sceneCanvas = document.getElementById('sceneCanvas');
  const scene = new THREE.Scene();
  sceneCanvas.innerWidth = 896;
  sceneCanvas.innerHeight = 700;

  const aspect = sceneCanvas.innerWidth / sceneCanvas.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = Math.max(7 / aspect, 5);
  camera.position.y = 1;
  camera.lookAt(0, -1, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas, antialias: true });
  renderer.setSize( sceneCanvas.innerWidth, sceneCanvas.innerHeight );
  renderer.shadowMap.enabled = true;

  scene.background = new THREE.Color(0xc7dcff);

  const light = new THREE.AmbientLight(0xdddddd, 0.4);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(4, 10, 4);
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.camera.left = -20;
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  // const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );


  const ground = await createGround();
  scene.add(ground);

  const pendulums = [];
  for (let i = 0; i < 4; i++) {
    const pendulum = await createPendulum(scene, new THREE.Vector3(0, 0, -i * 1.2), 1.2 + i * 0.05);
    pendulums.push(pendulum);
  }

  scene.fog = new THREE.Fog(0xc7dcff, 1, 80);

  let startTime = null;
  let lastFrameTime = null;
  function animationFrame(time) {
    if (startTime == null) {
      startTime = time;
    }
    if (lastFrameTime == null) {
      lastFrameTime = time;
    }
    const deltaTime = time - lastFrameTime;
    lastFrameTime = time;
    const totalTime = time - startTime;
    update(deltaTime, totalTime);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animationFrame);
  }

  function update(deltaTime, totalTime) {
    pendulums.forEach((p) => {
      p.update(totalTime);
    });
  }

  // window.requestAnimationFrame(animationFrame);



  // From Box example:
  // sceneCanvasDiv.appendChild( renderer.domElement );
  renderer.render( scene, camera );
}

function simpleCube(ctx) {
  ctx.root.innerHTML = `
  <div id='three_js' style='width: 896px; height: 600px;'>
  <h1>Three JS</h1>
  </div>
  `
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, 896 / 600, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( 896, 600 );

  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  document.getElementById('three_js').appendChild( renderer.domElement );

  renderer.render( scene, camera );

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  }

  animate();
}

async function loadTexture(loader, url) {
  const texture = await loader.loadAsync(url);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 10);
  return texture;
}

async function createGround() {
  const loader = new THREE.TextureLoader();

  const textureColor = await loadTexture(loader, './images/paving_color.jpg');
  const textureRoughness = await loadTexture(loader, './images/paving_roughness.jpg');
  const textureNormal = await loadTexture(loader, './images/paving_normal.jpg');
  const textureAmbientOcclusion = await loadTexture(loader, './images/paving_ambient_occlusion.jpg');

  const planeGeometry = new THREE.PlaneGeometry(1000, 100);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: textureColor,
    normalMap: textureNormal,
    normalScale: new THREE.Vector2(2, 2),
    roughness: 1,
    roughnessMap: textureRoughness,
    aoMap: textureAmbientOcclusion,
    aoMapIntensity: 1,
  });
  const mesh = new THREE.Mesh(planeGeometry, planeMaterial);

  mesh.receiveShadow = true;
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -5;

  return mesh;
}

class Pendulum {
  string;
  ball;
  frequency;
  amplitude;

  constructor(stringMesh, ballMesh, frequency, amplitude) {
    this.string = stringMesh;
    this.ball = ballMesh;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }

  update(totalTime) {
    this.string.rotation.z = this.amplitude * Math.cos((this.frequency * totalTime) / 1000);
    this.ball.rotation.z = this.amplitude * Math.cos((this.frequency * totalTime) / 1000);
  }
}

async function createPendulum(scene, origin, frequency, amplitude) {
  const stringMesh = createStringMesh(scene);
  stringMesh.position.add(origin);
  stringMesh.translateY(6);
  stringMesh.geometry.translate(0, -4, 0);

  const ballMesh = await createBallMesh(scene);
  ballMesh.position.add(origin);
  ballMesh.translateY(6);
  ballMesh.geometry.translate(0, -8.5, 0);

  const pendulum = new Pendulum(stringMesh, ballMesh, frequency, amplitude);
  return pendulum;
}

function createStringMesh(scene) {
  const geometry = new THREE.CylinderGeometry(0.001, 0.001, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0, metalness: 0.2 });
  const string = new THREE.Mesh(geometry, material);
  scene.add(string);
  return string;
}

async function createBallMesh(scene) {
  const loader = new THREE.TextureLoader();

  const marbleTextureColor = await loader.loadAsync('./images/marble_color.jpg');
  const marbleTextureRoughness = await loader.loadAsync('./images/marble_roughness.jpg');

  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({
    map: marbleTextureColor,
    roughness: 1,
    roughnessMap: marbleTextureRoughness,
    metalness: 0.2,
  });
  const ball = new THREE.Mesh(geometry, material);
  ball.castShadow = true;
  scene.add(ball);
  return ball;
}

