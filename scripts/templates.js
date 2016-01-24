var T = {};

// Chargement des templates aupr�s d'OpenDoor
function loadTemplates() {
	$.ajax({
		url: '?m=templates',
		success: function(data) {
			$.each(data, function(k, v) {T[k] = $(v);});
		},
		error: function(data) {
			console.log('Failed to load templates');
		},
		timeout: 100,
		async: false,
	});
}

loadTemplates();