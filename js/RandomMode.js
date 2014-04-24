
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	this.mode = Game.MODE_RANDOM;

	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	
	this.timeLimit = 8;
	this.cubeSize = 5;

	this.scorePerSecond = 50;
	this.scorePerVolume = 200;
	
	this.maxCubeSize = 0;
	this.levelsFilled = 0;

	biggestCube_doc.innerHTML = "0x0x0";
	dimension_doc.innerHTML = this.levelsFilled;
	randomScore_doc.innerHTML = this.timeLimit * 60 * this.scorePerSecond;

	showElement(randomInfo_doc);
}

RandomMode.prototype = Object.create(Game.prototype);

RandomMode.goal = [{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":-2},{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2},{"x":-1,"y":0,"z":-2},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":2},{"x":1,"y":0,"z":-2},{"x":1,"y":0,"z":-1},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":2},{"x":2,"y":0,"z":-2},{"x":2,"y":0,"z":-1},{"x":2,"y":0,"z":0},{"x":2,"y":0,"z":1},{"x":2,"y":0,"z":2},{"x":-2,"y":0,"z":-2},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-2,"y":1,"z":-2},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":-2},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":-2},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2},{"x":1,"y":1,"z":-2},{"x":1,"y":1,"z":-1},{"x":1,"y":1,"z":0},{"x":1,"y":1,"z":1},{"x":1,"y":1,"z":2},{"x":2,"y":1,"z":-2},{"x":2,"y":1,"z":-1},{"x":2,"y":1,"z":0},{"x":2,"y":1,"z":1},{"x":2,"y":1,"z":2},{"x":2,"y":2,"z":-2},{"x":2,"y":2,"z":-1},{"x":2,"y":2,"z":0},{"x":2,"y":2,"z":1},{"x":2,"y":2,"z":2},{"x":1,"y":2,"z":-2},{"x":1,"y":2,"z":-1},{"x":1,"y":2,"z":0},{"x":1,"y":2,"z":1},{"x":1,"y":2,"z":2},{"x":0,"y":2,"z":-2},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":0,"y":2,"z":2},{"x":-1,"y":2,"z":-2},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-1,"y":2,"z":2},{"x":-2,"y":2,"z":-2},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1},{"x":-2,"y":2,"z":2},{"x":-2,"y":3,"z":-2},{"x":-2,"y":3,"z":-1},{"x":-2,"y":3,"z":0},{"x":-2,"y":3,"z":1},{"x":-2,"y":3,"z":2},{"x":-1,"y":3,"z":-2},{"x":-1,"y":3,"z":-1},{"x":-1,"y":3,"z":0},{"x":-1,"y":3,"z":1},{"x":-1,"y":3,"z":2},{"x":0,"y":3,"z":-2},{"x":0,"y":3,"z":-1},{"x":0,"y":3,"z":0},{"x":0,"y":3,"z":1},{"x":0,"y":3,"z":2},{"x":1,"y":3,"z":-2},{"x":1,"y":3,"z":-1},{"x":1,"y":3,"z":0},{"x":1,"y":3,"z":1},{"x":1,"y":3,"z":2},{"x":2,"y":3,"z":-2},{"x":2,"y":3,"z":-1},{"x":2,"y":3,"z":0},{"x":2,"y":3,"z":1},{"x":2,"y":3,"z":2},{"x":2,"y":4,"z":-2},{"x":2,"y":4,"z":-1},{"x":2,"y":4,"z":0},{"x":2,"y":4,"z":1},{"x":2,"y":4,"z":2},{"x":1,"y":4,"z":-2},{"x":1,"y":4,"z":-1},{"x":1,"y":4,"z":0},{"x":1,"y":4,"z":1},{"x":1,"y":4,"z":2},{"x":0,"y":4,"z":-2},{"x":0,"y":4,"z":-1},{"x":0,"y":4,"z":0},{"x":0,"y":4,"z":1},{"x":0,"y":4,"z":2},{"x":-1,"y":4,"z":-2},{"x":-1,"y":4,"z":-1},{"x":-1,"y":4,"z":0},{"x":-1,"y":4,"z":1},{"x":-1,"y":4,"z":2},{"x":-2,"y":4,"z":-2},{"x":-2,"y":4,"z":-1},{"x":-2,"y":4,"z":0},{"x":-2,"y":4,"z":1},{"x":-2,"y":4,"z":2}];

RandomMode.levelColors = [0x101010, 0x383838, 0x686868, 0x989898, 0xFFFFFF];

RandomMode.prototype.startGame = function() {
	// get the 5x5x5 wireframe
	// var block = BlockGenerator.getBlock("goalShape", RandomMode.goal, 0x37FDFC);
	var size = 5 * STEP_SIZE / 2.0;
	var geometry = new THREE.Geometry();
	for ( var i = - size; i <= size; i += STEP_SIZE ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

	}
	var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00FFFF } ) );
	this.line = line;
	line.type = THREE.LinePieces;	
	line.position.x += STEP_SIZE / 2;
	line.position.z += STEP_SIZE / 2;
	scene.add(line);

	this.getNextBlock();
	scene.add( rollOverMesh );
	calculateGameBoardOrientation();
	moveTowardsPlayer(rollOverMesh.position);
	setGameInProgress(true);	
};

