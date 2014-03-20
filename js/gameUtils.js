
function canPlayAudio(a) {
	return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

function setPosition(positionFrom, positionTo) {
	positionTo.x = positionFrom.x;
	positionTo.y = positionFrom.y;
	positionTo.z = positionFrom.z;
}

function getPositionsMap(positions) {
    var map = {};

    for (var i = 0; i < positions.length; i++) {
        map[getKeyString(positions[i])] = true;
    }

    return map;
}

function startMovingBlock(meshToMove) {
	var blockToMove;
	var blockIdx;
	var positions;

	// unlighlight and put down the old block
	if (rollOverMesh) {
		game.currentBlock.makeStatic();
		game.addToExisting(game.currentBlock, rollOverMesh.position);
		scene.remove( game.outline );
	}
	rollOverMesh = meshToMove;
	rollOverMesh.material.emissive.setHex( rollOverMesh.currentHex );

	// find which block it is from the mesh
	blockIdx = game.getIndexFromExistingBlocks(meshToMove);
	blockToMove = game.existingBlocks[blockIdx];

	// remove from existingBlocks
	game.currentBlock = blockToMove;
	blockToMove.makeMovable();
	game.existingBlocks.splice(blockIdx, 1);
	positions = blockToMove._getPositions(meshToMove.position, blockToMove.shape);
	for (var i = 0; i < positions.length; i++) {
		delete game.existingBlocks[getKeyString(positions[i])];
	}

	// outline the block
	game.outline = new THREE.Mesh( game.currentBlock.mesh.geometry, game.outlineMaterial );
	game.outline.position = game.currentBlock.mesh.position;
	game.outline.scale.multiplyScalar(1.05);
	game.outline.matrix = rollOverMesh.matrix;
	game.outline.rotation.setFromRotationMatrix(rollOverMesh.matrix);

	scene.add( game.outline );
}

function initGame(gameMode) {
	hideAllNav();

	// reset camera position and orbit controls
	camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
	controls.center.set(0,0,0);

	// don't check for goal unless told otherwise
	toCheckGoal = false;

	if (gameMode == "level") {
		game = new LevelMode(true);
	} else if (gameMode == "random") {
		game = new RandomMode();
		startGame();
	} else if (gameMode == "tutorial") {
		game = new TutorialMode();
		toCheckGoal = true;
	}

	volume_doc.innerHTML = game.totalVolume;
	score_doc.innerHTML = game.score;

}

function startGame() {
	game.getNextBlock();

	rollOverMesh = game.currentBlock.mesh;

	scene.add( rollOverMesh );

	calculateGameBoardOrientation();

	moveTowardsPlayer(rollOverMesh.position);
	
	if (mainMusic) {
		mainMusic.currentTime = 0;
		mainMusic.play();		
	}

	gameInProgress = true;
}

function calculateGameBoardOrientation() {
	if (Math.abs(camera.position.x) > Math.abs(camera.position.z)) {
		if (camera.position.x < 0) {
			gameBoardOrientation = 2;
		} else {
			gameBoardOrientation = 3;
		}
	} else {
		if (camera.position.z < 0) {
			gameBoardOrientation = 4;
		} else {
			gameBoardOrientation = 1;
		}
	}	
}

function intersectToHighlight() {
	var vector = new THREE.Vector3( mouse2D.x, mouse2D.y, 1 );
	projector.unprojectVector( vector, camera );

	raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

	var toIntersect = [];
	for (var i = 0; i < game.existingBlocks.length; i++) {
		toIntersect.push(game.existingBlocks[i].mesh);
	}

	var intersects = raycaster.intersectObjects( toIntersect );
	var idx;

	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			// rolled from one object onto another

			if ( INTERSECTED ) {
				if ( INTERSECTED.id != rollOverMesh.id ) {
					INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				}
			}

			// check if we're already moving the intersected object
			if ( intersects[ 0 ].object.id == rollOverMesh.id ) {
				return;
			}			

			// only highlight if we can actually move it
			idx = game.getIndexFromExistingBlocks(intersects[ 0 ].object);
			if (!game.canMoveBlock(game.existingBlocks[idx])) {
				intersects[ 0 ].object.material.emissive.setHex( intersects[ 0 ].object.currentHex );
				INTERSECTED = null;
				return;
			}

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.material.emissive.setHex( 0xff0000 );

		}

	} else {
		if ( INTERSECTED )  {
			if ( INTERSECTED.id != rollOverMesh.id ) {
				INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			}
		}

		INTERSECTED = null;

	}		
}

