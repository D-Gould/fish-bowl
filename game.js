const Player = require('./player')

class Game {
    constructor() {
        this.sockets = {};
        this.players = [];
        this.code = this.setGameCode()
        this.lastUpdateTyime = Date.now()
        this.open = true
    }

    randLetter() {
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var letter = letters[Math.floor(Math.random() * letters.length)];
        return letter
    }
    open() {
        return this.open
    }

    setOpen(boolean) {
        this.open = boolean
    }

    setGameCode() {
        return (this.randLetter() + this.randLetter() + this.randLetter() + this.randLetter()) 
    }
    
    code() {
        return this.code
    }

    addPlayer(socket, username) {
        // this.sockets[socket.id] = socket;
        // this.players[socket.id] = new Player(socket.id, username)
        this.players.push(new Player(socket.id, username))
    }
}

module.exports = Game