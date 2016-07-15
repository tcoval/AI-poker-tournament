
var nyanCats = {};

/*
	Spawns Nyan cats on the screen at a set interval. 
	Spawning will stop if the background is changed.
*/
function spawnNyanCats() {
	if (game.view.background == game.view.numOfBackgrounds) {
		var nyan = new NyanCat();
		nyan.startAnimation();

		setTimeout(function() {
			spawnNyanCats();
		}, game.view.nyanCat.spawnDelay);
	}
}

function timeOutFunc(id) {
	setTimeout( function() {
		var nyanCat = nyanCats[id];
		nyanCat.tailCanvas.animate({"opacity" : "0.0"}, 
		game.view.nyanCat.tailFadeDuration, function() { 
			this.remove();
			delete nyanCats[id];
		});
	}, game.view.nyanCat.tailDuration);
}

/*
	Initializes a Nyan cat with random start and end coordinates.
*/
function NyanCat() {

	/*
		Removes the catImage from the page and deletes it. 
		Sets a timeout for fade out and deletion of the tail canvas.
	*/
	this.animationCompleteFunction = function() {
		var id = this.classList[1];
		var nyanCat = nyanCats[id];
		nyanCat.catImage.remove();
		timeOutFunc(id);
	};

	/*
		Updates the cats canvas tail each step of the animation.
	*/
	this.animationStepFunction = function() {
		var id = this.classList[1];
		var nyanCat = nyanCats[id];
		var img = document.getElementById("nyan-cat-tail");
		var timeDiff = new Date().getTime() - nyanCat.animationStartTime;
		var percentDone = timeDiff / (nyanCat.distance * game.view.nyanCat.speedModifier);
		var distanceCovered = Math.floor(nyanCat.distance * percentDone);
		distanceCovered -= distanceCovered % 17;

		var y = Math.floor(((Math.sin(((distanceCovered / 34) * 2 * Math.PI) + 1) / 2) * 3) + 0.5);

		var ctx = nyanCat.tailCanvas.get()[0].getContext('2d');
		
		ctx.drawImage(img, distanceCovered, y);
	};

	/*
		Sets up the position, orientation for the cats starting position, 
		and initiates the animation.
	*/
	this.startAnimation = function() {
		this.catImage.show();
		this.tailCanvas.show();

		this.animationStartTime = new Date().getTime();

		var cssChange = { 
			"top" : this.coords.endY, 
			"left" : this.coords.endX 
		};

		var animationSettings = {
			duration : this.distance * game.view.nyanCat.speedModifier,
			easing : "linear",
			step : this.animationStepFunction,
			complete : this.animationCompleteFunction
		};

		this.catImage.animate(cssChange, animationSettings);
	};

	/*
		Sets the starting position of both the cat and its underlying canvas tail.
	*/
	this.setStartPositions = function() {
		this.catImage.prependTo($(".container"));
		this.tailCanvas.prependTo($(".container"));

		this.catImage.css({
			top : this.coords.startY,
			left : this.coords.startX
		});
		this.tailCanvas.css({
			top: Math.floor((this.coords.startY + this.coords.endY) / 2),
			left : Math.floor((this.coords.startX + this.coords.endX) / 2),
			"margin-top": Math.floor(-46 / 2),
			"margin-left": Math.floor(-this.distance / 2)
		});
	};

	/*
		Rotates and performs a horizontal flip if necessary to orientate the cat
		and tail canvas for animation.
	*/
	this.setOrientation = function() {
		var scale = 1;
		var degrees = Math.atan(this.height / this.width) / Math.PI * 180;
		if (this.coords.startX > this.coords.endX) {
			scale *= -1;
			degrees *= -1;
		}

		var cssRotate = {
			'-webkit-transform' : 'scaleX(' + scale + ') rotate('+ degrees +'deg)',
        	'-moz-transform' : 'scaleX(' + scale + ') rotate('+ degrees +'deg)',
        	'-ms-transform' : 'scaleX(' + scale + ') rotate('+ degrees +'deg)',
        	'transform' : 'scaleX(' + scale + ') rotate('+ degrees +'deg)'
        };

		this.catImage.css(cssRotate);
		this.tailCanvas.css(cssRotate);
	};

	/*
		Generates precise starting and ending X and Y values for the Nyan cats animation.
	*/
	this.genCoords = function() {
		//	Select two different sides of the screen as the cats general starting and ending location
		var startSideNum = Math.floor(Math.random() * 4);
		var endSideNum = Math.floor(Math.random() * 3);
		if (endSideNum >= startSideNum) endSideNum++;

		var startPos = this.genRandomCoordsForSide(startSideNum);
		var endPos = this.genRandomCoordsForSide(endSideNum);
		return { startX : startPos.x, startY : startPos.y, endX : endPos.x, endY : endPos.y };
	};

	/*
		Given a number 0 - 3 inclusive (representing the 4 sides of the screen) this function 
		will return a coordinate point along that particular side.
	*/
	this.genRandomCoordsForSide = function(sideNum) {
		var pos = {};
		switch (sideNum) {
			case 0:  	//left
				pos.x = -130;
				pos.y = Math.floor(Math.random() * $(window).height());
				break;
			case 1:  	//top
				pos.x = Math.floor(Math.random() * $(window).width());
				pos.y = -130;
				break;
			case 2:  	//right 
				pos.x = $(window).width() + 130;
				pos.y = Math.floor(Math.random() * $(window).height());
				break;
			case 3:  	//bottom
				pos.x = Math.floor(Math.random() * $(window).width());
				pos.y = $(window).height() + 130;
				break;
			default:
				alert("there has been an error"); 		//	remove later for testing only
		}
		return pos;
	};

	this.id = '' + Math.floor(Math.random() * 10000000000);
	nyanCats[this.id] = this;
	this.catImage = $('img.nyan-cat.original').clone();
	this.catImage.addClass(this.id);
	this.catImage.removeClass('original');
	this.tailCanvas = $('canvas.nyan-canvas.original').clone();
	this.tailCanvas.addClass(this.id);
	this.tailCanvas.removeClass('original');
	this.coords = this.genCoords();
	this.width = this.coords.startX - this.coords.endX;
	this.height = this.coords.startY - this.coords.endY;
	this.distance = Math.floor(Math.sqrt((this.width * this.width) + (this.height * this.height)));
	this.tailCanvas.attr('height', '46px');
	this.tailCanvas.attr('width', this.distance + 'px');
	this.setStartPositions();
	this.setOrientation();

}