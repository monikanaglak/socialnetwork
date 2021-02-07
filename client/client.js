
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
    fetch('/register', options)
        .then(response => response.json())
        .then(response => console.log(json))
};

//************************************************************Sending data login ***************************************************************/
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
    fetch('/login', optionsLogin)
        .then(response => response.json())
        .then(response => console.log(json))
};
//********************************************************Sending data post ******************************************************************* */
async function sendPost(){                                                  
    const posts = {
        item:document.getElementById('post').value,
    }
    const optionsPost = {
        method: 'POST',
        body: JSON.stringify(posts), 
        headers: {
            'Content-type':'application/json' 
        }
    };
    console.log(posts)
    const json = await fetch('/api/blog', optionsPost)
    console.log(json)
    return await json.json()   
};

//*******************************sending message to user************************************************************************************* */
async function sendMessagerie(){
    const messageUser = {
     destinateur : document.getElementById('userName').value,
     textMessage : document.getElementById('messagerie').value
    }
    const optionsMessage = {
        method: 'POST',
        body: JSON.stringify(messageUser),
        headers: {
            'Content-type':'application/json'
        }
    };
    console.log(message)
    const json = await fetch('/api/messagerie', optionsMessage)
    console.log(json)
    return await json.json()
}

 //****************************************************Sending data comment ********************************************************************//
 async function sendComment(postId){
    const dataComment = {
        postId: postId,
        comment: document.getElementById(postId).value
    }
    const optionsComment = {
        method: 'POST',
        body: JSON.stringify(dataComment),
        headers: {
            'Content-type':'application/json'
        }
    };
    const json = await fetch ('/api/blog/comments', optionsComment)
    
};
//******************************************************Getting comment *************************************************************** */
async function getComment(postId){
    console.log(postId)
    const optionsComment = {
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    };
    return fetch('/api/blog/comments/'+postId, optionsComment)
}




//*************************************************************Getting message ********************************************************** */
function getmessage(){

}
//**********************************************************socket*************************************************************************************//
var socket = io.connect('/');
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
    feedback.innerHTML = '<p><em>' + data + ' is writting ...</em></p>';
});