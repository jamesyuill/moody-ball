import * as THREE from 'three';

//SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

//LIGHTS
const light = new THREE.DirectionalLight(0x8181ff, 1);
scene.add(light);
light.position.set(0, 0, -1);
const targetObject = new THREE.Object3D();
scene.add(targetObject);
targetObject.position.set(0, 0, -5);
light.target = targetObject;

const mouseLight = new THREE.PointLight(0xff0000, 10, 3, 1.2);
scene.add(mouseLight);

const antiMouseLight = new THREE.PointLight(0x0000ff, 10, 3, 1.2);
scene.add(antiMouseLight);

// GEOMETRY
const ballGeo = new THREE.SphereGeometry(1, 60, 60);
const ballMat = new THREE.MeshStandardMaterial();
const ball = new THREE.Mesh(ballGeo, ballMat);
scene.add(ball);

// BACKGROUND PANEL

const floorGeo = new THREE.PlaneGeometry(50, 50, 32);
const floorMat = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0x818181,
});
const floor = new THREE.Mesh(floorGeo, floorMat);
scene.add(floor);
floor.position.set(0, 0, -4);

//ANIMATE
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

//EVENT HANDLER

window.addEventListener('mousemove', lightFollowMouse);

window.addEventListener('resize', onWindowResize, false);

function lightFollowMouse(event) {
  const pointer = new THREE.Vector2();
  pointer.x = (event.clientX / window.innerWidth) * 1.5 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 1.5 + 1;

  mouseLight.position.set(pointer.x, pointer.y, 3);
  antiMouseLight.position.set(-pointer.x, -pointer.y, 3);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
