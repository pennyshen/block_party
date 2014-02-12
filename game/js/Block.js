
function Block(shapeName, shape, mesh, generatedTime, rotation) {
	this.shapeName = shapeName;
	this.shape = shape;
	this.mesh = mesh;
	this.generatedTime = generatedTime;
	this.rotation = rotation;
}

Block.prototype.removeFromScene = function() {
    scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
}

Block.prototype.rotate = function ( x, y, z ) {
    this.mesh.rotation.x += x * Math.PI / 180;
    this.mesh.rotation.y += y * Math.PI / 180;
    this.mesh.rotation.z += z * Math.PI / 180;

    var tshape = BlockGenerator.shapes[this.shapeName];
    var quat = this.mesh.quaternion;

    for (var i = 0; i < tshape.length; i++) {
    	var THREEvector = new THREE.Vector3();
    	THREEvector = this.cloneVector3(tshape[i]);
        this.shape[i] = THREEvector.applyQuaternion( quat );
        this.roundVector(this.shape[i]);
    }


    // if (Tetris.Board.testCollision(false) === Tetris.Board.COLLISION.WALL) {
    //     Tetris.this.rotate(-x, -y, -z); // laziness FTW
    // }

    this.mesh.geometry.verticesNeedUpdate = true;
};

Block.prototype.roundVector = function(v) {
    v.x = Math.round(v.x);
    v.y = Math.round(v.y);
    v.z = Math.round(v.z);
};

Block.prototype.cloneVector3 = function ( v ) {
	return new THREE.Vector3( v.x, v.y, v.z );
};
