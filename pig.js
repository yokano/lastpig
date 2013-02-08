var Pig = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this);
		this.width = 114;
		this.height = 142;
		this.image = game.assets['img/pig.png'];
		this.visible = false;
	}
});