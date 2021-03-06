
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// var { mongoose } = require('./mongoose');
var { User } = require('./user');
var bodyParser = require('body-parser');
let cors = require('cors');
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults()
// server.use(middlewares)

const port = process.env.PORT || 3000;
let players = [];

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.get('/', (req, res) => {
    res.send('<h1>Happy Easter !! </h1>');
});

//username, socketId
// app.get('/users', (req, res) => {
//     User.find().then((users) => {
//         res.status(200).send(users);
//     }, (e) => {
//         res.status(404).send(e);
//     })
// });
app.get('/users', (req, res) => {
    res.status(200).send(players);
});

app.get('/users/:_id', (req, res) => {
    User.findById(_id).then((user) => {
        res.status(200).send(user);
    })
});

// app.post('/users', (req, res) => {
//     console.log(req);

//     let user = new User(req.body);
//     user.save().then((doc) => {
//         console.log("Saved user ");
//         res.status(200).send({});
//     }).catch((e) => {
//         console.log(e);
//         res.status(400).send('Error saving the user');
//     })
// })


io.on('connection', onConnect);

function onConnect(socket) {
    console.log('a user connected');

    socket.on('new_user_joined', (username) => {
        socket.broadcast.emit('new_user_joined', { 'username': username, socket_id: socket.id });
        // io.to(socket.id).emit('mouse_moved')
        // io.sockets.connected[socketid].emit(); egal cu asta
        console.log(username + ' joined', socket.id);
        players.push({username: username, socket_id: socket.id})
    });

    socket.on('request', (res) => {
        io.to(res.dest).emit('request',{src: socket.id, data: res.data, first: res.first} )
        // io.emit('mouse_moved', { src: socket.id, dest: data.dest, coords: data.coords})
        console.log('sending play request');
    });

    socket.on('mouse_move', (res) => {
        console.log(res)
        io.to(res.dest).emit('mouse_move',{src: socket.id, data: res.data} )
        // io.emit('mouse_moved', { src: socket.id, dest: data.dest, coords: data.coords})
        console.log('mouse_move');
    });

    socket.on('color_change', (res) => {
        console.log(res)
        io.to(res.dest).emit('color_change',{src: socket.id, data: res.data} )
        // io.emit('mouse_moved', { src: socket.id, dest: data.dest, coords: data.coords})
        console.log('color_change');
    });

    socket.on('finish', (res) => {
        console.log(res)
        io.to(res.dest).emit('finish',{src: socket.id, data: res.data} )
        // io.emit('mouse_moved', { src: socket.id, dest: data.dest, coords: data.coords})
        console.log('finish');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        players = players.filter(el =>  el.socket_id != socket.id)
        socket.broadcast.emit('user_leave', {socket_id : socket.id});
        console.log('broadcast')
        // broadcast played exit
    });
}

http.listen(port, () => {
    console.log('Listen on port: ', port);
});