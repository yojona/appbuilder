const bodyParser = require('body-parser')
const Rutify = require('rutify')
const fileParser = require('express-fileupload')
const cors = require('cors')

const app = require('express')()
const server = require('http').Server(app);

const router = new Rutify(`${__dirname}/routes`)
const port = 3000

const io = require('socket.io')(server);

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.set('socketio', io);
server.listen(port, e => console.log(`App running on port ${port}`))

// app.use(function (req, res, next) {
//   res.setTimeout(1200000, function () {
//     console.log('Request has timed out.');
//     res.send(408);
//   });

//   next();
// });


// var messages = [{
//   id: 1,
//   text: "Hola soy un mensaje",
//   author: "Carlos Azaustre"
// }];


// const server = app.listen(3000, function() {
//   console.log("Servidor corriendo en http://localhost:3000");
// });
