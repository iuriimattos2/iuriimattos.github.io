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
	// by default, it only adds hor	izontal recognizers
	var mc = new Hammer(myElement);
	
	// listen to events...
	mc.on("panleft panright tap press", function(ev) {
		myElement.textContent = ev.type +" gesture detected.";
	});
	// using reference to iframe (myElement) obtained above
	var myElement = document.getElementById('instagram-embed-0');
	var win = myElement.contentWindow; // reference to iframe's window
	// reference to document in iframe
	var myElement = document.getElementById('instagram-embed-0');
	var doc = myElement.contentDocument? myElement.contentDocument: myElement.contentWindow.document;
	// reference to form named 'demoForm' in iframe
	var form = doc.getElementById('demoForm');	
	console.log(form)
}