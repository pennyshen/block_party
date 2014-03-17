
function Level(blocks, goalShape, hint, toImport, goals) {
	this.blocks = blocks;
	this.goalShape = goalShape;
	this.toImport = toImport;
	this.goals = goals;
}


function Goal(goalPos, goalText) {
	this.goalPos = goalPos;
	this.goalText = goalText;
}