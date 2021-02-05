const mongoClient = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID; 

async function getComment(user, postId){
    const db = mongoClient.db('socialnetwork');
    const comments = db.collection('comments');
    const result = await comments.findOne({postId: ObjectID(postId)})
    if (result === null){
        return {}
    }
    return result 
}

function addComment(user, comment){
    const db = mongoClient.db('socialnetwork');
    const comments = db.collection('comments');
    
    // comment = {postId: "ewewewe", comment: "Hello"}
    comments.findOne({postId: ObjectID(comment.postId)}).then(existingComment=>{
        if (existingComment === null){
            return comments.insertOne({
                postId: ObjectID(comment.postId),
                comments: [{item: comment.comment, userId: ObjectID(user._id)}]
            })  
        }
        else{
            return comments.updateOne 
                            ({ postId: ObjectID(comment.postId)}, 
                            {$push: {comments: {item: comment.comment, userId: ObjectID(user._id)}}}).then(val=>{
                            }).catch(err=>{
                                console.log(err)
                            }); 
        }

    })
}
module.exports = {
    getComment,
    addComment
} 