
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	this.mode = Game.MODE_RANDOM;

	hideAllInfo();
	LevelContent.worlds[LevelContent.TUTORIAL].loadWorld();
	showElement(showNextPiece_doc);
}

RandomMode.prototype = Object.create(Game.prototype);

RandomMode.prototype.getNextBlock = function() {
	var toReturn;
	if (makingLevels) {
		toReturn = BlockGenerator.getBlock("cube", [{x: 0, y: 0, z: 0}], 0xADADAD);
	} else {
		toReturn = BlockGenerator.generate(this.nextBlockName);		
	}
	
	this.currentBlock = toReturn;
	this.currentAliveTime = 0;
	this.nextBlockName = getRandomMember(BlockGenerator.randomModeShapes);
	nextPiece_doc.innerHTML = this.nextBlockName;
	return toReturn;
};

RandomMode.prototype.scoreGame = function() {
	var positionStrings = Object.keys(this.existingBlocks).splice(this.existingBlocks.length);
	var positions, pos;
	var axisMap = ['x', 'y', 'z']

	positions = {};
	for (var i = 0; i < axisMap.length; i++) {
		positions[axisMap[i]] = [];
	}

	// get the positions from positionStrings into the positions map
	for (var i = 0; i < positionStrings.length; i++) {
		pos = positionStrings[i].split(',');
		for (var j = 0; j < pos.length; j++) {
			positions[axisMap[j]].push(parseInt(pos[j]));
		}
	}
	console.log(positions);
};

RandomMode.prototype.endGame = function() {

};

