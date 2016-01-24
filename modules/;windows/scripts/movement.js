// Pour d�placer les fen�tre ou plus ?
var moving = null;
var resizing = null;
var startx, starty;

// Si la souris bouge
$(document).mousemove(function(event){
	var main = $('#desktop');
	
	// Si un objet doit �tre d�plac�
	if (moving) {
		
		// Si l'�l�ment est affich� en plein �cran !
		if (event.pageY < 1) {
			moving.addClass('maximized');
		
		// Sinon on arr�te le fullscreen
		} else if (moving.hasClass('maximized')) {
			moving.removeClass('maximized');
			var left = event.pageX - (moving.outerWidth()/2);
			moving.offset({left: left, top: 0});
		}
		
		// S'il est d�j� "grab"
		if (moving.grabbed) {
			var u = startx + event.pageX;
			var v = starty + event.pageY;
			moving.offset({left: u, top:v});
			
		// Sinon le "grab"
		} else {
			var offset = moving.offset();
			startx = offset.left - event.pageX;
			starty = offset.top - event.pageY;
			moving.grabbed = true;
		}
		
		// Constrain
		constrainInto(moving, main);
		
	// Redimensionnement d'une fenetre
	} else if (resizing) {
		
		// S'il est d�j� attrap�
		if (resizing.sizing) {
			var offset = resizing.offset();
			var h = constrain(starty + event.pageY, 0, main.outerHeight() - offset.top);
			var w = constrain(startx + event.pageX, 0, main.outerWidth() - offset.left);
			resizing.outerHeight(h);
			resizing.outerWidth(w);
			
		// Sinon on l'attrape pour l'�tirer
		} else {
			
			// On vire le fullscreen au cas o�
			if (resizing.hasClass('maximized')) {
				
				// On arr�te le fullscreen
				resizing.removeClass('maximized');
				
				// On applique une petite transformation pour tout bien caler
				var offset = resizing.offset();
				resizing.outerHeight(main.outerHeight() - offset.top);
				resizing.outerWidth(main.outerWidth() - offset.left);
			}
			
			// On initialise le redimensionnement
			startx = resizing.outerWidth() - event.pageX;
			starty = resizing.outerHeight() - event.pageY;
			resizing.sizing = true;
		}
		
		// constrainInto(resizing, document);
	}
});

// On relache la souris
$(document).mouseup(function(){
	var html = $('html');
	html.removeClass('moveCurs');
	html.removeClass('resizeCurs');
	
	if (resizing) delete resizing.sizing;
	if (moving) delete moving.grabbed;
	
	resizing = null;
	moving = null;
});