
function LevelMode(level) {
	Game.call( this );

	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = LevelMode.levels[level].slice(0);
}

// levels by index. level1 = index 0
LevelMode.levels = [
	// ["two_blocks", "short_T"],
	["cross_block", "lightning", "straight3", "two_blocks", "short_T", "straight3", "lightning", "two_blocks"]
];

LevelMode.passRate = [
	60
];

LevelMode.prototype = Object.create(Game.prototype);

LevelMode.prototype.populateSelection = function() {
	// clear
	for (var i = avail_blocks.options.length - 1; i >= 0; i--) {
        avail_blocks.remove(i);
    }

	// populates the selection button
    for (var i = 0; i < this.levelBlocks.length; i++) {
        var option = document.createElement("option");
        option.text = this.levelBlocks[i];
        avail_blocks.add(option);
    }

    avail_blocks.blur();
}

LevelMode.prototype.switchBlock = function(index) {
	var oldPos = this.currentBlock.mesh.position.clone();

	// first push the current block back in and then remove it
	this.levelBlocks.push(this.currentBlock.shapeName);
	this.currentBlock.removeFromScene();

	this.currentBlock = BlockGenerator.generate(this.levelBlocks[index]);
	rollOverMesh = this.currentBlock.mesh;

	rollOverMesh.position.x += oldPos.x;
	rollOverMesh.position.y += oldPos.y;
	rollOverMesh.position.z += oldPos.z;

	moveTowardsPlayer(rollOverMesh.position);

	this.levelBlocks.splice( index, 1 );
	this.populateSelection();

	scene.add(this.currentBlock.mesh);
}

LevelMode.prototype.getNextBlock = function() {
	if (this.levelBlocks.length <= 0) {
		this.endGame();
		return;
	}

	var block;
	block = BlockGenerator.generate(this.levelBlocks[0]);
	this.currentAliveTime = 0;
	this.currentBlock = block;
	this.levelBlocks.splice( this.levelBlocks.indexOf(this.currentBlock.shapeName), 1 );
	this.populateSelection();
};

LevelMode.prototype.endGame = function() {
	// hideElement(container);
	gameInProgress = false;
	showElement(endScreen_doc);
	passOrFail = '';
	console.log(endScreen_doc);

	if (game.score >= LevelMode.passRate[this.level]) {
		passOrFail = "PASSED!";
	} else {
		passOrFail = "FAILED!";
	}

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ backToMenu_string;

};
