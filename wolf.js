/**
 * オオカミクラス
 * @class
 * @extends Group
 * @property {数値} _highTensionSpeed タップされている時のアニメーション１ループにかかる時間
 * @property {数値} _lowTensionSpeed タップされていない時のアニメーション１ループにかかる時間
 * @property {Sprite} _tail 尻尾
 * @property {Sprite} _armLeft 左手
 * @property {Sprite} _armRight 右手
 * @property {Sprite} _browLeft 左眉毛
 * @property {Sprite} _browRight 右眉毛
 */
var Wolf = Class.create(Group, {
	_highTensionSpeed: 0,
	_lowTensionSpeed: 0,
	_tail: null,
	_armLeft: null,
	_armRight: null,
	_browLeft: null,
	_browRight: null,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf Wolf
	 */
	initialize: function() {
		Group.call(this);
		this.height = 250;
		this.width = 300;
		this.x = innerWidth / 2 - this.width / 2;
		this.y = innerHeight - this.height;
		
		// 狼全体の揺れ
		this._highTensionSpeed = game.fps / 7;
		this._lowTensionSpeed = game.fps;
		this.originX = 150;
		this.originY = this.height;
		this.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = -5;
			this.tl.rotateBy(10, time, QUAD_EASEINOUT).rotateBy(-10, time, QUAD_EASEINOUT).loop();
		};
		this.setAnimation(this._lowTensionSpeed);
				
		// 体
		var body = new Sprite(279, 324);
		body.image = game.assets['img/wolf_body.png'];
		this.addChild(body);
		
		// 左耳
		var earLeft = new Sprite(107, 155);
		earLeft.image = game.assets['img/wolf_left_ear.png'];
		earLeft.x = -20;
		earLeft.y = -15;
		earLeft.rotate(-15);
		earLeft.tl.rotateBy(15, game.fps * 3).rotateBy(-15, game.fps * 3).loop();
		this.insertBefore(earLeft, body);
		
		// 右耳
		var earRight = new Sprite(107, 155);
		earRight.image = game.assets['img/wolf_right_ear.png'];
		earRight.x = 180;
		earRight.y = -15;
		earRight.rotate(15);
		earRight.tl.rotateBy(-15, game.fps * 3).rotateBy(15, game.fps * 3).loop();
		this.insertBefore(earRight, body);
		
		// 尻尾
		var tail = new Sprite(254, 195);
		tail.image = game.assets['img/wolf_tail.png'];
		tail.x = 200;
		tail.y = 80;
		tail.originX = 40;
		tail.originY = 150;
		tail.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = -30;
			this.tl.rotateBy(30, time, CIRC_EASEINOUT).rotateBy(-30, time, CIRC_EASEINOUT).loop();
		};
		tail.setAnimation(this._lowTensionSpeed);
		this.insertBefore(tail, body);
		this._tail = tail;
		
		// 左腕
		var armLeft = new Sprite(154, 108);
		armLeft.image = game.assets['img/wolf_left_arm.png'];
		armLeft.x = -100;
		armLeft.y = 80;
		armLeft.originX = armLeft.width;
		armLeft.originY = armLeft.height;
		armLeft.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = -30;
			this.tl.rotateBy(45, time, CIRC_EASEINOUT).rotateBy(-45, time, CIRC_EASEINOUT).loop();
		};
		armLeft.setAnimation(this._lowTensionSpeed);
		this.insertBefore(armLeft, body);
		this._armLeft = armLeft;
		
		// 右腕
		var armRight = new Sprite(159, 113);
		armRight.image = game.assets['img/wolf_right_arm.png'];
		armRight.x = 220;
		armRight.y = 80;
		armRight.originX = 0;
		armRight.originY = armRight.height;
		armRight.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = 35;
			this.tl.rotateBy(-45, time, CIRC_EASEINOUT).rotateBy(45, time, CIRC_EASEINOUT).loop();
		};
		armRight.setAnimation(this._lowTensionSpeed);
		this.insertBefore(armRight, body);
		this._armRight = armRight;
		
		// 左眉毛
		var browLeft = new Sprite(58, 35);
		browLeft.image = game.assets['img/wolf_left_brow.png'];
		browLeft.x = 60;
		browLeft.y = 45;
		browLeft.tl.moveBy(0, -5, game.fps / 3, QUART_EASEIN).moveBy(0, 5, game.fps, QUART_EASEOUT).loop();
		this.addChild(browLeft);
		this._browLeft = browLeft;

		// 右眉毛
		var browRight = new Sprite(58, 35);
		browRight.image = game.assets['img/wolf_right_brow.png'];
		browRight.x = 155;
		browRight.y = 45;
		browRight.tl.moveBy(0, -5, game.fps / 3, QUART_EASEIN).moveBy(0, 5, game.fps, QUART_EASEOUT).loop();
		this.addChild(browRight);
		this._browRight = browRight;
		
		// 鼻
		var nose = new Sprite(64, 36);
		nose.image = game.assets['img/wolf_nose.png'];
		nose.x = 105;
		nose.y = 110;
		nose.tl.scaleTo(1.1, game.fps / 10).scaleTo(1, game.fps / 10).delay(game.fps * 2).loop();
		this.addChild(nose);
		
		// よだれ
		var drool = new Sprite(39, 63);
		drool.getRandomizedX = function() {
			return Math.floor(Math.random() * 100 + 70);
		};
		drool.image = game.assets['img/wolf_drool.png'];
		drool.x = drool.getRandomizedX();
		drool.y = 200;
		drool.originY = 0;
		drool.scaleY = 0;

		// よだれランダム生成
		drool.tl
			.scaleTo(1, 1, game.fps / 2, CUBIC_EASEOUT)
			.moveTo(drool.x, game.height, game.fps, CUBIC_EASEIN)
			.hide()
			.delay(game.fps)
			.scaleTo(1, 0, 0)
			.then(function() {
				drool.x = drool.getRandomizedX();
				drool.y = 200;
			})
			.show()
			.loop();
		
		this.addChild(drool);
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf Wolf
	 */
	ontouchstart: function() {
		this.setAnimation(this._highTensionSpeed);
		this._tail.setAnimation(this._highTensionSpeed);
		this._armLeft.setAnimation(this._highTensionSpeed);
		this._armRight.setAnimation(this._highTensionSpeed);
		this._browLeft.rotation = -45;
		this._browRight.rotation = 45;
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf Wolf
	 */
	ontouchend: function() {
		this.setAnimation(this._lowTensionSpeed);
		this._tail.setAnimation(this._lowTensionSpeed);
		this._armLeft.setAnimation(this._lowTensionSpeed);
		this._armRight.setAnimation(this._lowTensionSpeed);
		this._browLeft.rotation = 0;
		this._browRight.rotation = 0;
	}
});