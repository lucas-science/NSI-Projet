const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const Groupe = require('./models/groupe');

// création du serveur express.js
app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);
const socketio = require('socket.io');
const { compareSync } = require('bcrypt');

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


// 1er essaie de l'utilisation de socket.io fonctionnel
io.on("connection", (socket) => {
    console.log("new client connected");
    socket.on('joinRoom', room => {
        console.log("the room in join : ", room);
        const test = userLeave(socket.id);
        const user = userJoin(socket.id, room);
        socket.join(user.room);
        console.log(users)
        socket.broadcast.to(user.room).emit('info', "has joined the chat" + room);
    });

    socket.on("sendmessage", (data) => {
        console.log("data of send message : ", data.message, data.room)
        const user = getRoomUsers(data.room);
        console.log(user, data.message)
        let lastmessageid
        Groupe.updateOne({
            _id: data.room
        }, {
            $push: {
                message: {
                    text: data.message,
                    author: data.author
                }
            }
        }, function(err, docs) {
            if (err) {
                console.log(err)
            } else {
                Groupe.findOne({ _id: data.room }, function(err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        let lastmessage = docs.message.pop()
                        lastmessageid = lastmessage._id
                        console.log("last mess : ", lastmessage)
                        const search = users.filter(people => people.room === '603a7ca20a80fa0ad4fc8544')
                        console.log("test", search.length)
                        if (search.length > 1) {
                            io.to(data.room).emit('message', { _id: lastmessageid, text: data.message, author: data.author })
                        } else {
                            socket.emit('message', { _id: lastmessageid, text: data.message, author: data.author })
                        }
                    }
                })
            }
        })
    })
    socket.on('getMessageToDelete', (data) => {
        console.log('the value and the room:', data.value, data.room)
        Groupe.updateOne({
            _id: data.room
        }, {
            $pull: {
                message: {
                    _id: data.value
                }
            }
        }, function(err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log('update : ', docs)
            }


        })
        io.to(data.room).emit('messageDelete', data.value)
    })
    socket.on('leave', () => {
        const user = userLeave(socket.id);
        if (user) {
            // Send users and room info
            io.to(user.room).emit('info', "il a été deconnecté");
        }
    })
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            // Send users and room info
            io.to(user.room).emit('info', "il a été deconnecté");
        }
    });
})
const users = [];

function userJoin(id, room) {
    const user = { id, room };
    users.push(user);
    return user;
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

server.listen(process.env.PORT || 4000);