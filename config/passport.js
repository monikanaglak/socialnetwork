const LocalStrategy = require('passport-local').Strategy;

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
            });
            
        }))
    passport.serializeUser((user, done)=>{
        if (!user.id && user._id){
            console.error('Change user._id in password.js')
        }
        done(null, user._id)
    })
    
    passport.deserializeUser((id, done)=>{
        // id -> done(null, user)
        User.getUserById(id).then((user)=>{
            done(null, user)
        }).catch((error)=>{
            console.error(errors)
        })
    })
}



module.exports = {
    connect
}