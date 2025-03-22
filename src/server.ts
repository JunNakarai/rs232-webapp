import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { SerialPort } from 'serialport';
import path from 'path';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const portPath = '/dev/ttys003';
const serialPort = new SerialPort({
    path: portPath,
    baudRate: 9600,
});

app.use(express.static(path.join(__dirname, '../public')));

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const text = message.toString();
        console.log(`Received message: ${text}`);
        serialPort.write(text + '\n');
    });

    serialPort.on('data', (data) => {
        const text = data.toString();
        console.log(`Received data: ${text}`);
        ws.send(text);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
