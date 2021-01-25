const Router = require('express').Router
const router = Router()
const Blog = require('../models/blog');
const mongoClient = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID; 
const User = require("../models/users");

function mustAuth(request, response, next){
    if (request.user === undefined){
        response.redirect('/login')
    }
    else{
        next()
    }
}

router.get('/blog', mustAuth ,(request,response, next) => {
    const db = mongoClient.db('socialnetwork');
    const blogs = db.collection('blogs');
    const koleckja = db.collection('users');
    const userId = request.user._id 
    //blogs.find({userId:ObjectID}, function(err, data){
        blogs.find({userId: ObjectID(userId)}).toArray(function(err, posts){
        if(err)throw err;
    
        else{
            response.render('blog', {posts:posts} )
            
        }
        
    })
})
router.get('/search/:query', async (request,response)=>{
    let query = request.params.query;
    const resultArray = await User.searchUser(query).limit(10).toArray()
   

    response.render('search', {resultArray: resultArray})
    });
    
    
    

router.post("/search", (request,response)=>{
     var item= request.params.query;
     resultArray.push(item);
            response.render('/search')
        }
    )

router.get("/register", (request,response,next)=>{
    response.render('register')
});
router.get('/login', (request, response)=>{
    const message = request.flash();
    response.render('login', {message});
});
router.get('/layout', (request,response)=>{
    response.render('layout')
});
router.get('/', (request,response)=>{
    response.render('login');
});
router.get('/admin', (request,response)=>{
    response.render('admin');
});

module.exports = router
