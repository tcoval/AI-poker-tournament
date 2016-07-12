/*
	game.js - Initailize necessary game state objects and manipulator functions
*/

var STAGE = {
	NEW_GAME : "new game",
	FLOP : "flop",
	TURN : "turn",
	RIVER : "river",
	END_GAME : "end game"
};

function Player(name, cash) {
	this.name = name;
	this.cash = cash;
	this.cards = [];
	this.currentBet = 0;
	this.toString = function() {
		return "Player";
	}
}

function State(players, publicCards, pots, dealer, activePlayer, stage) {
	this.players = players;
	this.publicCards = publicCards;
	this.pots = pots;
	this.dealer = dealer;
	this.activePlayer = activePlayer;
	this.stage = stage;
	this.diff = function(otherState) {
		if (!(otherState instanceof State)) {
			alert('An error occured in State.diff()');
		} 
		var diffs = [];
		var keys = {};
		$.each(Object.keys(this).concat(Object.keys(otherState)), function(key, _) {
			keys[key] = true;
		});
		$.each(keys, function(key, _) {
			if (this.key != otherState.key) {
				
			}
		});

	};
	this.toString() {
		return "State";
	}
}

function View(numOfBackgrounds, background, numOfCardBacks, cardBack) {
	this.numOfBackgrounds = numOfBackgrounds;
	this.background = background;
	this.numOfCardBacks = numOfCardBacks;
	this.cardBack = cardBack;
}

function Game(numOfSeats, state, view) {
	this.numOfSeats = numOfSeats;
	this.state = state;
	this.view = view;
}

var players = [
	new Player('Tanner Coval', 10000),
	new Player('Alan Tan', 10000)
];
var state = new State(players, [], [0], 1, 1, STAGE.NEW_GAME);
var view = new View(5, 1, 1, 1);
var game = new Game(2, state, view);