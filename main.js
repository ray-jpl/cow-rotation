import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// setup //
const renderer = new THREE.WebGLRenderer({ alpha: true });
document.getElementById("canvas").appendChild(renderer.domElement);

const scene = new THREE.Scene();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.updateProjectionMatrix();
camera.position.set(400, 300, 400);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
renderer.render(scene, camera);

// Lighting
const light = new THREE.AmbientLight(0xffffff);
light.position.set(10, 10, 10);
scene.add(light);

// Cow Object
let cow = new THREE.Mesh();
const loader = new GLTFLoader();
loader.load( 'scene.glb', function ( gltf ) {
  cow = gltf.scene
  cow.position.set(0, 150, 0)
	scene.add( cow );
}, undefined, function ( error ) {
	console.error( error );
} );

// Floor Plane
var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xf57542 } );
var floor = new THREE.Mesh( geometry, material );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = (Math.PI/2);
scene.add( floor ); 

var planeGeometry = new THREE.PlaneGeometry(700, 300, 1, 1);
var texture = new THREE.TextureLoader().load( 'meme.jpg' );
var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(-200, 200, -200)
plane.rotation.y = (Math.PI/4);
scene.add(plane);

console.log(scene);
animate();
function animate() {
    requestAnimationFrame(animate);
    cow.rotation.x += 0.01
    cow.rotation.y += 0.01
    renderer.render(scene, camera);
}


// Functions
document.getElementById("resetBtn").onclick = () => {
  controls.reset();
}