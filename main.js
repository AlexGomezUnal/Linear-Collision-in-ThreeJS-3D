let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000);

let renderer = new THREE.WebGLRenderer();

//color pallete

let black ='rgb(0,0,0)';
let white ='rgb(255,255,255)';
let green ='rgb(10,200,10)';
let red = 'rgb(255,0,0)';
let blue ='rgb(0,0,255)';

renderer.setClearColor(black);
renderer.setSize(window.innerWidth,window.innerHeight);

let axes = new THREE.AxesHelper(30);
scene.add(axes);

//plane
let planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
let planeMaterial = new THREE.MeshBasicMaterial({color:green});
let plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.rotation.x = -0.5*Math.PI;
scene.add(plane);

let cube1Geometry = new THREE.CubeGeometry(3,3,3);
let cube1Material = new THREE.MeshBasicMaterial({color:red});
let cube1 = new THREE.Mesh(cube1Geometry,cube1Material);

cube1.position.x=-30;
cube1.position.y=1.5;
scene.add(cube1);

let cube2Geometry = new THREE.CubeGeometry(3,3,3);
let cube2Material = new THREE.MeshBasicMaterial({color:blue});
let cube2 = new THREE.Mesh(cube2Geometry,cube2Material);

cube2.position.x=3;
cube2.position.y=1.5;
scene.add(cube2);


camera.position.x=18;
camera.position.y=25;
camera.position.z=41;
camera.lookAt(scene.position);

let cameraControllsFirstPerson = new THREE.FirstPersonControls(camera);
cameraControllsFirstPerson.lookSpeed = 0.05;
cameraControllsFirstPerson.movementSpeed=10;

let step =0;
let stepy =0;

let vel1 =0.05;
let vel2=0;
let m1= 100;
let m2 = 100;
const posXImpact = (cube2.position.x-3)
let clock = new THREE.Clock();
function renderScene(){
    step+=0.005;
    stepy += 0.00005;
    let delta = clock.getDelta();

    if (cube1.position.x<posXImpact){
	cube1.position.x+=vel1;
	cube2.position.x+=vel2;

    }
    else{ 
	cube2.position.x+=((2*m1)/(m1+m2))*vel1;
	cube1.position.x+=((m1-m2)/(m1+m2))*vel1;

    }

    cameraControllsFirstPerson.update(delta);
    renderer.clear();

    requestAnimationFrame(renderScene);
    renderer.render(scene,camera);
}

$("#our_threejs_animation").append(renderer.domElement);
renderScene()
