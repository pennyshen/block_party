
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	this.mode = Game.MODE_RANDOM;

	hideAllInfo();
	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	showElement(showNextPiece_doc);
	showElement(randomTimer_doc);
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

RandomMode.prototype.setCount = function(count, x, y, z) {
	var neighborCounts = [];

	if (x == 0 || y == 0 || z == 0) {
		count[x][y][z] = 1;
		return;
	}

	// get minimum count from all 7 neighbouring counts
	neighborCounts.push(count[x][y-1][z-1]);
	neighborCounts.push(count[x][y][z-1]);
	neighborCounts.push(count[x][y-1][z]);
	neighborCounts.push(count[x-1][y-1][z-1]);
	neighborCounts.push(count[x-1][y][z-1]);
	neighborCounts.push(count[x-1][y-1][z]);
	neighborCounts.push(count[x-1][y][z]);
	count[x][y][z] = Math.min.apply(null, neighborCounts) + 1;

}

RandomMode.prototype.scoreGame = function() {
	var numReduced = 0;
	var positions = [];
	var count = [];
	var x_pos, y_pos, z_pos;
	var pos, val;
	var maxCount = 0;

	// establish the 3d array from bounding box and the corresponding empty 3d matrix for dynamic programming
	for (var i = this.min_x / STEP_SIZE, x_pos = 0; i < this.max_x / STEP_SIZE; i++, x_pos++) {
		positions.push([]);
		count.push([]);
		for (var j = this.min_y / STEP_SIZE, y_pos = 0; j < this.max_y / STEP_SIZE; j++, y_pos++) {
			positions[x_pos].push([]);
			count[x_pos].push([]);
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
				count[x_pos][y_pos][z_pos] = 0;
			}
		}
	}

	for (var x = 0; x < positions.length; x++) {
		for (var y = 0; y < positions[0].length; y++) {
			for (var z = 0; z < positions[0][0].length; z++) {
				if (positions[x][y][z]) {
					this.setCount(count, x, y, z);
					if (count[x][y][z] > maxCount) {
						maxCount = count[x][y][z];
					}
					// console.log(x + "," + y + "," + z + ": " + count[x][y][z]);
				} 
			}
		}
	}

	return maxCount;
};

RandomMode.prototype.endGame = function() {
	setGameInProgress(false);
	showElement(endScreen_doc);

	endScreen_doc.innerHTML = "<h1>Final score: " + this.score + "</h1><br>"
		+ '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'
		+ backToMenu_string;
};

