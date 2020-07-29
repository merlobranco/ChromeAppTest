'use strict';

var appId = 'fhnjkpcaeknjjppjdejmgcndeehelggb';

var request = {
	position: 0,
	onSuccess: function(item) {
		process(item);
	},
	onError: function() {

	}
};

request.onSuccess = function(item) {
		process(item);
	};

function handleAnswer(response) {
	if (!response || !response.message)
		return;

	console.log(response.message);
		
	// document.getElementById('greeting-answer').innerText = response.farewell;
};

// document.getElementById('greeting-btn').onclick = function() {
// 	chrome.runtime.sendMessage(appId, {greeting: "hello"},
// 		function(response) {
// 			handleAnswer(response);
// 		});
// };

function setPosition(position) {
	console.log(JSON.stringify(request));
  console.log('Position: ' + position);
  request.position = position;
  console.log(JSON.stringify(request));
  console.log(request.toString());
  chrome.runtime.sendMessage(appId, request,
	function(response) {
		process(response);
	});
  // chrome.serial.send(connectionId, str2ab(position), function() {});
};

function process(item) {  
  if (!item || item.length < 2)
    return;

  let data = item.substring(0, item.length - 1);
  let command = item.substring(item.length - 1, item.length);

  switch (command) {
    case "a": // Light on and off
      console.log("CMD[a]: " + data);
      let opacity = isNaN(parseInt(data)) ? 0 : parseInt(data);
      document.getElementById('image').style.opacity = (opacity * 0.7) + 0.3;
    break;
    case "b": // Return blink length value
      console.log("CMD[b]: " + data);
    break;
    case "c": // Blink Count
      console.log("CMD[c]: " + data);
      document.getElementById('blinkCount').innerText = data;
    break;    
  }
}


document.getElementById('position-input').onchange = function() {
	setPosition(parseInt(this.value, 10));
};