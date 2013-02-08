enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	
	var files = [
		'img/call_button.png',
		'img/call_button_down.png',
		'img/house.png',
		'sound/se4.mp3',
		'img/left_button.png',
		'img/center_button.png',
		'img/right_button.png',
		'img/left_button_down.png',
		'img/center_button_down.png',
		'img/right_button_down.png',
		'img/wolf_body.png',
		'img/wolf_brow_left.png',
		'img/wolf_brow_right.png',
		'img/wolf_arm_left.png',
		'img/wolf_arm_right.png',
		'img/wolf_ear_left.png',
		'img/wolf_ear_right.png',
		'img/wolf_tail.png',
		'img/wolf_drool.png',
		'img/background.png'
	];
	for(var i = 0; i < files.length; i++) {
		game.preload(files[i]);
	}
	
	game.onload = function() {
		var background = new Sprite(game.width, game.height);
		background.image = game.assets['img/background.png'];
		game.rootScene.addChild(background);
		
		// 鳴き声ボタン
//		var callButton = new CallButton();
//		game.rootScene.addChild(callButton);
		
		// 家
		game.houses = {};
		game.houses.left = new House();
		game.houses.left.x = 0;
		game.houses.left.y = 150;
		game.rootScene.addChild(game.houses.left);
		
		game.houses.center = new House();
		game.houses.center.x = 250;
		game.houses.center.y = 150;
		game.rootScene.addChild(game.houses.center);
		
		game.houses.right = new House();
		game.houses.right.x = 500;
		game.houses.right.y = 150;
		game.rootScene.addChild(game.houses.right);
				
		// 位置ボタン
		var leftButton = new PositionButton('left');
		leftButton.x = 50;
		game.rootScene.addChild(leftButton);

		var centerButton = new PositionButton('center');
		centerButton.x = 200;
		game.rootScene.addChild(centerButton);
		
		var rightButton = new PositionButton('right');
		rightButton.x = 350;
		game.rootScene.addChild(rightButton);
		
		// 狼
		var wolf = new Wolf();
		game.rootScene.addChild(wolf);
	};
	game.start();
};