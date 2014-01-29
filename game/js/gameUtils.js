
// get sorted key string from object propertis' values
function getKeyString(obj) {
	var props = Object.getOwnPropertyNames(obj);
	var i, keyString;
	var valueList = [];

	for (i = 0; i < props.length; i++) {
		valueList.push(obj[props[i]]);
	}
	valueList.sort();

	keyString = valueList[0] + "";
	for (i = 1; i < valueList.length; i++) {
		keyString = keyString + "," + valueList[i];
	}

	return keyString;
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
