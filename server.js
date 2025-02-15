//  ExpressTanks Server.js
//  Version 1.1
//
var express = require('express');
var app = express();
const { emit } = require('process');
const request = require('request');
//const Hapi = require( "hapi" );
//const routes = require( "./routes" );

// Game items to remember
var tanks = [];
var shots = [];
var buzzSawTarget = -1;
var DEBUG = 0;

// Set up the server
// process.env.PORT is related to deploying on AWS
var server = app.listen(process.env.PORT || 3000, listen);
module.exports = server;

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Tank Battle listening at http://' + host + ':' + port);
}
// Set the folder for public items
path = require('path'),
  app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir))
app.set('views', __dirname);
app.use(express.urlencoded())

// Create a socket and open the connection (io)
var socket = require('socket.io');
var io = socket(server);

// Handle starting screen submission
// and the Reset Command
app.post('/GetEm', (req, res) => {
  const playerName = req.body.PlayerName;
  // Check for an actual player name
  if (!playerName || playerName == '')
    res.render('public/index.html');
  else
    res.render('public/tanks.html', { PlayerName: playerName });
});

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);
var pdata = '{"x":' + Math.floor(Math.random() * 599 + 1) + ',"y":' + Math.floor(Math.random() * 599 + 1) + '}'
var ldata = '{"x":' + Math.floor(Math.random() * (700 - 200) + 250) + ',"y":' + Math.floor(Math.random() * (300 - 250) + 300) + ',"height":' + Math.floor(Math.random() * (200 - 10) + 10) + ',"width":' + Math.floor(Math.random() * (200 - 10) + 10) + '}'

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    // Always print this
    console.log("New Tank: " + socket.id);

    // Initial Add of New Client
    socket.on('ClientNewJoin',
      function (data) {
        // Data comes in as whatever was sent, including objects
        console.log('New Client Join: ' + data);

        // sending to individual socketid (private message)
        io.to(socket.id).emit('ServerReadyAddNew', tanks);

        // Send to all clients but sender socket
        //socket.broadcast.emit('NewTank', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    // Connected client adding New Tank
    socket.on('ClientNewTank',
      function (data) {

        // Data comes in as whatever was sent, including objects
        console.log('New Tank: ' + JSON.stringify(data));

        // Add new tank to array
        // First check if this tank is already in our list
        var tankFound = false;
        if (tanks !== undefined) {
          for (var i = 0; i < tanks.length; i++) {
            if (tanks[i].tankid == data.tankid) {
              tankFound = true;
            }
          }
        }

        let newTank = {
          x: Number(data.x), y: Number(data.y),
          heading: Number(data.heading), tankColor: data.tankColor,
          tankid: data.tankid, playername: data.playername
        };

        // Add this tank to the end of the array if not in array
        if (!tankFound)
          tanks.push(newTank);

        if (DEBUG && DEBUG == 1)
          console.log(tanks);

        // Send the tank update after giving a quick delay for initialization
        const timeoutObj = setTimeout(() => {
          // Send to all clients but sender socket
          //          socket.broadcast.emit('ServerNewTankAdd', tanks);
          io.sockets.emit('ServerNewTankAdd', tanks);
        }, 1500);


        // If the buzzsaw target is not designated, set its target
        if (buzzSawTarget < 0 && tanks.length > 0) {
          this.buzzSawTarget = Math.floor(Math.random() * Math.floor(tanks.length));
          io.sockets.emit('ServerBuzzSawNewChaser', tanks[this.buzzSawTarget].tankid);
        }
      }
    );


    // Connected client moving Tank
    socket.on('ClientMoveTank',
      function (data) {

        // Data comes in as whatever was sent, including objects
        if (DEBUG && DEBUG == 1)
          console.log('Move Tank: ' + JSON.stringify(data));

        // Change the local tank table
        if (tanks !== undefined) {
          for (var i = 0; i < tanks.length; i++) {
            if (tanks[i].tankid == data.tankid) {
              tanks[i].x = Number(data.x);
              tanks[i].y = Number(data.y);
              tanks[i].heading = data.heading;
            }
          }
        }


        // Send the change out
        //        io.sockets.emit('ServerMoveTank', data);
        // Send to all clients but sender socket
        socket.broadcast.emit('ServerMoveTank', data);

      });

    socket.on('disconnect', function () {
      console.log("Client has disconnected: " + socket.id);

      if (DEBUG && DEBUG == 1)
        console.log(tanks);

      // Remove this tank
      for (var i = tanks.length - 1; i >= 0; i--) {
        if (tanks[i].tankid == socket.id) {
          tanks.splice(i, 1);
        }
      }

      // Tell everyone else its gone too
      io.sockets.emit('ServerTankRemove', socket.id);

    });

    // New Shot Object
    socket.on('ClientNewShot',
      function (data) {

        // Data comes in as whatever was sent, including objects
        if (DEBUG && DEBUG == 1)
          console.log('New Shot: ' + JSON.stringify(data));

        // Add this shot to the end of the array
        shots.push(data);

        // Send the change out
        io.sockets.emit('ServerNewShot', data);

      });


    // Connected client moving Shots
    socket.on('ClientRemoveShot',
      function (data) {

        // Data comes in as whatever was sent, including objects
        if (DEBUG && DEBUG == 1)
          console.log('Remove Shot: ' + JSON.stringify(data));

        // Get the shot to remove
        const shotid = data.shotid;
        for (var s = shots.length - 1; s >= 0; s--) {
          if (shots[s].shotid = shotid) {
            shots.splice(s, 1);
            break;
          }
        }
      });
    // Connected client moving Shots
    socket.on('ClientResetAll',
      function (data) {

        // Data comes in as whatever was sent, including objects
        console.log('Reset Server ');

        // Remove all the tanks
        for (var t = tanks.length - 1; t >= 0; t--) {
          // Remove the tank
          // and tell everyone else its gone too
          io.sockets.emit('ServerTankRemove', tanks[t].tankid);
          //             tanks.splice(t,1);
        }

        shots = [];
        tanks = [];

        pdata = '{"x":' + Math.floor(Math.random() * 599 + 1) + ',"y":' + Math.floor(Math.random() * 599 + 1) + '}'
        ldata = '{"x":' + Math.floor(Math.random() * (700 - 200) + 250) + ',"y":' + Math.floor(Math.random() * (300 - 250) + 300) + ',"height":' + Math.floor(Math.random() * (200 - 10) + 10) + ',"width":' + Math.floor(Math.random() * (200 - 10) + 10) + '}'


        // Finally, reset the clients
        io.sockets.emit('ServerResetAll', data);
         


      });

    /************  Buzz Saw  ***************/
    // Connected client moving Shots
    socket.on('ClientBuzzSawHit',
      function () {

        // Chase a different candidate for it to follow
        if (tanks.length > 0) {
          this.buzzSawTarget = Math.floor(Math.random() * Math.floor(tanks.length));
          io.sockets.emit('ServerBuzzSawNewChaser', tanks[this.buzzSawTarget].tankid);
        }
      });

    socket.on('ClientBuzzSawMove',
      function (data) {
        // Transmit the new coordinates right out to the other clients
        // only send to the other clients (not the original sender)
        socket.broadcast.emit('ServerBuzzSawMove', data);
      });
    let pmade = false;

    socket.on('ClientStartPowerups', function () {
      console.log(pdata)
      io.sockets.emit('ServerNewPowerup', pdata);


    })

    socket.on('ClientNewLake', function () {
      io.sockets.emit('ServerNewLake', ldata);
    })

    socket.on('ClientTankSink', function () {
      io.sockets.emit('ServerTankRemove', socket.id);
    })
  });