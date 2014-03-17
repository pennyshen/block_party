
function LevelMode(toPopulateMenu) {
	Game.call( this );

	if (toPopulateMenu) {
		this.levels = [
			new Level(["two_blocks","two_blocks","short_T","short_T"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2},{"x":2,"y":0,"z":1},{"x":2,"y":0,"z":2},{"x":2,"y":0,"z":3},{"x":0,"y":0,"z":3},{"x":1,"y":0,"z":3},{"x":1,"y":0,"z":2}]'),
			new Level(['L', 'lightning', 'L'], 
				'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":-2,"y":0,"z":2}]'),
			new Level(["lightning","lightning","two_blocks","two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":-1},{"x":1,"y":0,"z":-1},{"x":1,"y":0,"z":-2},{"x":0,"y":0,"z":-2},{"x":0,"y":1,"z":-2},{"x":1,"y":1,"z":-2},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":-1},{"x":1,"y":1,"z":-1}]'),
			new Level(["cross_block","two_blocks","two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":2,"z":0}]'),
			new Level(["lightning", "lightning", "lightning", "lightning", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2}]'),		
			new Level(["cross_block", "lightning", "straight3", "two_blocks", "short_T", "straight3", "lightning", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1}]'),
			new Level(['lightning', 'short_T', 'L', 'two_blocks', 'short_T'], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2}]'),
			new Level(["L", "short_T", "short_T", "straight3", "lightning", "two_blocks", "L", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1}]'),
		];
		this.mode = "level";
		this.titleText = "Level Mode"
		this.objectiveText = "Use given pieces to fill the red box!"
	}

	this.INTERSECTED = null;
	this.goal = [];
	this.goalObject = {};
	this.outline = {};
	this.outlineMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );

	this.showLevelMenu();
}

LevelMode.prototype = Object.create(Game.prototype);

LevelMode.prototype.showLevelMenu = function() {
	levelModeMenu_doc.innerHTML = "<h1>" + this.titleText + "</h1><br>";
	levelModeMenu_doc.innerHTML += "<p id='helperText'>" + this.objectiveText + "</p>";
	for (var i = 0; i < this.levels.length; i++) {
		levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="game.startLevel(' + i + ')">' + (i+1) + '</a><br>';
	}
	levelModeMenu_doc.innerHTML += '<br><br><a href="javascript: void(0)" class="menuItem" onClick="showElementAndHideNav(menu_doc)" style="margin-bottom:50px">Back</a>';

	showElementAndHideNav(levelModeMenu);
}

LevelMode.prototype.showLevel = function() {
	hideAllNav();
	hideAllInfo();
	if (this.mode == "tutorial") {
		showElement(hint_doc);
		if (center_tooltip_doc.innerHTML != '') {
			showElement(center_tooltip_doc);
		}		
	}

	// TODO: DON'T CALL THIS FOR NOW
	// TODO: REORGANIZE HOW WE'RE STARTING A GAME
	// startGame();

	while (this.getNextBlock()) {
		// create
		rollOverMesh = this.currentBlock.mesh;
		scene.add(rollOverMesh);
		rollOverMesh.position.x += getRandomInteger(-7, 7)*STEP_SIZE;
		rollOverMesh.position.z += getRandomInteger(-7, 7)*STEP_SIZE;
		rollOverMesh.currentHex = rollOverMesh.material.emissive.getHex();
		moveToLegal(this.currentBlock, this.currentBlock.mesh.position);

		// add
		this.currentBlock.makeStatic();
		this.addToExisting(this.currentBlock, rollOverMesh.position);
	}

	rollOverMesh = null;
	startMovingBlock(this.currentBlock.mesh);

	if (mainMusic) {
		mainMusic.currentTime = 0;
		mainMusic.play();		
	}

	gameInProgress = true;
	// volume_doc.innerHTML = this.totalVolume;
}

LevelMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = this.levels[level].blocks.slice(0);
	this.toPass = this.levels[level].passRate;

	this.createGoalShape(JSON.parse(this.levels[level].goalShape));

	this.showLevel();
} 

LevelMode.prototype.checkSuccess = function() {
	var map = getPositionsMap(this.currentBlock.getMyPositions());
	var key;

	for (var i = 0; i < this.goal.length; i++) {
		key = getKeyString(this.goal[i]);
		if (key in this.existingBlocks) {
			continue;
		} else if (key in map) {
			continue;
		} else {
			return;
		}
	}

	this.endGame();
}

LevelMode.prototype.createGoalShape = function(shape) {
	var block = BlockGenerator.getBlock("goalShape", shape, "grey");
	var wireframe = new THREE.Line( geo2line(block.mesh.geometry), new THREE.LineBasicMaterial( { color: 0x37FDFC } ), THREE.LinePieces );

	wireframe.position.x += STEP_SIZE/2;
	wireframe.position.y += STEP_SIZE/2;
	wireframe.position.z += STEP_SIZE/2;

	this.goal = shape;
	this.goalObject = wireframe;

	scene.add(wireframe);
}

// //create the goal shape using the given x, y, and z values position at the origin.
// LevelMode.prototype.createGoalShape = function(x,y,z) {

// 	var x_adjusted = x * STEP_SIZE;
// 	var y_adjusted = y * STEP_SIZE;
// 	var z_adjusted = z * STEP_SIZE;
// 	var geom = new THREE.CubeGeometry(x_adjusted, y_adjusted, z_adjusted);
// 	this.goalShape = new THREE.Line( geo2line(geom), new THREE.LineBasicMaterial( { color: 0xFF0000 } ), THREE.LinePieces );
// 	this.goalShape.visible = true;
// 	if(x%2==1)
// 		this.goalShape.position.x += STEP_SIZE/2;
// 	this.goalShape.position.y += y_adjusted/2;
// 	if(z%2==1)
// 		this.goalShape.position.z +=STEP_SIZE/2;
// 	scene.add(this.goalShape);

// }

LevelMode.prototype.getNextBlock = function() {
	if (this.levelBlocks.length <= 0) {
		// this.currentBlock = null;
		// this.endGame();
		// return;
		return false;
	}

	var block;
	block = BlockGenerator.generate(this.levelBlocks[0]);
	this.currentAliveTime = 0;
	this.currentBlock = block;
	this.levelBlocks.splice( this.levelBlocks.indexOf(this.currentBlock.shapeName), 1 );
	piecesLeft_doc.innerHTML = game.levelBlocks.length;

	return true;
};

LevelMode.prototype.endGame = function() {
	// hideElement(container);
	gameInProgress = false;
	mainMusic.pause();
	showElement(endScreen_doc);

	var passOrFail = '';
	var nextLevel = '';
	var playAgain = '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'; 

	// if (this.score >= this.toPass) {
	// 	passOrFail = "PASSED!";
	// 	if (this.level + 1 < this.levels.length) {
	// 		nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
	// 	}		

	// 	successSound.load();
	// 	successSound.play();
	// } else {
	// 	passOrFail = "FAILED!";

	// 	failSound.load();
	// 	failSound.play();
	// }
	passOrFail = 'PASSED!';
	if (this.level + 1 < this.levels.length) {
		nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
	}	

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ playAgain
		+ nextLevel
		+ backToMenu_string;
};
