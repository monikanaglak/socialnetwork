const mongoClient = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID;



async function getMessages(user){
    if (user._id === undefined){
        return null
    }
    const db = mongoClient.db('socialnetwork');
    const messageUsers = db.collection('messagesUsers');
    const result = await messageUsers.findOne({sender:ObjectID(user._id)})
    return result
}

function addMessage(receiver, text, sender){
    const db = mongoClient.db('socialnetwork');
    const messageUsers = db.collection('messageUsers');
    messageUsers.insertOne({receiver: receiver, text: text, sender: sender})
    
}
module.exports = {
    getMessages,
    addMessage
}
