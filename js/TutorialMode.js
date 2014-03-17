
function TutorialMode() {
	this.levels = [
		new Level(
			['L'],
			'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0}]',
			'Use W,A,S,D to move block into wireframe',
			[new Goal('MOVE', 'Use W,A,S,D to move block into wireframe')]
		), new Level(
			['short_T'],
			'[{"x":0,"y":0,"z":9},{"x":-1,"y":0,"z":9},{"x":-2,"y":0,"z":9},{"x":-1,"y":1,"z":9}]',
			'Mouse wheel to zoom',
			[new Goal('MOVE', 'Mouse wheel to zoom')]
		), new Level(
			['lightning'],
			'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0}]',
			'Rotate with 1',
			[new Goal('ROTATE', '1 Rotates about the floor'),
			new Goal('[{"x":0,"y":2,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":-1,"y":3,"z":0}]', '')]
		), new Level(
			['L'],
			'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0}]',
			'Rotate with 2, 3',
			[new Goal('ROTATE', '2 always rotates counterclockwise, 3 clockwise'),
			new Goal('[{"x":0,"y":2,"z":-1},{"x":0,"y":3,"z":-1},{"x":0,"y":1,"z":-1},{"x":1,"y":3,"z":-1}]','')]
		), new Level(
			['cross_block'],
			'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":1},{"x":0,"y":2,"z":0},{"x":0,"y":1,"z":-1}]',
			"Click and drag to look around. <br> Don't forget to rotate!",
			[new Goal('ROTATE', 'Click and drag to look around')]
		), new Level(
			['L'],
			'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2}]',
			'Combine 1,2,3 to rotate!',
			[new Goal('ROTATE', 'Use 1, 2, 3 to place the shape.'),
			new Goal('[{"x":0,"y":0,"z":2},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":3},{"x":1,"y":0,"z":1}]', '')]
		), new Level(
			['two_blocks', 'L'],
			'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":-1,"y":3,"z":0}]',
			'Use SPACE or click to switch control to another block <br> Block being controlled is outlined with green',
			[new Goal('MOVE', 'Use SPACE or click to switch control to another block')]
		)
	];
	this.mode = "tutorial";
	this.titleText = "Tutorial Mode";
	this.objectiveText = "Fill in the missing spots!";
	this.goals = [];
	this.goalIdx = -1;

	LevelMode.call( this );
}

TutorialMode.prototype = Object.create(LevelMode.prototype);

TutorialMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = this.levels[level].blocks.slice(0);

	hint_doc.innerHTML = "Hint: <br>" + this.levels[level].hint;

	// TODO: consolidate this with LevelMode
	this.createGoalShape(JSON.parse(this.levels[level].goalShape));

	this.initTutorial();
	this.showLevel();
}

TutorialMode.prototype.initTutorial = function() {
	if (this.levels[this.level].toImport) {
		this.importToExisting(this.levels[this.level].toImport);
	}
	this.goals = this.levels[this.level].goals;
	var goal, pos;

	for (var i = 0; i < this.goals.length; i++) {
		if (this.goals[i].goalPos != "MOVE" && this.goals[i].goalPos != "ROTATE") {
			var goal = JSON.parse(this.goals[i].goalPos);	
			var goalMap = {};
			for (var j = 0; j < goal.length; j++) {
				goalMap[getKeyString(goal[j])] = true;	
			}			
			// replace goalPos with goalMap
			this.goals[i].goalPos = goalMap;
		}
	}

	this.nextGoal();
}

TutorialMode.prototype.showToolTip = function() {
	var goal = this.goals[this.goalIdx];

	if (goal.goalPos == "MOVE" || goal.goalPos == "ROTATE") {
		// show tool tip immediately
		if (center_tooltip_doc.innerHTML != '') {
			showElement(center_tooltip_doc);
		}
	} else {
		// double check if we're at the goal
		this.checkGoal(false, false, false);
	}
}

TutorialMode.prototype.nextGoal = function() {
	if (this.goalIdx >= this.goals.length-1) {
		hideElement(center_tooltip_doc);
		return;
	}

	this.goalIdx++;
	center_tooltip_doc.innerHTML = this.goals[this.goalIdx].goalText;
	hideElement(center_tooltip_doc);
	this.showToolTip();
}

TutorialMode.prototype.checkGoal = function(moved, rotated, placed) {
    var shapeStrings = [];
    var positions = this.currentBlock._getPositions(this.currentBlock.mesh.position);
    var matchGoal = false;
    var playDing = false;

    var goal = this.goals[this.goalIdx];
    var goalObj;

    if (goal.goalPos == "MOVE") {
    	if (moved) {
    		matchGoal = true;
    	}
    } else if (goal.goalPos == "ROTATE") {
    	if (rotated) {
    		matchGoal = true;
    	}
    } else {
	    for (var i = 0; i < positions.length; i++) {
	        shapeStrings.push(getKeyString(positions[i]));
	    }

	    matchGoal = true;
	    playDing = true;

	    for (var j = 0; j < shapeStrings.length; j++) {
	        if (!(shapeStrings[j] in goal.goalPos)) {
	            matchGoal = false;
	            playDing = false;
	            break;
	        }
	    }    	
    }

    if (matchGoal) {
    	if (playDing) {
    		if (placed) {
    			// can move on and don't have to play ding
    			this.nextGoal();
    		} else {
		    	dingSound.load();
		    	dingSound.play();
		    	if (center_tooltip_doc.innerHTML != '') {
		    		showElement(center_tooltip_doc);
		    	}
    		}
    	} else {
    		this.nextGoal();
    	}
    } else {
    	// MIGHT BE BUGGY
    	if (goal.goalPos != "ROTATE" && goal.goalPos != "MOVE") {
    		hideElement(center_tooltip_doc);
    	}
    }
}
