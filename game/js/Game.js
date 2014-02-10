
function Game() {
	this.totalVolume = 0;
	this.existingBlocks = [];
	this.currentBlock = {};
}

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
	},

	getNextBlock: function() {
		throw 'nextBlock must be implemented';
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
	}

}