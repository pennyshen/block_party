
function Game() {
	this.totalVolume = 0;
	this.score = 0;
	this.existingBlocks = [];
	this.currentBlock = {};
	this.currentAliveTime = 0;
	this.boundingBox = null;
	this.goalShape = null;
	
	// keeping track of max and min of x,y,z coordinates
	this.min_x = Number.MAX_VALUE;
	this.min_y = Number.MAX_VALUE;
	this.min_z = Number.MAX_VALUE;
	this.max_x = -Number.MAX_VALUE;
	this.max_y = -Number.MAX_VALUE;
	this.max_z = -Number.MAX_VALUE;
}

Game.box_material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );

Game.prototype = {

	addToExisting: function(block, realPosition) {
		var i, positions, position;
		positions = block._getPositions(realPosition, block.shape);
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
		this.existingBlocks.push(block);

		this.computeBoundingBox();	
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
		if(this.goalShape){
			scene.remove(this.goalShape);
		}
	},

	computeBoundingBox: function() {
		// calcualtes the volume of the bounding box
		var x_dif = this.max_x - this.min_x;
		var y_dif = this.max_y - this.min_y;
		var z_dif = this.max_z - this.min_z;
		var cube_vol = x_dif * y_dif * z_dif;
		this.score = Math.round((this.totalVolume)/(cube_vol/Math.pow(STEP_SIZE,3) )*100);
		//if random mode, calculate bonus scores
		var bonus = '';
		if(this.mode=='random'){
			var dim_dif =  (Math.max(x_dif, y_dif, z_dif) - Math.min(x_dif, y_dif, z_dif))/STEP_SIZE;
			if(dim_dif == 0)
				bonus = ' +10';
			else if (dim_dif ==1)
				bonus = ' +5';
		}	
		score_doc.innerHTML = this.score + '%' + bonus;
		
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

	exportFromCurrent: function() {
		return JSON.stringify(this.currentBlock._getPositions(this.currentBlock.mesh.position));
	},

	exportFromExisting: function() {
		var tmpBlock;
		var blocks = [];

		for (var i = 0; i < this.existingBlocks.length; i++) {
			tmpBlock = {};
			tmpBlock.shape = this.existingBlocks[i].shape;
			tmpBlock.shapeName = this.existingBlocks[i].shapeName;
			tmpBlock.position = this.existingBlocks[i].mesh.position;
			blocks.push(tmpBlock);
		}

		return JSON.stringify(blocks);
	},

	importToExisting: function(jsonString) {
		var blocks = JSON.parse(jsonString);
		var block, position;

		for (var i = 0; i < blocks.length; i++) {
			block = blocks[i];
			block = BlockGenerator.getBlock(blocks[i].shapeName, blocks[i].shape, "grey");
			block.mesh.position.x = blocks[i].position.x;
			block.mesh.position.y = blocks[i].position.y;
			block.mesh.position.z = blocks[i].position.z;
			block.makeStatic();
			position = blocks[i].position;
			this.addToExisting(block, new THREE.Vector3(position.x, position.y, position.z));
			scene.add(block.mesh);
		}

		this.computeBoundingBox();
	},

	//create the goal shape using the given x, y, and z values position at the origin.
	createGoalShape:function(x,y,z){

		var x_adjusted = x * STEP_SIZE;
		var y_adjusted = y * STEP_SIZE;
		var z_adjusted = z * STEP_SIZE;
		var geom = new THREE.CubeGeometry(x_adjusted, y_adjusted, z_adjusted);
		this.goalShape = new THREE.Line( geo2line(geom), new THREE.LineBasicMaterial( { color: 0xFF0000 } ), THREE.LinePieces );
		this.goalShape.visible = true;
		if(x%2==1)
			this.goalShape.position.x += STEP_SIZE/2;
		this.goalShape.position.y += y_adjusted/2;
		if(z%2==1)
			this.goalShape.position.z +=STEP_SIZE/2;
		scene.add(this.goalShape);

	}

}