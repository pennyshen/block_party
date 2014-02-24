
function LevelMode(toPopulateMenu) {
	Game.call( this );

	if (toPopulateMenu) {
		this.levels = [
			new Level(['two_blocks', 'two_blocks',
				'two_blocks', 'two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks'
				,'two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks'
				,'two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks','two_blocks'
				], 80, '', '', '', [1,1,1]),
			new Level(['L', 'lightning', 'L'], 80, '', '', '',[4,1,3]),
			new Level(['lightning', 'short_T', 'L', 'two_blocks', 'short_T'], 80, '','', '', [3,2,3]),
			new Level(["cross_block", "lightning", "straight3", "two_blocks", "short_T", "straight3", "lightning", "two_blocks"], 80, '', '', '', [3,3,3]),
			new Level(["L", "short_T", "short_T", "straight3", "lightning", "two_blocks", "L", "two_blocks"], 80, '','','', [3,3,3]),
			new Level(["lightning", "lightning", "lightning", "lightning", "two_blocks"], 80, '', '', '', [3,3,2])
		];
		this.mode = "level";
		this.titleText = "Level Mode"
		this.objectiveText = "Use given pieces to fill the red box!"
	}

	// set up for block preview
	this.previewScene = new THREE.Scene();
	this.previewCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	this.previewCamera.position.set(1000, 0, 0);
	this.previewCamera.lookAt(new THREE.Vector3(0, 0, 0));
	this.previewScene.add( this.previewCamera );

	this.previewControls = new THREE.OrbitControls( this.previewCamera , renderer.domElement );
	this.previewControls.rotateSpeed = 0.5;
	this.previewControls.minPolarAngle = 0.0;
	this.previewControls.maxPolarAngle = Math.PI * 4 / 9;
	this.previewControls.noZoom = true;
	this.previewControls.noPan = true;
	this.previewScene.add( this.previewControls );
	this.previewControls.enabled = false;	

	var light = new THREE.DirectionalLight( 0xffffff, 2 );
	light.position.set( 1, 1, 1 ).normalize();
	this.previewScene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( -1, -1, -1 ).normalize();
	this.previewScene.add( light );

	// projector and raycastor for block preview
	this.projector = new THREE.Projector();
	this.raycaster = new THREE.Raycaster();

	this.INTERSECTED = null;

	this.showingPreview = false;

	this.previewBlocks = [];

	this.showLevelMenu();
}

LevelMode.prototype = Object.create(Game.prototype);

LevelMode.prototype.showLevelMenu = function() {
	levelModeMenu_doc.innerHTML = "<h1>" + this.titleText + "</h1><br>";
	levelModeMenu_doc.innerHTML += "<p id='helperText'>" + this.objectiveText + "</p>";
	for (var i = 0; i < this.levels.length; i++) {
		levelModeMenu_doc.innerHTML += '<a href="javascript: void(0)" class="menuItem" onClick="game.startLevel(' + i + ')">' + (i+1) + '</a><br>';
	}
	levelModeMenu_doc.innerHTML += '<br><br><a href="javascript: void(0)" class="menuItem" onClick="showElementAndHideNav(menu_doc)" style="margin-bottom:50px">Back</a>';

	showElementAndHideNav(levelModeMenu);
}

LevelMode.prototype.showLevel = function() {
	hideAllNav();
	hideAllInfo();
	showElement(avail_blocks);
	if (this.mode == "tutorial") {
		showElement(hint_doc);
		if (center_tooltip_doc.innerHTML != '') {
			showElement(center_tooltip_doc);
		}		
	}
	startGame();
}

LevelMode.prototype.findIntersected = function() {
	var vector = new THREE.Vector3( mouse2D.x, mouse2D.y, 1 );
	this.projector.unprojectVector( vector, this.previewCamera );

	this.raycaster.set( this.previewCamera.position, vector.sub( this.previewCamera.position ).normalize() );

	var intersects = this.raycaster.intersectObjects( this.previewScene.children );

	if ( intersects.length > 0 ) {

		if ( this.INTERSECTED != intersects[ 0 ].object ) {

			if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

			this.INTERSECTED = intersects[ 0 ].object;
			this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
			this.INTERSECTED.material.emissive.setHex( 0xff0000 );

		}

	} else {

		if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

		this.INTERSECTED = null;

	}	
}

LevelMode.prototype.startLevel = function(level) {
	this.level = level;
	this.levelBlocks = [];
	this.levelBlocks = this.levels[level].blocks.slice(0);
	this.toPass = this.levels[level].passRate;
	var gs = this.levels[level].goalShape;

	this.createGoalShape(gs[0],gs[1],gs[2]);

	this.showLevel();
} 

