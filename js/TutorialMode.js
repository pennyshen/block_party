
function TutorialMode() {
	this.levels = [
		new Level(
			['L'],
			100,
			'Use W,A,S,D to move block into wireframe',
			'',
			// '[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":25}}]',
			[new Goal('MOVE', 'Use W,A,S,D to move block into wireframe')],
			'[{"x":0,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0}]'
		), /* new Level(
			['L', 'lightning'],
			100,
			'Left click and drag to look around <br> New block will appear after current block is placed',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":175,"z":25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-75}}]',
			[new Goal('MOVE', 'Left click and drag to look around'),
			new Goal('[{"x":1,"y":1,"z":-2},{"x":1,"y":0,"z":-2},{"x":1,"y":2,"z": -2},{"x":0,"y":0,"z":-2}]',
				'New block will appear after current block is placed'),
			new Goal('[{"x":-1,"y":1,"z":-2},{"x":-1,"y":0,"z":-2},{"x":0,"y":1,"z":-2},{"x":0,"y":2,"z":-2}]', '')]
		), */	new Level(
			['lightning'],
			100,
			'Rotate with 1',
			'',
			[new Goal('ROTATE', '1 Rotates about the floor'),
			new Goal('[{"x":0,"y":2,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":2,"z":0},{"x":-1,"y":3,"z":0}]', '')],
			'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":-1,"y":1,"z":0},{"x":-1,"y":2,"z":0}]'
		), new Level(
			['L'],
			100,
			'Rotate with 2, 3',
			'',
			[new Goal('ROTATE', '2 always rotates counterclockwise, 3 clockwise'),
			new Goal('[{"x":0,"y":2,"z":-1},{"x":0,"y":3,"z":-1},{"x":0,"y":1,"z":-1},{"x":1,"y":3,"z":-1}]','')],
			'[{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},{"x":1,"y":2,"z":0}]'
		),  new Level(
			['L'],
			100,
			'Combine 1,2,3 to rotate!',
			'',
			[new Goal('ROTATE', 'Use 1, 2, 3 to place the shape.'),
			new Goal('[{"x":0,"y":0,"z":2},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":3},{"x":1,"y":0,"z":1}]', '')],
			'[{"x":0,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":2}]'
		), /* new Level(
			['short_T'],
			100,
			'Now try rotating after moving the camera around!',
			'[{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1}],"shapeName":"straight3","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":75,"z":-125}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":25}},{"shape":[{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1}],"shapeName":"straight3","position":{"x":75,"y":125,"z":-25}}]',
			[new Goal('ROTATE', 'Move the camera and rotate to place the shape.'),
			new Goal('[{"x":1,"y":1,"z":-1},{"x":1,"y":0,"z":-1},{"x":1,"y":1,"z":0},{"x":1,"y":1,"z":-2}]', '')]
		), */ /*new Level(
			['two_blocks'],
			100,
			'R to go up, F to go down <br> Can only move up or down if it fits <br> Mouse wheel to zoom',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":75,"z":475}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":425}}]',
			[new Goal('MOVE', 'Mouse wheel to zoom'),
			new Goal('ROTATE', 'R,F to go up and down. But make sure block fits first!'),
			new Goal('[{"x":1,"y":0,"z":9},{"x":1,"y":1,"z":9}]', 'R to go up, F to go down')]
		), new Level(
			['L', 'two_blocks'],
			100,
			'Click on "switch block" button to see other given blocks',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":25}}]',
			[new Goal('MOVE', 'Click on "switch block" button to choose from all given blocks'),
			new Goal('[{"x":-1,"y":0,"z":0},{"x":0,"y":0,"z":0}]', ''),
			new Goal('[{"x":0,"y":2,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":3,"z":0},{"x":-1,"y":1,"z":0}]', '')]
		) */
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
	this.toPass = 100;	// since it's tutorial, always require 100%

	hint_doc.innerHTML = "Hint: <br>" + this.levels[level].hint;

	// TODO: consolidate this with LevelMode
	this.createGoalShape(JSON.parse(this.levels[level].goalShape));

	this.initTutorial();
	this.showLevel();
}

TutorialMode.prototype.initTutorial = function() {
	this.importToExisting(this.levels[this.level].toImport);
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
