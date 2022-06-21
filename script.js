var cameraFar = 20;
var theModel;

const MODEL_PATH = "./chair.glb";

const BACKGROUND_COLOR = 0xdac400;

// Init the scene
const scene = new THREE.Scene();
// Set background
// scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector("#c");
// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);
// Add a camerra
var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = cameraFar;
camera.position.x = 0;

// Add lights

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(8, 12,20);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene
scene.add(dirLight);

// load texture
txtLoader = new THREE.TextureLoader();
baseColor = txtLoader.load('./assets/basecolor.jpg')
normalMap = txtLoader.load('assets/normal.jpg');
heightMap = txtLoader.load('assets/height.png');
roughnessMap = txtLoader.load('assets/roughness.jpg');
ambientOcclusionMap = txtLoader.load('assets/ambientOcclusion.jpg');
// =============================================
// Plane
var planeGeometry = new THREE.PlaneGeometry(10, 10, 512, 512);
var planesMaterial = new THREE.MeshStandardMaterial({
  color: 0x4530af,
  // map: baseColor,

  // normalMap: normalMap,
  // normalMapType:  THREE.ObjectSpaceNormalMap,

  displacementMap: heightMap,
  displacementScale: 0.025,

  roughnessMap: roughnessMap,
  roughness: 1,

  castShadow: true,
  receiveShadow: true

});

var plane = new THREE.Mesh(planeGeometry, planesMaterial);

scene.add(plane);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

animate();
