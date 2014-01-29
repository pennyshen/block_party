
var CAMERA_MOVE_LENGTH = 2;

function move() {
    if ( isShiftDown ) {
        theta += mouse2D.x * 1.5;
    }

    if ( isEqualsDown ) {
        if ( camera.position.y > 50 ) {
            camera.position.y -= CAMERA_MOVE_LENGTH;
        }
        if ( camera.position.z > 50 ) {
            camera.position.z -= CAMERA_MOVE_LENGTH;
        }
    }

    if ( isDashDown ) {
        if ( camera.position.y < 400 ) {
            camera.position.y += CAMERA_MOVE_LENGTH;
        }

        if (camera.position.z < 400 ) {
            camera.position.z += CAMERA_MOVE_LENGTH;
        }

    }
}


function onDocumentMouseMove( event ) {
    event.preventDefault();


    mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentKeyDown( event ) {
    switch( event.keyCode ) {
        case 16: isShiftDown = true; break;
        case 17: isCtrlDown = true; break;
        case 187: isEqualsDown = true; break;
        case 189: isDashDown = true; break;
        case 65: aDown = true;  
        rollOverMesh.position.x -= 50;
        camera.position.x -= 50; break;
        case 87: wDown = true;
        //TODO w 
        break;
        case 83: sDown = true;
        //TODO s
        break;
        case 68: dDown = true;
        //TODO d
        rollOverMesh.position.x += 50;
        camera.position.x += 50; break;
        //TODO WDS, and camera following the rolloverMesh
        break;


        case 32: isSpaceDown = true; 
        var intersects = raycaster.intersectObjects( scene.children );

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
            rollOverMesh = BlockGenerator.generate("square_flat");
            rollOverMesh.position.copy( voxelPosition );
            scene.add( rollOverMesh );

            blockNoise.load();
            blockNoise.play();

            //add new block to block_list
            block_list.push(voxel);
        }
    }

    }
}

function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; break;
        case 17: isCtrlDown = false; break;
        case 187: isEqualsDown = false; break;
        case 189: isDashDown = false; break;
        case 65: aDown = false; break;
        case 32: isSpaceDown = false; break;
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

