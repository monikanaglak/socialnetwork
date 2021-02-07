const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const urlDb = 'mongodb+srv://monika:matisse@cluster0.zdf0i.mongodb.net/test';
const client = new MongoClient(urlDb,{useNewUrlParser: true});
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