
function Level(blocks, goalShape, hint, goals) {
	this.blocks = blocks;
	this.goalShape = goalShape;
	this.hint = hint;
	this.goals = goals;
}


function Goal(goalPos, goalText) {
	this.goalPos = goalPos;
	this.goalText = goalText;
}


Goal.copyGoal = function() {
	var newGoal = {};
	newGoal.goalPos = goalPos;
	newGoal.goalText = goalText;
	return newGoal;
}