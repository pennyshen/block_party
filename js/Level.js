
function Level(blocks, goalShape, hint, goals, toImport) {
	this.blocks = blocks;
	this.goalShape = goalShape;
	this.goals = goals;
	this.toImport = toImport;
}


function Goal(goalPos, goalText) {
	this.goalPos = goalPos;
	this.goalText = goalText;
}