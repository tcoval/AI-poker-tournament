function startNyanCats() {
	if (viewOptions.background == viewOptions.numOfBackgrounds) {
		nyanCat();
		setTimeout(function() {
			startNyanCats();
		}, 20000);
	}
}

function nyanCat() {
	var nyanCat = $(".nyan-cat").clone();
	var id = Math.random();
	nyanCat.prependTo($(".container"));
	nyanCat.attr("id", id);
	var startSideNum = Math.floor(Math.random() * 4);
	var endSideNum = Math.floor(Math.random() * 3);
	if (endSideNum >= startSideNum) endSideNum++;
	var pos = {};
	switch (startSideNum) {
		case 0:  	//left
			pos.startX = -nyanCat.width();
			pos.startY = Math.floor(Math.random() * $(window).height());
			break;
		case 1:  	//top
			pos.startX = Math.floor(Math.random() * $(window).width());
			pos.startY = -nyanCat.height();
			break;
		case 2:  	//right 
			pos.startX = $(window).width() + nyanCat.width();
			pos.startY = Math.floor(Math.random() * $(window).height());
			break;
		case 3:  	//bottom
			pos.startX = Math.floor(Math.random() * $(window).width());
			pos.startY = $(window).height() + nyanCat.height();
			break;
		default:
			alert("there has been an error"); 		//	remove later for testing only
	}
	switch (endSideNum) {
		case 0:  	//left
			pos.endX = -nyanCat.width();
			pos.endY = Math.floor(Math.random() * $(window).height());
			break;
		case 1:  	//top
			pos.endX = Math.floor(Math.random() * $(window).width());
			pos.endY = -nyanCat.height();
			break;
		case 2:  	//right 
			pos.endX = $(window).width() + nyanCat.width();
			pos.endY = Math.floor(Math.random() * $(window).height());
			break;
		case 3:  	//bottom
			pos.endX = Math.floor(Math.random() * $(window).width());
			pos.endY = $(window).height() + nyanCat.height() ;
			break;
		default:
			alert("there has been an error"); 		//	remove later for testing only
	}

	var width = pos.startX - pos.endX;
	var height = pos.startY - pos.endY;
	var distance = Math.floor(Math.sqrt((width * width) + (height * height)));
	var degrees;
	var catCanvas = $("<canvas class=\"nyan-canvas\" width=\"" + distance + "px\" height=\"46px\">");
	catCanvas.attr("id", id);
	catCanvas.prependTo($(".container"));
	nyanCat.css({
		top : pos.startY,
		left : pos.startX
	});
	catCanvas.css({
		top: Math.floor((pos.startY + pos.endY) / 2),
		left : Math.floor((pos.startX + pos.endX) / 2),
		"margin-top": Math.floor(-catCanvas.height() / 2),
		"margin-left": Math.floor(-catCanvas.width() / 2)
	});
	
	if (pos.startX <= pos.endX) {
		degrees = Math.atan(height / width) / Math.PI * 180.0;
		var cssRotate = {
			'-webkit-transform' : 'rotate('+ degrees +'deg)',
        	'-moz-transform' : 'rotate('+ degrees +'deg)',
        	'-ms-transform' : 'rotate('+ degrees +'deg)',
        	'transform' : 'rotate('+ degrees +'deg)'
        };
		nyanCat.css(cssRotate);
		catCanvas.css(cssRotate);
	} else {
		degrees = Math.atan(-height / width) / Math.PI * 180.0;

		var cssRotate = {
			'-webkit-transform' : 'scaleX(-1) rotate('+ degrees +'deg)',
        	'-moz-transform' : 'scaleX(-1) rotate('+ degrees +'deg)',
        	'-ms-transform' : 'scaleX(-1) rotate('+ degrees +'deg)',
        	'transform' : 'scaleX(-1) rotate('+ degrees +'deg)'
        };
    	nyanCat.css(cssRotate);
		catCanvas.css(cssRotate);
	}
	nyanCat.show();
	var startTime = new Date().getTime();
	nyanCat.animate({ 
		"top" : pos.endY, 
		"left" : pos.endX 
	}, {
		duration : distance * 10,
		easing : "linear",
		step : function() {
			var percentDone = (new Date().getTime() - startTime) / (distance * 10);
			var currCanvas = $('.nyan-canvas, #' + $(this).attr("id")).get()[0];
			var ctx = currCanvas.getContext('2d');
			var tail = document.getElementsByClassName('nyan-cat-tail')[0];
			ctx.drawImage(tail, Math.floor(distance * percentDone), 0);
		},
		complete : function() {
			var canvasId = $(this).attr("id");
			this.remove();
			setTimeout(function() {
				var oldTail = $('.nyan-canvas, #' + canvasId);
				oldTail.animate({"opacity" : "0.0"}, 5000, function() {
					this.remove();
				});
			}, 30000);
		}
	});
}