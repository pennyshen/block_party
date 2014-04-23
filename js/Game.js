
function Game() {
	this.totalVolume = 0;
	this.score = 0;
	this.existingBlocks = [];
	this.currentBlock = {};
	this.currentAliveTime = 0;
	this.gameTime = 0;
	this.boundingBox = null;
	this.goalShape = null;
	
	// keeping track of max and min of x,y,z coordinates
	this.min_x = Number.MAX_VALUE;
	this.min_y = Number.MAX_VALUE;
	this.min_z = Number.MAX_VALUE;
	this.max_x = -Number.MAX_VALUE;
	this.max_y = -Number.MAX_VALUE;
	this.max_z = -Number.MAX_VALUE;

	if (mainMusic) {
		mainMusic.currentTime = 0;
	}

	hideAllInfo();
}


Game.box_material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );

Game.MODE_TUTORIAL = 0;
Game.MODE_LEVEL = 1;
Game.MODE_RANDOM = 2;

Game.prototype = {
	addToExisting: function(block, realPosition) {
		var i, positions, position;
		positions = block._getPositions(realPosition, block.shape);
		for (i = 0; i < positions.length; i++) {
			position = positions[i];
			this.existingBlocks[getKeyString(position)] = block.mesh.id;
		}
		this.existingBlocks.push(block);

		if (this.mode == Game.MODE_RANDOM) {
			for (i = 0; i < positions.length; i++) {
				position = positions[i];
				this.min_x = Math.min(this.min_x, position.x * STEP_SIZE);
				this.min_y = Math.min(this.min_y, position.y * STEP_SIZE);
				this.min_z = Math.min(this.min_z, position.z * STEP_SIZE);

				this.max_x = Math.max(this.max_x, position.x * STEP_SIZE + STEP_SIZE);
				this.max_y = Math.max(this.max_y, position.y * STEP_SIZE + STEP_SIZE);
				this.max_z = Math.max(this.max_z, position.z * STEP_SIZE + STEP_SIZE);
			}
			this.totalVolume += positions.length;
			this.computeBoundingBox();	
		}
	},

	getIndexFromExistingBlocks: function(meshId) {
		for (var i = 0; i < this.existingBlocks.length; i++) {
			var p = this.existingBlocks[i].mesh.id;
			if (this.existingBlocks[i].mesh.id == meshId) {
				return i;
			}
		}
		return -1;
	},

	canMoveBlock: function(block) {
		var positions = block.getMyPositions();
		var position, posAbove;
		var maxY = -1;
		var currentPositions = this.currentBlock.getMyPositions();
		var currentMap = getPositionsMap(currentPositions);
		var blockMap = getPositionsMap(positions);
		var key, blockOnTop, positionsOnTop, positionsOnTopMap;
		var meshIds = {};
		var meshId;
		var isSupported;

		for (var i = 0; i < positions.length; i++) {
			position = positions[i];
			posAbove = cloneVector(position);
			posAbove.y += 1;
			key = getKeyString(posAbove);
			if (key in blockMap) {
				// ignore if position above is occupied by the block itself
				continue;
			}

			// get a list of mesh ids who are on top of this block
			if (key in game.existingBlocks) {
				meshIds[game.existingBlocks[key]] = true;
			} else if (key in currentMap) {
				meshIds[this.currentBlock.mesh.id] = true;
			}
		}

		// check if the blocks on top are supported by anything else other than the block in question
		for (var meshIdStr in meshIds) {
			meshId = parseInt(meshIdStr);
			if (meshId == this.currentBlock.mesh.id) {
				blockOnTop = this.currentBlock;
			} else {
				blockOnTop = this.existingBlocks[this.getIndexFromExistingBlocks(meshId)];
			}
			positionsOnTop = blockOnTop.getMyPositions();
			positionsOnTopMap = getPositionsMap(positionsOnTop);
			isSupported = false;
			for (var i = 0; i < positionsOnTop.length; i++) {
				if (positionsOnTop[i].y == 0) {
					// supported by the ground. good enough!
					isSupported = true;
					break;
				}
				position = cloneVector(positionsOnTop[i]);
				position.y -= 1;
				key = getKeyString(position);
				if (key in positionsOnTopMap) {
					// ignore itself
					continue;
				}
				if (key in blockMap) {
					// doesn't count if it's supported by the block 
					continue;
				}
				if (key in game.existingBlocks || key in currentMap) {
					isSupported = true;
					break;
				}
			}
			if (!isSupported) {
				return false;
			}
		}

		return true;
	},

	getNextBlock: function() {
		throw 'nextBlock must be implemented';
	},

	endGame: function() {
		throw 'endGame must be implemented';	
	},

	clearScene: function() {
		var child;

		for (var i = 0; i < this.existingBlocks.length; i++) {
			this.existingBlocks[i].removeFromScene();
		}

		if (this.currentBlock) {
			this.currentBlock.removeFromScene();
		}

		// clean up the rest
		var removeList = [];
		for (var i = 0; i < scene.children.length; i++) {
			child = scene.children[i];
			if (child.toBeRemoved) {
				removeList.push(child);
			}
		}
		for (var i = 0; i < removeList.length; i++) {
			scene.remove(removeList[i]);
			removeList[i].geometry.dispose();
		}
	},

	exportFromCurrent: function() {
		return JSON.stringify(this.currentBlock._getPositions(this.currentBlock.mesh.position));
	},

	getAllShapeNames: function() {
		var shapes = [];

		// shapes.push(this.currentBlock.shapeName);

		for (var i = 0; i < this.existingBlocks.length; i++) {
			shapes.push(this.existingBlocks[i].shapeName);
		}

		return shapes;
	},

	exportGoal: function() {
		var newShape = [];
		var positions;

		for (var i = 0; i < this.existingBlocks.length; i++) {
			positions = this.existingBlocks[i].getMyPositions();
			for (var j = 0; j < positions.length; j++) {
				newShape.push(positions[j]);
			}
		}

		// if (this.mode != Game.MODE_RANDOM) {
		// 	positions = this.currentBlock.getMyPositions();
		// 	for (var i = 0; i < positions.length; i++) {
		// 		newShape.push(positions[i]);
		// 	}
		// }

		return JSON.stringify(newShape);
	}

}