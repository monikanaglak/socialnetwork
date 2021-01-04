const Router = require('express').Router
const User = require('../models/users')//tutaj pobieramy polaczenia mongodb uzytkownika i wkladamy do zmiennej User//
const router = Router()
const passport = require('passport');

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

router.get("/register", (request,response,next)=>{
    response.render('register')
});
router.post("/register", (request, response, next)=>{
    let errors = [];
    if (!isPasswordGood(request.body.password)){
        errors.push({msg:'Password must have numbers,et special signes'})
        console.log(errors)
        response.render('register', {errors})
        //response.status(400).send("Invalid password");
    } 
    else if(!isMailGood(request.body.email)){
        response.status(400).send("Invalid email");
    }
    
    else{
        User.insertUser(request.body);
        response.sendStatus(201);
    }
});
router.post('/login', (request, response, next)=>{
    passport.authenticate('local', {
        successRedirect: '/blog',
        failureRedirect: '/login',
        failureFlash: true
      })(request, response, next);
})
router.get('/logout', (request, response, next)=>{
    request.logout();
    response.redirect('/login')
})
module.exports = router