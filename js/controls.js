
var CAMERA_MOVE_LENGTH = 2;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    backgroundCamera.aspect = window.innerWidth / window.innerHeight;
    backgroundCamera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    
    if (gameInProgress) {
        if (INTERSECTED) {
            if (INTERSECTED.id != rollOverMesh.id) {
                // only update if it's a different block from the one we're on right now
                startMovingBlock(INTERSECTED);
                
            }
            controls.enabled = false;
            MOVINGPIECE = true;
        }
        if (MOVING || MOVINGMAIN) {
            controls.enabled = false;
            MOVINGPIECE = true;
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        mouseDown = true;        
    }
}

function onDocumentMouseUp( event ) {
    event.preventDefault();
    mouseDown = false;
    SELECTED = false;
    MOVINGPIECE = null;
    controls.enabled = true;
    controls.resetState();
    if (gameInProgress) {
        if (game.mode != Game.MODE_RANDOM) {
            game.checkSuccess();
        }

        INTERSECTED = null;
        intersectToHighlight();
    }
    document.removeEventListener('mouseup', onDocumentMouseUp, false);

    // console.log(mouseDown);
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    if (MOVINGPIECE) {
        dragPiece();
    }


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
    var noLegalSpot;

    switch( event.keyCode ) {
        case 49: // NUMBER 1
            rotate( gameBoardOrientation, "yaw" );
            rotated = true;
            break;
        case 50: // NUMBER 2
            rotate( gameBoardOrientation, "pitch" );
            rotated = true;
            break;
        // case 51: // NUMBER 3
        //     rotate( gameBoardOrientation, "roll" );
        //     rotated = true;    
        //     break;      
        case 16: 
            isShiftDown = true; 
            if (game.boundingBox) {
                game.boundingBox.visible = !game.boundingBox.visible;
            }
            break;
        case 17: isCtrlDown = true; break;
        case 187: isEqualsDown = true; break;
        case 189: isDashDown = true; break;
        
        case 37:    // left arrow
        case 65: 
            aDown = true;  
            moveLeft(gameBoardOrientation, toMove);
            moved = true;
            break;
        
        case 38:    // up arrow
        case 87: 
            wDown = true;
            moveForward(gameBoardOrientation, toMove);
            moved = true;
            break;

        case 40:    // down arrow
        case 83: 
            sDown = true;
            moveBackward(gameBoardOrientation, toMove);
            moved = true;
            break;

        case 39:    // right arrow
        case 68: 
            dDown = true;
            moveRight(gameBoardOrientation, toMove);
            moved = true;
            break;
        // case 82: 
        //     rDown = true;
        //     toMove.y += STEP_SIZE;
        //     climbed = 1;
        //     break;
        // case 70: 
        //     fDown = true;
        //     climbed = -1;
        //     break;
        case 37: 
            isLeftDown = true;
            break;
        case 32: 
            isSpaceDown = true; 
            if (game.mode != Game.MODE_RANDOM) {
                // move the next block
                for (var i = 0; i < game.existingBlocks.length; i++) {
                    if (game.canMoveBlock(game.existingBlocks[i])) {
                        startMovingBlock(game.existingBlocks[i].mesh);
                        break;
                    }
                }
            } else {
                add_voxel();    
            }
            break;
        case 27:    // esc
            pauseGame()
            break;
    }

    // TODO: remove this at the end
    if (makingLevels) {
        if (climbed) {
            rollOverMesh.position.add(toMove);
            return;
        }        
    }


    if ( rotated || moved ) {
        newPos = rollOverMesh.position.clone();

        if (moved) {
            newPos.add(toMove);
        } 

        moveToLegal(game.currentBlock, newPos);
        setPosition(newPos, rollOverMesh.position);
    } 

    if ( climbed == 1) {
        console.log("climbing");
        newPos = rollOverMesh.position.clone();

        climbToLegal(game.currentBlock, newPos);
        if (!climbedTooFar) {
           setPosition(newPos, rollOverMesh.position);
        } else if (climbedTooFar) {
            alert("cannot move in that direction");
        }


    }
    if (climbed == -1) {
        console.log("falling");
        newPos = rollOverMesh.position.clone();
        fallToLegal(game.currentBlock,newPos,noLegalSpot);
        if (!noLegalSpot) {
            setPosition(newPos, rollOverMesh.position);
        }
        else if (noLegalSpot) {
            alert("cannot move in that direction");
        }
        
    }

    if ( rotated || moved || climbed) {
        if (toCheckGoal) {
            game.checkGoal(moved, rotated, false);
        }  

        // check if the intersected block can still be moved
        if (game.mode == Game.MODE_LEVEL) {
            intersectToHighlight();
            game.checkSuccess();
        }
        if (game.mode == Game.MODE_TUTORIAL) {
            game.checkSuccess();
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

// directions: "pitch", "yaw", "roll"
function rotate( camera_axis, direction ) {
    if ( direction == "yaw" ) {
        game.currentBlock.rotateAroundWorldAxis("y", 90);  
    }

    if ( direction == "pitch" ) {
        switch ( camera_axis ) {
            case 1: game.currentBlock.rotateAroundWorldAxis("z",90); break;
            case 2: game.currentBlock.rotateAroundWorldAxis("x",90); break;
            case 3: game.currentBlock.rotateAroundWorldAxis("x",90); break;
            case 4: game.currentBlock.rotateAroundWorldAxis("z",90); break;
        }  
    }
    if ( direction == "roll" ) {
        switch ( camera_axis ) {
            case 1: game.currentBlock.rotateAroundWorldAxis("z",-90); break;
            case 2: game.currentBlock.rotateAroundWorldAxis("x",-90); break;
            case 3: game.currentBlock.rotateAroundWorldAxis("x",-90); break;
            case 4: game.currentBlock.rotateAroundWorldAxis("z",-90); break;
        }  
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
            console.log("ran into floor");
            break;
        }
        newPos.y += STEP_SIZE;
    }
    if (pos_illegal_code == 1 || pos_illegal_code == 2) {
        climbedTooFar = true;
    }
}

function fallToLegal(block,newPos,flag) {
    while (block.isPosLegal(newPos)) {
        newPos.y -= STEP_SIZE;

    }
    
    if (pos_illegal_code == 2) {
        newPos.y += STEP_SIZE
    }
    else {
        fallToLegalAgain(block,newPos,flag);
    }
}

function fallToLegalAgain (block, newPos,flag) {
    console.log(block.isPosLegal(newPos));
    if (block.isPosLegal(newPos)) {
        return;
    }
    while(!block.isPosLegal(newPos)) {
        if (pos_illegal_code == 2) {
            console.log("no legal spots");
            var reGrow = true;
            break;
        }
        newPos.y -= STEP_SIZE;
    }
    console.log("regrow",reGrow);
    if (reGrow) {
        while(!block.isPosLegal(newPos)) {
            newPos.y += STEP_SIZE;
        }
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
   
    if (toCheckGoal) {
        game.checkGoal(false, false, true);
    }
   
    // create new block and use that new block as rollover
    game.getNextBlock();

    if (game.currentBlock == null) {
        return;
    }

    rollOverMesh = game.currentBlock.mesh;

    rollOverMesh.position.x = oldPos.x;
    rollOverMesh.position.y = oldPos.y;
    rollOverMesh.position.z = oldPos.z;

    moveTowardsPlayer(rollOverMesh.position);

    scene.add( rollOverMesh );
}

