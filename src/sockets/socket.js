import TicTacToeSocket from "./TicTacToeSocket.js";
import RoomSocket from "./RoomSocket.js";
import GuessWordSocket from "./GuessWordSocket.js";

export default function ConnectSocket(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        TicTacToeSocket(socket, io)
        GuessWordSocket(socket, io)
        RoomSocket(socket, io)

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}
