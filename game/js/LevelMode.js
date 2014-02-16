
function LevelMode(toPopulateMenu) {
	Game.call( this );

	if (toPopulateMenu) {
		this.levels = [
			new Level(['L', 'lightning', 'L'], 80),
			new Level(['lightning', 'short_T', 'L', 'two_blocks', 'short_T'], 80),
			new Level(["cross_block", "lightning", "straight3", "two_blocks", "short_T", "straight3", "lightning", "two_blocks"], 80)
		];
		this.mode = "level";
	}

	this.showLevelMenu();
}

LevelMode.prototype = Object.create(Game.prototype);

LevelMode.prototype.showLevelMenu = function() {
	levelModeMenu_doc.innerHTML = "<h1>Levels</h1>";
	for (var i = 0; i < this.levels.length; i++) {
		levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="game.startLevel(' + i + ')">' + (i+1) + '</a><br>';
	}
	showElementAndHideNav(levelModeMenu);
}

LevelMode.prototype.showLevel = function() {
	hideAllNav();
	hideElement(showNextPiece_doc);
	showElement(avail_blocks);
	showElement(hint_doc);	
	startGame();
}

LevelMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = this.levels[level].blocks.slice(0);
	this.toPass = this.levels[level].passRate;

	this.showLevel();
} 

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
	var passOrFail = '';
	var nextLevel = '';

	if (this.score >= this.toPass) {
		passOrFail = "PASSED!";
	} else {
		passOrFail = "FAILED!";
	}

	if (this.level + 1 < this.levels.length) {
		nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
	}

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ nextLevel
		+ backToMenu_string;

};
