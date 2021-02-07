const mongoClient = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID;   


async function getPosts(user){
    // give back post from the user//
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
module.exports = {
    addPost,
    getPosts,
}