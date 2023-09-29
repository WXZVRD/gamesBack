

const GuessWordSocket = (socket, io) => {
    socket.on('chooseWord', (roomId, choosedWord) => {
        console.log(`SOCKET master choosed word: ${choosedWord} ${roomId}`)
        io.to(roomId).emit('onMasterChoose', choosedWord)
    })

    socket.on('guessWord', (roomId, guessedWord) => {
        console.log(`SOCKET guesser guessed word: ${guessedWord} ${roomId}`)
        io.to(roomId).emit('userGuessed', guessedWord)
    })

    socket.on('sendMessage', (roomId, messageText) => {
        console.log(`SOCKET send chat message: ${messageText} ${roomId}`)
        io.to(roomId).emit('onUserSendMessage', messageText)
    })

    socket.on('surrender', (user, roomId) => {
        console.log(`SOCKET player surrender: ${user} ${roomId}`)
        io.to(roomId).emit('userSurrendered', user)
    })
}

export default GuessWordSocket