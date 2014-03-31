
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.allShapes);
	this.mode = Game.MODE_RANDOM;

	hideAllInfo();
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
	this.nextBlockName = getRandomMember(BlockGenerator.allShapes);
	nextPiece_doc.innerHTML = this.nextBlockName;
	return toReturn;
};

RandomMode.prototype.endGame = function() {

};

