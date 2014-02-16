
var CAMERA_MOVE_LENGTH = 2;


function onDocumentMouseMove( event ) {
    event.preventDefault();


    mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentKeyDown( event ) {
    if (!gameInProgress) {
        return;
    }

    var toMove = new THREE.Vector3(0, 0, 0);
    var moved = false;
    var newPos;
    var rotated = false;
    var climbed = 0;
    var climbedTooFar = false;
    switch( event.keyCode ) {
        case 49: // NUMBER 1
            rotate( gameBoardOrientation, "yaw" );
            rotated = true;
            break;
        case 50: // NUMBER 2
            rotate( gameBoardOrientation, "pitch" );
            rotated = true;
            break;
        case 51: // NUMBER 3
            rotate( gameBoardOrientation, "roll" );
            rotated = true;    
            break;      
        case 16: 
            isShiftDown = true; 
            if (game.boundingBox) {
                game.boundingBox.visible = !game.boundingBox.visible;
            }
            break;
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
        case 82: 
            rDown = true;
            toMove.y += STEP_SIZE;
            climbed = 1;
            break;
        case 70: 
            fDown = true;
            toMove.y -= STEP_SIZE;
            climbed = -1;
            break;
        case 37: 
            isLeftDown = true;
            break;
        case 32: 
            isSpaceDown = true; 
            add_voxel();
            break;
        case 27:    // esc
            gameInProgress = false;
            showElement(pauseScreen_doc);
            break;
    }

    // // !! only for building levels!!
    // if (climbed) {
    //     rollOverMesh.position.add(toMove);
    //     return;
    // }

    if ( rotated || moved ) {
        newPos = rollOverMesh.position.clone();

        if (moved) {
            newPos.add(toMove);
        } 

        moveToLegal(game.currentBlock, newPos);
        rollOverMesh.position = newPos;
        return;
    } 

    if ( climbed == 1) {
        console.log("climbing");
        newPos = rollOverMesh.position.clone();

        climbToLegal(game.currentBlock, newPos);
        if (!climbedTooFar) {
           rollOverMesh.position = newPos;
        
        } else if (climbedTooFar) {
            alert("cannot move in that direction");
        }


    }
    if (climbed == -1) {
        console.log("falling");
        newPos = rollOverMesh.position.clone();
        fallToLegal(game.currentBlock,newPos);
        rollOverMesh.position = newPos;

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

// directions: "pitch", "yaw", "roll"
function rotate( axis, direction ) {
    if ( direction == "yaw" ) {
        game.currentBlock.rotate( 0, 90, 0 );
    }
    if ( direction == "pitch" ) {
        game.currentBlock.rotate( 0, 0, 90 ); 
        // switch ( axis ) {
        //     case 1: game.currentBlock.rotate(0,0,90); break;
        //     case 2: game.currentBlock.rotate(90,0,0); break;
        //     case 3: game.currentBlock.rotate(90,0,0); break;
        //     case 4: game.currentBlock.rotate(0,0,90); break;
        // }  
    }
    if ( direction == "roll" ) {
        game.currentBlock.rotate( 90, 0, 0 );
        // switch ( axis ) {
        //     case 1: game.currentBlock.rotate(0,0,-90); break;
        //     case 2: game.currentBlock.rotate(-90,0,0); break;
        //     case 3: game.currentBlock.rotate(-90,0,0); break;
        //     case 4: game.currentBlock.rotate(0,0,-90); break;
        // }
    }

}
//assumes that you are in an illegal position
function moveToLegal(block, newPos) {
    while (!block.isPosLegal(newPos)) {
        if (pos_illegal_code == 1) {
            // move up until we're legal
            newPos.y += STEP_SIZE;
        } else if (pos_illegal_code == 2) {
            // make sure we're in bounds
            block.moveIntoBounds(newPos);
        }
    }

    // then make sure we're stuck to the ground
    while(game.currentBlock.isPosLegal(newPos)) {
        newPos.y -= STEP_SIZE;
    }
    newPos.y += STEP_SIZE;
}

function climbToLegal(block, newPos) {
    while (block.isPosLegal(newPos)) {
        // move up until illegal
        newPos.y += STEP_SIZE;
        if (Math.abs(block.mesh.position.y - newPos.y) > 200) {
            climbedTooFar = true;
            while(block.isPosLegal(newPos)) {
                newPos.y -= STEP_SIZE;
            }
            newPos.y += STEP_SIZE;
            return;
        }
    }
    climbToLegalAgain(block,newPos);
    if (pos_illegal_code == 1 || pos_illegal_code == 2) {
        climbedTooFar = true;
    } 



}
function climbToLegalAgain(block, newPos) {
    if (block.isPosLegal(newPos)) {
        return;
    }
    while (!block.isPosLegal(newPos)) {
        if (pos_illegal_code == 2) {
            console.log("here this now");
            break;
        }
        newPos.y += STEP_SIZE;
    }
    if (pos_illegal_code == 1 || pos_illegal_code == 2) {
        climbedTooFar = true;
    }
}

function fallToLegal(block,newPos) {

    {
        while (block.isPosLegal(newPos)) {
            newPos.y -= STEP_SIZE;
            }
    }
    if (pos_illegal_code == 2) {
        newPos.y += STEP_SIZE
    }
    else {
        fallToLegalAgain(block,newPos);
    }
}

function fallToLegalAgain (block, newPos) {
    if (block.isPosLegal(newPos)) {
        return;
    }
    while(!block.isPosLegal(newPos)) {
        newPos.y -= STEP_SIZE;
    }
}

function moveTowardsPlayer(oldPos) {
    // placement of the new block - first move towards user's perspective until we can't move anymore
    while (!game.currentBlock.isPosLegal(oldPos)) {
        if (pos_illegal_code == 1) {
            moveBackward(gameBoardOrientation, oldPos);
        } else if (pos_illegal_code == 2) {
            break;
        }
    }

    moveToLegal(game.currentBlock, oldPos);
}

function add_voxel( ) {
    var voxel = rollOverMesh;
    var oldPos = voxel.position.clone();

    // places rollover block down and make it static
    game.currentBlock.makeStatic();

    // update all blocks
    game.addToExisting(game.currentBlock, voxel.position);
    volume_doc.innerHTML = game.totalVolume; 

    blockNoise.load();
    blockNoise.play();
   
    // create new block and use that new block as rollover
    game.getNextBlock();
    rollOverMesh = game.currentBlock.mesh;

    rollOverMesh.position.x += oldPos.x;
    rollOverMesh.position.y += oldPos.y;
    rollOverMesh.position.z += oldPos.z;

    moveTowardsPlayer(rollOverMesh.position);

    scene.add( rollOverMesh );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    backgroundCamera.aspect = window.innerWidth / window.innerHeight;
    backgroundCamera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}