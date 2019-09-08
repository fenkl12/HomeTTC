var axios = require('axios');
var DOMParser = require('dom-parser');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public") 
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))



io.on('connection',(socket) => {
    const url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=111&s=3645"

    var myFunc01 = function() {
        var name = []
        var i = 0;
        // store the interval id to clear in future
        var intr = setInterval(function() {
            axios.get(url)
            .then(function (body) {
    
                
                  var parser = new DOMParser();
          
                  var xmlDoc = parser.parseFromString(body.data,"text/xml");
                  var direction = xmlDoc.getElementsByTagName("direction");
          
                  var stop = direction[0].attributes[0]
                  var time_seconds = direction[0].childNodes[1].attributes[1]
          
                  var minutes = Math.floor(time_seconds.value / 60);
                  var seconds = time_seconds.value - minutes * 60;
          
                  var data = (" Time is " + minutes +" "+ seconds).toString()
                  name.push(data)
                //   console.log(name);
                //   console.log(stop.value);
                //   console.log(data);
                  socket.emit('data_time', { message: data })
                  socket.emit('data_station', { message: stop.value })
                  socket.emit('data_minutes', { message: minutes })
                  socket.emit('data_secs', { message: seconds })

            })    
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            
        }, 2000)

      }
      
      myFunc01();
    
    
    })

server.listen(port ,()=> {console.log(`Server is up on ${port}`)})