enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	game.start();
};

/**
 * ゲーム管理クラス
 * Stateを切り替えながらゲームを進める
 * @class
 * @property {State} state 現在のステート
 * @property {Pig} pig 画面上の豚
 * @property {String} answer オオカミが選んだ家(left/center/right)
 * @property {Wolf} wolf 画面下のオオカミ
 * @property {Array} messages メッセージキュー。連続して出力したいメッセージをpushする。
 * game.messages.push({lines:['1行目', '2行目', '3行目'], from:'wolf'});
 */
var Game = Class.create(Core, {
	state: null,
	pig: null,
	answer: '',
	wolf: null,
	messages: [],
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf Game
	 * @param {数値} width ゲームの幅
	 * @param {数値} height ゲームの高さ
	 */
	initialize: function(width, height) {
		Core.call(this, width, height);
		this.loadingScene.backgroundColor = 'green';
		
		// ファイルのプリロード
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
			'img/pig_tail.png',
			'img/message_wolf.png',
			'img/message_pig.png',
			'img/message_both.png',
			'img/next.png'
		];
		for(var i = 0; i < files.length; i++) {
			this.preload(files[i]);
		}
	},
	
	/**
	 * ゲームの読み込みが完了した直後の処理
	 * @function
	 * @memberOf Game
	 */
	onload: function() {
		var background = new Sprite(this.width, this.height);
		background.image = this.assets['img/background.png'];
		this.rootScene.addChild(background);

		this.state = new TitleState();
		this.state.enter();
	},
	
	/**
	 * ゲームステートの切り替え
	 * @function
	 * @memberOf Game
	 */
	changeState: function(state) {
		this.state = new state();
		this.state.enter();
	},
	
	/**
	 * すべてのメッセージを順番に表示する
	 * @function
	 * @memberOf Game
	 */
	showMessages: function(callback) {
		// １組のメッセージを表示する
		var show = function(message, callback) {
			var lines = message.lines;
			var from = message.from;

			var group = new Group();
			
			// 吹き出し
			var balloon = new Sprite();
			if(from == 'wolf') {
				balloon.image = game.assets['img/message_wolf.png'];
			} else if(from == 'pig') {
				balloon.image = game.assets['img/message_pig.png'];
			} else {
				balloon.image = game.assets['img/message_both.png'];
			}
			balloon.width = balloon.image.width;
			balloon.height = balloon.image.height;
			balloon.opacity = 0;
			group.addChild(balloon);
			
			// メッセージを表示
			for(var i = 0; i < lines.length; i++) {
				var label = new Label();
				label.color = 'black';
				label.text = lines[i];
				label.font = '40px "ヒラギノ丸ゴ", "Hiragino Maru Gothic Pro", "メイリオ", Meiryo, sans-serif';
				label.x = 50;
				label.y = 100 + 75 * i;
				label.width = balloon.width - 50;
				label.height = balloon.height - 20;
				label.opacity = 0;
				group.addChild(label);
			}
			
			// 矢印
			var next = new Sprite();
			next.image = game.assets['img/next.png'];
			next.width = next.image.width;
			next.height = next.image.height;
			next.x = balloon.width - next.width - 10;
			next.y = balloon.height - next.height * 2 -10;
			next.tl.moveBy(0, -30, game.fps / 2, CUBIC_EASEOUT).moveBy(0, 30, game.fps / 2, CUBIC_EASEIN).loop();
			next.opacity = 0;
			group.addChild(next);
			
			// 画面に追加
			group.width = balloon.width;
			group.height = balloon.height;
			group.x = game.width / 2 - balloon.width / 2;
			group.y = game.height / 2 - balloon.height / 2;
			game.currentScene.addChild(group);
			
			// ゆっくり表示
			for(var i = 0; i < group.childNodes.length; i++) {
				var node = group.childNodes[i];
				node.tl.fadeIn(game.fps / 2);
			}
			
			// タップしたら閉じる
			group.ontouchstart = function() {
				for(var i = 0; i < this.childNodes.length; i++) {
					this.childNodes[i].tl.clear().fadeOut(game.fps / 2);
				}
				
				this.tl.delay(game.fps / 2).removeFromScene().then(function() {
					if(callback != undefined) {
						callback();
					}
				});
			}
		};
		
		// すべてのメッセージ表示処理を順番に実行して最後にcallbackを呼ぶ
		var f = callback;
		for(var i = game.messages.length - 1; i >= 0; i--) {
			f = function() {
				var message = game.messages[i];
				var g = f;
				return function() {
					show(message, g);
				};
			}();
		}
		f();
		game.messages = [];
	}
});

/**
 * タイトルステート
 * タイトル画面を表示する
 * @class
 * @property {Sprite} _background 背景画像
 */
