
function LevelMode(toPopulateMenu) {
	Game.call( this );

	if (toPopulateMenu) {
		this.levels = [
			// //level builder
			// new Level(["straight3", "straight3", "straight3", "lightning","lightning","two_blocks","two_blocks", "cross_block", "cross_block", "cross_block",
			// 	"L", "L", "L", 'short_T', 'short_T', 'short_T'], 
			// 	'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":0}]'),

			//big pieces
			new Level(["lock_piece_1","key_piece_2"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":2,"y":0,"z":1},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":2,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":2,"z":0},{"x":0,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":2,"y":2,"z":1},{"x":1,"y":2,"z":1},{"x":1,"y":1,"z":1},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":2},{"x":0,"y":2,"z":2},{"x":1,"y":0,"z":2},{"x":1,"y":1,"z":2},{"x":1,"y":2,"z":2},{"x":2,"y":0,"z":2},{"x":2,"y":1,"z":2},{"x":2,"y":2,"z":2}]'),
			new Level(["cube_third_1","cube_third_2","cube_third_3"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":-1},{"x":-1,"y":0,"z":-2},{"x":-1,"y":1,"z":-2},{"x":-1,"y":2,"z":-2},{"x":-1,"y":0,"z":-1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":0,"z":0},{"x":0,"y":0,"z":-1},{"x":0,"y":1,"z":-1},{"x":0,"y":2,"z":-1},{"x":0,"y":0,"z":-2},{"x":0,"y":1,"z":-2},{"x":0,"y":2,"z":-2},{"x":1,"y":0,"z":-1},{"x":1,"y":1,"z":-1},{"x":1,"y":2,"z":-1},{"x":1,"y":0,"z":-2},{"x":1,"y":1,"z":-2},{"x":1,"y":2,"z":-2}]'),
			new Level(["u_shape","u_shape","pronged_Z_shape","pronged_L_shape"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":2,"y":0,"z":1},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":2,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":2,"z":0},{"x":0,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":2,"y":2,"z":1},{"x":1,"y":2,"z":1},{"x":1,"y":1,"z":1},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":2},{"x":0,"y":2,"z":2},{"x":1,"y":0,"z":2},{"x":1,"y":1,"z":2},{"x":1,"y":2,"z":2},{"x":2,"y":0,"z":2},{"x":2,"y":1,"z":2},{"x":2,"y":2,"z":2}]'),			
			new Level(["u_shape","short_L","corner_setup", "short_T", "goofy_L"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":2,"y":0,"z":1},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":2,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":2,"z":0},{"x":0,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":0,"y":2,"z":1},{"x":2,"y":2,"z":1},{"x":1,"y":2,"z":1},{"x":1,"y":1,"z":1},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":2},{"x":0,"y":2,"z":2},{"x":1,"y":0,"z":2},{"x":1,"y":1,"z":2},{"x":1,"y":2,"z":2},{"x":2,"y":0,"z":2},{"x":2,"y":1,"z":2},{"x":2,"y":2,"z":2}]'),

			//end big pieces

			// small pieces together
			// new Level(["cross_block", "cross_block", "short_T", "short_T", "straight3"],
			// 	'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":-1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":1,"y":1,"z":-1},{"x":1,"y":1,"z":0},{"x":1,"y":1,"z":1},{"x":-1,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":-1,"y":3,"z":0},{"x":1,"y":3,"z":0},{"x":0,"y":3,"z":0}]'),
			new Level(["L", "L", "lightning", "lightning"],
				'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":2,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":1,"z":0},{"x":1,"y":2,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":1,"z":1},{"x":-1,"y":0,"z":1},{"x":-1,"y":1,"z":1}]'),
			new Level(["L", "lightning", "short_T"], 
				'[{"x":1,"y":0,"z":-1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":0},{"x":-1,"y":1,"z":0},{"x":0,"y":1,"z":-1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":2,"z":-1}]'),
			new Level(["straight3", "straight3"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2}]'),
			new Level(["cross_block", "lightning", "straight3", "two_blocks", "short_T", "straight3", "lightning", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1}]'),
			new Level(["L", "cross_block", "lightning", "short_T", "cross_block", "L", "straight3", "short_T"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0},{"x":1,"y":2,"z":0},{"x":2,"y":0,"z":0},{"x":2,"y":1,"z":0},{"x":2,"y":2,"z":0},{"x":2,"y":3,"z":0},{"x":3,"y":0,"z":0},{"x":3,"y":1,"z":0},{"x":3,"y":2,"z":0},{"x":3,"y":3,"z":0},{"x":3,"y":4,"z":0},{"x":4,"y":4,"z":0},{"x":4,"y":5,"z":0},{"x":4,"y":6,"z":0},{"x":5,"y":4,"z":0},{"x":5,"y":5,"z":0},{"x":5,"y":6,"z":0},{"x":6,"y":0,"z":0},{"x":6,"y":1,"z":0},{"x":6,"y":2,"z":0},{"x":6,"y":3,"z":0},{"x":6,"y":4,"z":0},{"x":6,"y":5,"z":0},{"x":6,"y":6,"z":0},{"x":7,"y":0,"z":0},{"x":7,"y":1,"z":0},{"x":7,"y":2,"z":0},{"x":7,"y":3,"z":0},{"x":7,"y":4,"z":0}]'),
			new Level(['lightning', 'lightning', 'cross_block', 'cross_block', 'short_T', 'short_T', 'straight3'],
				'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":2,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":2,"y":0,"z":2},{"x":2,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":1},{"x":1,"y":1,"z":1},{"x":2,"y":1,"z":1},{"x":2,"y":2,"z":0},{"x":1,"y":2,"z":0},{"x":0,"y":2,"z":0},{"x":-1,"y":2,"z":0},{"x":-2,"y":2,"z":0},{"x":0,"y":3,"z":0}]'),

			// lame rectangular prisms: 
			new Level(["two_blocks", "two_blocks"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":0}]'),
			new Level(["straight3", "straight3", "straight3"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":2,"y":0,"z":1},{"x":0,"y":0,"z":2},{"x":1,"y":0,"z":2},{"x":2,"y":0,"z":2}]'),
			new Level(["two_blocks","two_blocks","short_T","short_T"], '[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2},{"x":2,"y":0,"z":1},{"x":2,"y":0,"z":2},{"x":2,"y":0,"z":3},{"x":0,"y":0,"z":3},{"x":1,"y":0,"z":3},{"x":1,"y":0,"z":2}]'),
			new Level(['L', 'lightning', 'L'], 
				'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":0,"y":0,"z":1},{"x":1,"y":0,"z":1},{"x":1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":-2,"y":0,"z":2}]'),
			new Level(["lightning","lightning","two_blocks","two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":-1},{"x":1,"y":0,"z":-1},{"x":1,"y":0,"z":-2},{"x":0,"y":0,"z":-2},{"x":0,"y":1,"z":-2},{"x":1,"y":1,"z":-2},{"x":0,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":-1},{"x":1,"y":1,"z":-1}]'),
			new Level(["cross_block","two_blocks","two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":2,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":2,"z":0}]'),
			new Level(["L", "short_T", "short_T", "straight3", "lightning", "two_blocks", "L", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1},{"x":-1,"y":0,"z":-1},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":1},{"x":-2,"y":0,"z":-1},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":1,"z":-1},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-1,"y":1,"z":-1},{"x":-1,"y":1,"z":0},{"x":-1,"y":1,"z":1},{"x":0,"y":1,"z":-1},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":-1},{"x":0,"y":2,"z":0},{"x":0,"y":2,"z":1},{"x":-1,"y":2,"z":-1},{"x":-1,"y":2,"z":0},{"x":-1,"y":2,"z":1},{"x":-2,"y":2,"z":-1},{"x":-2,"y":2,"z":0},{"x":-2,"y":2,"z":1}]'),
			new Level(['lightning', 'short_T', 'L', 'two_blocks', 'short_T'], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2}]'),
			new Level(["lightning", "lightning", "lightning", "lightning", "two_blocks"], 
				'[{"x":0,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":-1,"y":0,"z":1},{"x":-1,"y":0,"z":0},{"x":-2,"y":0,"z":0},{"x":-2,"y":0,"z":1},{"x":-2,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":0,"y":0,"z":2},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-2,"y":1,"z":0},{"x":-2,"y":1,"z":1},{"x":-2,"y":1,"z":2},{"x":-1,"y":1,"z":1},{"x":-1,"y":1,"z":2},{"x":0,"y":1,"z":1},{"x":0,"y":1,"z":2}]'),		
			
		];
		this.mode = Game.MODE_LEVEL;
		this.titleText = "Level Mode"
		this.objectiveText = "Use given pieces to fill the red box!"
	}

	this.INTERSECTED = null;
	this.goal = [];
	this.goalObject = {};
	this.preview = {};
	this.outlineMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
	this.isPreviewing = true;
	this.FADING_TIME = 3 * 1000;

	this.showLevelMenu();
	hideAllInfo();
}

LevelMode.prototype = Object.create(Game.prototype);

LevelMode.prototype.fadingInAndOut = function() {
	if (this.currentAliveTime < this.FADING_TIME) {
		this.preview.material.opacity = 0.6 * (this.currentAliveTime / this.FADING_TIME);
	} else if (this.currentAliveTime < this.FADING_TIME * 2) {
		this.preview.material.opacity = 0.6 * (1 - (this.currentAliveTime - this.FADING_TIME) / this.FADING_TIME);
	} else {
		this.preview.material.opacity = 0;
		this.isPreviewing = false;

		var that = this;
		window.setTimeout(function() {
			that.currentAliveTime = 0;
			that.isPreviewing = true;
		}, 3 * 1000);		
	}
}

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

	// hide all info for now
	hideElement(info_doc);

	showElement(levelText_doc);
	levelText_doc.innerHTML = "Level:" + (this.level + 1);

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

	setGameInProgress(true);
}

LevelMode.prototype.startLevel = function(level) {
	// TODO: remove this later
	if (makingLevels) {
		this.level = 0;
		this.levelBlocks = ["straight3", "straight3", "straight3", "lightning","lightning","two_blocks","two_blocks", "cross_block", "cross_block", "cross_block", "L", "L", "L", 'short_T', 'short_T', 'short_T'];
		this.createGoalShape([{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0},{"x":0,"y":1,"z":0}]);
		this.showLevel();
		return;
	}

	this.level = level;
	this.levelBlocks = this.levels[level].blocks.slice(0);

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

	dingSound.load();
	dingSound.play();
	var that = this;
	window.setTimeout(function() {
		that.endGame();
	}, 50);
}

LevelMode.prototype.createGoalShape = function(shape) {
	var block = BlockGenerator.getBlock("goalShape", shape, 0x37FDFC);
	this.preview = block.mesh;
	this.preview.toBeRemoved = true;
	this.preview.name = "preview";
	this.preview.matrixAutoUpdate = false;
    this.preview.geometry.verticesNeedUpdate = true;
    this.preview.castShadow = false;
    this.preview.renderDepth = 1.0;
    this.preview.material.opacity = 0;
    this.preview.material.side = THREE.FrontSide;
    this.preview.scale.multiplyScalar(1.01);
    this.preview.updateMatrix();    
    scene.add(this.preview);

	var wireframe = new THREE.Line( geo2line(block.mesh.geometry), new THREE.LineBasicMaterial( { color: 0x37FDFC } ), THREE.LinePieces );
	wireframe.toBeRemoved = true;
	wireframe.position.x += STEP_SIZE/2;
	wireframe.position.y += STEP_SIZE/2;
	wireframe.position.z += STEP_SIZE/2;

	this.goal = shape;
	this.goalObject = wireframe;
	this.goalObject.name = "goalObject";

	scene.add(wireframe);
}

LevelMode.prototype.getNextBlock = function() {
	if (this.levelBlocks.length <= 0) {
		return false;
	}

	var block;
	block = BlockGenerator.generate(this.levelBlocks[0]);
	this.currentAliveTime = 0;
	this.currentBlock = block;
	this.levelBlocks.splice( this.levelBlocks.indexOf(this.currentBlock.shapeName), 1 );

	return true;
};

LevelMode.prototype.endGame = function() {
	setGameInProgress(false);
	this.currentBlock.makeStatic();
	showElement(endScreen_doc);

	scene.remove( this.outline );
	this.preview.material.opacity = 0;

	var passOrFail = '';
	var nextLevel = '';
	var playAgain = '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'; 

	passOrFail = 'PASSED!';
	if (this.level + 1 < this.levels.length) {
		nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
	}	

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ playAgain
		+ nextLevel
		+ backToMenu_string;
};
