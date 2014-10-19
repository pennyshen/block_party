
function setGameInProgress(isInProgress) {
	gameInProgress = isInProgress;
	controls.enabled = isInProgress;
	keysEnabled = isInProgress;
	
	if (gameInProgress) {
		if (mainMusic && mute == false) {
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

function reinitGame() {
	var mode = game.mode;
	var type = game.levelType;
	initGame(mode);
	if (mode != Game.MODE_RANDOM) {
		game.levelType = type;
		game.levels = LevelContent.levels[game.levelType];
	}
}

function backToMenu() {
	game.clearScene();
	if (game.mode == Game.MODE_RANDOM) {
		showElementAndHideNav(menu_doc);
	} else {
		reinitGame();
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
	if (mode != Game.MODE_RANDOM) {
		reinitGame();
		game.startLevel(level);
	} else {
		initGame(mode);
	}
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

function adjustMusic() {
	if (mute == false)
	{
		mute = true;
		mute_doc.innerHTML = "<a href='javascript: void(0)' style='font-size:35px;text-decoration:none;' onClick='adjustMusic()'>Unmute</a>";
		if(mainMusic)
		{
			mainMusic.pause();
		}
	}
	else
	{
		mute = false;
		mute_doc.innerHTML = "<a href='javascript: void(0)' style='font-size:35px;text-decoration:none;' onClick='adjustMusic()'>Mute</a>";
		if (mainMusic)
		{
			mainMusic.play();
		}
	}
}