var TitleState = Class.create({
	_background: null,
	
	/**
	 * ステートが適用された直後の処理
	 * @function
	 * @memberOf TitleState
	 */
	enter: function() {
		this._positionButtons = {};
	
		// 狼
		var wolf = new Wolf();
		game.rootScene.addChild(wolf);
		game.wolf = wolf;

		// 豚
		if(game.pig == null || game.pig == undefined) {
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
		this._background = background;
		game.currentScene.addChild(this._background);
				
		// タッチしたらゲーム開始
		game.currentScene.addEventListener('touchstart', function() {
			self.exit();
		});
	},
	
	/**
	 * 別のステートへ切り替わる直前の処理
	 * @function
	 * @memberOf TitleState
	 */
	exit: function() {
		game.currentScene.clearEventListener('touchstart');
		this._background.ontouchstart = function() {};
		this._background.tl.fadeTo(0, game.fps / 2).then(function() {
			game.currentScene.removeChild(this);
		});
		game.changeState(SetPositionState);
	}
});

/**
 * 豚の隠れ場所を入力するステート
 * @class
 * @property {Object(Sprite)} _positionButtons 矢印ボタンのオブジェクト。_positionButtons[left/center/right]
 * @property {String} selected 豚プレイヤーが選んだ隠れ場所の方向(left/center/right)
 */
var SetPositionState = Class.create({
	_positionButtons: null,
	selected: false,
	
	/**
	 * ステートに入った直後の処理
	 * @function
	 * @memberOf SetPositionState
	 */
	enter: function() {
		this.selected = false;
		this._positionButtons = {};
		game.pig.hide();
		
		// 家
		game.houses = {};
		var directions = ['left', 'center', 'right'];
		for(var i = 0; i < 3; i++) {
			var direction = directions[i];
			game.houses[direction] = new House(direction);
			var margin = (game.width - 3 * game.houses[direction].width) / 4;
			game.houses[direction].x = (i + 1) * margin + i * game.houses[direction].width;
			game.houses[direction].y = game.height / 2 - game.houses[direction].height / 2;
			game.currentScene.addChild(game.houses[direction]);
		}
		
		game.messages.push({
			lines: ['おなかがすいた・・・', 'おっ！', 'あんなところにブタがいるぞ！'],
			from: 'wolf'
		});
		game.messages.push({
			lines: ['いえのなかにかくれるブー！', 'オオカミに見られないように', 'てでかくしてボタンをおすブー！'],
			from: 'pig'
		});
		
		game.showMessages(function() {
			game.state.showPositionButtons();
		});
	},
	
	showPositionButtons: function() {
		// 位置ボタン
		var directions = ['left', 'center', 'right'];
		for(var i = 0; i < 3; i++) {
			var direction = directions[i];
			var button = new PositionButton(direction);
			button.x = (game.width - 3 * button.width) / 2 + button.width * i;
			button.y = -button.height;
			button.tl.moveBy(0, button.height + 20, game.fps / 2);
			game.rootScene.addChild(button);
			this._positionButtons[direction] = button;
		}
	},
	
	/**
	 * ステートが終了する直前の処理
	 * @function
	 * @memberOf SetPositionState
	 */
	exit: function() {
		for(var direction in this._positionButtons) {
			var button = this._positionButtons[direction];
			button.tl.moveTo(button.x, -button.y, game.fps).removeFromScene();
		}
		game.changeState(CheckPositionState);
	}
});

/**
 * オオカミが家を調べるステート
 * @class
 * @property {数値} checkedCount 家を調べた回数
 * @property {Sprite} _callButton 豚の鳴き声ボタン
 */
var CheckPositionState = Class.create({
	checkedCount: 0,
	_callButton: null,
	
	/**
	 * ステート開始直後の処理
	 * @function
	 * @memberOf CheckPositionState
	 */
	enter: function() {
		var callButton = new CallButton();
		game.rootScene.addChild(callButton);
		this._callButton = callButton;
		
		this.checkedCount = 0;
		this.startCheck();
	},
	
	/**
	 * 家をタップして調べることができるようにする
	 * @function
	 * @memberOf CheckPositionState
	 */
	startCheck: function() {
		for(var i = 0; i < 3; i++) {
			var direction = ['left', 'center', 'right'][i];
			game.houses[direction].checkable = true;
		}
	},
	
	/**
	 * 家のタップが完了した時の処理
	 * @function
	 * @memberOf CheckPositionState
	 */
	checked: function() {
		this.checkedCount++;
		if(this.checkedCount >= config.checkLimit) {
			this.exit();
		}
	},
	
	/**
	 * シーン終了直前の処理
	 * @function
	 * @memberOf CheckPositionState
	 */
	exit: function() {
		for(var direction in game.houses) {
			game.houses[direction].checkable = false;
		}
		game.currentScene.removeChild(this._callButton);
		game.changeState(OpenState);
	}
});

/**
 * 吹き飛ばす家を選ぶステート
 * @class
 */
var OpenState = Class.create({

	/**
	 * ステート開始時の処理
	 * @function
	 * @memberOf OpenState
	 */
	enter: function() {
		for(var direction in game.houses) {
			game.houses[direction].openable = true;
		}
	},
	
	/**
	 * 家が吹き飛ばされた時の処理
	 * @function
	 * @memberOf OpenState
	 */
	hasOpend: function(answer) {
		game.answer = answer;
		for(var direction in game.houses) {
			game.houses[direction].openable = false;
		}
		this.exit();
	},
	
	/**
	 * ステートが終了した時の処理
	 * @function
	 * @memberOf OpenState
	 */
	exit: function() {
		game.changeState(ResultState);
	}
});

/**
 * 結果表示ステート
 * @class
 */
var ResultState = Class.create({
	/**
	 * ステート開始時の処理
	 * @function
	 * @memberOf ResultState
	 */
	enter: function() {
		if(game.answer == game.pig.direction) {
			console.log('オオカミの勝ち');
		} else {
			console.log('ブタの勝ち');
		}
		this.exit();
	},
	
	/**
	 * ステート終了直前の処理
	 * @function
	 * @memberOf ResultState
	 */
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