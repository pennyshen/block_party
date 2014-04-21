
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	this.mode = Game.MODE_RANDOM;

	hideAllInfo();
	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	showElement(showNextPiece_doc);
}

RandomMode.prototype = Object.create(Game.prototype);

RandomMode.prototype.getNextBlock = function() {
	var toReturn;
	if (makingLevels) {
		toReturn = BlockGenerator.getBlock("cube", [{x: 0, y: 0, z: 0}], 0xADADAD);
	} else {
		toReturn = BlockGenerator.generate(this.nextBlockName);		
	}
	
	this.currentBlock = toReturn;
	this.currentAliveTime = 0;
	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	nextPiece_doc.innerHTML = this.nextBlockName;
	return toReturn;
};

RandomMode.prototype.reduceArray = function(matrix, axis, currentLength) {
	var canReduce = false;
	var left, right;

	// for (var i = 0; i < currentLength - 1; i++) {
	// 	if (axis == 'x') {
	// 		left = 
	// 	}
	// 	if (array[i] && array[i+1]) {
	// 		array[i] = true;
	// 		canReduce = true;
	// 	}
	// }

	return canReduce;
};

RandomMode.prototype.scoreGame = function() {
	var numReduced = 0;
	var positions = [];
	var x_pos, y_pos, z_pos;
	var pos, val;

	// establish the 3d array from bounding box
	for (var i = this.min_x / STEP_SIZE, x_pos = 0; i < this.max_x / STEP_SIZE; i++, x_pos++) {
		positions.push([]);
		for (var j = this.min_y / STEP_SIZE, y_pos = 0; j < this.max_y / STEP_SIZE; j++, y_pos++) {
			positions[x_pos].push([]);
			for (var k = this.min_z / STEP_SIZE, z_pos = 0; k < this.max_z / STEP_SIZE; k++, z_pos++) {
				pos = {};
				pos.x = i;
				pos.y = j;
				pos.z = k;
				if (getKeyString(pos) in this.existingBlocks) {
					val = true;
				} else {
					val = false;
				}
				positions[x_pos][y_pos][z_pos] = val;
			}
		}
	}
	console.log(positions);

	// var positionStrings = Object.keys(this.existingBlocks).splice(this.existingBlocks.length);
	// var positions, pos;
	// var axisMap = ['x', 'y', 'z']

	// positions = {};
	// for (var i = 0; i < axisMap.length; i++) {
	// 	positions[axisMap[i]] = [];
	// }

	// // get the positions from positionStrings into the positions map
	// for (var i = 0; i < positionStrings.length; i++) {
	// 	pos = positionStrings[i].split(',');
	// 	for (var j = 0; j < pos.length; j++) {
	// 		positions[axisMap[j]].push(parseInt(pos[j]));
	// 	}
	// }
	// console.log(positions);
};

RandomMode.prototype.endGame = function() {

};

