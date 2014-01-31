
function tryToPlaceBlock() {
    var intersects = raycaster.intersectObjects( scene.children );
    var intersector;

    if ( intersects.length > 0 ) {
        intersector = getRealIntersector( intersects );

        // delete cube
        if ( isCtrlDown ) {
            if ( intersector.object != plane ) {
                scene.remove( intersector.object );
            }

        } else {
            //check if there is collision
            if (hasCollision()) {
                collisionNoise.load();
                collisionNoise.play();
                return;
            }

            intersector = getRealIntersector( intersects );
            setVoxelPosition(voxelPosition, intersector);

            // places rollover block down and make it static
            voxel = rollOverMesh;
            voxel.material.opacity = 1.0;
            voxel.matrixAutoUpdate = false;
            voxel.updateMatrix();

            // create new block and use that new block as rollover
            rollOverMesh = BlockGenerator.getRandomBlock();
            rollOverMesh.position.copy( voxelPosition );
            scene.add( rollOverMesh );

            // make sound
            blockNoise.load();
            blockNoise.play();

            //add new block to block_list
            block_list.push(voxel);
        }
    }	
}


function getRealIntersector( intersects ) {
	for( i = 0; i < intersects.length; i++ ) {
		intersector = intersects[ i ];
		if ( intersector.object != rollOverMesh ) {
			return intersector;
		}
	}

	return null;
}

function setVoxelPosition( voxelPosition, intersector ) {
	normalMatrix.getNormalMatrix( intersector.object.matrixWorld );

	if (intersector.face) {
		tmpVec.copy( intersector.face.normal );	
	}

	tmpVec.applyMatrix3( normalMatrix ).normalize();

	voxelPosition.addVectors( intersector.point, tmpVec );

	voxelPosition.x = lockPosition(voxelPosition.x);
	voxelPosition.y = lockPosition(voxelPosition.y);
	voxelPosition.z = lockPosition(voxelPosition.z);
}

function lockPosition(pos) {
	return Math.floor( pos / STEP_SIZE ) * STEP_SIZE + STEP_SIZE/2;
}

//check for intersection
function hasCollision() {
	var block = rollOverMesh;
    var face, block2, face2;
    var ray = new THREE.Raycaster();
    var collided;
    var sharedNormals;

    // console.log(block);
    // console.log("collided = ");
    // for (var i = 0; i < block.geometry.faces.length; i++) {
    //     face = block.geometry.faces[i];
    //     ray.set(face.centroid, face.normal.clone().normalize());
    //     collided = ray.intersectObjects( block_list );
    //     if (collided.length > 0) {
    //         console.log(collided);
    //         for (var j = 0; j < collided.length; j++) {
    //             block2 = collided[j].object.material.color.set(0x7F7C9C);
    //         }    
    //     }
    // }

 //    var Player = rollOverMesh;
	// for (var vertexIndex = 0; vertexIndex < Player.geometry.vertices.length; vertexIndex++){       
	// 	var localVertex = Player.geometry.vertices[vertexIndex].clone();
	// 	//var globalVertex = Player.matrix.multiplyVector3(localVertex);
	// 	var globalVertex = localVertex.applyMatrix4(rollOverMesh.matrix);
	// 	var directionVector = globalVertex.sub( Player.position );

	// 	var ray = new THREE.Raycaster( Player.position, directionVector.clone().normalize() );
	// 	var collisionResults = ray.intersectObjects( block_list );
 //        console.log(collisionResults);
	// 	if ( collisionResults.length > 0 && collisionResults[0].distance +0.000001< directionVector.length() ) 
	// 	{
	// 		console.log("collision");
	// 		return true;
	// 	}
	// }
	return false;
}