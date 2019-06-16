const bodyParser = require('body-parser')
const Rutify = require('rutify')
const fileParser = require('express-fileupload')

const app = require('express')()
const port = 3000
const router = new Rutify(`${__dirname}/routes`, {
  debug: true
})

app.use(function (req, res, next) {
  res.setTimeout(1200000, function () {
    console.log('Request has timed out.');
    res.send(408);
  });

  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileParser())
app.use(router)
app.listen(port, e => console.log(`App running on port ${port}`))

// var express = require('express');
// var app = express();

// var messages = [{
//   id: 1,
//   text: "Hola soy un mensaje",
//   author: "Carlos Azaustre"
// }];


// const server = app.listen(3000, function() {
//   console.log("Servidor corriendo en http://localhost:3000");
// });


// var io = require('socket.io')(server);



// io.on('connection', function(socket) {
//   console.log('Alguien se ha conectado con Sockets');
//   socket.emit('messages', messages);

//   socket.on('new-message', function(data) {
//     messages.push(data);

//     io.sockets.emit('messages', messages);
//   });
// });