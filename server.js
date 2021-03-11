const http = require('http');
const app = require('./app');


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


// 1er essaie de l'utilisation de socket.io pas encore fonctionnel
io.on("connection", (socket) => {
    console.log("new client connected");
    socket.on('joinRoom', room => {
        console.log("the room in join : ", room);
        const test = userLeave(socket.id);
        const user = userJoin(socket.id, room);
        socket.join(user.room);

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('info', "has joined the chat" + room);
        // Send users and room info
        /*io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        */
    });

    socket.on("sendmessage", (data) => {
            console.log("data of send message : ", data.message, data.room)
            const user = getRoomUsers(data.room);
            console.log(user, data.message)
            io.to(data.room).emit('message', { text: data.message, author: data.author })
        })
        /*socket.on('leave', () => {
            const user = userLeave(socket.id);
            if (user) {
                // Send users and room info
                io.to(user.room).emit('message', "il est parti de :" + user.room);
            }
        });*/
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
/*
const addUser = ({ id, name, room }) => {
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    users.push(user);

    return { user };
}
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);*/

server.listen(process.env.PORT || 4000);