//create the goal shape using the given x, y, and z values position at the origin.
LevelMode.prototype.createGoalShape = function(x,y,z) {

	var x_adjusted = x * STEP_SIZE;
	var y_adjusted = y * STEP_SIZE;
	var z_adjusted = z * STEP_SIZE;
	var geom = new THREE.CubeGeometry(x_adjusted, y_adjusted, z_adjusted);
	this.goalShape = new THREE.Line( geo2line(geom), new THREE.LineBasicMaterial( { color: 0xFF0000 } ), THREE.LinePieces );
	this.goalShape.visible = true;
	if(x%2==1)
		this.goalShape.position.x += STEP_SIZE/2;
	this.goalShape.position.y += y_adjusted/2;
	if(z%2==1)
		this.goalShape.position.z +=STEP_SIZE/2;
	scene.add(this.goalShape);

}

LevelMode.prototype.showAvailable = function() {
	if (this.showingPreview) {
		// already showing preview. ignore
		return;
	}

	// showElement(selectBlockScreen_doc);
	gameInProgress = false;	// make everything pause for now
	controls.enabled = false;
	this.showingPreview = true;
	this.previewControls.enabled = true;
	this.previewBlocks = [];
	// this.previewCamera.position.set(1000, 0, 0);

	var block;
	var zPos = (this.levelBlocks.length * 200) / -2 + 100;

	for (var i = 0; i < this.levelBlocks.length; i++) {
		block = BlockGenerator.generate(this.levelBlocks[i]);
		block.mesh.position.z = zPos;
		block.mesh.castShadow	= false;
		block.mesh.receiveShadow = false;
		block.mesh.material.opacity = 1.0;
		block.mesh.depthWrite = false;
		block.mesh.depthTest = false;
		block.mesh.rotation.set(0, Math.PI/4, 0);
		this.previewScene.add(block.mesh);
		this.previewBlocks.push(block);
		zPos += 200;
	}

	avail_blocks.blur();

	if (toCheckGoal) {
		this.checkGoal(true, false, false);	// count this as move
	}
}

LevelMode.prototype.populateSelection = function() {
	// clear
	for (var i = avail_blocks.options.length - 1; i >= 0; i--) {
        avail_blocks.remove(i);
    }

	// populates the selection button
    for (var i = 0; i < this.levelBlocks.length; i++) {
        var option = document.createElement("option");
        option.text = this.levelBlocks[i];
        avail_blocks.add(option);
    }

    avail_blocks.blur();
}

LevelMode.prototype.switchBlock = function() {
	if (this.INTERSECTED == null) {
		return;
	}

	var index;
	var oldPos = this.currentBlock.mesh.position.clone();

	for (var i = 0; i < this.previewBlocks.length; i++) {
		if (this.INTERSECTED.id == this.previewBlocks[i].mesh.id) {
			index = i;
			break;
		}
	}

	// first push the current block back in and then remove it
	this.levelBlocks.push(this.currentBlock.shapeName);
	this.currentBlock.removeFromScene();

	this.currentBlock = BlockGenerator.generate(this.levelBlocks[index]);
	rollOverMesh = this.currentBlock.mesh;

	rollOverMesh.position.x += oldPos.x;
	rollOverMesh.position.y += oldPos.y;
	rollOverMesh.position.z += oldPos.z;

	moveTowardsPlayer(rollOverMesh.position);

	this.levelBlocks.splice( index, 1 );

	scene.add(this.currentBlock.mesh);

	// remove all preview blocks
	for (var i = 0; i < this.previewBlocks.length; i++) {
		this.previewBlocks[i].removeFromScene();
	}
	this.previewBlocks = null;

	gameInProgress = true;	// make everything pause for now
	controls.enabled = true;
	this.showingPreview = false;	
	this.previewControls.resetState();
	this.previewControls.enabled = false;
}

LevelMode.prototype.getNextBlock = function() {
	if (this.levelBlocks.length <= 0) {
		this.currentBlock = null;
		this.endGame();
		return;
	}

	if (this.lastColor) {
		this.lastColor = null;
	}

	var block;
	block = BlockGenerator.generate(this.levelBlocks[0]);
	this.currentAliveTime = 0;
	this.currentBlock = block;
	this.levelBlocks.splice( this.levelBlocks.indexOf(this.currentBlock.shapeName), 1 );
	piecesLeft_doc.innerHTML = game.levelBlocks.length;
	// this.populateSelection();
};

LevelMode.prototype.endGame = function() {
	// hideElement(container);
	gameInProgress = false;
	mainMusic.pause();
	showElement(endScreen_doc);

	var passOrFail = '';
	var nextLevel = '';
	var playAgain = '<a href="javascript: void(0)" class="menuItem" onClick="restartLevel()">Play again</a><br>'; 

	if (this.score >= this.toPass) {
		passOrFail = "PASSED!";
		if (this.level + 1 < this.levels.length) {
			nextLevel = '<a href="javascript: void(0)" class="menuItem" onClick="nextLevel()">Next level</a><br>'; 
		}		

		successSound.load();
		successSound.play();
	} else {
		passOrFail = "FAILED!";

		failSound.load();
		failSound.play();
	}

	endScreen_doc.innerHTML = '<h1>' + passOrFail + "</h1><br>"
		+ playAgain
		+ nextLevel
		+ backToMenu_string;
};
