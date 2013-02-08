enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	game.start();
};

var Game = Class.create(Core, {
	state: null,
	
	initialize: function(width, height) {
		Core.call(this, width, height);
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
			'img/background.png',
			'img/pig.png'
		];
		for(var i = 0; i < files.length; i++) {
			this.preload(files[i]);
		}
	},
	
	onload: function() {
		var background = new Sprite(this.width, this.height);
		background.image = this.assets['img/background.png'];
		this.rootScene.addChild(background);

		this.state = new TitleState();
		this.state.enter();
	},
	
	changeState: function(state) {
		this.state = new state();
		this.state.enter();
	}
});

var TitleState = Class.create({
	enter: function() {
		this.exit();
	},
	
	exit: function() {
		game.changeState(SetPositionState);
	}
});

var SetPositionState = Class.create({
	_leftButton: null,
	_centerButton: null,
	_rightButton: null,
	selected: false,
	enter: function() {
		this.selected = false;
		
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
		leftButton.y = -leftButton.height;
		leftButton.tl.moveBy(0, leftButton.height, game.fps);
		game.rootScene.addChild(leftButton);
		this._leftButton = leftButton;

		var centerButton = new PositionButton('center');
		centerButton.x = 200;
		centerButton.y = -centerButton.height;
		centerButton.tl.moveBy(0, centerButton.height, game.fps);
		game.rootScene.addChild(centerButton);
		this._centerButton = centerButton;
		
		var rightButton = new PositionButton('right');
		rightButton.x = 350;
		rightButton.y = -rightButton.height;
		rightButton.tl.moveBy(0, rightButton.height, game.fps);
		game.rootScene.addChild(rightButton);
		this._rightButton = rightButton;
		
		// 狼
		var wolf = new Wolf();
		game.rootScene.addChild(wolf);
	},
	
	exit: function() {
		this._leftButton.tl.moveBy(0, -this._leftButton.height, game.fps);
		this._centerButton.tl.moveBy(0, -this._centerButton.height, game.fps);
		this._rightButton.tl.moveBy(0, -this._rightButton.height, game.fps);
		game.changeState(CheckPositionState);
	}
});

var CheckPositionState = Class.create({
	enter: function() {
		var callButton = new CallButton();
		game.rootScene.addChild(callButton);
	},
	
	exit: function() {
	
	}
});

var OpenState = Class.create({
	enter: function() {
	
	},
	
	exit: function() {
	
	}
});

var ResultState = Class.create({
	enter: function() {
	
	},
	
	exit: function() {
	
	}
});