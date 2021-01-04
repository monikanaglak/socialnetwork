const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const client = new MongoClient("mongodb://localhost:27017",{useNewUrlParser: true});

console.log('start')


function getUser(email){
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const user = koleckja.findOne({email:email})
    return user
};
function getUserById(id){
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const user = koleckja.findOne({_id:id})
    return user
}

function checkPassword(hashedPassword, notHashedPassword){
    console.log(hashedPassword, notHashedPassword)
    const hash = bcrypt.hashSync(notHashedPassword, saltRounds);
    console.log(hashedPassword, '===' ,hash)
    // fix this later
    return true
    return hashedPassword === hash
}


function insertUser(user){
    console.log('in insert user')
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const password = user.password
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log('in hash')
        koleckja.insertOne({
            name:user.name,
            nom:user.nom,
            email:user.email,
            nickname:user.nickname,
            password:hash,
            isWomen:user.isWomen,
            aboutme:"",
            friends:[],
            notifications:[],
            posts:[]
        });
    });
};

client.connect(err=>{
    if(err){
        console.log('Sorry you are not connected', err)
    }else{
        console.log('Connected to the database')
    }
});

module.exports = {
    insertUser,
    getUser,
    checkPassword
}