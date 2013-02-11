/**
 * 家の中に隠れている豚のクラス
 * @class
 * @extends Sprite
 * @property {文字列} direction 隠れている場所(left/center/right)
 */
var MiniPig = Class.create(Sprite, {
	direction: '',
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf MiniPig
	 */
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 114;
		this.height = 142;
		this.image = game.assets['img/mini_pig.png'];
		this.visible = false;
		this.direction = direction;
	}
});