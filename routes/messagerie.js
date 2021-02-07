const Router = require('express').Router;
const router = Router();
const Messagerie = require('../models/messagerie');


router.get('/messagerie', async (request,response, next)=>{
       let messages = await Messagerie.getMessages(request.user)
       console.log('messages', messages)
       if(messages === null){
           message = []
       }
       response.send(messages)
});
router.post('/messagerie', async (request,response, next)=>{
    //console.log(request.user)
    //response.sendStatus(201)
   await Messagerie.addMessage(request.body.destinateur, request.body.textMessage, request.user);
   response.send(await Messagerie.getMessages(request.user))
})








module.exports = router
