
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