const express = require('express');
const WS = require('ws');
const app = express();

const wss = new WS.Server({
  port: 8081
}, (err) => {
  if (err) throw err;
  console.log('WS is running on localhost:8081');
});

const db = [];
const clients = {};

wss.on('connection', function connection(ws) {
  var id = Math.random();
  clients[id] = ws;
  console.log('Open new connection: ', id)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    db.push(message);

    for (var key in clients) {
      clients[key].send(JSON.stringify([message]));
    }
  });

  ws.on('close', function() {
    console.log('Close: ', id);
    delete clients[id];
  })
 
  ws.send(JSON.stringify(db));
});

app.use(express.static('static'));

app.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log('Static Server is running on localhost:3000');
});