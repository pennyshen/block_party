
function TutorialMode() {
	LevelMode.call( this );

	this.showLevelMenu(TutorialMode.levels);
}

TutorialMode.levels = [
	['L'],
	['L', 'lightning'],
	['short_T'],
	['two_blocks']
];

TutorialMode.blocksToImport = [
	'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":225,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":225,"z":25}}]',	
	'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":75,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":-25}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":25,"z":-75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":125,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":125,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":175,"z":25}},{"shape":[{"x":0,"y":-1,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":175,"z":75}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":175,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":175,"z":-25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-75,"y":175,"z":-75}}]',
	'[{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":75,"y":25,"z":-75}},{"shape":[{"x":0,"y":0,"z":1},{"x":0,"y":0,"z":-1}],"shapeName":"straight3","position":{"x":25,"y":25,"z":25}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":75}},{"shape":[{"x":0,"y":0,"z":1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-25}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":-75}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":75,"z":-125}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":-75}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":25,"y":125,"z":25}},{"shape":[{"x":0,"y":0,"z":-1},{"x":0,"y":0,"z":1}],"shapeName":"straight3","position":{"x":75,"y":125,"z":-25}}]',
	'[{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":25,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":75,"z":475}},{"shape":[{"x":0,"y":1,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":25,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":25,"y":75,"z":425}},{"shape":[{"x":0,"y":0,"z":-1}],"shapeName":"two_blocks","position":{"x":125,"y":75,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":75,"y":125,"z":425}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":475}},{"shape":[{"x":1,"y":0,"z":0}],"shapeName":"two_blocks","position":{"x":-25,"y":125,"z":425}}]'
];

TutorialMode.hint = [
	'W,A,S,D to move',
	'Left click and drag to look around',
	'1,2,3 to rotate',
	'R to go up, F to go down'
];


TutorialMode.prototype = Object.create(LevelMode.prototype);

TutorialMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = TutorialMode.levels[level].slice(0);
	this.toPass = 100;	// since it's tutorial, always require 100%

	hint_doc.innerHTML = "Hint: " + TutorialMode.hint[level];

	this.initTutorial();
	this.showLevel();
}

TutorialMode.prototype.initTutorial = function() {
	this.importToExisting(TutorialMode.blocksToImport[this.level]);
}
