
var CAMERA_MOVE_LENGTH = 2;

function move() {
    if ( isShiftDown ) {
        theta += mouse2D.x * 1.5;
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
        moveLeft(gameBoardOrientation);
        
        // camera.position.x -= 50;
        break;

        case 87: wDown = true;
        //TODO w 
        moveForward(gameBoardOrientation);
        // camera.position.z -= 50;
        break;
        case 83: sDown = true;
        //TODO s
        moveBackward(gameBoardOrientation);
        // camera.position.z += 50;
        break;
        case 81: qDown = true;
        rollOverMesh.position.y += STEP_SIZE;
        break;


        case 68: dDown = true;
        //TODO d
        moveRight(gameBoardOrientation);
        
        // camera.position.x += 50; break;
        //TODO WDS, and camera following the rolloverMesh
        break;

        case 69: eDown = true;
        if (rollOverMesh.position.y >= STEP_SIZE) {
            rollOverMesh.position.y -= STEP_SIZE;
        }
        break;
        
        case 37: isLeftDown = true;
        controls.rotateLeft(Math.PI/2);

        case 32: isSpaceDown = true; 
        add_voxel();
        break;

}
}

function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; break;
        case 17: isCtrlDown = false; break;
        case 187: isEqualsDown = false; break;
        case 189: isDashDown = false; break;
        case 65: aDown = false; break;
        case 87: wDown = false; break;
        case 83: sDown = false; break;
        case 68: dDown = false; break;
        case 32: isSpaceDown = false; break;
    }
}

function moveLeft( axis ) {
    switch ( axis ) {
        case 1: rollOverMesh.position.x -= STEP_SIZE; break;
        case 2: rollOverMesh.position.z -= STEP_SIZE; break;
        case 3: rollOverMesh.position.z += STEP_SIZE; break;
        case 4: rollOverMesh.position.x += STEP_SIZE; break;
    }
}

function moveRight( axis ) {
    switch ( axis ) {
        case 1: rollOverMesh.position.x += STEP_SIZE; break;
        case 2: rollOverMesh.position.z += STEP_SIZE; break;
        case 3: rollOverMesh.position.z -= STEP_SIZE; break;
        case 4: rollOverMesh.position.x -= STEP_SIZE; break;
    }    
}

function moveForward( axis ) {
    switch ( axis ) {
        case 1: rollOverMesh.position.z -= STEP_SIZE; break;
        case 2: rollOverMesh.position.x += STEP_SIZE; break;
        case 3: rollOverMesh.position.x -= STEP_SIZE; break;
        case 4: rollOverMesh.position.z += STEP_SIZE; break;
    }  
}

function moveBackward( axis ) {
    switch ( axis ) {
        case 1: rollOverMesh.position.z += STEP_SIZE; break;
        case 2: rollOverMesh.position.x -= STEP_SIZE; break;
        case 3: rollOverMesh.position.x += STEP_SIZE; break;
        case 4: rollOverMesh.position.z -= STEP_SIZE; break;
    }
}

function add_voxel( ) {
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

            
            // scorekeeping
            volume_used += ( BlockGenerator.volume );
            volume_doc.innerHTML = volume_used; 

            // create new block and use that new block as rollover
            rollOverMesh = BlockGenerator.getRandomBlock();

            // rollOverMesh.position.copy( voxelPosition );
            rollOverMesh.position.x = STEP_SIZE/2, rollOverMesh.position.y = STEP_SIZE/2, rollOverMesh.position.z = STEP_SIZE/2;
            scene.add( rollOverMesh );

            blockNoise.load();
            blockNoise.play();

            // add new block to block_list
            block_list.push(voxel);

        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}