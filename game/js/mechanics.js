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

	voxelPosition.x = Math.floor( voxelPosition.x / 50 ) * 50 + 25;
	voxelPosition.y = Math.floor( voxelPosition.y / 50 ) * 50 + 25;
	voxelPosition.z = Math.floor( voxelPosition.z / 50 ) * 50 + 25;
}

//check for intersection
function hasCollision(){
	var Player = rollOverMesh;
	for (var vertexIndex = 0; vertexIndex < Player.geometry.vertices.length; vertexIndex++){       
		var localVertex = Player.geometry.vertices[vertexIndex].clone();
		//var globalVertex = Player.matrix.multiplyVector3(localVertex);
		var globalVertex = localVertex.applyMatrix4(rollOverMesh.matrix);
		var directionVector = globalVertex.sub( Player.position );

		var ray = new THREE.Raycaster( Player.position, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( block_list );
		if ( collisionResults.length > 0 && collisionResults[0].distance +0.000001< directionVector.length() ) 
		{
			console.log("collision");
			return true;
		}
	}
	return false;
}