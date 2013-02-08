enchant();

var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	game.preload('img/call_button.png');
	game.preload('img/call_button_down.png');
	game.preload('sound/se4.mp3');
	game.onload = function() {
		game.rootScene.backgroundColor = 'green';
		var callButton = new CallButton();
		game.rootScene.addChild(callButton);
	};
	game.start();
};