
// draws the normal line for debugging
function drawNormal(origin, normal) {
	var lineGeo = new THREE.Geometry();
	var secondPoint = origin.clone();

	lineGeo.vertices.push(origin.clone());
	secondPoint.add(normal.clone().multiplyScalar(25));
    lineGeo.vertices.push(secondPoint);
    scene.add(new THREE.Line( lineGeo , new THREE.LineBasicMaterial( { color: 0x000000 } )));
}

// get sorted key string from object propertis' values
function getKeyString(obj) {
	return obj.x + "," + obj.y + "," + obj.z;
}

function getDupVertices(vertices) {
	var i, vertexString, vertex;
	var vertexMap = {};
	var duplicateVertices = {};
	for (i = 0; i < vertices.length; i++) {
		vertex = vertices[i];
		vertexString = vertex.x + "," + vertex.y + "," + vertex.z;
		if (vertexString in vertexMap) {
			duplicateVertices[vertexString] = true;
		} else {
			vertexMap[vertexString] = true;
		}
	}
}

// get random integer between min and max
function getRandomInteger(min, max) {
	return Math.floor(Math.random()*max) + min;
}

// get random array member
function getRandomMember(array) {
	return array[getRandomInteger(0, array.length)];
}

//check for intersection
function hasCollision() {
	var block = rollOverMesh;
    var face, block2, face2;
    var ray = new THREE.Raycaster();
    var collided;
    var sharedNormals;

    console.log(block.position);
    console.log("collided = ");
    for (var i = 0; i < block.geometry.faces.length; i++) {
        face = block.geometry.faces[i];
        facePoint = face.centroid.clone();
        rollOverMesh.localToWorld(facePoint);
        ray.set(facePoint, face.normal.clone());
        collided = ray.intersectObjects( block_list );
        if (collided.length > 0) {
            for (var j = 0; j < collided.length; j++) {
                block2 = collided[j].object.material.color.set(0x7F7C9C);
                console.log(collided[j]);
            }    
        }
    }

	return false;
}

//get show minimum bounding box
function getBoundingBox(){
	//goes through all the cubes and find the minimum and maximum x, y, z
	for(var i =0; i<block_list.length;i++){
		var ver = block_list[i].geometry.vertices;
		for(var j = 0; j<ver.length;j++){
			var pos = new THREE.Vector3();
			pos.addVectors(ver[j], block_list[i].position);
			if(min_x==null){
				min_x = pos.x;
			}
			else{
				min_x = Math.min(min_x, pos.x);
			}
			if(min_y==null){
				min_y = pos.y;
			}
			else{
				min_y = Math.min(min_y, pos.y);
			}
			if(min_z==null){
				min_z = pos.z;
			}
			else{
				min_z = Math.min(min_z, pos.z);
			}
			if(max_x==null){
				max_x = pos.x;
			}
			else{
				max_x = Math.max(max_x, pos.x);
			}
			if(max_y==null){
				max_y = pos.y;
			}
			else{
				max_y = Math.max(max_y, pos.y);
			}
			if(max_z==null){
				max_z = pos.z;
			}
			else{
				max_z = Math.max(max_z, pos.z);
			}	
		}
	}

	//creates a new cube
	scene.remove(cube);
	var offset = 1;
	min_x -= offset;
	min_y -= offset;
	min_z -= offset;
	max_x += offset;
	max_y += offset;
	max_z += offset;
	
	//var geometry = new THREE.CubeGeometry(max_x-min_x, max_y - min_y, max_z-min_z);
	var geom = new THREE.Geometry();
	var v1 = new THREE.Vector3(min_x,min_y, max_z);
	var v2 = new THREE.Vector3(max_x,min_y,max_z);
	var v3 = new THREE.Vector3(max_x,max_y,max_z);
	var v4 = new THREE.Vector3(min_x,max_y,max_z);
	var v5 = new THREE.Vector3(min_x,min_y, min_z);
	var v6 = new THREE.Vector3(max_x,min_y, min_z);
	var v7 = new THREE.Vector3(max_x,max_y, min_z);
	var v8 = new THREE.Vector3(min_x,max_y, min_z);
	geom.vertices.push(v1);
	geom.vertices.push(v2);
	geom.vertices.push(v3);
	geom.vertices.push(v4);
	geom.vertices.push(v5);
	geom.vertices.push(v6);
	geom.vertices.push(v7);
	geom.vertices.push(v8);
    geom.faces.push(new THREE.Face3(2, 5, 6));
    geom.faces.push(new THREE.Face3(2, 1, 5));
    geom.faces.push(new THREE.Face3(2, 0, 1));
    geom.faces.push(new THREE.Face3(2, 3, 0));
    geom.faces.push(new THREE.Face3(2, 7, 3));
    geom.faces.push(new THREE.Face3(2, 6, 7));
    geom.faces.push(new THREE.Face3(4, 6, 5));
    geom.faces.push(new THREE.Face3(4, 5, 1));
    geom.faces.push(new THREE.Face3(4, 1, 0));
    geom.faces.push(new THREE.Face3(4, 0, 3));
    geom.faces.push(new THREE.Face3(4, 3, 7));
    geom.faces.push(new THREE.Face3(4, 7, 6));

	geom.computeFaceNormals();

	cube = new THREE.Mesh( geom, box_material );
	cube.visible = false;
	scene.add(cube);
	//cube = new THREE.Mesh(geom, box_material);
    //cube.position.y = 150;

}
