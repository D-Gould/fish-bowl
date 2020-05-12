const Player = require('./player')

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.code = "ABCD"
        this.lastUpdateTyime = Date.now()
    }
    code() {
        return this.code
    }

    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
        this.players[socket.id] = new Player(socket.id, username)
    }
}

module.exports = Game