var Pig = Class.create(Group, {
	initialize: function() {
		Group.call(this);
		this.width = 320;
		this.height = 232;
		this.x = game.width / 2 - this.width / 2;
		this.y = game.height - this.height + 10;
		this.originY = this.height;
		this.rotation = -2.5;
		this.tl.rotateBy(5, game.fps, QUAD_EASEINOUT).rotateBy(-5, game.fps, QUAD_EASEINOUT).loop();
		
		// 体
		var body = new Sprite(187, 180);
		body.image = game.assets['img/pig_body.png'];
		body.x = 20;
		body.y = this.height - body.height;
		this.addChild(body);
		
		// 頭
		var head = new Sprite(197, 143);
		head.image = game.assets['img/pig_head.png'];
		head.x = 10;
		head.y = -40;
		this.addChild(head);
		
		// 左耳
		var leftEar = new Sprite(101, 68);
		leftEar.image = game.assets['img/pig_left_ear.png'];
		leftEar.x = -40;
		leftEar.y = -50;
		leftEar.originX = 100;
		leftEar.originY = 68;
		leftEar.tl.rotateBy(-10, game.fps, CUBIC_EASEIN).rotateBy(10, game.fps, CUBIC_EASEOUT).loop();
		this.insertBefore(leftEar, head);
		
		// 右耳
		var rightEar = new Sprite(101, 68);
		rightEar.image = game.assets['img/pig_right_ear.png'];
		rightEar.x = 160;
		rightEar.y = -50;
		rightEar.originX = 0;
		rightEar.originY = 68;
		rightEar.tl.rotateBy(10, game.fps, CUBIC_EASEIN).rotateBy(-10, game.fps, CUBIC_EASEOUT).loop();
		this.insertBefore(rightEar, head);
		
		// 左目
		var leftEye = new Sprite(19, 23);
		leftEye.image = game.assets['img/pig_eye.png'];
		leftEye.x = 50;
		this.addChild(leftEye);
		
		// 右目
		var rightEye = new Sprite(19, 23);
		rightEye.image = game.assets['img/pig_eye.png'];
		rightEye.x = 145;
		this.addChild(rightEye);
		
		// 左手
		var leftHand = new Sprite(85, 63);
		leftHand.image = game.assets['img/pig_left_hand.png'];
		leftHand.x = -30;
		leftHand.y = 100;
		leftHand.originX = 85;
		leftHand.tl.rotateBy(-45, game.fps, CIRC_EASEINOUT).rotateBy(45, game.fps, CIRC_EASEINOUT).loop();
		this.insertBefore(leftHand, body);
		
		// 右手
		var rightHand = new Sprite(85, 63);
		rightHand.image = game.assets['img/pig_right_hand.png'];
		rightHand.x = 170;
		rightHand.y = 100;
		rightHand.originX = 0;
		rightHand.tl.rotateBy(45, game.fps, CIRC_EASEINOUT).rotateBy(-45, game.fps, CIRC_EASEINOUT).loop();
		this.insertBefore(rightHand, body);
		
		// 鼻
		var nose = new Sprite(106, 66);
		nose.image = game.assets['img/pig_nose.png'];
		nose.x = 55;
		nose.y = 20;
		this.addChild(nose);
		
		// 尻尾
		var tail = new Sprite(119, 80);
		tail.image = game.assets['img/pig_tail.png'];
		tail.x = 190;
		tail.y = 145;
		tail.originX = 0;
		tail.originY = 80;
		tail.rotation = 10;
		tail.tl.rotateBy(-35, game.fps, BOUNCE_EASEIN).rotateBy(35, game.fps, BOUNCE_EASEOUT).loop();
		this.insertBefore(tail, rightHand);
	}
});