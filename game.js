enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	
	game.preload('img/call_button.png');
	game.preload('img/call_button_down.png');
	game.preload('img/house.png');
	game.preload('sound/se4.mp3');
	game.preload('img/left_button.png');
	game.preload('img/center_button.png');
	game.preload('img/right_button.png');
	game.preload('img/left_button_down.png');
	game.preload('img/center_button_down.png');
	game.preload('img/right_button_down.png');
	
	game.onload = function() {
		game.rootScene.backgroundColor = 'green';
		
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
	};
	game.start();
};