var House = Class.create(Sprite, {
	hasPig: false,
	checkable: false,
	openable: false,
	direction: '',
	
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 273;
		this.height = 236;
		this.image = game.assets['img/house.png'];
		this.direction = direction;
	},
	
	ontouchstart: function() {
		if(this.checkable) {
			if(this.hasPig) {
				game.assets['sound/se4.mp3'].play();
			}
			this.tl.scaleTo(1.1, game.fps / 10).scaleTo(1, game.fps / 10);		
			game.state.checked();
		} else if(this.openable) {
			this.open();
			game.state.hasOpend(this.direction);
		}
	},
	
	hasBlown: function() {
		this.tl.rotateBy(360 * 2, game.fps / 2).and().moveTo(this.x, -this.height, game.fps / 2);
	},
	
	open: function() {
		this.tl.rotateBy(360 * 2, game.fps / 2).and().moveTo(this.x, -this.height, game.fps / 2);
	}
});