const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket)=> {
    socket.on("play", (index, player) => {
        console.log("server received", index, player)
        socket.broadcast.emit("play", index)
    })
})

server.listen(3000)