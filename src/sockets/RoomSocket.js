

const RoomSocket = (socket, io) => {
    socket.on('joinRoom', ({ user, id }) => {
        const roomId = id
        socket.join(roomId)
        console.log(`SOCKET on joinroom we have: ${user} ${roomId} `)
        io.to(roomId).emit('userHasJoinedRoom', user)
    })

    socket.on('leaveRoom', ({ user, roomId }) => {
        socket.leave(roomId)
        console.log(`SOCKET on leave room we have: ${user} ${roomId} `)
        io.to(roomId).emit('userHasLeavedRoom', user)
    })

    socket.on('startGame', ({ roomId }) => {
        console.log(`SOCKET on start the game room we have: ${roomId} `)
        io.to(roomId).emit('userHasStartedGame', null)
    })
}

export default RoomSocket