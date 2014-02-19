
function TutorialMode() {
	this.levels = [
		new Level(
			['L'],
			100,
			'W,A,S,D to move<br>SPACE to place block',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":25}}]',
			['[{"x":0,"y":2,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":3,"z":0},{"x":-1,"y":1,"z":0}]']
		), new Level(
			['L', 'lightning'],
			100,
			'Left click and drag to look around <br> New block will appear after current block is placed',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":175,"z":25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-75}}]',
			['[{"x":1,"y":1,"z":-2},{"x":1,"y":0,"z":-2},{"x":1,"y":2,"z":-2},{"x":0,"y":0,"z":-2}]', '[{"x":-1,"y":1,"z":-2},{"x":-1,"y":0,"z":-2},{"x":0,"y":1,"z":-2},{"x":0,"y":2,"z":-2}]']
		), new Level(
			['short_T'],
			100,
			'1,2,3 to rotate',
			'[{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1}],"shapeName":"straight3","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":75,"z":-125}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":25}},{"shape":[{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1}],"shapeName":"straight3","position":{"x":75,"y":125,"z":-25}}]',
			['[{"x":1,"y":1,"z":-1},{"x":1,"y":0,"z":-1},{"x":1,"y":1,"z":0},{"x":1,"y":1,"z":-2}]']
		), new Level(
			['two_blocks'],
			100,
			'R to go up, F to go down <br> Can only move up or down if it fits <br> Mouse wheel to zoom',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":75,"z":475}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":425}}]',
			['[{"x":1,"y":0,"z":9},{"x":1,"y":1,"z":9}]']
		)
	];
	this.mode = "tutorial";
	this.goals = [];
	this.lastColor = null;

	LevelMode.call( this );
}

TutorialMode.prototype = Object.create(LevelMode.prototype);

TutorialMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = this.levels[level].blocks.slice(0);
	this.toPass = 100;	// since it's tutorial, always require 100%

	hint_doc.innerHTML = "Hint: <br>" + this.levels[level].hint;

	this.initTutorial();
	this.showLevel();
}

TutorialMode.prototype.initTutorial = function() {
	this.importToExisting(this.levels[this.level].toImport);

	var goalsToImport = this.levels[this.level].goals;
	var goal, pos;

	for (var i = 0; i < goalsToImport.length; i++) {
		var goal = JSON.parse(goalsToImport[i]);
		var goalMap = {};
		for (var j = 0; j < goal.length; j++) {
			goalMap[getKeyString(goal[j])] = true;	
		}
		this.goals.push(goalMap);
	}
}

TutorialMode.prototype.checkGoal = function() {
    var shapeStrings = [];
    var positions = this.currentBlock._getPositions(this.currentBlock.mesh.position);
    var matchGoal;
    for (var i = 0; i < positions.length; i++) {
        shapeStrings.push(getKeyString(positions[i]));
    }

    for (var i = 0; i < this.goals.length; i++) {
        var goal = this.goals[i];
        matchGoal = true;

        for (var j = 0; j < shapeStrings.length; j++) {
            if (!(shapeStrings[j] in goal)) {
                matchGoal = false;
                break;
            }
        }

        if (matchGoal) {
        	this.lastColor = this.currentBlock.mesh.material.color;
        	this.currentBlock.mesh.material.color = new THREE.Color("grey");
            break;
        }
    }

    if (!matchGoal)	{
    	if (this.lastColor) {
    		this.currentBlock.mesh.material.color = this.lastColor;
    	}
    }
}
