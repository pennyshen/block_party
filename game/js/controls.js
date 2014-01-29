
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
        case 65: 
            aDown = true;  
            rollOverMesh.position.x -= STEP_SIZE;
            camera.position.x -= STEP_SIZE; 
            break;
        case 87: wDown = true; break;
            //TODO w 
        case 83: sDown = true; break;
            //TODO s
        case 68: 
            //TODO d
            dDown = true;
            rollOverMesh.position.x += STEP_SIZE;
            camera.position.x += STEP_SIZE; 
            break;
            //TODO WDS, and camera following the rolloverMesh
        case 32: 
            isSpaceDown = true; 
            tryToPlaceBlock();
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

