
// this part borrowed heavily from https://github.com/fridek/Threejs-Tetris
var BlockGenerator = {};

BlockGenerator.shapes = {
	/* "2D" shapes (involving only 2 axes) */
	// "cube": [{x: 0, y: 0, z: 0}]

	"two_blocks": [{x: 0, y: 0, z: 0}, {x: 1, y: 0, z: 0}],

	"L":
	[{x: 0, y: 0, z: 0}, {x: 0, y: -1, z: 0}, {x: 0, y: 1, z: 0}, {x: -1, y: -1, z: 0}],

    "straight3": // one straight line consisting of 3 blocks
    [{x: 0, y: 0, z: 0}, {x: 0, y: 1, z: 0}, {x: 0, y: -1, z: 0},],

    "square_flat":
    [{x: 0, y: 0, z: 0}, {x: 0, y: 1, z: 0}, {x: 1, y: 0, z: 0}, {x: 1, y: 1, z: 0}],

    "short_T": // typical tetris short t 
    [{x: 0, y: 0, z: 0}, {x: 0, y: 1, z: 0}, {x: 1, y: 0, z: 0}, {x: -1, y: 0, z: 0}],

    "lightning": // typical tetris lighting-looking z
    [{x: 0, y: 0, z: 0}, {x: 0, y: -1, z: 0}, {x: 1, y: 0, z: 0}, {x: 1, y: 1, z: 0}],

    "cross_block":
    [{x: 0, y: 0, z: 0}, {x: -1, y: 0, z: 0}, {x: 1, y: 0, z: 0}, {x: 0, y: 0, z: 1}, {x: 0, y: 0, z: -1}],

 		"u_shape":
 		[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":2,"y":0,"z":0},{"x":2,"y":1,"z":0},{"x":2,"y":2,"z":0},{"x":1,"y":2,"z":0}],

 		"pronged_Z_shape":
		[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0}],	 		

		"pronged_L_shape":
		[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":0,"y":2,"z":2},{"x":1,"y":2,"z":1},{"x":1,"y":1,"z":1}],
    "lock_piece_1":
    [{"x":0,"y":0,"z":0}, {"x":1,"y":0,"z":0}, {"x":2,"y":0,"z":0}, {"x":0,"y":1,"z":0}, {"x":1,"y":1,"z":0}, {"x":2,"y":1,"z":0}, {"x":1,"y":1,"z":1}, {"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":2,"z":0}],
    
    "key_piece_2":
    [{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":2,"y":0,"z":1},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":2,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":2,"z":0},{"x":0,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":2,"y":2,"z":1},{"x":1,"y":2,"z":1}],
 	
 	"cube_third_1":
 	[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":1}],
 	
 	"cube_third_2":
	[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":-1,"y":2,"z":0},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":0,"y":1,"z":1},{"x":-1,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":-1,"y":2,"z":1}],
 	
 	"cube_third_3":
 	[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":-1}]


};

BlockGenerator.colors = {
	"yellow": 0xffff00, 
	"blue": 0x0000ff, 
	"green": 0x006600,
	"red": 0xFF0000,
	"purple": 0x660099,
	"orange": 0xff9900, 
	"brown": 0x70543b,
	// "grey": 0xADADAD
};

// names of all the blocks in an array
BlockGenerator.allShapes = (function() {
	return Object.getOwnPropertyNames(BlockGenerator.shapes);
})();

BlockGenerator.allColors = (function() {
	return Object.getOwnPropertyNames(BlockGenerator.colors);
})();

BlockGenerator.shapesToColors = (function() {
	var shapeIdx, colorIdx;
	var toReturn = {};

	colorIdx = 0;
	for (shapeIdx = 0; shapeIdx < BlockGenerator.allShapes.length; shapeIdx++) {
		toReturn[BlockGenerator.allShapes[shapeIdx]] = BlockGenerator.allColors[colorIdx];
		colorIdx = (colorIdx + 1) % BlockGenerator.allColors.length;
	}

	return toReturn;
})();

BlockGenerator.getRandomBlock = function() {
	var shapeName = getRandomMember(this.allShapes);
	return this.generate(shapeName);
}

BlockGenerator.getBlock = function(shapeName, originalShape, color) {
	var shape = []; 
	var i, j;
	var geometry, tmpGeometry;
	var material;
	var normal, intersects;
	var blockRaycaster = new THREE.Raycaster();
	var toDelete = [];
	var mesh;
	var block;

	// clone the shape.
	for ( i = 0; i < originalShape.length; i++ ) {
		shape[i] = cloneVector(originalShape[i]);
	}

	// merge the different cube geometries together
	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	for (i = 0; i < shape.length; i++) {
		tmpGeometry =  new THREE.Mesh(new THREE.CubeGeometry(STEP_SIZE, STEP_SIZE, STEP_SIZE));
		tmpGeometry.position.x = STEP_SIZE * shape[i].x;
		tmpGeometry.position.y = STEP_SIZE * shape[i].y;
		tmpGeometry.position.z = STEP_SIZE * shape[i].z;
		THREE.GeometryUtils.merge(geometry, tmpGeometry);
	}

	// merge them
	geometry.mergeVertices();
	geometry.verticesNeedUpdate = true;

	material = new THREE.MeshLambertMaterial({ color: color, opacity: INIT_OPACITY, transparent: true });
	mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.renderDepth = 0.5;	// must be set to < 1 to avoid z-fighting

	mesh.position.x += STEP_SIZE / 2;
	mesh.position.y += STEP_SIZE / 2;
	mesh.position.z += STEP_SIZE / 2;

	// raycast itself from the center of each face (negated normal), and whichever face gets intersected
	// is an inner face
	for (i = 0; i < geometry.faces.length; i++) {
		face = geometry.faces[i];
		if (face) {
			normal = face.normal.clone();
			normal.negate();
			blockRaycaster.set(face.centroid, normal);
			intersects = blockRaycaster.intersectObject(mesh);
			for (j = 0; j < intersects.length; j++) {
				toDelete.push(intersects[j].faceIndex);
			}
		}
	}

	// actually delete them
	for (i = 0; i < toDelete.length; i++) {
		delete geometry.faces[toDelete[i]];
	}
	geometry.faces = geometry.faces.filter( function(v) { return v; });
	geometry.elementsNeedUpdate = true;	// update faces

	block = new Block(shapeName, shape, color, mesh, Date.now(), {x:0,y:0,z:0});

	block.moveIntoBounds(block.mesh.position);

	return block;
}

BlockGenerator.generate = function(shapeName) {
    return this.getBlock(shapeName, this.shapes[shapeName], this.colors[this.shapesToColors[shapeName]]);
}


