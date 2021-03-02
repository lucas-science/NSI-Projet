const http = require('http');
const app = require('./app');


// création du serveur express.js
app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);
const socketio = require('socket.io');

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


// 1er essaie de l'utilisation de socket.io pas encore fonctionnel
io.on("connection", (socket) => {
    console.log("new client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
    socket.on("message", (data) => {
        console.log(data)
    })

})
server.listen(process.env.PORT || 4000);