const Router = require('express').Router
const User = require('../models/users');
const Blog = require('../models/blog');
const router = Router();
const passport = require('passport');
const errors = [];
const middleWare = require('./middleware');
const regexPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
const regexMail = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"

function isPasswordGood(password){
    if(password.search(regexPassword) <= -1){
        return false
    }
        return true
};

function isMailGood(email){
    if(email.search(regexMail) <= -1){
        return false
    }
        return true
};


router.post("/register", (request, response, next)=>{
    if (!isPasswordGood(request.body.password)){
        errors.push({msg:'Password must have numbers,et special signes'})
        console.log(errors)
        response.render('register', {errors})
    } 
    else if(!isMailGood(request.body.email)){
        errors.push({msg:'Email adress do not have a correct format'})
        console.log(errors)
        response.render('register', {errors})
    }
    else{
        User.insertUser(request.body);
        response.redirect('/login')
        
    }
});

router.post('/login', (request, response, next)=>{
    passport.authenticate('local', {
        successRedirect: '/blog',
        failureRedirect: '/login',
        failureFlash: 'wrong password'
      })(request, response, next);
});

router.get('/logout', (request, response, next)=>{
    request.logout();
    response.redirect('/login')
});


router.get('/blog',  async (request,response, next)=>{
    if (request.user === undefined){
        request.sendStatus(401)
    } 
    const messages = await Blog.getPosts(request.user)
    response.send(messages) 
});

router.post('/blog', async (request,response, next)=>{
    console.log('/blog', request.body)
    await Blog.addPost(request.user, request.body);
    response.send(await Blog.getPosts(request.user)) 
    
});


module.exports = router