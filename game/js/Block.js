
function Block(shapeName, shape, color, mesh, generatedTime, rotation) {
	this.shapeName = shapeName;
	this.shape = shape;
    this.color = color;
	this.mesh = mesh;
	this.generatedTime = generatedTime;
	this.rotation = rotation;
}

Block.prototype.removeFromScene = function() {
    scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
}

Block.prototype.makeStatic = function() {
    var voxel = this.mesh;
    
    voxel.material.opacity = 1.0;
    voxel.material.transparent = false;
    voxel.matrixAutoUpdate = false;
    voxel.geometry.verticesNeedUpdate = true;
    voxel.castShadow = false;
    voxel.updateMatrix();    
}

Block.prototype._getPositions = function(realPosition) {
    var position = realPosition.clone();
    var positions = [];
    var i, shapePos;

    position.x = Math.floor(position.x / STEP_SIZE);
    position.y = Math.floor(position.y / STEP_SIZE);
    position.z = Math.floor(position.z / STEP_SIZE);
    positions.push(position);

    for (i = 0; i < this.shape.length; i++) {
        shapePos = cloneVector(this.shape[i]);
        shapePos.x += position.x;
        shapePos.y += position.y;
        shapePos.z += position.z;
        positions.push(shapePos);
    }

    return positions;
}

Block.prototype.isPosLegal = function(realPosition) {
    var positions, i, pos;
    var numUnits = FLOOR_SIZE_HALF / STEP_SIZE;

    positions = this._getPositions(realPosition);
    for (i = 0; i < positions.length; i++) {
        pos = positions[i];

        // check with other existing blocks
        if (getKeyString(pos) in game.existingBlocks) {
            pos_illegal_code = 1;
            return false;
        }
        // check with edges
        if (pos.y < 0
            || pos.x < -numUnits || pos.x >= numUnits
            || pos.z < -numUnits || pos.z >= numUnits) {
            pos_illegal_code = 2;
            return false
        }
    }

    return true;        
}

Block.prototype.moveIntoBounds = function(realPosition) {
    var axes = ['x', 'y', 'z'];
    var numUnits = FLOOR_SIZE_HALF / STEP_SIZE;
    var axis;
    var positions;
    var pos, i, j;
    var toMove = {x: 0, y: 0, z: 0};


    if (!this.isPosLegal(realPosition)) {
        if (pos_illegal_code != 2) {
            return false;
        }
        
        positions = this._getPositions(realPosition);

        for (i = 0; i < positions.length; i++) {
            pos = positions[i];
            for (var j = 0; j < axes.length; j++) {
                axis = axes[j];

                if (axis == 'y') {
                    if (pos[axis] < 0) {
                        toMove[axis] = Math.max(toMove[axis], -1 * pos[axis] * STEP_SIZE);
                    }
                    continue;
                }

                if (pos[axis] >= numUnits) {
                    // only need to check for the other bound if it's not y
                    toMove[axis] = Math.min(toMove[axis], -1 * (pos[axis] - numUnits + 1) * STEP_SIZE);
                } else if (pos[axis] <= -numUnits) {
                    toMove[axis] = Math.max(toMove[axis], -1 * (pos[axis] + numUnits) * STEP_SIZE)
                }
            }
        }

        realPosition.x += toMove.x;
        realPosition.y += toMove.y;
        realPosition.z += toMove.z

        return true;
    }

    return false;
}


Block.prototype.rotate = function ( x, y, z ) {
    this.mesh.rotation.x = (this.mesh.rotation.x + x * Math.PI / 180) % (2*Math.PI);
    this.mesh.rotation.y = (this.mesh.rotation.y + y * Math.PI / 180) % (2*Math.PI);
    this.mesh.rotation.z = (this.mesh.rotation.z + z * Math.PI / 180) % (2*Math.PI);

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
