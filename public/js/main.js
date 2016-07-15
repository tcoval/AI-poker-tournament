

	function changeBackground(backgroundNum) {
		if (game.view.background == backgroundNum) {
			return;
		}
		if (game.view.background == game.view.numOfBackgrounds -1) {
			$('div.flappy-background').css('background-image', 'none');
		}
		if (game.view.background == game.view.numOfBackgrounds) {
			var cats = $('img.nyan-cat').not('.original');
			var canvas = $('canvas.nyan-canvas').not('.original');
			cats.remove();
			canvas.remove();
		}
		game.view.background = backgroundNum;
		$(".container").css({
			"background-image" : "url(/img/backgrounds/background-" + backgroundNum + ".jpg"
		});
		if (game.view.background == game.view.numOfBackgrounds - 1) {
			initFlappy();
		}
		if (game.view.background == game.view.numOfBackgrounds) {
			spawnNyanCats();
		}
	}

	

	// possible I may not keep this around
	/*function shuffleDeck() {
		$("#top-of-stack").hide();
		var sound = new Audio("/audio/shuffle.mp3");
		sound.play();
		for (var i = 1; i < 10; i++) {
			var newCard = $("#stack-4").clone();
			var coords = $("#stack-4").position();
			newCard.css({
				top : coords["top"] - i,
				left : coords["left"] + i
			});
			newCard.removeAttr("id");
			newCard.addClass("shuffle-card");
			doTimeout(i, newCard);
		}
		setTimeout(function() {
			$($(".shuffle-card").get().reverse()).each(function(i, card) {
				setTimeout(function() {
					card.remove();
				}, 70 * i);
			});
		}, 1500);
		setTimeout(function() {
			$("#top-of-stack").show();
		}, 2100);
	}*/

	// helper function used to pass value rather than reference to timeout.
	function doTimeout(i, newCard) {
		setTimeout(function() {
			$(".public-card-area").append(newCard);
		}, 100 * i);
	}

	function playerWins(playerWinnings) {
		var pot = $(".pot");
		var potCash = $("#pot-cash");
		var playerLocs = {
			1 : {top : "285px", left : "93px"},
			2 : {top : "-98px", left : "93px"}
		};
		$.each(playerWinnings, function(index, player) {
			var chip = $(".poker-chip").clone();
			chip.appendTo(".pot-marking");
			chip.animate(playerLocs[player.number], 700, function() {
				this.remove();
			});
			game.state.players[player.number - 1].cash += player.winnings;
			$("#player-" + player.number + "-cash").html(game.state.players[player.number - 1].cash);
		});

		game.state.pots[0] = 0;
		potCash.html(game.state.pots[0]);

		var sound = new Audio('audio/bet.mp3');
		setTimeout( function() {
			sound.play();
		}, 200);
		
		setTimeout(function() {
			collectCards();
		}, 1500);
	}

	function collectCards() {
		var cards = [".bottom-card", ".top-card"];
		var sound = new Audio("/audio/card-flip-2.mp3");
		//var cardsCollected = false;
		for (var playerNum = 1; playerNum <= game.state.numOfPlayers; playerNum++) {
			var player = "#player-" + playerNum;
			$.each(cards, function(index, cardClass) {

				var card = $(player + " > " + cardClass);
				if (card.size() == 0) return true;
				//cardsCollected = true;
				var coords = card.offset();
				var deckCoords = $("#top-of-stack").offset();

				var diffTop = deckCoords["top"] - coords["top"];
				var diffLeft = deckCoords["left"] - coords["left"];

				var currCSS = card.position();
				card.flip(false);
				card.animate({
					top : currCSS["top"] + diffTop + "px", 
					left : currCSS["left"] + diffLeft + "px"
				}, 800, function() {
					card.remove();
				});

			});
		}
		for (var slotNum = 1; slotNum <= 5; slotNum++) {
			var card = $("#slot-" + slotNum);
			if (!card.size()) continue;
			//cardsCollected = true;
			var cardCoords = card.position();
			var deckCoords = $("#top-of-stack").position();

			var diffTop = deckCoords["top"] - cardCoords["top"];
			var diffLeft = deckCoords["left"] - cardCoords["left"];

			card.flip(false);
			card.animate({
				top : cardCoords["top"] + diffTop + "px",
				left : cardCoords["left"] + diffLeft + "px"
			}, 800, function() {
				this.remove();
			});
		}
		/*if (cardsCollected) {
			setTimeout(function() {
				shuffleDeck();
			}, 1200);
		}*/
	}

	function bet(playerNum, amount) {
		var chip = $(".poker-chip").clone();
		var pot = $(".pot");
		var potCash = $("#pot-cash");
		var playerCash = $("#player-" + playerNum + "-cash");
		var sound = new Audio('audio/bet-2.mp3');
		var playerLocs = {
			1 : {top : "285px", left : "93px"},
			2 : {top : "-98px", left : "93px"}
		};
		chip.css(playerLocs[playerNum]);
		chip.appendTo(".pot-marking");
		setTimeout( function() {
			sound.play();
		}, 200);
		chip.animate({ top : "9px", left : "10px" }, 700, function() {
			this.remove();
		});
		game.state.pots[0] += amount;
		game.state.players[playerNum - 1].cash -= amount;
		potCash.html(game.state.pots[0]);
		playerCash.html(game.state.players[playerNum - 1].cash);
		pot.animate({color : "#55FF55"}, 400, function() {
			setTimeout(function() {
				pot.animate({color: "white"}, 600);
			}, 600);
		});
	}

	function dealCardToSlot(playerNum, slotNum, suit, pip) {
		var locations = [
			{
				1 : { "top" : "0px", "left" : "2px" },
				2 : { "top" : "0px", "left" : "82px" },
				3 : { "top" : "0px", "left" : "162px" },
				4 : { "top" : "0px", "left" : "242px" },
				5 : { "top" : "0px", "left" : "322px" }
			}, {
				1 : { "top" : "149px", "left" : "150px" },
				2 : { "top" : "149px", "left" : "173px" }
			}, {
				1 : { "top" : "-235px", "left" : "150px" },
				2 : { "top" : "-235px", "left" : "173px" }
			}
		]

		var sound = new Audio('audio/card-flip.mp3');
		var coords = locations[playerNum][slotNum];
		var card = $("div#top-of-stack").clone();
		if (suit && pip) {
			card.find(".back > img").attr({"src" : "img/cards/" + suit + "-" + pip + ".png"});
		}
		card.removeAttr("id");
		card.addClass("top-of-stack");
		card.appendTo($(".public-card-area"));
		card.flip({trigger : "toggle"});
		
		sound.play();
		if (playerNum < 2) {
			card.flip(true);
		}
		$(card).animate({top: coords["top"], left: coords["left"]}, 800, function() {
			card.removeClass("top-of-stack");
			card.css({top: "", left: ""});
			switch (playerNum) {
				case 0:
					card.attr("id", "slot-" + slotNum);
					break;
				case 1:
					$("#player-1").prepend(card);
				case 2:
					if (playerNum == 2) {
						$("#player-2").prepend(card);
					}

					if (slotNum == 1) {
						card.addClass("bottom-card");
					} else if (slotNum == 2) {
						card.addClass("top-card");
					} else {
						alert("error: incorrect slot number");
					}
					break;
				default:
					alert("error: player number incorrect");			//	Temporary
			}
		});
	}

	$(document).ready(function() {


	$("#button-1").click(function() {
		//	Deal players their cards
		dealCardToSlot(1, 1, "spade", "ace");		//	Need to know who is dealer in the future
			setTimeout(function() {			//	Need to know which cards to deal
				dealCardToSlot(2, 1);
				setTimeout(function() {
					dealCardToSlot(1, 2, "heart", "queen");
					setTimeout(function() {
						dealCardToSlot(2, 2);
					}, 400);
				}, 400);
			}, 400);
		});
		$("#button-2").click(function() {
			//	Deal the flop
			dealCardToSlot(0, 1, "club", "king");
			setTimeout(function() {
				dealCardToSlot(0, 2, "heart", "ten");
				setTimeout(function() {
					dealCardToSlot(0, 3, "diamond", "nine");
				}, 400);
			}, 400);
		});
		$("#button-3").click(function() {
			//	Deal the turn
			dealCardToSlot(0, 4, "spade", "four");
		});
		$("#button-4").click(function() {
			// Deal the river
			dealCardToSlot(0, 5, "club", "jack");
		});
		$("#button-5").click(function() {
			//	Player 1 bets $50
			bet(1, 150);
		});
		$("#button-6").click(function() {
			//	Player 2 bets $50
			bet(2, 500);
		});
		$("#button-7").click(function() {
			//	player 1 wins
			var player1 = { 
				number : 1, 
				winnings : game.state.pots[0]
			};
			playerWins([player1]);
		});
		$("#button-8").click(function() {
			//	player 2 wins
			var player2 = { 
				number : 2, 
				winnings : game.state.pots[0]
			};
			playerWins([player2]);
		});
		$("#button-9").click(function() {
			//	both players win
			var players = [{ 
				number : 1, 
				winnings : (game.state.pots[0] / 2) | 0
			}, { 
				number : 2, 
				winnings : (game.state.pots[0] / 2) | 0
			}];
			playerWins(players);
		});
		$("#button-10").click(function() {
			//	change background
			var newBackground = game.view.background % game.view.numOfBackgrounds + 1;
			changeBackground(newBackground);
			
		});
		
		for (slotNum = 1; slotNum <= 5; slotNum++) {
			cardId = "#slot-" + slotNum;
			$(cardId).flip();
			$(cardId).click(function() {
				var sound = new Audio('audio/card-flip.mp3');
				sound.play();
			});
			$(cardId).flip(true);
		}
		$(".bottom-card").flip();
		$(".bottom-card").click(function() {
			var sound = new Audio('audio/card-flip.mp3');
			sound.play();
		});
		$(".top-card").flip();
		$(".top-card").click(function() {
			var sound = new Audio('audio/card-flip.mp3');
			sound.play();
		});
		$("#top-of-stack").flip({trigger: "manual"});

		var dealer1 = $('#player-1-dealer');
		var dealer2 = $('#player-2-dealer');
		dealer1.click(function() {
			dealer2.show();
			dealer1.hide();
		});
		dealer2.click(function() {
			dealer1.show();
			dealer2.hide();
		});
		dealer2.hide();
		$("body").css({display: "initial"});

		$("#player-1-cash").html(game.state.players[0].cash);
		$("#player-2-cash").html(game.state.players[1].cash);
	});

	