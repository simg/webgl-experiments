var scene, camera, renderer, controls;

var objects = [
  
];

storage = {
  // if localStorage available, use that, else use a cookie
  get:function(i) {
    if (localStorage && localStorage.getItem(i)) {
      return JSON.parse(localStorage.getItem(i));
    } else {
      //return $.cookie(i);
    }
  },
  set:function(i, val) {
    if (localStorage) {
      localStorage.setItem(i,JSON.stringify(val));  
    } else {
      //$.cookie(i, val, {path:'/'});
    }
  }
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function extend(obj) {
  //console.log("arguments",arguments)
  if (!obj) {
    obj = new THREE.Object3D();
  }
  for (var i=1; i < arguments.length; i++)
  {
    //skip the first argument (obj)
    for (prop in arguments[i]) {
      if (prop == 'rotation' && obj.rotateOnAxis) {
        var rotation = arguments[i][prop];
        //var axis = new THREE.Vector3( rotation.x, rotation.y, rotation.z );

        if (rotation.x > 0) {
          var axisX = new THREE.Vector3( rotation.x, 0, 0 );
          obj.rotateOnAxis(axisX, rotation.w);
        }
        if (rotation.y > 0) {
          var axisY = new THREE.Vector3( 0, rotation.y, 0 );
          obj.rotateOnAxis(axisY, rotation.w);
        }
        if (rotation.z > 0) {
          var axisZ = new THREE.Vector3( 0, 0, rotation.z);
          obj.rotateOnAxis(axisZ, rotation.w);
        } 

        //obj.rotateOnAxis(axis, rotation.w);
        
        //quaternion.setFromAxisAngle( new THREE.Vector3( rotation.x, rotation.y, rotation.z ), rotation.w );
        //var quaternion = new THREE.Quaternion(axis, rotation.w);
        //obj.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotation.z);
        //obj.quaternion.mulitplyVector3(axis);
        //obj.rotation.setEulerFromQuaternion(quaternion);
        //var matrix = new THREE.Matrix4();
        //matrix.makeRotationAxis(axis, rotation.w);
        //obj.matrix.multiply(matrix);
        //obj.rotation.setEulerFromRotationMatrix(matrix);
        //obj.rotation.setEulerFromQuaternion( quaternion );
        //obj.applyQuaternion( quaternion );
      } else {
        obj[prop] = arguments[i][prop];  
      }  
    }
  }
  return obj;
}

keyboard = new THREEx.KeyboardState();