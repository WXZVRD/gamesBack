

const TicTacToeSocket = (socket, io) => {
    socket.on('move', (newBoard, roomId, enemy) => {
        console.log(`SOCKET palyer make move to: ${newBoard} ${roomId} ${enemy} `)
        io.to(roomId).emit('userHasMoved', newBoard, enemy)
    })

    socket.on('surrender', (user, roomId) => {
        console.log(`SOCKET player surrender: ${user} ${roomId}`)
        io.to(roomId).emit('userSurrendered', user)
    })
}

export default TicTacToeSocket