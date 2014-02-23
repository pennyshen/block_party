
function Level(blocks, passRate, hint, toImport, goals, goalShape) {
	this.blocks = blocks;
	this.passRate = passRate;
	this.hint = hint;
	this.toImport = toImport;
	this.goals = goals;
	this.goalShape = goalShape;
}


function Goal(goalPos, goalText) {
	this.goalPos = goalPos;
	this.goalText = goalText;
}