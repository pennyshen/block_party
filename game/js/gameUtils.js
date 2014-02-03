

function startGame() {
	blocker.style.display = "none";
	gameInProgress = true;

	// start with random block
	rollOverMesh = BlockGenerator.getRandomBlock();
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
	secondPoint.add(normal.clone().multiplyScalar(25));
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

//get show minimum bounding box
function getBoundingBox() {
	//goes through all the cubes and find the minimum and maximum x, y, z
	for (var i =0 ; i < block_list.length; i++) {
		var ver = block_list[i].geometry.vertices;
		for (var j = 0; j < ver.length; j++) {
			var pos = new THREE.Vector3();
			pos.addVectors(ver[j], block_list[i].position);

			min_x = Math.min(min_x, pos.x);
			min_y = Math.min(min_y, pos.y);
			min_z = Math.min(min_z, pos.z);

			max_x = Math.max(max_x, pos.x);
			max_y = Math.max(max_y, pos.y);
			max_z = Math.max(max_z, pos.z);
		}
	}

	// calcualtes the volume of the bounding box
	cube_vol = (max_x - min_x) * (max_y - min_y) * (max_z - min_z);
	score.innerHTML = '' + Math.round((BlockGenerator.totalVolume)/(cube_vol/Math.pow(STEP_SIZE,3) )*100)+ '%';
	
	scene.remove(boundingBox);

	var geom = new THREE.CubeGeometry(max_x - min_x, max_y - min_y, max_z - min_z);
	boundingBox = new THREE.Line( geo2line(geom), box_material, THREE.LinePieces );

	boundingBox.position.x = (max_x + min_x) / 2;
	boundingBox.position.y = (max_y + min_y) / 2;
	boundingBox.position.z = (max_z + min_z) / 2;

	boundingBox.visible = false;
	scene.add(boundingBox);
}
