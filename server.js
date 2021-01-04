const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const assert = require('assert'); 
const passport = require('passport');
const router = require("./routes/user");
const connect = require('./config/passport').connect


app.set('view engine', 'ejs');
connect(passport);
app.use(expressLayouts);
app.use('/client', express.static('client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: true
    
}))


app.use('/api', router);

app.get('/login', (request, response)=>{
    response.render('login');
});
app.get('/register', (request,response)=>{
    response.render('register')
});
app.get('/blog', (request,response)=>{
    response.render('blog');
});
app.post('/blog', (request,response)=>{
    response.render('blog')
})
app.get('/layout', (request,response)=>{
    response.render('layout')
});
app.get('/', (request,response)=>{
    response.render('login');
});
app.post('/',(request, response)=>{
    console.log(request.body);
});
app.get('/admin', (request,response)=>{
    response.render('admin');
});







const server = app.listen(5000,()=>{
    console.log("server listen on port 5000")
});

//PARTIE SOCKET//
const io = socket(server);
io.on("connection", function(socket){
    console.log("you made socket connection", socket.id)
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
});

