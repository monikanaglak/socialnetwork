const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient("mongodb://localhost:27017",{useNewUrlParser: true});
client.connect(err=>{
    if(err){
        console.log('Sorry you are not connected', err)
    }else{
        console.log('Connected to the database')
    }
});

module.exports = {
    client
}