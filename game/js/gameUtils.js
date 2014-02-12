
function backToMenu() {
	game.clearScene();
	game = null;
	// camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
	// camera.lookAt(new THREE.Vector3(0, 0, 0));
	showElement(menu_doc);
}

function moveIntoBounds(pos) {
	var axes = ['x', 'y', 'z'];
	var numUnits = FLOOR_SIZE_HALF / STEP_SIZE;
	var axis;

	while (!BlockGenerator.isPosLegal(pos)) {
		if (pos_illegal_code != 2) {
			return;
		}

		for (var i = 0; i < axes.length; i++) {
			axis = axes[i];
			if (pos[axis] < 0) {
				pos[axis] += STEP_SIZE;
			} else if (pos[axis] >= numUnits) {
				pos[axis] -= STEP_SIZE;
			}
		}

	}
}

function startGame(gameMode) {
	hideAllNav(menu_doc);

	// reset camera position and orbit controls
	camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
	controls.center.set(0,0,0);

	if (gameMode == "level") {
		hideElement(showNextPiece_doc);
		game = new LevelMode(0);
	} else if (gameMode == "random") {
		hideElement(avail_blocks);
		game = new RandomMode();
	}

	gameInProgress = true;

	rollOverMesh = game.currentBlock.mesh;

	scene.add( rollOverMesh );
	rollOverMesh.position.x = STEP_SIZE / 2; 
	rollOverMesh.position.y = STEP_SIZE / 2; 
	rollOverMesh.position.z = STEP_SIZE / 2;
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
	return Math.floor(Math.random()*max) + min;
}

// get random array member
function getRandomMember(array) {
	return array[getRandomInteger(0, array.length)];
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


//handler for change in block selection list
function selectChange(select) {
	game.switchBlock(select.selectedIndex);
	// var selectedOption = select.options[select.selectedIndex];
	// change_rollOver(selectedOption.innerHTML);

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
