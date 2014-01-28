
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

function onDocumentMouseDown( event ) {
    event.preventDefault();

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

function onDocumentKeyDown( event ) {
    switch( event.keyCode ) {
        case 16: isShiftDown = true; break;
        case 17: isCtrlDown = true; break;
        case 187: isEqualsDown = true; break;
        case 189: isDashDown = true; break;
    }
}

function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; break;
        case 17: isCtrlDown = false; break;
        case 187: isEqualsDown = false; break;
        case 189: isDashDown = false; break;
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function includePointerLockControls() {
  if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
        var element = document.body;

        var pointerlockchange = function ( event ) {
            if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                controls.enabled = true;
                blocker.style.display = 'none';
            } else {
                controls.enabled = false;

                blocker.style.display = '-webkit-box';
                blocker.style.display = '-moz-box';
                blocker.style.display = 'box';

                instructions.style.display = '';
            }
        }

        var pointerlockerror = function ( event ) {
            instructions.style.display = '';
        }

        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        instructions.addEventListener( 'click', function ( event ) {
            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            if ( /Firefox/i.test( navigator.userAgent ) ) {

                var fullscreenchange = function ( event ) {

                    if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                        document.removeEventListener( 'fullscreenchange', fullscreenchange );
                        document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                        element.requestPointerLock();
                    }

                }

                document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                element.requestFullscreen();

            } else {
                element.requestPointerLock();
            }

        }, false );

    } else {
        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
}