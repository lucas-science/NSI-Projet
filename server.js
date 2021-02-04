const http = require('http');
const app = require('./app');


// création du serveur express.js
app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});



// 1er essaie de l'utilisation de socket.io pas encore fonctionnel
io.on("connection", (socket) => {
    console.log("new client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
    socket.on("message", (data) => {
        console.log(data.message)
    })

    socket.on('chatMessage', (msg) => {
        console.log(message)
    })
})
server.listen(process.env.PORT || 4000);