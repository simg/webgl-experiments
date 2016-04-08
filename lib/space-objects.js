function solar_panel(obj) {
  var o = primative({
    type:"block",
    length:15,
    width:6,
    height:.4,
    color:0xaaaaaa,
    texture:'/3d-experiments/images/solar-panel.jpg',
    rotation:{
      x:0,
      y:0,
      z:0
    },
    position:{
      x:20,
      y:10,
      z:-20
    }
  })
  
  for (prop in obj) {
    o[prop] = obj[prop]
  }
  
  return o;
}
      
function solar_panel_array(obj) {
  solar_array = new THREE.Object3D();
  for (var i=0; i < 6; i++){
    solar_array.add(solar_panel({position:{x:0,y:(7*i)+7,z:1}}));
  }
  solar_array.position = obj.position;
  
  return solar_array;
}

function satelite() {
  s = new THREE.Object3D();
  s.add(solar_panel_array({position:{x:0, y:0, z:0}}))
  s.add(solar_panel_array({position:{x:30, y:0, z:0}}))
  s.add(primative({type:"cylinder", color:0xdddddd, texture:'/3d-experiments/images/space-station-fade.jpg', position:{x:15.5, y:24, z:0}, radiusTop:5, radiusBottom:5, height:35, radiusSegments:6, heightSegments:6, openEnded:false}))
  return s;
}