/**
 * 矢印ボタンクラス
 * 豚が隠れる場所を決めるボタン
 * @class
 * @extends Sprite
 * @property {文字列} direction 矢印が示す方向(left/center/right)
 */
var PositionButton = Class.create(Sprite, {
	direction: '',
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf PositionButton
	 */
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 154;
		this.height = 77;
		this.image = game.assets['img/' + direction + '_button.png'];
		this.direction = direction;
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf PositionButton
	 */
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
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf PositionButton
	 */
	ontouchend: function() {
		this.y -= 5;
		this.image = game.assets['img/' + this.direction + '_button.png'];
		game.state.exit();
	}
});
