
function Game() {
	this.totalVolume = 0;
	this.score = 0;
	this.existingBlocks = [];
	this.currentBlock = {};
	this.currentAliveTime = 0;
	this.boundingBox = null;
	
	// keeping track of max and min of x,y,z coordinates
	this.min_x = Number.MAX_VALUE;
	this.min_y = Number.MAX_VALUE;
	this.min_z = Number.MAX_VALUE;
	this.max_x = Number.MIN_VALUE;
	this.max_y = Number.MIN_VALUE;
	this.max_z = Number.MIN_VALUE;
}

Game.box_material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );

Game.prototype = {
	_getPositions: function(realPosition, shape) {
		var position = realPosition.clone();
		var positions = [];
		var i, shapePos;

		position.x = Math.floor(position.x / STEP_SIZE);
		position.y = Math.floor(position.y / STEP_SIZE);
		position.z = Math.floor(position.z / STEP_SIZE);
		positions.push(position);

		for (i = 0; i < shape.length; i++) {
			shapePos = cloneVector(shape[i]);
			shapePos.x += position.x;
			shapePos.y += position.y;
			shapePos.z += position.z;
			positions.push(shapePos);
		}

		return positions;
	},

	addCurrentToExisting: function(realPosition) {
		var i, positions, position;
		positions = this._getPositions(realPosition, this.currentBlock.shape);
		for (i = 0; i < positions.length; i++) {
			position = positions[i];
			this.existingBlocks[getKeyString(position)] = true;
		}
		this.totalVolume += positions.length;		
		this.existingBlocks.push(this.currentBlock);

		this.computeBoundingBox();
	},

	getNextBlock: function() {
		throw 'nextBlock must be implemented';
	},

	endGame: function() {
		throw 'endGame must be implemented';	
	},

	isPosLegal: function(realPosition) {
		var positions, i, pos;
		var numUnits = FLOOR_SIZE_HALF / STEP_SIZE;

	    positions = this._getPositions(realPosition, this.currentBlock.shape);
	    for (i = 0; i < positions.length; i++) {
	        pos = positions[i];

	        // check with other existing blocks
	        if (getKeyString(pos) in this.existingBlocks) {
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
	},

	//get show minimum bounding box
	computeBoundingBox: function() {
		//goes through all the cubes and find the minimum and maximum x, y, z
		for (var i =0 ; i < this.existingBlocks.length; i++) {
			var ver = this.existingBlocks[i].mesh.geometry.vertices;
			for (var j = 0; j < ver.length; j++) {
				var pos = new THREE.Vector3();
				pos.addVectors(ver[j], this.existingBlocks[i].mesh.position);

				this.min_x = Math.min(this.min_x, pos.x);
				this.min_y = Math.min(this.min_y, pos.y);
				this.min_z = Math.min(this.min_z, pos.z);

				this.max_x = Math.max(this.max_x, pos.x);
				this.max_y = Math.max(this.max_y, pos.y);
				this.max_z = Math.max(this.max_z, pos.z);
			}
		}

		// calcualtes the volume of the bounding box
		var cube_vol = (this.max_x - this.min_x) * (this.max_y - this.min_y) * (this.max_z - this.min_z);
		this.score = Math.round((this.totalVolume)/(cube_vol/Math.pow(STEP_SIZE,3) )*100);
		score_doc.innerHTML = this.score + '%';
		
		if (this.boundingBox) {
			scene.remove(this.boundingBox);
			this.boundingBox.geometry.dispose();
		}

		var geom = new THREE.CubeGeometry(this.max_x - this.min_x, this.max_y - this.min_y, this.max_z - this.min_z);
		this.boundingBox = new THREE.Line( geo2line(geom), Game.box_material, THREE.LinePieces );

		this.boundingBox.position.x = (this.max_x + this.min_x) / 2;
		this.boundingBox.position.y = (this.max_y + this.min_y) / 2;
		this.boundingBox.position.z = (this.max_z + this.min_z) / 2;

		this.boundingBox.visible = false;
		scene.add(this.boundingBox);
	},

	clearScene: function() {
		for (var i = 0; i < this.existingBlocks.length; i++) {
			this.existingBlocks[i].removeFromScene();
		}

		this.currentBlock.removeFromScene();

		scene.remove(this.boundingBox);
		this.boundingBox.geometry.dispose();
	}


}