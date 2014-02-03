
// TODO: make this into a singleton later??


// walls are squares for now
function Wall(wallSize) {
	this.wallSize = wallSize;
	this.initWall();
}

// static variables
Wall.LINE_MATERIAL = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
// Wall.PLANE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xD1D1D1});
Wall.PLANE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

Wall.prototype.initWall = function() {
	// init line
	var size = this.wallSize / 2.0;
	var geometry = new THREE.Geometry();
	for ( var i = - size; i <= size; i += STEP_SIZE ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

	}

	this.line = new THREE.Line( geometry, Wall.LINE_MATERIAL );
	this.line.type = THREE.LinePieces;

	// init plane
	this.plane = new THREE.Mesh( new THREE.PlaneGeometry( this.wallSize, this.wallSize ), Wall.PLANE_MATERIAL);
}

Wall.prototype.addToScene = function(scene) {
	this.plane.rotation.x = this.plane.rotation.x - Math.PI / 2;	// rotate plane so it matches the lines
	this.line.rotation.x = this.line.rotation.x - Math.PI;
	scene.add(this.line);
	scene.add(this.plane);

	this.plane.matrixAutoUpdate = false;
	this.plane.updateMatrix();
	this.line.matrixAutoUpdate = false;
	this.line.updateMatrix();	
}

Wall.prototype.rotateX = function(radians) {
	this.plane.rotation.x = radians;
	this.line.rotation.x = radians;
}

Wall.prototype.rotateY = function(radians) {
	this.plane.rotation.y = radians;
	this.line.rotation.y = radians;
}

Wall.prototype.rotateZ = function(radians) {
	this.plane.rotation.z = radians;
	this.line.rotation.z = radians;
}

Wall.prototype.translateX = function(toTranslate) {
	this.plane.translateX(toTranslate);
	this.line.translateX(toTranslate);
}

Wall.prototype.translateY = function(toTranslate) {
	this.plane.translateY(toTranslate);
	this.line.translateY(toTranslate);
}

Wall.prototype.translateZ = function(toTranslate) {
	this.plane.translateZ(toTranslate);
	this.line.translateZ(toTranslate);
}
