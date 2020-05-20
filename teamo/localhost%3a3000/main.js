window.onload = function(e){
	init();
}

function init() {
	
	jQuery("#instagram-embed-0 a").click(function(event) {
		debugger;
		event.preventDefault();
	});
	var myElement = document.getElementById('instagram-embed-0');

	// create a simple instance
	// by default, it only adds horizontal recognizers
	var mc = new Hammer(myElement);
	
	// listen to events...
	mc.on("panleft panright tap press", function(ev) {
		myElement.textContent = ev.type +" gesture detected.";
	});
}