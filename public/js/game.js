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
}

function State(players, publicCards, pots, dealer, activePlayer, stage) {
	this.players = players;
	this.publicCards = publicCards;
	this.pots = pots;
	this.dealer = dealer;
	this.activePlayer = activePlayer;
	this.stage = stage;
}

function View(numOfBackgrounds, background, numOfCardBacks, cardBack) {
	this.numOfBackgrounds = numOfBackgrounds;
	this.background = background;
	this.numOfCardBacks = numOfCardBacks;
	this.cardBack = cardBack;
	this.nyanCat = {
		speedModifier : 10,
		spawnDelay : 15000,
		tailDuration : 15000,
		tailFadeDuration : 5000
	};
}

function Game(gameID, numOfSeats, state, view) {
	this.gameID = gameID;
	this.lastActionNum = 0;
	this.numOfSeats = numOfSeats;
	this.state = state;
	this.view = view;
}

var players = [
	new Player('Tanner Coval', 10000),
	new Player('Alan Tan', 10000)
];
var state = new State(players, [], [0], 1, 1, STAGE.NEW_GAME);
var view = new View(6, 1, 1, 1);
var game = new Game(123456, 2, state, view);