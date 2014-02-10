
function Game() {
	this.totalVolume = 0;
	this.score = 0;
	this.existingBlocks = [];
	this.currentBlock = {};
	this.boundingBox = null;
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

				min_x = Math.min(min_x, pos.x);
				min_y = Math.min(min_y, pos.y);
				min_z = Math.min(min_z, pos.z);

				max_x = Math.max(max_x, pos.x);
				max_y = Math.max(max_y, pos.y);
				max_z = Math.max(max_z, pos.z);
			}
		}

		// calcualtes the volume of the bounding box
		var cube_vol = (max_x - min_x) * (max_y - min_y) * (max_z - min_z);
		this.score = Math.round((this.totalVolume)/(cube_vol/Math.pow(STEP_SIZE,3) )*100);
		score_doc.innerHTML = this.score + '%';
		
		scene.remove(this.boundingBox);

		var geom = new THREE.CubeGeometry(max_x - min_x, max_y - min_y, max_z - min_z);
		this.boundingBox = new THREE.Line( geo2line(geom), Game.box_material, THREE.LinePieces );

		this.boundingBox.position.x = (max_x + min_x) / 2;
		this.boundingBox.position.y = (max_y + min_y) / 2;
		this.boundingBox.position.z = (max_z + min_z) / 2;

		this.boundingBox.visible = false;
		scene.add(this.boundingBox);
	}


}