
// this part borrowed heavily from https://github.com/fridek/Threejs-Tetris

var BlockGenerator = {
	/* "2D" shapes (involving only 2 axes) */
	"L":
	[
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 2, z: 0}
    ],
    "straight3": // one straight line consisting of 3 blocks
    [
        {x: 0, y: 1, z: 0},
        {x: 0, y: 2, z: 0},
    ],
    "square_flat":
    [
        {x: 0, y: 1, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0}
    ],
    "short_T": // typical tetris short t 
    [
        {x: 0, y: 1, z: 0},
        {x: 0, y: 2, z: 0},
        {x: 1, y: 1, z: 0}
    ],
    "lightning": // typical tetris lighting-looking z
    [
        {x: 0, y: 1, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 2, z: 0}
    ],
    "cross_block":
    [
    	{x: -1, y: 0, z: 0},
    	{x: 1, y: 0, z: 0},
    	{x: 0, y: 0, z: 1},
    	{x: 0, y: 0, z: -1}
    ]
};

BlockGenerator.cloneVectors = function (vectors) {
	var i;
	var newVectors = [];
	for (i = 0; i < vectors.length; i++) {
		newVectors[i] = this.cloneVector(vectors[i]);
	}
	return newVectors;
}

BlockGenerator.cloneVector = function (v) {
  return {x: v.x, y: v.y, z: v.z};
};

BlockGenerator.getCube = function() {
	return new THREE.CubeGeometry(STEP_SIZE, STEP_SIZE, STEP_SIZE);
}


BlockGenerator.generate = function(shapeName) {
	// copy the shape corresponding to shapeName from internal map into a new shape
	var geometry, tmpGeometry, i;
	var shape = this.cloneVectors(this[shapeName]);
	var block;
	
	// merge the different cube geometries together
	geometry = this.getCube();
	for (i = 0; i < shape.length; i++) {
		tmpGeometry =  new THREE.Mesh(this.getCube());
		tmpGeometry.position.x = STEP_SIZE * shape[i].x;
		tmpGeometry.position.y = STEP_SIZE * shape[i].y;
		tmpGeometry.position.z = STEP_SIZE * shape[i].z;
		THREE.GeometryUtils.merge(geometry, tmpGeometry);
	}

	// just use simple mesh for now - multi material object complicates things because
	// it's not a mesh but an object3d - so you lose the handle to geometry and material
	block = new THREE.Mesh(geometry, 
		new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true }));

	/**
	block = THREE.SceneUtils.createMultiMaterialObject(geometry, [
        new THREE.MeshBasicMaterial({color:0x000000, shading:THREE.FlatShading, wireframe:true, transparent:true}),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true })
    ]);
    block.overdraw = true;
	*/

    return block;
}





// disrecard these for now....

BlockGenerator.basicCube = function() {
	return this.getBlock([
		new THREE.Vector3( STEP_SIZE, STEP_SIZE, STEP_SIZE ),
		new THREE.Vector3( STEP_SIZE, STEP_SIZE, 0 ),
		new THREE.Vector3( 0, STEP_SIZE, 0 ),
		new THREE.Vector3( 0, STEP_SIZE, STEP_SIZE ),
		new THREE.Vector3( STEP_SIZE, 0, STEP_SIZE ),
		new THREE.Vector3( STEP_SIZE, 0, 0 ),
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 0, 0, STEP_SIZE )]);
};

BlockGenerator.cross = function() {
	return this.getBlock([
		new THREE.Vector3(STEP_SIZE, STEP_SIZE, STEP_SIZE),
		new THREE.Vector3(STEP_SIZE, STEP_SIZE, 0),
		new THREE.Vector3(0, STEP_SIZE, 0),
		new THREE.Vector3(0, STEP_SIZE, STEP_SIZE),
		new THREE.Vector3(STEP_SIZE, 0, STEP_SIZE),
		new THREE.Vector3(STEP_SIZE, 0, 0),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, STEP_SIZE)]);
}

/**
 *	Shorthand of creating a block from the input points and material.
 */
BlockGenerator.getBlock = function(points) {
	return new THREE.Mesh(new THREE.ConvexGeometry(points), new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } ));
};
