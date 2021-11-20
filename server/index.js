const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const socketio = require('socket.io');
const fs = require('fs');
const privateKey  = fs.readFileSync('cert/key.pem', 'utf8');
const certificate = fs.readFileSync('cert/matcha.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const server = https.createServer(credentials, app);
const io = socketio(server);

const { addUser, removeUser, getUser } = require('./container');

const users = require('./route/users');
const auth = require('./route/auth');
const mail = require('./route/mail');
const appears = require('./route/appears');
const blocks = require('./route/blocks');
const likes = require('./route/likes');
const logs = require('./route/logs');
const matches = require('./route/matches');
const messages = require('./route/messages');
const reports = require('./route/reports');
const tags = require('./route/tags');
const unlikes = require('./route/unlikes');
const verifies = require('./route/verifies');
const visits = require('./route/visits');
const notifications = require('./route/notifications');
const overviews = require('./route/overviews');

//

app.use(session({
    secret: '#@#42MATCHA#@#',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    })
)

app.use(bodyParser.json({
    limit: '50mb',
}));

app.use(express.static('public'));

app.use(cors({origin: 'https://matcha.aidandlim.com:3000'}));

app.get('/', (req, res) => {
    res.send('Connection is successful');
});

// 

app.get('/api/users', users.select);
app.put('/api/users', users.update);
app.put('/api/users/email', users.updateEmail);
app.put('/api/users/password', users.updatePassword);
app.put('/api/users/picture', users.updatePicture);
app.put('/api/users/address', users.updateAddress);
app.put('/api/users/bio', users.updateBio);
app.put('/api/users/notification', users.updateNotification);
app.put('/api/users/filters', users.filters);
app.delete('/api/users', users.delete);

app.get('/api/verifies/up', verifies.up);

app.get('/api/mail/password', mail.forgot);
app.get('/api/mail/reverify', mail.reverify);

app.get('/api/auth/in', auth.in);
app.get('/api/auth/out', auth.out);
app.post('/api/auth/up', auth.up);

app.get('/api/tags', tags.select);
app.post('/api/tags', tags.insert);
app.delete('/api/tags', tags.delete);

app.put('/api/appears', appears.update);
app.post('/api/appears', appears.insert);

app.put('/api/visits', visits.update);
app.post('/api/visits', visits.insert);

app.get('/api/likes', likes.select);
app.put('/api/likes', likes.update);
app.post('/api/likes', likes.insert);
app.delete('/api/likes', likes.delete);

app.put('/api/unlikes', unlikes.update);
app.post('/api/unlikes', unlikes.insert);

app.get('/api/notifications', notifications.select);
app.put('/api/notifications', notifications.update);

app.get('/api/overviews', overviews.select);

app.get('/api/logs', logs.select);

app.get('/api/blocks', blocks.select);
app.post('/api/blocks', blocks.insert);
app.delete('/api/blocks', blocks.delete);

app.post('/api/reports', reports.insert);

app.get('/api/matches', matches.select);

app.get('/api/messages', messages.select);
app.put('/api/messages', messages.update);
app.post('/api/messages', messages.insert);

//

io.on('connection', (socket) => {
    socket.on('join', (id) => {
        // console.log(`connection has created! [ socketId: ${socket.id}, userId: ${id} ]`);
        addUser({ socketId: socket.id, userId: id });
    });

    socket.on('appears', (from, to, callback) => {
        // console.log(`appears is called! [ from: ${from}, to: ${to} ]`);
        if(!getUser(from)) {
            callback(-1);
        } else {
            let promise = appears.insert(from, to, callback);
            const user = getUser(to);
            Promise.all([promise]).then(() => {
                if(user) {
                    io.to(user.socketId).emit('notification', { type: 'appears' });
                }
            });
        }
    });
    
    socket.on('visits', (from, to, callback) => {
        // console.log(`visits is called! [ from: ${from}, to: ${to} ]`);
        if(!getUser(from)) {
            callback(-1);
        } else {
            let promise = visits.insert(from, to, callback);
            const user = getUser(to);
            Promise.all([promise]).then(() => {
                if(user) {
                    io.to(user.socketId).emit('notification', { type: 'visits' });
                }
            });
        }
    });

    socket.on('likes', (from, to, callback) => {
        // console.log(`likes is called! [ from: ${from}, to: ${to} ]`);
        if(!getUser(from)) {
            callback(-1);
        } else {
            let promise = likes.insert(from, to, callback);
            const user = getUser(to);
            Promise.all([promise]).then(() => {
                if(user) {
                    io.to(user.socketId).emit('notification', { type: 'likes' });
                }
            });
        }
    });

    socket.on('unlikes', (from, to, callback) => {
        // console.log(`unlikes is called! [ from: ${from}, to: ${to} ]`);
        if(!getUser(from)) {
            callback(-1);
        } else {
            let promise = unlikes.insert(from, to, callback);
            const user = getUser(to);
            Promise.all([promise]).then(() => {
                if(user) {
                    io.to(user.socketId).emit('notification', { type: 'unlikes' });
                }
            });
        }
    });

    socket.on('message', (from, to, content, callback) => {
        // console.log(`message is called! [ from: ${from}, to: ${to}, content: ${content} ]`);
        if(!getUser(from)) {
            callback(-1);
        } else {
            let promise = messages.insert(from, to, content, callback);
            const user = getUser(to);
            Promise.all([promise]).then(() => {
                if(user) {
                    io.to(user.socketId).emit('message');
                }
            });
        }
    });

    socket.on('disconnect', (id) => {
        // console.log(`disconnect is called! [ id: ${id} ]`);
        removeUser(id);
    });
});

const PORT = 8443;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));