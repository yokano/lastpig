var Pig = Class.create(Group, {
	initialize: function() {
		Group.call(this);
		this.width = 320;
		this.height = 232;
		this.x = game.width / 2 - this.width / 2;
		this.y = - this.height - 10;
		this.originY = this.height;
		this.rotation = -2.5;
		this.tl.rotateBy(5, game.fps, QUAD_EASEINOUT).rotateBy(-5, game.fps, QUAD_EASEINOUT).loop();
		
		// 体
		var body = new Sprite(225, 216);
		body.image = game.assets['img/pig_body.png'];
		body.x = 20;
		body.y = this.height - body.height + 15;
		this.addChild(body);
		
		// 頭
		var head = new Sprite(236, 172);
		head.image = game.assets['img/pig_head.png'];
		head.x = 10;
		head.y = -40;
		this.addChild(head);
		
		// 左耳
		var leftEar = new Sprite(121, 81);
		leftEar.image = game.assets['img/pig_left_ear.png'];
		leftEar.x = -35;
		leftEar.y = -50;
		leftEar.originX = 100;
		leftEar.originY = 68;
		leftEar.tl.rotateBy(-10, game.fps, CUBIC_EASEIN).rotateBy(10, game.fps, CUBIC_EASEOUT).loop();
		this.insertBefore(leftEar, head);
		
		// 右耳
		var rightEar = new Sprite(121, 81);
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
		leftEye.x = 70;
		this.addChild(leftEye);
		
		// 右目
		var rightEye = new Sprite(19, 23);
		rightEye.image = game.assets['img/pig_eye.png'];
		rightEye.x = 160;
		this.addChild(rightEye);
		
		// 左手
		var leftHand = new Sprite(102, 76);
		leftHand.image = game.assets['img/pig_left_hand.png'];
		leftHand.x = -25;
		leftHand.y = 100;
		leftHand.originX = 85;
		leftHand.tl.rotateBy(-45, game.fps, CIRC_EASEINOUT).rotateBy(45, game.fps, CIRC_EASEINOUT).loop();
		this.insertBefore(leftHand, body);
		
		// 右手
		var rightHand = new Sprite(102, 76);
		rightHand.image = game.assets['img/pig_right_hand.png'];
		rightHand.x = 185;
		rightHand.y = 95;
		rightHand.originX = 0;
		rightHand.tl.rotateBy(45, game.fps, CIRC_EASEINOUT).rotateBy(-45, game.fps, CIRC_EASEINOUT).loop();
		this.insertBefore(rightHand, body);
		
		// 鼻
		var nose = new Sprite(121, 76);
		nose.image = game.assets['img/pig_nose.png'];
		nose.x = 65;
		nose.y = 20;
		this.addChild(nose);
		
		// 尻尾
		var tail = new Sprite(143, 96);
		tail.image = game.assets['img/pig_tail.png'];
		tail.x = 200;
		tail.y = 115;
		tail.originX = 0;
		tail.originY = 80;
		tail.rotation = 10;
		tail.tl.rotateBy(-35, game.fps, BOUNCE_EASEIN).rotateBy(35, game.fps, BOUNCE_EASEOUT).loop();
		this.insertBefore(tail, rightHand);
		
		// 豚を半回転
		this.rotation += 180;
	}
});