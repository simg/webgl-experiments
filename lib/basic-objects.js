function sphere(radius, segments, rings, color, position, texture) {
    // create the sphere's material
  var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings)
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: color });

  if (texture) {
    sphereMaterial.map= texture;
  }

  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);
  sphere.position = position;
  return sphere;
}

function globe(radius, color, position, textureUrl) {
  var texture = THREE.ImageUtils.loadTexture(textureUrl);
  var globe = sphere(50, 32, 32, color, position, texture );
  return globe;
}

function girder(length, width, height) {
  return new THREE.Mesh( new THREE.CubeGeometry(length,width,height), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
}

function pointLight(i) {
  // create a point light
  var pointLight = new THREE.PointLight(i.color);

  // set its position
  pointLight.position.x = i.position.x;
  pointLight.position.y = i.position.y;
  pointLight.position.z = i.position.z;

  pointLight.intensity = i.intensity;

  return pointLight;
}

function ambientLight(i) {
  var light = new THREE.AmbientLight(i.color);
  return light;
}

function primative(obj){
  var geometry, material, mesh;
  switch (obj.type) {
    case "sphere":
      geometry = new THREE.SphereGeometry(obj.radius, obj.segments, obj.rings);
      break;
    case "block":
      geometry = new THREE.CubeGeometry(obj.length,obj.width,obj.height);
      break;
    case "cylinder":
      geometry = new THREE.CylinderGeometry(obj.radiusTop, obj.radiusBottom, obj.height, obj.radiusSegments, obj.heightSegments, obj.openEnded);
      break;
  }
  //console.log("primative",obj)
  var mat = {
    color:obj.color,
    ambient:obj.color
  }
  if (obj.opacity) {
      mat.transparent = true;
      mat.opacity = obj.opacity;
  }
  material = new THREE.MeshLambertMaterial(mat);

  if (obj.texture) {
    material.map = THREE.ImageUtils.loadTexture(obj.texture);
  }

  mesh = new THREE.Mesh( geometry, material )

  if (obj.rotation) {
    //TODO: must be an easier way to rotate in multiple axis at once
    if (obj.rotation.x > 0) {
      var axisX = new THREE.Vector3( obj.rotation.x, 0, 0 );
      mesh.rotateOnAxis(axisX, obj.rotation.w);
    }
    if (obj.rotation.y > 0) {
      var axisY = new THREE.Vector3( 0, obj.rotation.y, 0 );
      mesh.rotateOnAxis(axisY, obj.rotation.w);
    }
    if (obj.rotation.z > 0) {
      var axisZ = new THREE.Vector3( 0, 0, obj.rotation.z);
      mesh.rotateOnAxis(axisZ, obj.rotation.w);
    }
    //mesh.rotateOnAxis(axis, obj.rotation.w);
    //mesh.rotation.set(radians(obj.rotation.x),radians(obj.rotation.y),radians(obj.rotation.z) );
  }

  if (obj.position) {
    mesh.position = obj.position; //.x,obj.position.y,obj.position.z);
  }

  return mesh;
}
