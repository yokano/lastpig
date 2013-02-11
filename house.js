/**
 * 家クラス
 * 豚が隠れる家
 * @class
 * @extends Sprite
 * @property {真理値} hasPig trueなら豚が隠れている
 * @property {真理値} checkable trueならタップすると豚がいるか調べられる
 * @property {真理値} openable trueならタップすると家を吹き飛ばせる
 * @property {文字列} direction 家の場所を表す文字列(left/center/right)
 */
var House = Class.create(Sprite, {
	hasPig: false,
	checkable: false,
	openable: false,
	direction: '',
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf House
	 */
	initialize: function(direction) {
		Sprite.call(this);
		this.width = 273;
		this.height = 236;
		this.image = game.assets['img/house.png'];
		this.direction = direction;
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf House
	 */
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
	
	/**
	 * 吹き飛ばされら時のアニメーション
	 * @function
	 * @memberOf House
	 */
	open: function() {
		this.tl.rotateBy(360 * 2, game.fps / 2).and().moveTo(this.x, -this.height, game.fps / 2);
	}
});