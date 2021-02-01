const Router = require('express').Router;
const router = Router();
const Comment = require('../models/comments');

router.get('/blog/comments/:id', async (request,response,next)=>{
    let postId = request.params.id;
    const comments = await Comment.getComment(request.user, postId)
    response.send(comments)
});

router.post('/blog/comments', async (request,response, next)=>{
    console.log(request.body);
    const user = request.user;
    const comment = request.body;
    const comments = await Comment.addComment(user,comment)
    response.sendStatus(201)
})
module.exports = router;