
function RandomMode() {
	Game.call( this );

	this.nextBlockName = getRandomMember(BlockGenerator.allShapes);
}

RandomMode.prototype = Object.create(Game.prototype);

RandomMode.prototype.getNextBlock = function() {
	var toReturn = BlockGenerator.generate(this.nextBlockName);
	this.currentBlock = toReturn;
	this.currentAliveTime = 0;
	this.nextBlockName = getRandomMember(BlockGenerator.allShapes);
	nextPiece_doc.innerHTML = this.nextBlockName;
	return toReturn;
};

RandomMode.prototype.endGame = function() {

};

