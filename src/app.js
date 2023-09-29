import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from "./database.js";
import roomRoute from './routes/roomRoutes.js';
import ConnectSocket from "./sockets/socket.js";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3301;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use('/room', roomRoute);

server.listen(PORT, () => {
    console.log(`Server running on port [ ${PORT} ]`);
});

ConnectSocket(io)

sequelize.sync()
    .then(() => {
        console.log('Server sync is complete');
    })
    .catch((error) => {
        console.error('Error syncing with the database:', error);
    });
