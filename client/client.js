
function sendData(){
    const data = {
        name:document.getElementById('name').value,
        nom:document.getElementById('nom').value,
        email:document.getElementById('email').value,
        nickname : document.getElementById('nickname').value,
        password: document.getElementById('password').value,
        isWomen:document.getElementById('inlineCheckbox1').checked
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data), //sending data as a string//
        headers: {
            'Content-type':'application/json' //meta information//
        }
    };
    fetch('http://localhost:5000/register', options)
        .then(response => response.json())
        .then(response => console.log(json))
};

function sendingLogin(){
    const dataLogin = {
        name:document.getElementById('name').value,
        password: document.getElementById('password').value,
    }
    const optionsLogin = {
        method: 'POST',
        body: JSON.stringify(dataLogin), //sending data as a string//
        headers: {
            'Content-type':'application/json' //meta information//
        }
    };
    fetch('http://localhost:5000/login', optionsLogin)
        .then(response => response.json())
        .then(response => console.log(json))
};
// socket io//
var socket = io.connect('http://localhost:5000');
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Emit events//
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

// Listen for events//
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});