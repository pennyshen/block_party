
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
	element.style.display = "block";
}