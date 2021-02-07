const mongo = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const client = require('../config/mongo').client
const ObjectID = require('mongodb').ObjectID;   
const { request } = require('express');

function getUser(email){
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const user = koleckja.findOne({email:email})
    return user
};

function getUserById(id){
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const user = koleckja.findOne({_id: new ObjectID(id)})
    return user
};

function checkPassword(hashedPassword, notHashedPassword){
    return bcrypt.compareSync(notHashedPassword, hashedPassword)
};

function searchUser(username){
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const regex = '^' + username.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const user = koleckja.find({ "name": {"$regex": regex, '$options': 'i'}})
    return user
};

function insertUser(user){
    console.log('in insert user')
    const db = client.db('socialnetwork');
    const koleckja = db.collection('users');
    const password = user.password
    const hash = bcrypt.hashSync(password, saltRounds);
    console.log('Hashed password on Insert', hash, password)
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
};

module.exports = {
    insertUser,
    getUser,
    checkPassword,
    getUserById,
    searchUser
}