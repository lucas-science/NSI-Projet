const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const Groupe = require('./models/groupe');

// création du serveur express.js
app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);
const socketio = require('socket.io');
const { compareSync } = require('bcrypt');


// Socket CORS
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


// fonctions du WebSocket
io.on("connection", (socket) => {
    console.log("new client connected");
    socket.on('joinRoom', room => { // récupère les infos du nouvel utilisateur qui a rejoint une room
        console.log("the room in join : ", room);
        const test = userLeave(socket.id); // fait quitter le user dans la room
        const user = userJoin(socket.id, room); // fait rejoindre le user dans la room
        socket.join(user.room); // fait rejoindre le user dans la room
        console.log(users)
        socket.broadcast.to(user.room).emit('info', "has joined the chat" + room); // renvois le fait qu'une nouvelle personne est présente dans la room à toute les personnes présente dans la room
    });

    socket.on("sendmessage", (data) => { // récupère le message qui a été envois par un utilisateur
        console.log("data of send message : ", data.message, data.room)
        const user = getRoomUsers(data.room); // récupere la room de l'utilsateur
        console.log(user, data.message)
        let lastmessageid
        Groupe.updateOne({ // modifie le groupe de discution et ajoute le message
            _id: data.room // l'id de la room est l'id du groupe dans la base de donnée
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
                        let lastmessage = docs.message.pop() // récupere le dernier message
                        lastmessageid = lastmessage._id // récupère l'id du dernier message
                        console.log("last mess : ", lastmessage)
                        const search = users.filter(people => people.room === data.room) // récupère le nombre de personne présente dans la room
                        console.log("test", search.length)
                        if (search.length > 1) { // s'il y a plus d'une personne dans la room :
                            io.to(data.room).emit('message', { _id: lastmessageid, text: data.message, author: data.author }) // envois le message à toute les personnes présente dans la room
                        } else {
                            socket.emit('message', { _id: lastmessageid, text: data.message, author: data.author }) // et si l'utilisateur est seul dans la room alors envoyé le message juste à lui même
                        }
                    }
                })
            }
        })
    })
    socket.on('getMessageToDelete', (data) => { // recupère le message qui doit être suprimé et le suprime
        console.log('the value and the room:', data.value, data.room)
        Groupe.updateOne({ // modifie le groupe de discution dans la bade de donnée
            _id: data.room
        }, {
            $pull: { // surpime le message grâce à son id
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
        io.to(data.room).emit('messageDelete', data.value) // envois à toute les personnes présente dans la room le message suprimé
    })
    socket.on('leave', () => {
        const user = userLeave(socket.id); // fait quitter le user de la room
        if (user) {
            // Send users and room info
            io.to(user.room).emit('info', "il a été deconnecté"); // envois l'info à tout les personnes dans la room qu'il est plus présente dans la room
        }
    })
    socket.on('disconnect', () => { // lorsque la séssion socket se déconnecte
        const user = userLeave(socket.id);
        if (user) {
            // Send users and room info
            io.to(user.room).emit('info', "il a été deconnecté"); // envois a tout les personnes dans la room l'info que l'utilisateur a été déconnecté
        }
    });
})
const users = [];

function userJoin(id, room) { // fonction lorsque il y a un nouveau user qui rejoint une room
    const user = { id, room };
    users.push(user);
    return user;
}

function userLeave(id) { // fonction pour faire quitter un user de la room
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) { // récupère la room celon le user
    return users.filter(user => user.room === room);
}

server.listen(process.env.PORT || 4000);