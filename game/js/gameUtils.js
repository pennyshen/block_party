
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

