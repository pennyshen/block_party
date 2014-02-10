
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

    switch( event.keyCode ) {
        case 49: // NUMBER 1
            rotate( "yaw" );
            rotated = true;
            break;
        case 50: // NUMBER 2
            rotate( "pitch" );
            rotated = true;
            break;
        case 51: // NUMBER 3
            rotate( "roll" );
            rotated = true;
            break;            
        case 16: 
            isShiftDown = true; 
            if (boundingBox) {
                boundingBox.visible = !boundingBox.visible;
            }
            break;
        case 17: isCtrlDown = true; break;
        case 187: isEqualsDown = true; break;
        case 189: isDashDown = true; break;
        case 76: change_to_level(); break;//the "l" key
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
            break;
        case 32: 
            isSpaceDown = true; 
            add_voxel();
            break;
    }

    if ( rotated ) {
        newPos = rollOverMesh.position.clone();

        while (!BlockGenerator.isPosLegal(newPos)) {
            if (pos_illegal_code == 2) {
                moveIntoBounds(newPos);
                rollOverMesh.position = newPos;    
            } else {
                console.log("wahh");
                newPos.y += STEP_SIZE;
            }
        }
        rollOverMesh.position = newPos;
    }

    // check if move is legal
    if (moved) {
        newPos = rollOverMesh.position.clone();
        newPos.add(toMove);
        newPos.y = STEP_SIZE / 2;

        while ( !BlockGenerator.isPosLegal(newPos) ) {
            // if it's the boundary, just don't let the player move it
            if (pos_illegal_code == 2) {
                collisionNoise.load();
                collisionNoise.play(); 
                return;
            }
            newPos.y += STEP_SIZE;
        }
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
function rotate( direction ) {
    if ( direction == "yaw" ) {
        BlockGenerator.rotate( 0, 90, 0 );
    }
    if ( direction == "pitch" ) {
        BlockGenerator.rotate( 90, 0, 0 );
    }
    if ( direction == "roll" ) {
        BlockGenerator.rotate( 0, 0, 90 );
    }
}

function change_to_level(){
    if(level_mode==true)
        return;
    game_mode.innerHTML = "Level 1";
    
    change_rollOver(level_1[0]);

    level_mode = true;
    //populates the selection button
    for(var i =0; i<level_1.length;i++){
        var option = document.createElement("option");
        option.text = level_1[i];
        avail_blocks.add(option);
    }
    nextPiece_doc.innerHTML = '';
}

function change_rollOver(shape){
    block = BlockGenerator.generate(shape);
    var oldPos = rollOverMesh.position.clone();
    scene.remove(rollOverMesh);
    rollOverMesh = block.mesh;

    moveBackward(gameBoardOrientation, oldPos);
    while (!BlockGenerator.isPosLegal(oldPos)) {
        if (pos_illegal_code == 1) {
            moveBackward(gameBoardOrientation, oldPos);
        } else if (pos_illegal_code == 2) {
            break;
        }
    }

    // on the edge already. first move back until we're okay then move up until we're okay
    if (pos_illegal_code == 2) {
        moveForward(gameBoardOrientation, oldPos);
        while (!BlockGenerator.isPosLegal(oldPos)) {
            if (pos_illegal_code == 1) {
                oldPos.y += STEP_SIZE;
            } else if (pos_illegal_code == 2) {
                moveForward(gameBoardOrientation, oldPos);
            }
        }
    }

    rollOverMesh.position.x = oldPos.x;
    rollOverMesh.position.y = oldPos.y;
    rollOverMesh.position.z = oldPos.z;
    scene.add(rollOverMesh);

}

function add_voxel( ) {
    var voxel = rollOverMesh;
    var oldPos = voxel.position.clone();
    oldPos.y = STEP_SIZE / 2;

    // places rollover block down and make it static
    voxel.material.opacity = 1.0;
    voxel.material.transparent = false;
    voxel.matrixAutoUpdate = false;
    voxel.geometry.verticesNeedUpdate = true;
    voxel.castShadow = false;
    voxel.updateMatrix();

    // update all blocks
    BlockGenerator.addToExisting(voxel.position);
    volume_doc.innerHTML = BlockGenerator.totalVolume; 

    blockNoise.load();
    blockNoise.play();

    // add new block to block_list
    block_list.push(voxel);

    // calculate new bounding box
    getBoundingBox();

    //check to see if level mode
    if(level_mode){
        avail_blocks.remove(avail_blocks.selectedIndex);
        if(avail_blocks.length==0){
            endLevel();
            return;
        }
        nextPiece = avail_blocks[avail_blocks.selectedIndex].innerHTML;
    }
   
    // create new block and use that new block as rollover
    block = BlockGenerator.generate(nextPiece);
    rollOverMesh = block.mesh;

    if(!level_mode){
        nextPiece = getRandomMember(BlockGenerator.allShapes);
        nextPiece_doc.innerHTML = nextPiece;
    }
    
    // placement of the new block - first move towards user's perspective until we can't move anymore
    moveBackward(gameBoardOrientation, oldPos);
    while (!BlockGenerator.isPosLegal(oldPos)) {
        if (pos_illegal_code == 1) {
            moveBackward(gameBoardOrientation, oldPos);
        } else if (pos_illegal_code == 2) {
            break;
        }
    }

    // on the edge already. first move back until we're okay then move up until we're okay
    if (pos_illegal_code == 2) {
        moveForward(gameBoardOrientation, oldPos);
        while (!BlockGenerator.isPosLegal(oldPos)) {
            if (pos_illegal_code == 1) {
                oldPos.y += STEP_SIZE;
            } else if (pos_illegal_code == 2) {
                moveForward(gameBoardOrientation, oldPos);
            }
        }
    }

    rollOverMesh.position.x = oldPos.x;
    rollOverMesh.position.y = oldPos.y;
    rollOverMesh.position.z = oldPos.z;
    scene.add( rollOverMesh );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    console.log(window.innerWidth / window.innerHeight);
    backgroundCamera.aspect = window.innerWidth / window.innerHeight;
    backgroundCamera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}