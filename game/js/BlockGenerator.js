
// singleton achieved through object literal

var BlockGenerator = {};


BlockGenerator.defaultMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );


BlockGenerator.basicCube = function() {
	return this.getBlock([
		new THREE.Vector3( 50, 50, 50 ),
		new THREE.Vector3( 50, 50, -50 ),
		new THREE.Vector3( -50, 50, -50 ),
		new THREE.Vector3( -50, 50, 50 ),
		new THREE.Vector3( 50, -50, 50 ),
		new THREE.Vector3( 50, -50, -50 ),
		new THREE.Vector3( -50, -50, -50 ),
		new THREE.Vector3( -50, -50, 50 ),], this.defaultMaterial);
};

/**
 *	Shorthand of creating a block from the input points and material.
 */
BlockGenerator.getBlock = function(points, material) {
	return new THREE.Mesh(new THREE.ConvexGeometry(points), material);
};
