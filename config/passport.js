const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('../models/users');

function connect(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          console.log('called local', email, password)
            const user = User.getUser(email).then((user)=>{ 
              console.log(user, User.checkPassword(user.password, password))
                if(!user){
                  return done(null, false)
                }
                else{
                    if (!User.checkPassword(user.password, password)){
                       return done(null, false)
                    }
                     return done(null, user);
               }
           }).catch(err=>{
               return done(null, false)
           });
            
       }))
        
    passport.serializeUser((user, done)=>{
        console.log('serialize', user._id)
        done(null, user._id)
    })
    
    passport.deserializeUser((id, done)=>{
        console.log('deserialize', id)
        User.getUserById(id).then((user)=>{
            console.log('user', user)
            done(null, user)
        }).catch((error)=>{
            console.error(errors)
        })
    })
}



module.exports = {
    connect
}