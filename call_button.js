/**
 * 豚の鳴き声ボタン
 * このボタンを押してオオカミプレイヤーを撹乱する
 * @class
 * @extends Sprite
 */
var CallButton = Class.create(Sprite, {
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf CallButton
	 */
	initialize: function() {
		Sprite.call(this);
		this.width = 172;
		this.height = 107;
		this.x = game.width / 2 - this.width / 2;
		this.y = -this.height;
		this.image = game.assets['img/call_button.png'];
		this.tl.moveBy(0, this.height + 10, game.fps / 2);
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf CallButton
	 */
	ontouchstart: function() {
		this.width = 168;
		this.height = 105;
		this.y += 10;
		this.image = game.assets['img/call_button_down.png'];
		game.assets['sound/se4.mp3'].play();
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf CallButton
	 */
	ontouchend: function() {
		this.width = 172;
		this.height = 107;
		this.y -= 10;
		this.image = game.assets['img/call_button.png'];
	}
});