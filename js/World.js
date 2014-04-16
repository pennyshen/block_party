
function World(picture, music) {
	this.picture = picture;
	this.music = music;
}

World.prototype.loadWorld = function() {
	backgroundMesh.material.map = textures[this.picture];
	mainMusic = sounds[this.music];
}