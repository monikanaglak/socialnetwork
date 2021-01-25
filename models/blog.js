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
                posts:[blog.item],
                comments:[],
                date: Date()
                
            })
        }
        else{
            return blogs.updateOne//({ _id: ObjectID(user._id)}, // Filter
                            ({ userId:ObjectID(user._id)}, // working 
                            {$push: {posts: blog.item}}).then(val=>{
                               //console.log('success?', val)
                            }).catch(err=>{
                                console.log(err)
                            }); // Update
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
    getPosts
    
}