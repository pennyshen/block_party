
function resumeGame() {
	gameInProgress = true;
	hideElement(pauseScreen_doc);
}

function backToMenu() {
	game.clearScene();
	game = null;
	// camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
	// camera.lookAt(new THREE.Vector3(0, 0, 0));
	showElement(menu_doc);
}

function hideAllNav() {
	for (var i = 0; i < nav_items.length; i++) {
		hideElement(nav_items[i]);
	}
}

function hideElement(element) {
	element.style.display = "none";
}

function showElement(element) {
	hideAllNav();
	element.style.display = "";
}