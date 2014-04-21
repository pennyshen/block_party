
function World(picture, music, goalColor) {
	this.picture = picture;
	this.music = music;
	this.goalColor = goalColor;
}

World.prototype.loadWorld = function() {
	backgroundMesh.material.map = textures[this.picture];
	mainMusic = sounds[this.music];
	if (this.goalColor) {
		game.preview.material.color.setHex(this.goalColor);
		game.goalObject.material.color.setHex(this.goalColor);
	}
}