RandomMode.prototype.getNextBlock = function() {
	var toReturn;
	if (makingLevels) {
		toReturn = BlockGenerator.getBlock("cube", [{x: 0, y: 0, z: 0}], 0xADADAD);
	} else {
		toReturn = BlockGenerator.generate(this.nextBlockName);		
	}

	toReturn.isColored = false;
	this.currentBlock = toReturn;
	this.currentAliveTime = 0;
	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	
	this.createGoalShape();

	rollOverMesh = this.currentBlock.mesh;

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
	var isFilled;

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

	// find maximum cube
	for (var x = 0; x < positions.length; x++) {
		for (var y = 0; y < positions[0].length; y++) {
			for (var z = 0; z < positions[0][0].length; z++) {
				if (positions[x][y][z]) {
					this.setCount(count, x, y, z);
					if (count[x][y][z] > maxCount) {
						maxCount = count[x][y][z];
					}
				} 
			}
		}
	}
	this.maxCubeSize = maxCount;

	// scan level to see if it is filled
	var start, end;
	start = Math.ceil(-this.cubeSize/2);
	end = Math.ceil(this.cubeSize/2);
	isFilled = true;
	for (var x = start; x < end; x++) {
		for (var z = start; z < end; z++) {
			pos = {};
			pos.x = x;
			pos.y = this.levelsFilled;
			pos.z = z;
			if (!(getKeyString(pos) in this.existingBlocks)) {
				isFilled = false;
				break;
			}
		}
	}

	var block, positions, position, newShape;
	var levelShape;
	if (isFilled) {
		// create the colored level
		levelShape = [];
		for (var xx = start; xx < end; xx++) {
			for (var zz = start; zz < end; zz++) {
				levelShape.push({x: xx, y: this.levelsFilled, z:zz});
			}
		}
		block = BlockGenerator.getBlock("levelShape", levelShape, RandomMode.levelColors[this.levelsFilled]);
		block.mesh.scale.multiplyScalar(1.005);
		block.mesh.toBeRemoved = true;
		block.makeStatic();
		scene.add(block.mesh);

		this.levelsFilled++;
		dimension_doc.innerHTML = this.cubeSize - this.levelsFilled;
	}


	return maxCount;
};

RandomMode.skillLookup = function(score) {
	var skillString, starString;
	skillString = "<a class='instructions'>Skill level: ";
	starString = "<a class='instructions stars'>";

	if (score < 10000) {
		skillString += "Rookie";
		starString += "[*][ ][ ]";
	} else if (score < 15000) {
		skillString += "Rising Star";
		starString += "[*][*][ ]";
	} else {
		skillString += "Legend";
		starString += "[*][*][*]";
	}

	skillString += "</a>";
	starString += "</a>";
	return skillString + "<br>" + starString;
};

RandomMode.prototype.addVoxel = function() {
    var voxel = rollOverMesh;
    var oldPos = voxel.position.clone();

    // places rollover block down and make it static
    this.currentBlock.makeStatic();

    // update all blocks
    this.addToExisting(this.currentBlock, voxel.position);

    if (toCheckGoal) {
        this.checkGoal(false, false, true);
    }
   
    if (this.maxCubeSize >= this.cubeSize) {
        render();
        this.endGame();
    }

    // create new block and use that new block as rollover
    this.getNextBlock();

    if (this.currentBlock == null) {
        return;
    }

    rollOverMesh.position.x = oldPos.x;
    rollOverMesh.position.y = oldPos.y;
    rollOverMesh.position.z = oldPos.z;

    moveTowardsPlayer(rollOverMesh.position);

    scene.add( rollOverMesh );
};

RandomMode.prototype.endGame = function() {
	setGameInProgress(false);
	render();

	var volumeOverflow;
	var timeScore, volumeScore, perfectBonus;
	var timeRemaining = game.timeLimit*60*1000 - this.gameTime;
	var scoreString = "";
	var newRecordString;

	if (timeRemaining <= 0) {
		endScreen_doc.innerHTML = "<h1>Fail! Try again?</h1><br>"
	} else {
		scoreString = "<div id='scoreBoard'>"

		timeScore = Math.floor(timeRemaining / 1000) * this.scorePerSecond;
		scoreString += "<a class='instructions'> + " + timeScore + " (speed)</a> <br>";
		this.score += timeScore;
		
		volumeOverflow = this.totalVolume - this.cubeSize * this.cubeSize * this.cubeSize;
		volumeScore = this.scorePerVolume * volumeOverflow;
		scoreString += "<a class='instructions'> - " + volumeScore + " (extra volume)</a> <br>";
		this.score -= volumeScore;

		if (volumeOverflow == 0) {
			perfectBonus = 2000;
			endScreen_doc.innerHTML += "<a class='instructions'> + " + perfectBonus + " (perfect cube!) </a><br>";
			this.score += perfectBonus;
		} 

		scoreString += "</div>";

		// add result to local storage
		if (parseInt(eval("localStorage.XRa")) < this.score) {
			localStorage.setItem('XRa', this.score);
			newRecordString = "New record: ";
		} else {
			newRecordString = "Score: ";
		}


		endScreen_doc.innerHTML = "<h1>" + newRecordString +  this.score + "</h1><br>" + scoreString
			+ "<br>" + RandomMode.skillLookup(this.score);

	}

	endScreen_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'
		+ backToMenu_string;

	showElement(endScreen_doc);
};

