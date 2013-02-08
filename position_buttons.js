var PositionButton = Class.create(Sprite, {
	direction: '',
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 154;
		this.height = 77;
		this.image = game.assets['img/' + direction + '_button.png'];
		this.direction = direction;
	},
	
	ontouchstart: function() {
		this.y += 5;
		this.image = game.assets['img/' + this.direction + '_button_down.png'];
		game.houses[this.direction].hasPig = true;
	},
	
	ontouchend: function() {
		this.y -= 5;
		this.image = game.assets['img/' + this.direction + '_button.png'];
	}
});
