
function createRoom(scene) {
	var PLANE_SIZE = 1000;

	var floor = new Wall(PLANE_SIZE);
	floor.addToScene(scene);

	var wall1 = new Wall(PLANE_SIZE);
	wall1.rotateX(Math.PI / 2);
	wall1.translateY(-PLANE_SIZE/2.0);
	wall1.translateZ(-PLANE_SIZE/2.0);
	wall1.addToScene(scene);

	var wall2 = new Wall(PLANE_SIZE);
	wall2.rotateX(-Math.PI / 2);
	wall2.translateY(-PLANE_SIZE/2.0);
	wall2.translateZ(PLANE_SIZE/2.0);
	wall2.addToScene(scene);	


	// !! fix this later !!
	var wall3 = new Wall(PLANE_SIZE);
	wall3.plane.rotation.y = Math.PI/2;
	wall3.plane.translateY(PLANE_SIZE/2.0);
	wall3.plane.translateZ(-PLANE_SIZE/2.0);
	wall3.line.rotation.z = Math.PI/2;
	wall3.line.translateY(PLANE_SIZE/2.0);
	wall3.line.translateX(PLANE_SIZE/2.0);
	wall3.addToScene(scene);

	// !! fix this later !!
	var wall4 = new Wall(PLANE_SIZE);
	wall4.plane.rotation.y = -Math.PI/2;
	wall4.plane.translateY(PLANE_SIZE/2.0);
	wall4.plane.translateZ(-PLANE_SIZE/2.0);
	wall4.line.rotation.z = -Math.PI/2;
	wall4.line.translateY(PLANE_SIZE/2.0);
	wall4.line.translateX(-PLANE_SIZE/2.0);	
	wall4.addToScene(scene);



	var ceiling = new Wall(PLANE_SIZE);
	ceiling.rotateY(Math.PI);
	ceiling.translateY(PLANE_SIZE);
	ceiling.addToScene(scene);	

}
