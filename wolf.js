var Wolf = Class.create(Group, {
	_highTensionSpeed: 0,
	_lowTensionSpeed: 0,
	_tail: null,
	_armLeft: null,
	_armRight: null,
	_browLeft: null,
	_browRight: null,
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
		var body = new Sprite(232, 270);
		body.image = game.assets['img/wolf_body.png'];
		this.addChild(body);
		
		// 左耳
		var earLeft = new Sprite(90, 129);
		earLeft.image = game.assets['img/wolf_ear_left.png'];
		earLeft.x = -30;
		earLeft.y = -15;
		earLeft.rotate(-15);
		earLeft.tl.rotateBy(15, game.fps * 3).rotateBy(-15, game.fps * 3).loop();
		this.insertBefore(earLeft, body);
		
		// 右耳
		var earRight = new Sprite(89, 129);
		earRight.image = game.assets['img/wolf_ear_right.png'];
		earRight.x = 180;
		earRight.y = -15;
		earRight.rotate(15);
		earRight.tl.rotateBy(-15, game.fps * 3).rotateBy(15, game.fps * 3).loop();
		this.insertBefore(earRight, body);
		
		// 尻尾
		var tail = new Sprite(212, 163);
		tail.image = game.assets['img/wolf_tail.png'];
		tail.x = 200;
		tail.y = 90;
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
		var armLeft = new Sprite(128, 90);
		armLeft.image = game.assets['img/wolf_arm_left.png'];
		armLeft.x = -110;
		armLeft.y = 80;
		armLeft.originX = 110;
		armLeft.originY = 80;
		armLeft.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = -30;
			this.tl.rotateBy(45, time, CIRC_EASEINOUT).rotateBy(-45, time, CIRC_EASEINOUT).loop();
		};
		armLeft.setAnimation(this._lowTensionSpeed);
		this.insertBefore(armLeft, body);
		this._armLeft = armLeft;
		
		// 右腕
		var armRight = new Sprite(133, 94);
		armRight.image = game.assets['img/wolf_arm_right.png'];
		armRight.x = 210;
		armRight.y = 80;
		armRight.originX = 0;
		armRight.originY = 80;
		armRight.setAnimation = function(time) {
			this.tl.clear();
			this.rotation = 35;
			this.tl.rotateBy(-45, time, CIRC_EASEINOUT).rotateBy(45, time, CIRC_EASEINOUT).loop();
		};
		armRight.setAnimation(this._lowTensionSpeed);
		this.insertBefore(armRight, body);
		this._armRight = armRight;
		
		// 左眉毛
		var browLeft = new Sprite(49, 29);
		browLeft.image = game.assets['img/wolf_brow_left.png'];
		browLeft.x = 50;
		browLeft.y = 35;
		browLeft.tl.moveBy(0, -5, game.fps / 3, QUART_EASEIN).moveBy(0, 5, game.fps, QUART_EASEOUT).loop();
		this.addChild(browLeft);
		this._browLeft = browLeft;

		// 右眉毛
		var browRight = new Sprite(49, 29);
		browRight.image = game.assets['img/wolf_brow_right.png'];
		browRight.x = 130;
		browRight.y = 35;
		browRight.tl.moveBy(0, -5, game.fps / 3, QUART_EASEIN).moveBy(0, 5, game.fps, QUART_EASEOUT).loop();
		this.addChild(browRight);
		this._browRight = browRight;
		
		// 鼻
		var nose = new Sprite(49, 29);
		nose.image = game.assets['img/wolf_nose.png'];
		nose.x = 90;
		nose.y = 90;
		nose.tl.scaleTo(1.1, game.fps / 10).scaleTo(1, game.fps / 10).delay(game.fps * 2).loop();
		this.addChild(nose);
		
		// よだれ
		var drool = new Sprite(33, 53);
		drool.getRandomizedX = function() {
			return Math.floor(Math.random() * 90 + 50);
		};
		drool.image = game.assets['img/wolf_drool.png'];
		drool.x = drool.getRandomizedX();
		drool.y = 175;
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
				drool.y = 175;
			})
			.show()
			.loop();
		
		this.addChild(drool);
	},
	
	ontouchstart: function() {
		this.setAnimation(this._highTensionSpeed);
		this._tail.setAnimation(this._highTensionSpeed);
		this._armLeft.setAnimation(this._highTensionSpeed);
		this._armRight.setAnimation(this._highTensionSpeed);
		this._browLeft.rotation = -45;
		this._browRight.rotation = 45;
	},
	
	ontouchend: function() {
		this.setAnimation(this._lowTensionSpeed);
		this._tail.setAnimation(this._lowTensionSpeed);
		this._armLeft.setAnimation(this._lowTensionSpeed);
		this._armRight.setAnimation(this._lowTensionSpeed);
		this._browLeft.rotation = 0;
		this._browRight.rotation = 0;
	}
});