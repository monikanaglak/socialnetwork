
//**************************************************************Sending registration data ********************************************/
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
        body: JSON.stringify(data), 
        headers: {
            'Content-type':'application/json' 
        }
    };
    fetch('http://localhost:5000/register', options)
        .then(response => response.json())
        .then(response => console.log(json))
};

//************************************************************Sending login ***************************************************************/
function sendingLogin(){                                         
    const dataLogin = {
        name:document.getElementById('name').value,
        password: document.getElementById('password').value,
    }
    const optionsLogin = {
        method: 'POST',
        body: JSON.stringify(dataLogin), 
        headers: {
            'Content-type':'application/json'
        }
    };
    fetch('http://localhost:5000/login', optionsLogin)
        .then(response => response.json())
        .then(response => console.log(json))
};
//********************************************************Sending post ******************************************************************* */
async function sendPost(){                                                  
    const posts = {
        item:document.getElementById('post').value,
    }
    const optionsPost = {
        method: 'POST',
        body: JSON.stringify(posts), //sending data as a string//
        headers: {
            'Content-type':'application/json' //meta information//
        }
    };
    console.log(posts)
    const json = await fetch('http://localhost:5000/api/blog', optionsPost)
    console.log(json)
    return await json.json()   //? json avec method json? czy await to promis 
};
 //****************************************************sending comment **********************************************************************//
 async function sendingComment(postId){
    const dataComment = {
        postId: postId,
        comment: document.getElementsByClassName('myComment')[0].value
    }
    const optionsComment = {
        method: 'POST',
        body: JSON.stringify(dataComment),
        headers: {
            'Content-type':'application/json'
        }
    };
    const json = await fetch ('http://localhost:5000/api/blog/comments', optionsComment)
    
};

/*
const axios = require('axios');
const userPost = {
    _id:ObjectID,
    post:document.getElementById('item').value;
}
async function addPost(x){
    
    let resultat = await axios.post('http://localhost:5000/blog', postUser)
    
*/

//****************************************/ socket io **************************************************************************//
var socket = io.connect('http://localhost:5000');
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

//*****************************************Emit events *************************************************************************//
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

//*******************************************/ Listen for events **************************************************************//
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is writting something...</em></p>';
});