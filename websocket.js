const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (ws) => {
    ws.send('Welcome!');

    ws.on('message', (message) => {
        console.log('Received message:', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
