
function hideRandomOpening() {
	document.removeEventListener( 'keydown', hideRandomOpening, false );	
	clearInterval(game.flashInterval);
	scene.remove(game.flashMesh);
	game.flashMesh = null;
	game.startTimer = true;
	controls.enabled = true;	
	keysEnabled = true;	
	game.gameTime = 0;	// reset game time
	hideElement(endScreen_doc);	
}

function checkAllLoaded(numLoaded, numToLoad) {
	loading_text_doc.innerHTML += ".";

	// set number of files loading here
	if (numLoaded >= numToLoad) {
		showElementAndHideNav(menu_doc);
	}
}

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
	}
	rollOverMesh = meshToMove;
	rollOverMesh.material.emissive.setHex( rollOverMesh.currentHex );

	// find which block it is from the mesh
	blockIdx = game.getIndexFromExistingBlocks(meshToMove.id);
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
	game.outlineCurrentBlock();
}

function initGame(gameMode) {
	hideAllNav();

	// reset camera position and orbit controls
	camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
	controls.center.set(0,0,0);

	// don't check for goal unless told otherwise
	toCheckGoal = false;

	if (gameMode == Game.MODE_LEVEL) {
		game = new LevelMode(true);
	} else if (gameMode == Game.MODE_RANDOM) {
		game = new RandomMode();
		game.startGame();
	} else if (gameMode == Game.MODE_TUTORIAL) {
		game = new TutorialMode();
		toCheckGoal = true;
	}

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

	var onRollover = raycaster.intersectObject( rollOverMesh );
	if ( onRollover.length > 0) {
		MOVINGMAIN = true;

	} else {
		MOVINGMAIN = null;
	}

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
				MOVING = true;
				return;
			}
		}

		// only highlight if we can actually move it
		idx = game.getIndexFromExistingBlocks(intersects[ 0 ].object.id);
		if (!game.canMoveBlock(game.existingBlocks[idx])) {
			intersects[ 0 ].object.material.emissive.setHex( intersects[ 0 ].object.currentHex );
			INTERSECTED = null;
			return;
		}

		INTERSECTED = intersects[ 0 ].object;
		INTERSECTED.material.emissive.setHex( 0xff0000 );		

	} else {
		if ( INTERSECTED )  {
			if ( INTERSECTED.id != rollOverMesh.id ) {
				INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			}
		}

		INTERSECTED = null;
		MOVING = null;

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

// get random integer between min and max
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random array member
function getRandomMember(array) {
	return array[getRandomInteger(0, array.length-1)];
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

function initLocalStorage() {
	if (!localStorage.getItem("hasBlockPartyStorage")) {
		localStorage.setItem("hasBlockPartyStorage", true);
		localStorage.setItem("XRa", 0)
	}	
}


function clearLocalStorage(){
	//clears level information
	localStorage.clear();
	initLocalStorage();
}


function refreshHighScore(){
	highscore.innerHTML="<h1>Game Record</h1><br>";
	var completed = new Object();
	var time = new Object();
	for(var i in window.localStorage){
		var item = localStorage.getItem(i); 
		for(var levelName  in LevelContent.levels){
			if(i.substring(1,3) == levelName.substring(0,2)){
				//incremented completed levels
				if(completed[levelName]==null){
					completed[levelName] = 0;
				}
				completed[levelName]++;
				//add time
				if(time[levelName]==null){
					time[levelName] = 0;
				}
				time[levelName] += parseInt(item.split(':')[0])*60+parseInt(item.split(':')[1]);
			}
		}
	}
	var total_completed = 0;
	var total_levels = 0;
	var total_time = 0;
	highscore_doc.innerHTML += "<a class = 'highscoreEntry' style='left:5em; padding-bottom: 17px'>Completed &nbsp;&nbsp;Time<br>"
	for(var j in LevelContent.levels){
		var levelCount = 0;
		var padding;
		for(var k in LevelContent.levels[j]){
			//initialize values if no record
			if(completed[j]==null){
					completed[j] = 0;
			}
			if(time[j]==null){
				time[j] = 0;
			}
			//calcualte number of levels
			levelCount++;
		}

		var entryClass;
		if (j == "Monster Cubes") {
			entryClass = '<a class="highscoreEntry leftShift">'
		} else {
			entryClass = '<a class="highscoreEntry">';
		}

		highscore_doc.innerHTML += entryClass + j + "<span class='centerPadding'>" + completed[j]+ '/' + 
			levelCount + '</span>' + ('0'+Math.floor(time[j]/60)).slice(-2) + ':' + ('0'+Math.floor(time[j]%60)).slice(-2)+'</a><br>';
		total_completed += completed[j];
		total_levels += levelCount;
		total_time += time[j];
	}
	highscore_doc.innerHTML += '<a class="highscoreEntry" style="left:1em;">' + "Total <span class='centerPadding'>" + total_completed+ '/' + 
			total_levels + '</span>' + ("0" + Math.floor(total_time/60)).slice(-2) + ':' + ("0"+Math.floor(total_time%60)).slice(-2)+'</a><br>';
	var raHigh = parseInt(eval("localStorage.XRa"));

	highscore_doc.innerHTML += "<br><br><br>"
	highscore_doc.innerHTML += '<a class="highscoreEntry">' + "Highest score for Freestyle: " + raHigh +'</a><br>';

	if (raHigh > 0) {
		highscore_doc.innerHTML += RandomMode.skillLookup(raHigh)
	}

	highscore_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="showElementAndHideNav(confirmationPage)">Clear Record</a><br>';
	highscore_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="showElementAndHideNav(menu_doc)">Main Menu</a><br>';
}

function initLights(sceneToAdd, hasShadow) {
	// Lights
	var ambientLight = new THREE.AmbientLight( 0x3c3c3c );
	sceneToAdd.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
	directionalLight.intensity = 0.8;
	sceneToAdd.add( directionalLight );

	directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( -1, 0.75, -0.5 ).normalize();
	directionalLight.intensity = 0.8;
	sceneToAdd.add( directionalLight );

	if (hasShadow) {
		var shadowLight = new THREE.DirectionalLight( 0xffffff );
		shadowLight.position.set( 0, 1, 0 ).normalize();
		shadowLight.castShadow = true;
		shadowLight.shadowCameraNear = -1000;
		shadowLight.shadowCameraFar = 10;
		shadowLight.onlyShadow = true;
		sceneToAdd.add( shadowLight );
	}
}
