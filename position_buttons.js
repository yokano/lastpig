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
		var house = game.houses[this.direction];
		this.y += 5;
		this.image = game.assets['img/' + this.direction + '_button_down.png'];
		
		var pig = new MiniPig(this.direction);
		game.currentScene.insertBefore(pig, house);
		pig.x = house.x + house.width / 2 - pig.width / 2;
		pig.y = house.y + house.height / 2 - pig.height / 2;
		pig.visible = true;
		house.hasPig = true;
		game.pig = pig;
	},
	
	ontouchend: function() {
		this.y -= 5;
		this.image = game.assets['img/' + this.direction + '_button.png'];
		game.state.exit();
	}
});
