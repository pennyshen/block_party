
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
    // console.log(this.shape[0].x);
    // var rotationMatrix = new THREE.Quaternion();/
    // rotationMatrix.setFromEuler(this.mesh.rotation);
    var rotationMatrix = new THREE.Matrix3();
    rotationMatrix.set(0,0,1,0,1,0,-1,0,0);
    // rotationMatrix.makeRotationFromEuler(this.mesh.rotation);
    for (var i = 0; i < this.shape.length; i++) {
    	var THREEvector = new THREE.Vector3();
    	THREEvector = this.cloneVector3(this.shape[i]);
    	// THREEvector.x = this.cloneVector(this.shape[i]).x, THREEvector.y = this.cloneVector(this.shape[i]).y, THREEvector.z = this.cloneVector(this.shape[i]).z;
    	
        // this.shape[i] = THREEvector.applyQuaternion( rotationMatrix );
        // this.shape[i] = THREEvector.applyAxisAngle(new THREE.Vector3(0,0,0), Math.PI / 180);
        this.shape[i] = THREEvector.applyMatrix3( rotationMatrix );

        // rotationMatrix.multiplyVector3(
        //     this.cloneVector(this.shapes[this.shapeName][i])
        // );
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
