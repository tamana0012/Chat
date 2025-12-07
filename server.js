// const { Socket } = require('engine.io');
// const express = require('express');
// const app = express();

// const http = require('http')
// const server = http.createServer(app);
// const {Server} = require ('socket.io');
// const io = new Server(server);

// app.set('view engine', 'ejs');
// app.use(express.static('./public'));

// app.use(express.json());
// app.use(express.urlencoded({extended :true}));

// app.get('/',(req,res)=>{
//     res.render('index')
// })

// io.on('connection',(Socket)=>{
//     console.log('a user connected', Socket.id);
//     Socket.on('message',(msg)=>{
//         io.emit('message',msg)

//     })
// });

// server.listen(3000,()=>{
//     console.log("server is running on port")
// })


const express = require('express');
const http = require('http');
const PORT =process.env.PORT || 3000;
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('set-username', (username) => {
        socket.username = username || 'Anonymous';
    });

    socket.on('message', (msg) => {
        const messageData = {
            id: socket.id,
            username: socket.username || 'Anonymous',
            text: msg,
            time: new Date().toLocaleTimeString()
        };
        io.emit('message', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));