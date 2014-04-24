
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	this.mode = Game.MODE_RANDOM;

	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	
	// level stuff
	this.timeLimit = 8;
	this.cubeSize = 5;
	
	this.maxCubeSize = 0;

	showElement(randomInfo_doc);
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
	
	this.createGoalShape();

	return toReturn;
};

RandomMode.prototype.createGoalShape = function() {
	var shape = cloneVectors(BlockGenerator.shapes[this.nextBlockName]);
	var shapePosition;
	// var block = BlockGenerator.generate(this.nextBlockName);
	var shapeHeight = 0;

	for (var i = 0; i < this.currentBlock.shape.length; i++) {
		shapeHeight = Math.max(this.currentBlock.shape[i].y, shapeHeight);
	}

	var minHeight = 0;
	for (var i = 0; i < shape.length; i++) {
		minHeight = Math.min(shape[i].y, minHeight);
	}
	for (var i = 0; i < shape.length; i++) {
		shape[i].y = shape[i].y + 2 * (shapeHeight + 2 - minHeight);
	}

	var block = BlockGenerator.getBlock(this.nextBlockName, shape, BlockGenerator.colors[BlockGenerator.shapesToColors[this.nextBlockName]])

    if (this.wireframe1) {
    	scene.remove(this.wireframe1);
    }

	this.wireframe1 = new THREE.Line( geo2line(block.mesh.geometry), new THREE.LineBasicMaterial( { color: 0x37FDFC } ), THREE.LinePieces );
	this.wireframe1.position = this.currentBlock.mesh.position;
	this.wireframe1.toBeRemoved = true;
	this.wireframe1.scale.multiplyScalar(0.5);
	scene.add(this.wireframe1);
}


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

RandomMode.prototype.computeBoundingBox = function() {
	// calcualtes the volume of the bounding box
	var x_dif = this.max_x - this.min_x;
	var y_dif = this.max_y - this.min_y;
	var z_dif = this.max_z - this.min_z;
	var cube_vol = x_dif * y_dif * z_dif;
	
	dimension_doc.innerHTML = (x_dif / STEP_SIZE) + "x" + (z_dif / STEP_SIZE) + "x" + (y_dif / STEP_SIZE); 

	this.scoreGame();

	biggestCube_doc.innerHTML = this.maxCubeSize + "x" + this.maxCubeSize + "x" + this.maxCubeSize;
	// this.score = this.totalVolume * 10 + (Math.pow((this.scoreGame()),3))*100;
	// score_doc.innerHTML = this.score;
	
	if (this.boundingBox) {
		scene.remove(this.boundingBox);
		this.boundingBox.geometry.dispose();
	}

	var geom = new THREE.CubeGeometry(this.max_x - this.min_x, this.max_y - this.min_y, this.max_z - this.min_z);
	this.boundingBox = new THREE.Line( geo2line(geom), Game.box_material, THREE.LinePieces );
	this.boundingBox.toBeRemoved = true;

	this.boundingBox.position.x = (this.max_x + this.min_x) / 2;
	this.boundingBox.position.y = (this.max_y + this.min_y) / 2;
	this.boundingBox.position.z = (this.max_z + this.min_z) / 2;

	this.boundingBox.visible = false;
	scene.add(this.boundingBox);	
};

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

	this.maxCubeSize = maxCount;
	return maxCount;
};

RandomMode.prototype.endGame = function() {
	setGameInProgress(false);

	var volumeOverflow;
	var timeScore, volumeScore, perfectBonus;
	var timeRemaining = game.timeLimit*60*1000 - this.gameTime;
	var scoreString = "";

	if (timeRemaining <= 0) {
		endScreen_doc.innerHTML = "<h1>Fail! Try again?</h1><br>"
	} else {
		scoreString = "<div id='scoreBoard'>"

		timeScore = Math.floor(timeRemaining / 1000) * 50;
		scoreString += "<a class='instructions'> + " + timeScore + " (speed)</a> <br>";
		this.score += timeScore;
		
		volumeOverflow = this.totalVolume - this.cubeSize * this.cubeSize * this.cubeSize;
		volumeScore = 200 * volumeOverflow;
		scoreString += "<a class='instructions'> - " + volumeScore + " (extra volume)</a> <br>";
		this.score -= volumeScore;

		if (volumeOverflow == 0) {
			perfectBonus = 2000;
			endScreen_doc.innerHTML += "<a class='instructions'> + " + perfectBonus + " (perfect cube!) </a><br>";
			this.score += perfectBonus;
		} 

		scoreString += "</div>";
		endScreen_doc.innerHTML = "<h1>Final score: " + this.score + "</h1><br>" + scoreString;

	}

	endScreen_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'
		+ backToMenu_string;

	// add result to local storage
	if (parseInt(eval("localStorage.XRa")) < this.score) {
		localStorage.setItem('XRa', this.score);
	}

	showElement(endScreen_doc);
};

