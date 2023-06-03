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
  simpleCube(ctx);
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