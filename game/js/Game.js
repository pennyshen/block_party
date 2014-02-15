
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

	addCurrentToExisting: function(realPosition) {
		var i, positions, position;
		positions = this.currentBlock._getPositions(realPosition, this.currentBlock.shape);
		for (i = 0; i < positions.length; i++) {
			position = positions[i];
			this.existingBlocks[getKeyString(position)] = true;

			this.min_x = Math.min(this.min_x, position.x * STEP_SIZE);
			this.min_y = Math.min(this.min_y, position.y * STEP_SIZE);
			this.min_z = Math.min(this.min_z, position.z * STEP_SIZE);

			this.max_x = Math.max(this.max_x, position.x * STEP_SIZE + STEP_SIZE);
			this.max_y = Math.max(this.max_y, position.y * STEP_SIZE + STEP_SIZE);
			this.max_z = Math.max(this.max_z, position.z * STEP_SIZE + STEP_SIZE);			
		}
		this.totalVolume += positions.length;		
		this.existingBlocks.push(this.currentBlock);

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

	getNextBlock: function() {
		throw 'nextBlock must be implemented';
	},

	endGame: function() {
		throw 'endGame must be implemented';	
	},

	clearScene: function() {
		for (var i = 0; i < this.existingBlocks.length; i++) {
			this.existingBlocks[i].removeFromScene();
		}

		this.currentBlock.removeFromScene();

		if (this.boundingBox) {
			scene.remove(this.boundingBox);
			this.boundingBox.geometry.dispose();
		}
	}


}