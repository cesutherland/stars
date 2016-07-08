'use strict';

var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild(renderer.domElement);

camera.position.z = 1;

var geometry, material, sun, moon;

var scale = 1;
var au = 149600000;

// Earth:
geometry = new THREE.SphereGeometry(6371 / au * scale, 12, 12);
material = new THREE.MeshLambertMaterial( { color: 0x5555ff, shading: THREE.FlatShading });
var earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Moon:
geometry = new THREE.SphereGeometry(1737.1 / au * scale, 12, 12);
material = new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading });
var moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// Sun:
geometry = new THREE.SphereGeometry(695700 / au * scale, 32, 32);
material = new THREE.MeshBasicMaterial( { color: 0xffff00, shading: THREE.FlatShading });
var sun = new THREE.Mesh(geometry, material);
scene.add(sun);

sun.position.set(0,0,0);

var light = new THREE.AmbientLight(0x444444, 1.8);
scene.add(light);

var light = new THREE.PointLight( 0xffffaa, 1.8 );
light.position.set(0,0,0);
scene.add(light);

var controls = new OrbitControls(camera);


//light = new THREE.PointLight( 0xb4e7f2, 0.8 );
//light.position.set(-5,-5,0);

//scene.add(light);

var render = function (t) {

  var speed = 0.01;
  var speedFactor = 1000/speed;

  requestAnimationFrame( render );

  controls.update();

  moon.position.set(
    Math.sin(t/speedFactor) + Math.sin(t/speedFactor * 12) * 384400 / au,
    0,
    Math.cos(t/speedFactor) + Math.cos(t/speedFactor * 12) * 384400 / au
  );
  earth.position.set(Math.sin(t/speedFactor), 0, Math.cos(t/speedFactor) * 2);


  /*
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;

  var scale = (Math.sin(t/200) + 1) / 2 * 3 + 1;
  cube.scale.set(scale, scale, scale);
  renderer.render( scene, camera );

  sphere.rotation.x += 0.05;
  */

  renderer.render( scene, camera );
};


render();
