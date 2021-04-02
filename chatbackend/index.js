const express = require('express')
const cors = require('cors');
const config = require('./config/app')
const router = require('./router/index');
const app = express()
const http = require('http')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());

app.use(router);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));


const server = http.createServer(app)
const socketServer = require('./socket');
socketServer(server)

server.listen(config.appPort, () => {
  console.log( `Conecting to port ${config.appPort}`);
});
