const mongoClient = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID;   


async function getPosts(user){
    // retourner les messages de lutilsateur
    const db = mongoClient.db('socialnetwork');
    const blogs = db.collection('blogs');
    const result = await blogs.findOne({userId:ObjectID(user._id)})
    return result 
}

function addPost(user, blog){
    const db = mongoClient.db('socialnetwork');
    const blogs = db.collection('blogs');
    const posts  = blog.item;
    blogs.findOne({userId: ObjectID(user._id)}).then(existingBlog=>{
        console.log('existingBlong', existingBlog)
        if (existingBlog === null){
            return blogs.insertOne({
                userId: user._id,
                posts:[{item : blog.item, id: new ObjectID()}],
                comments:[],
                date: Date()
                
            })  
        }
        else{
            return blogs.updateOne
                            ({ userId:ObjectID(user._id)}, 
                            {$push: {posts: {item: blog.item, id: new ObjectID()}}}).then(val=>{
                               
                            }).catch(err=>{
                                console.log(err)
                            }); 
        }
   })
   
}

function sendComment(user, comment){
    const db = mongoClient.db('socialnetwork');
    const blogs = db.collection('blogs');
    const comments = comments.item; 
    blogs.findOne({userId: ObjectID(user._id)}).then(existingComments=>{
        console.log('existingComments', existingComments)
        if (existingComments === null){
            return blogs.insertOne({
                userId: user._id,
                comments:[comment.item],
                date: Date()
                
            })
        }
        else{
            return blogs.updateOne
                            ({ userId:ObjectID(user._id)}, 
                            {$push: {comments: comment.item}}).then(val=>{
                               
                            }).catch(err=>{
                                console.log(err)
                            }); 
        }
   })
   
}

function deletePost (user,blog){
    const db = mongoClient.db('socialnetwork');
    const blogs = db.collection('blogs');
    //blogs.remove({}) posts are in array
}

/*comments
db.posts.update({title:'post one'},
               {
                   $set : {
                       comments:[
                           {
                               user:'marry',
                               body:'great post',
                               date:Date()
                           }
                       ]
                   }
               }
        )
        */    
module.exports = {
    addPost,
    getPosts,
    sendComment
    
}