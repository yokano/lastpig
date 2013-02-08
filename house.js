var House = Class.create(Sprite, {
	hasPig: false,
	
	initialize: function(pig) {
		Sprite.call(this);
		this.width = 237;
		this.height = 230;
		this.image = game.assets['img/house.png'];
	},
	
	ontouchstart: function() {
		if(this.hasPig) {
			game.assets['sound/se4.mp3'].play();
		}
	}
});