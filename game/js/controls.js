
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
    var toMove = new THREE.Vector3(0, 0, 0);
    var moved = false;
    var newPos;

    switch( event.keyCode ) {
        case 16: isShiftDown = true; break;
        case 17: isCtrlDown = true; break;
        case 187: isEqualsDown = true; break;
        case 189: isDashDown = true; break;
        case 65: 
            aDown = true;  
            moveLeft(gameBoardOrientation, toMove);
            moved = true;
            break;
        case 87: 
            wDown = true;
            moveForward(gameBoardOrientation, toMove);
            moved = true;
            break;
        case 83: 
            sDown = true;
            moveBackward(gameBoardOrientation, toMove);
            moved = true;
            break;
        case 68: 
            dDown = true;
            moveRight(gameBoardOrientation, toMove);
            moved = true;
            break;
        case 81: 
            qDown = true;
            toMove.y += STEP_SIZE;
            moved = true;
            break;
        case 69: 
            eDown = true;
            toMove.y -= STEP_SIZE;
            moved = true;
            break;
        case 37: 
            isLeftDown = true;
            //TODO rotation
            // controls.rotateLeft(Math.PI/2);
            break;
        case 32: 
            isSpaceDown = true; 
            add_voxel();
            break;
    }

    // check if move is legal
    if (moved) {
        newPos = rollOverMesh.position.clone();
        newPos.add(toMove);

        if (BlockGenerator.isPosLegal(newPos)) {
            rollOverMesh.position.add(toMove);
        } else {
            collisionNoise.load();
            collisionNoise.play();            
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
        case 87: wDown = false; break;
        case 83: sDown = false; break;
        case 68: dDown = false; break;
        case 32: isSpaceDown = false; break;
    }
}

function moveLeft( axis, position ) {
    switch ( axis ) {
        case 1: position.x -= STEP_SIZE; break;
        case 2: position.z -= STEP_SIZE; break;
        case 3: position.z += STEP_SIZE; break;
        case 4: position.x += STEP_SIZE; break;
    }
}

function moveRight( axis, position ) {
    switch ( axis ) {
        case 1: position.x += STEP_SIZE; break;
        case 2: position.z += STEP_SIZE; break;
        case 3: position.z -= STEP_SIZE; break;
        case 4: position.x -= STEP_SIZE; break;
    }    
}

function moveForward( axis, position ) {
    switch ( axis ) {
        case 1: position.z -= STEP_SIZE; break;
        case 2: position.x += STEP_SIZE; break;
        case 3: position.x -= STEP_SIZE; break;
        case 4: position.z += STEP_SIZE; break;
    }  
}

function moveBackward( axis, position ) {
    switch ( axis ) {
        case 1: position.z += STEP_SIZE; break;
        case 2: position.x -= STEP_SIZE; break;
        case 3: position.x += STEP_SIZE; break;
        case 4: position.z -= STEP_SIZE; break;
    }
}

function add_voxel( ) {
    // var intersects = raycaster.intersectObjects( block_list );

    // places rollover block down and make it static
    voxel = rollOverMesh;
    voxel.material.opacity = 1.0;
    voxel.matrixAutoUpdate = false;
    voxel.geometry.verticesNeedUpdate = true;
    voxel.updateMatrix();

    // update all blocks
    BlockGenerator.addToExisting(voxel.position);
    volume_doc.innerHTML = BlockGenerator.totalVolume; 

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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}