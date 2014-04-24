function LevelMode(toPopulateMenu) {
	Game.call( this );

	this.INTERSECTED = null;
	this.goal = [];
	this.goalObject = {};
	this.preview = {};
	this.isPreviewing = true;
	this.FADING_TIME = 3 * 1000;

	this.shapeToColor = {};
	this.numShapes = 0;

	if (toPopulateMenu) {
		this.mode = Game.MODE_LEVEL;
		this.titleText = "Puzzles"
		this.objectiveText = "Use given pieces to fill the goal shape!"
		this.showSubMenu();
	} else {
		this.showLevelMenu(LevelContent.TUTORIAL);
	}	
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

LevelMode.prototype.showSubMenu = function() {
	var levelType;

	levelModeMenu_doc.innerHTML = "<h1>" + this.titleText + "</h1><br>";
	levelModeMenu_doc.innerHTML += "<p id='helperText'>" + this.objectiveText + "</p>";
	for (var i = 0; i < LevelContent.allTypes.length; i++) {
		levelType = LevelContent.allTypes[i];
		
		if (levelType == LevelContent.TUTORIAL)
			continue;

		//checks whether the last level in the previous world has been completed
		/* uncomment to lock worlds
		var exp;
		if(i==0)
			exp = null;
		else
			exp = eval("localStorage.X" + LevelContent.allTypes[i-1].substring(0,2)+
				(LevelContent.levels[LevelContent.allTypes[i-1]].length-1) + ";");
		if (levelType == LevelContent.TUTORIAL)
			continue;
		if(unlockLevels || i==0 || exp!=null)	
			levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="game.showLevelMenu(\'' + levelType + '\')">' + levelType + '</a><br>';
		else
			levelModeMenu_doc.innerHTML += '<a class="locked">' + levelType + '</a><br>';
		*/
			// levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem"><b style = "color:red">' + levelType + '</b></a><br>';
			levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="game.showLevelMenu(\'' + levelType + '\')">' + levelType + '</a><br>';
	}
	levelModeMenu_doc.innerHTML += backToMainMenu_string;
	showElementAndHideNav(levelModeMenu);
}

LevelMode.prototype.showLevelMenu = function(levelType) {
	this.levelType = levelType;
	this.levels = LevelContent.levels[this.levelType];
	var sTA = "";

	levelModeMenu_doc.innerHTML = "<h1>" + this.levelType + "</h1><br>";
	levelModeMenu_doc.innerHTML += "<p id='helperText'>" + LevelContent.LevelTypetoDescriptor[this.levelType] + "</p>";

	sTA += '<div id="levels" class="levelselect">';
	for (var i = 0; i < this.levels.length; i++) {
		var exp = eval("localStorage.X" +this.levelType.substring(0,2)+(i-1)+";");
		if(unlockLevels || i==0 || exp!=null)	
			sTA += '<a href="javascript: void(0)" class="menuItem" onClick="game.startLevel(' + i + ')">' + (i+1) + '</a><br>';
		else
			sTA += '<a href="javascript: void(0)" class="locked">' + (i+1) + '</a><br>';
	}
	sTA += '</div>';
	if (levelType == LevelContent.TUTORIAL) {
		sTA += '<a href="javascript: void(0)" class="menuItem backButton" style="top:15%;" onClick="showElementAndHideNav(menu_doc)">Main Menu</a>';
	} else {
		sTA += '<a href="javascript: void(0)" class="menuItem backButton" style="top:15%;" onClick="game.showSubMenu()"">' + this.titleText + '</a>';
	}
	levelModeMenu_doc.innerHTML += sTA;


	showElementAndHideNav(levelModeMenu);
}

// for making level only! to delete later
LevelMode.prototype.getBlock = function(name) {
	var block = BlockGenerator.generate(name);
	moveToLegal(block, block.mesh.position);
	this.addToExisting(block, block.mesh.position);
	block.makeStatic();
	scene.add(block.mesh);
}

LevelMode.prototype.showLevel = function() {
	hideAllNav();

	showElement(levelInfo_doc);
	numLevel_doc.innerHTML = this.level + 1;

	//if tutorial, don't show anything time-related
	if (this.levelType == LevelContent.TUTORIAL){
		hideElement(best_time);
		hideElement(timer);
	}

	LevelContent.worlds[this.levelType].loadWorld();

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
		this.levelBlocks = ["straight2"];
		this.createGoalShape([{"x":0,"y":20,"z":0}]);
		this.showLevel();
		return;
	}

	this.level = level;
	this.levelBlocks = this.levels[level].blocks.slice(0);

	this.createGoalShape(JSON.parse(this.levels[level].goalShape));

	this.showLevel();

	showElement(best_time);
	showElement(timer);

	//sets the best time
	var exp = eval("localStorage.X" +this.levelType.substring(0,2)+this.level+";");
	if(exp!=null && exp!="yes"){ //this is to prevent old localStorage items
		best_time.innerHTML = "Best time: " + exp;
	}
	else{
		best_time.innerHTML = "Best time: N/A";
	}	
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
	

	//sets local storage for level completion and time (e.g. Xfla0, time)
	var bestTime = timer.innerHTML;
	var minSec = bestTime.split(":");
	var timeNew = parseInt(minSec[0])*60 + parseInt(minSec[1]);	
	var exp = eval("localStorage.X" +this.levelType.substring(0,2)+this.level+";");

	if(exp!=null){
		minSec = exp.split(":");
		var oldTime = minSec[0]*60 +minSec[1];
		if(timeNew > oldTime){	//no new record
			bestTime = exp;
		}
	}
	localStorage.setItem("X"+this.levelType.substring(0,2) + this.level, bestTime);


	dingSound.load();
	dingSound.play();
	var that = this;
	window.setTimeout(function() {
		setGameInProgress(false);
		that.endGame();
	}, 100);
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
    this.preview.scale.multiplyScalar(1.003);
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
	var shape = this.levelBlocks[0];
	var colorName;
	if (shape in this.shapeToColor) {
		colorName = this.shapeToColor[shape];
	} else {
		colorName = BlockGenerator.allColors[this.numShapes];
		this.numShapes++;
		this.shapeToColor[shape] = colorName;
	}

	block = BlockGenerator.getBlock(shape, BlockGenerator.shapes[shape], BlockGenerator.colors[colorName]);
	this.currentAliveTime = 0;
	this.currentBlock = block;
	this.levelBlocks.splice( this.levelBlocks.indexOf(this.currentBlock.shapeName), 1 );

	rollOverMesh = this.currentBlock.mesh;

	return true;
};

LevelMode.prototype.endGame = function() {
	setGameInProgress(false);
	this.currentBlock.makeStatic();
	showElement(endScreen_doc);

	scene.remove( this.outline );
	this.preview.material.opacity = 0;
	if (INTERSECTED) {
		INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );	
		INTERSECTED = null;
	}
	render();	// render one last time
	
	var passOrFail = '';
	var nextLevel = '';
	var playAgain = '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'; 

	passOrFail = 'PASSED!';
	if (this.level + 1 < this.levels.length) {
		nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
	}	

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ nextLevel
		+ playAgain
		+ backToMenu_string;
};