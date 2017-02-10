// server.js

const express = require('express');
const WebSocket = require('ws');
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function (data) {
  wss.clients.forEach(function each(client){
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

let numUsers = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');

  numUsers += 1;


  wss.broadcast({type: "userConnected", numUsers: numUsers})




  ws.on('message', (messages) => {
    let parsedMsg = JSON.parse(messages)

    switch(parsedMsg.type) {
      case "postMessage":
        let messageToClient = {
          type: "incomingMessage",
          uuid: uuid.v4(),
          username: parsedMsg.username,
          content: parsedMsg.content
        }
        wss.broadcast(messageToClient);
        break;

      case "postNotification":
        let clientNotification = {
          type: "incomingNotification",
          oldUser: parsedMsg.oldUsername,
          newUser: parsedMsg.username
        }
        console.log(clientNotification)
        wss.broadcast(clientNotification);
        break;

        default:
          console.log("No go");
    }

  })
// send all messages to the other person

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numUsers--;
    wss.broadcast({type: "userConnected", numUsers})
  })
});
