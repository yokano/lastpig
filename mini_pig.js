var MiniPig = Class.create(Sprite, {
	direction: '',
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 114;
		this.height = 142;
		this.image = game.assets['img/mini_pig.png'];
		this.visible = false;
		this.direction = direction;
	}
});