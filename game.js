enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	game.start();
};

var Game = Class.create(Core, {
	state: null,
	pig: null,
	answer: '',
	wolf: null,
	
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
			'img/wolf_left_brow.png',
			'img/wolf_right_brow.png',
			'img/wolf_left_arm.png',
			'img/wolf_right_arm.png',
			'img/wolf_left_ear.png',
			'img/wolf_right_ear.png',
			'img/wolf_tail.png',
			'img/wolf_drool.png',
			'img/wolf_nose.png',
			'img/background.png',
			'img/mini_pig.png',
			'img/title_background.png',
			'img/pig_body.png',
			'img/pig_head.png',
			'img/pig_nose.png',
			'img/pig_eye.png',
			'img/pig_left_ear.png',
			'img/pig_right_ear.png',
			'img/pig_left_hand.png',
			'img/pig_right_hand.png',
			'img/pig_tail.png'
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
	_background: null,
	enter: function() {
	
		// 狼
		var wolf = new Wolf();
		game.rootScene.addChild(wolf);
		game.wolf = wolf;

		// 豚
		if(game.pig == null) {
			var pig = new Pig();
			game.currentScene.addChild(pig);
			game.pig = pig;
		}
	
		// タイトルロゴ
		var self = this;
		var background = new Sprite(743, 277);
		background.x = game.width / 2 - background.width / 2;
		background.y = game.height / 2 - background.height / 2;
		background.image = game.assets['img/title_background.png'];
		background.ontouchstart = function() {
			self.exit();
		};
		this._background = background;
		game.currentScene.addChild(this._background);
	},
	
	exit: function() {
		this._background.ontouchstart = function() {};
		this._background.tl.fadeTo(0, game.fps / 2).then(function() {
			game.currentScene.removeChild(this);
		});
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
		game.houses.left = new House('left');
		game.houses.left.x = 0;
		game.houses.left.y = game.height / 2 - game.houses.left.height / 2;
		game.rootScene.addChild(game.houses.left);
		
		game.houses.center = new House('center');
		game.houses.center.x = 250;
		game.houses.center.y = game.height / 2 - game.houses.center.height / 2;
		game.rootScene.addChild(game.houses.center);
		
		game.houses.right = new House('right');
		game.houses.right.x = 500;
		game.houses.right.y = game.height / 2 - game.houses.right.height / 2;
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
	},
	
	exit: function() {
		this._leftButton.tl.moveBy(0, -this._leftButton.height, game.fps);
		this._centerButton.tl.moveBy(0, -this._centerButton.height, game.fps);
		this._rightButton.tl.moveBy(0, -this._rightButton.height, game.fps);
		game.changeState(CheckPositionState);
	}
});

var CheckPositionState = Class.create({
	checkedCount: 0,
	_callButton: null,
	enter: function() {
		var callButton = new CallButton();
		game.rootScene.addChild(callButton);
		this._callButton = callButton;
		
		this.checkedCount = 0;
		this.startCheck();
	},
	
	startCheck: function() {
		for(var i = 0; i < 3; i++) {
			var direction = ['left', 'center', 'right'][i];
			game.houses[direction].checkable = true;
		}
	},
	
	checked: function() {
		this.checkedCount++;
		if(this.checkedCount >= config.checkLimit) {
			this.exit();
		}
	},
	
	exit: function() {
		for(var direction in game.houses) {
			game.houses[direction].checkable = false;
		}
		game.currentScene.removeChild(this._callButton);
		game.changeState(OpenState);
	}
});

var OpenState = Class.create({
	enter: function() {
		for(var direction in game.houses) {
			game.houses[direction].openable = true;
		}
	},
	
	hasOpend: function(answer) {
		game.answer = answer;
		for(var direction in game.houses) {
			game.houses[direction].openable = false;
		}
		this.exit();
	},
	
	exit: function() {
		game.changeState(ResultState);
	}
});

var ResultState = Class.create({
	enter: function() {
		if(game.answer == game.pig.direction) {
			console.log('オオカミの勝ち');
		} else {
			console.log('ブタの勝ち');
		}
		this.exit();
	},
	
	exit: function() {
		game.currentScene.tl.delay(game.fps * 2).then(function() {
			game.currentScene.removeChild(game.wolf);
			game.currentScene.removeChild(game.pig);
			for(var direction in game.houses) {
				game.currentScene.removeChild(game.houses[direction]);
			}
			game.changeState(TitleState);
		});
	}
});