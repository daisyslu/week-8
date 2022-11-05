//Step 2. Setup
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//http server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is listening at localhost: ' +port);
});

//Step 3. Socket connections
let io = require('socket.io');
io = new io.Server(server);

//same as above
//const {Server} = require('socket.io');
//const io = new Server

io.on('connection', (socket) => {
    //console.log(socket.id);
    console.log('a new client connected with the id:' + socket.id)

    //Step 6. Listen for data coming in
    socket.on('data', (data) => {
        //send data back to the client
        console.log(data);
        //Step 7. Send to all clients, including us
        io.emit('data', data);

        // //send to all clients, excpet us
        // socket.broadcast.emit('data', data);

        // //send to us only
        // socket.emit('data', data);
    })
});