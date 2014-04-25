
function RandomMode() {
	Game.call( this );

	this.mode = Game.MODE_RANDOM;
	this.nextBlockName = "cube";

	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	
	this.timeLimit = 8;
	this.cubeSize = 5;

	this.scorePerSecond = 50;
	this.scorePerVolume = 200;
	
	this.maxCubeSize = 0;
	this.levelsFilled = 0;

	this.startTimer = false;

	dimension_doc.innerHTML = this.cubeSize;
	randomScore_doc.innerHTML = this.timeLimit * 60 * this.scorePerSecond;
	randomTimer_doc.innerHTML = "0" + this.timeLimit + ":00";

	this.hintLink = "<a href='javascript: void(0)' style='font-size:35px;text-decoration:none;' onClick='game.showHint()'>HINT</a>";

	hint_doc.innerHTML = this.hintLink;

	showElement(randomInfo_doc);
	showElement(nextBlock_doc);
	showElement(hint_doc);
}

RandomMode.prototype = Object.create(Game.prototype);

RandomMode.goal = [{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":-2},{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2},{"x":-1,"y":0,"z":-2},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":2},{"x":1,"y":0,"z":-2},{"x":1,"y":0,"z":-1},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":2},{"x":2,"y":0,"z":-2},{"x":2,"y":0,"z":-1},{"x":2,"y":0,"z":0},{"x":2,"y":0,"z":1},{"x":2,"y":0,"z":2},{"x":-2,"y":0,"z":-2},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-2,"y":1,"z":-2},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":-2},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":-2},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2},{"x":1,"y":1,"z":-2},{"x":1,"y":1,"z":-1},{"x":1,"y":1,"z":0},{"x":1,"y":1,"z":1},{"x":1,"y":1,"z":2},{"x":2,"y":1,"z":-2},{"x":2,"y":1,"z":-1},{"x":2,"y":1,"z":0},{"x":2,"y":1,"z":1},{"x":2,"y":1,"z":2},{"x":2,"y":2,"z":-2},{"x":2,"y":2,"z":-1},{"x":2,"y":2,"z":0},{"x":2,"y":2,"z":1},{"x":2,"y":2,"z":2},{"x":1,"y":2,"z":-2},{"x":1,"y":2,"z":-1},{"x":1,"y":2,"z":0},{"x":1,"y":2,"z":1},{"x":1,"y":2,"z":2},{"x":0,"y":2,"z":-2},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":0,"y":2,"z":2},{"x":-1,"y":2,"z":-2},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-1,"y":2,"z":2},{"x":-2,"y":2,"z":-2},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1},{"x":-2,"y":2,"z":2},{"x":-2,"y":3,"z":-2},{"x":-2,"y":3,"z":-1},{"x":-2,"y":3,"z":0},{"x":-2,"y":3,"z":1},{"x":-2,"y":3,"z":2},{"x":-1,"y":3,"z":-2},{"x":-1,"y":3,"z":-1},{"x":-1,"y":3,"z":0},{"x":-1,"y":3,"z":1},{"x":-1,"y":3,"z":2},{"x":0,"y":3,"z":-2},{"x":0,"y":3,"z":-1},{"x":0,"y":3,"z":0},{"x":0,"y":3,"z":1},{"x":0,"y":3,"z":2},{"x":1,"y":3,"z":-2},{"x":1,"y":3,"z":-1},{"x":1,"y":3,"z":0},{"x":1,"y":3,"z":1},{"x":1,"y":3,"z":2},{"x":2,"y":3,"z":-2},{"x":2,"y":3,"z":-1},{"x":2,"y":3,"z":0},{"x":2,"y":3,"z":1},{"x":2,"y":3,"z":2},{"x":2,"y":4,"z":-2},{"x":2,"y":4,"z":-1},{"x":2,"y":4,"z":0},{"x":2,"y":4,"z":1},{"x":2,"y":4,"z":2},{"x":1,"y":4,"z":-2},{"x":1,"y":4,"z":-1},{"x":1,"y":4,"z":0},{"x":1,"y":4,"z":1},{"x":1,"y":4,"z":2},{"x":0,"y":4,"z":-2},{"x":0,"y":4,"z":-1},{"x":0,"y":4,"z":0},{"x":0,"y":4,"z":1},{"x":0,"y":4,"z":2},{"x":-1,"y":4,"z":-2},{"x":-1,"y":4,"z":-1},{"x":-1,"y":4,"z":0},{"x":-1,"y":4,"z":1},{"x":-1,"y":4,"z":2},{"x":-2,"y":4,"z":-2},{"x":-2,"y":4,"z":-1},{"x":-2,"y":4,"z":0},{"x":-2,"y":4,"z":1},{"x":-2,"y":4,"z":2}];