// draws the normal line for debugging
function drawNormal(origin, normal) {
	var lineGeo = new THREE.Geometry();
	var secondPoint = origin.clone();

	lineGeo.vertices.push(origin.clone());
	secondPoint.add(normal.clone().multiplyScalar(STEP_SIZE / 2));
    lineGeo.vertices.push(secondPoint);
    scene.add(new THREE.Line( lineGeo , new THREE.LineBasicMaterial( { color: 0x000000 } )));
}

// get sorted key string from object propertis' values
function getKeyString(obj) {
	return obj.x + "," + obj.y + "," + obj.z;
}

function getDupVertices(vertices) {
	var i, vertexString, vertex;
	var vertexMap = {};
	var duplicateVertices = {};
	for (i = 0; i < vertices.length; i++) {
		vertex = vertices[i];
		vertexString = vertex.x + "," + vertex.y + "," + vertex.z;
		if (vertexString in vertexMap) {
			duplicateVertices[vertexString] = true;
		} else {
			vertexMap[vertexString] = true;
		}
	}
}

// get random integer between min and max
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random array member
function getRandomMember(array) {
	return array[getRandomInteger(0, array.length-1)];
}

//check for intersection
function hasCollision() {
	var block = rollOverMesh;
    var face, block2, face2;
    var ray = new THREE.Raycaster();
    var collided;
    var sharedNormals;

    console.log(block.position);
    console.log("collided = ");
    for (var i = 0; i < block.geometry.faces.length; i++) {
        face = block.geometry.faces[i];
        facePoint = face.centroid.clone();
        rollOverMesh.localToWorld(facePoint);
        ray.set(facePoint, face.normal.clone());
        collided = ray.intersectObjects( block_list );
        if (collided.length > 0) {
            for (var j = 0; j < collided.length; j++) {
                block2 = collided[j].object.material.color.set(0x7F7C9C);
                console.log(collided[j]);
            }    
        }
    }

	return false;
}

function isDiagonal(point1, point2) {
	var sameNum = 0;
	if (point1.x == point2.x) {
		sameNum++;
	}
	if (point1.y == point2.y) {
		sameNum++;
	}	
	if (point1.z == point2.z) {
		sameNum++;
	}	
	if (sameNum <= 1) {
		return true;
	} else {
		return false;
	}
}

function geo2line( geo ) // credit to WestLangley!
{
    var geometry = new THREE.Geometry();
    var vertices = geometry.vertices;

	for ( i = 0; i < geo.faces.length; i++ ) 
	{
        var face = geo.faces[ i ];
        var a = geo.vertices[ face.a ].clone();
		var b = geo.vertices[ face.b ].clone();
		var c = geo.vertices[ face.c ].clone();

        if ( !isDiagonal(a, b) ) {
        	vertices.push(a, b);
        }
        if ( !isDiagonal(b, c) ) {
        	vertices.push(b, c);
        }
        if ( !isDiagonal(c, a) ) {
        	vertices.push(c, a);
        }
    }

    geometry.computeLineDistances();
    return geometry;
}

//called at the end of the level
function endLevel() {
	score_doc.innerHTML = '' + Math.round((BlockGenerator.totalVolume)/(cube_vol/Math.pow(STEP_SIZE,3) )*100) + "/100";
	gameInProgress = false;
	timer.innerHTML = '';
	nextPiece_doc.innerHTML = '';
	//clear unnecessary fields

}

function cloneVector(v) {
  	return {x: v.x, y: v.y, z: v.z};
};



function cloneVectors(vectors) {
	var i;
	var newVectors = [];
	for (i = 0; i < vectors.length; i++) {
		newVectors[i] = cloneVector(vectors[i]);
	}
	return newVectors;
}
