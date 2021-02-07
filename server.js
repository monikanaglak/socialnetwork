const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const connect = require('./config/passport').connect;
const routesUser = require('./routes/user');
const routesPage = require('./routes/pages');
const routesComment = require('./routes/comments');
const routesMessagerie = require('./routes/messagerie');
app.set('view engine', 'ejs');
connect(passport);

app.use(expressLayouts);
app.use('/client', express.static('client'));
app.use('/style', express.static('style'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize()); 
app.use(passport.session());
app.use(flash());


app.use('/api', routesUser);
app.use('/api', routesComment);
app.use('/api', routesMessagerie);
app.use('', routesPage );


const server = app.listen(5000,()=>{
    console.log("server listen on port 5000")
});

//PARTIE SOCKET//
const io = socket(server);
io.on("connection", function(socket){
    console.log("you made socket connection", socket.id)
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
});