RandomMode.levelColors = [0x101010, 0x383838, 0x686868, 0x989898, 0xFFFFFF];

RandomMode.prototype.startGame = function() {
 	// set up for block preview
 	this.previewScene = new THREE.Scene();
 	this.previewCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
 	this.previewCamera.position.set(1000, 0, 0);
 	this.previewCamera.lookAt(new THREE.Vector3(0, 0, 0));
 	// this.previewCamera.rotateY(Math.PI/6);
 	this.previewScene.add( this.previewCamera );
 
	initLights(this.previewScene, false);
	// get the 5x5 wireframe on floor
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
	line.toBeRemoved = true;
	scene.add(line);

	this.getNextBlock();
	scene.add( rollOverMesh );
	calculateGameBoardOrientation();
	moveTowardsPlayer(rollOverMesh.position);

	var block = BlockGenerator.getBlock("flash", RandomMode.goal, 0x00FFFF);
	this.flashMesh = block.mesh;
	this.flashMesh.castShadow = false;
	this.flashMesh.material.opacity = 1.0;
	scene.add(this.flashMesh);	

	this.numCountdown = 5;
	this.numCountDownInit = this.numCountdown;
	endScreen_doc.innerHTML = "<a class='instructions center'>Complete a 5x5x5 cube <br> as fast and as perfectly as possible!</h1><br> ";
	endScreen_doc.innerHTML += "<a class='instructions center' id='countDown' style='padding-top:110px; font-size: 100px;'>" + this.numCountdown + "</span></a><br>";
	endScreen_doc.innerHTML += "<a class='instructions center' style='padding-top:20px'>(Press any key to start)</a><br>"
	showElement(endScreen_doc);

	this.flashInterval = setInterval(this.flash, 1000);	

	setGameInProgress(true);	
	controls.enabled = false;
	keysEnabled = false;
	document.addEventListener( 'keydown', hideRandomOpening, false );
	console.log("adding:");
	console.log(this);

};

RandomMode.prototype.flash = function() {
	game.toFlash = !game.toFlash;
	game.numCountdown--;
	
	if (game.numCountdown > 0) {
		document.getElementById('countDown').innerHTML = game.numCountdown;
	} else if (game.numCountdown == 0) {
		document.getElementById('countDown').innerHTML = "START";		
	} else {
		hideRandomOpening();
	}
};

RandomMode.prototype.showHint = function() {
	console.log(this.hintLink);
	hint_doc.innerHTML = "Complete a 5x5x5 cube as fast and as perfectly as possible! <br>";
	hint_doc.innerHTML += "Things sticking outside of the cube will reduce score. <br>";
	hint_doc.innerHTML += "SPACE to place current block and get the next block. <br>";
	hint_doc.innerHTML += "Each level (horizontal plane) will turn grey once it's completed. <br>";
	hint_doc.innerHTML += "<span onClick='hint_doc.innerHTML=game.hintLink' style='text-decoration:underline; cursor:pointer;'>Hide hint</span>"
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
	if (this.previewMesh) {
		this.previewScene.remove(this.previewMesh);
	}

	var block = BlockGenerator.generate(this.nextBlockName);
	block.mesh.castShadow	= false;
	block.mesh.receiveShadow = false;
	block.mesh.material.opacity = 1.0;
	block.mesh.depthWrite = false;
	block.mesh.depthTest = false;
	this.previewScene.add(block.mesh);
	this.previewMesh = block.mesh;	
	this.previewMesh.position.y = 210;
	this.previewMesh.position.z = - window.innerWidth/2 + window.innerWidth/8;
	this.previewMesh.rotateZ(-Math.PI/8);
	this.previewMesh.rotateY(6* Math.PI/8);
	this.previewMesh.rotateX(-Math.PI/20);
	game.previewMesh.rotateY(-Math.PI/4);
	game.previewMesh.rotateZ(Math.PI/50);
	this.previewMesh.scale.multiplyScalar(0.7);
	this.previewMesh.toBeRemoved = true;

	if (this.nextBlockName != "straight4") {
		// this.previewMesh.position.y += 70;
	} else {
		this.previewMesh.position.y -= 60;
	}
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
	while (isFilled && this.levelsFilled < this.cubeSize) {
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
	hideElement(nextBlock_doc);
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
			perfectBonus = 3000;
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

