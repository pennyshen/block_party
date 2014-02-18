
function TutorialMode() {
	this.levels = [
		new Level(
			['L'],
			100,
			'W,A,S,D to move<br>SPACE to place block',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":25}}]'
		), new Level(
			['L', 'lightning'],
			100,
			'Left click and drag to look around <br> New block will appear after current block is placed',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":175,"z":25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-75}}]'
		), new Level(
			['short_T'],
			100,
			'1,2,3 to rotate',
			'[{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1}],"shapeName":"straight3","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":75,"z":-125}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":25}},{"shape":[{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1}],"shapeName":"straight3","position":{"x":75,"y":125,"z":-25}}]'
		), new Level(
			['two_blocks'],
			100,
			'R to go up, F to go down <br> Can only move up or down if it fits <br> Mouse wheel to zoom',
			'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":75,"z":475}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":425}}]'
		)
	];
	this.mode = "tutorial";

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
}
