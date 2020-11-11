const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);

app.get('/signup', (req, res) => {
    res.sendFile("D:/Donnees/Lucas/Documents/Ecole/1er/NSI/ichat/frontend/signup.html");
    //app.use(express.static("D:/Donnees/Lucas/Documents/Ecole/1er/NSI/ichat/frontend/css"));
});

app.get('/signin', (req, res) => {
    res.sendFile("D:/Donnees/Lucas/Documents/Ecole/1er/NSI/ichat/frontend/signin.html");
    //app.use(express.static("D:/Donnees/Lucas/Documents/Ecole/1er/NSI/ichat/frontend/css"));
});

server.listen(process.env.PORT || 4000);