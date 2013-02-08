var CallButton = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this);
		this.x = 100;
		this.y = 50;
		this.width = 172;
		this.height = 107;
		this.image = game.assets['img/call_button.png'];
	},
	
	ontouchstart: function() {
		this.width = 168;
		this.height = 105;
		this.y += 10;
		this.image = game.assets['img/call_button_down.png'];
		game.assets['sound/se4.mp3'].play();
	},
	
	ontouchend: function() {
		this.width = 172;
		this.height = 107;
		this.y -= 10;
		this.image = game.assets['img/call_button.png'];
	}
});