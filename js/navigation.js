
function setGameInProgress(isInProgress) {
	gameInProgress = isInProgress;
	controls.enabled = isInProgress;
	
	if (gameInProgress) {
		if (mainMusic) {
			mainMusic.play();
		}
	} else {
		if (mainMusic) {
			mainMusic.pause();
		}		
	}
}

function pauseGame() {
	setGameInProgress(false);
    showElement(pauseScreen_doc);	
}

function resumeGame() {
	setGameInProgress(true);
	hideElement(pauseScreen_doc);
}

function backToMenu() {
	game.clearScene();
	if (game.mode == Game.MODE_RANDOM) {
		showElementAndHideNav(menu_doc);
	} else {
		game.showLevelMenu(game.levelType);
	}
}

function nextLevel() {
	goToLevel(game.level + 1, game.mode);
}

function restartLevel()　{
	goToLevel(game.level, game.mode);
}

function goToLevel(level, mode) {
	var type = game.levelType;
	game.clearScene();
	game = null;
	initGame(mode);
	if (mode != Game.MODE_RANDOM) {
		game.levelType = type;
		game.levels = LevelContent.levels[game.levelType];
	}
	game.startLevel(level);
}

function hideAllNav() {
	for (var i = 0; i < nav_items.length; i++) {
		hideElement(nav_items[i]);
	}
}

function hideAllInfo() {
	for (var i = 0; i < info_items.length; i++) {
		hideElement(info_items[i]);
	}
}

function hideElement(element) {
	element.style.display = "none";
}

function showElement(element) {
	element.style.display = "";
}

function showElementAndHideNav(element) {
	hideAllNav();
	showElement(element);
}