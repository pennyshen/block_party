
function pauseGame() {
	mainMusic.pause();
    gameInProgress = false;
    showElement(pauseScreen_doc);	
}

function resumeGame() {
	mainMusic.play();
	gameInProgress = true;
	hideElement(pauseScreen_doc);
}

function backToMenu() {
	game.clearScene();
	game = null;
	// main
	showElementAndHideNav(menu_doc);
}

function nextLevel() {
	goToLevel(game.level + 1, game.mode);
}

function restartLevel()　{
	goToLevel(game.level, game.mode);
}

function goToLevel(level, mode) {
	game.clearScene();
	game = null;
	initGame(mode);
	game.startLevel(level);
}

function hideAllNav() {
	for (var i = 0; i < nav_items.length; i++) {
		hideElement(nav_items[i]);
	}
	hideElement(hint_doc);
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