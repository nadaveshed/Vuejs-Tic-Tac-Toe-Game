const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket)=> {
    socket.on("play", (index, playerIndex) => {
        console.log('player-number', playerIndex);
        console.log("server received", index)
        socket.broadcast.emit("play", index)

    })
})

server.listen(3000)