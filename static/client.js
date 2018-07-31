var socket = new WebSocket("ws://localhost:8081");
var messageList = document.querySelector('#js-messages');

function createMessage(message) {
  var li = document.createElement('li');
  li.textContent = message;

  messageList.appendChild(li);
}

socket.onmessage = function(event) {
  var message = JSON.parse(event.data);

  if (Array.isArray(message)) {
    message.forEach(createMessage);
  } else {
    createMessage(message);
  }
}

var form = document.querySelector('form');
form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  var message = this.message.value.trim();

  if (!!message.length) {
    socket.send(message);
    this.message.value = '';
  } else {
    alert('Empty input');
  }
  
});