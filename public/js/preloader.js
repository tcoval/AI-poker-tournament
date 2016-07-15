
var images = preloadImages(getImagePaths());
var sounds = preloadSounds(getSoundPaths());
	

function preloadImages(imagePaths) {
	var images = [];
	for (var imagePath = 0; imagePath < imagePaths.length; imagePath++) {
		var img = new Image();
		img.src = imagePaths[imagePath];
		images.push(img);
	}
	return images;
}

function preloadSounds(soundPaths) {
	var sounds = [];
	for (var soundPath = 0; soundPath < soundPaths.length; soundPath++) {
		sounds.push(new Audio(soundPaths[soundPath]));
	}
	return sounds;
}

function getSoundPaths() {
	return [
		//"audio/5-second-count.mp3",
		"audio/bet.mp3",
		"audio/bet-2.mp3",
		"audio/bet-3.mp3",
		"audio/bet-4.mp3",
		"audio/card-flip.mp3",
		"audio/card-flip-2.mp3",
		"audio/card-flip-3.mp3",
		"audio/check.mp3",
		"audio/shuffle.mp3"
	];
}

function getImagePaths() {
	var genImagePaths = [
		"img/dealer-chip.png",
		"img/name-plate.png",
		"flappy-background.png",
		"flappy-bird-0.png",
		"flappy-bird-1.png",
		"flappy-bird-2.png",
		"flappy-pipe.png",
		"img/poker-chip-blue.png",
		"img/poker-chip.png",
		"img/table.png",
		"img/nyan-cat.gif",
		"img/nyan-cat-tail.jpg",
		"img/cards/blank.png",
		"img/backgrounds/background-1.jpg",
		"img/backgrounds/background-2.jpg",
		"img/backgrounds/background-3.jpg",
		"img/backgrounds/background-4.jpg",
		"img/backgrounds/background-5.jpg",
		"img/backgrounds/background-6.jpg"
	];

	var cardImagePaths = getCardImagePaths();

	return genImagePaths.concat(cardImagePaths);
}

function getCardImagePaths() {
	var suits = [ "club", "diamond", "heart", "spade" ];
	var pips = [ "ace", "two", "three", "four",
		"five", "six", "seven", "eight", "nine", "ten",
		"jack", "queen", "king" ];
	var cardImagePaths = [];
	for (var suit = 0; suit < suits.length; suit++) {
		for (var pip = 0; pip < pips.length; pip++) {
			cardImagePaths.push("img/cards/" + suits[suit] + "-" + pips[pip] + ".png");
		}
	}
	return cardImagePaths;
}