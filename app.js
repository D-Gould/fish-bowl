var express = require('express')
var app = express()
var http = require('http')
let server = http.createServer(app)
var port = process.env.PORT || 3000

app.use(express.urlencoded())


const session = require('express-session')
app.set('view engine', 'pug')

var io = require('socket.io')(server)

let Game = require('./game.js')
let games = {}

app.get('/', function (req, res) {
  res.render('index')

})

app.get('/room', function (req, res) {
  console.log("adding a new room!")
  let newGame = new Game();
  games[newGame.code] = newGame
  console.log(games)
  res.redirect('/room/'+newGame.code)
})

app.get('/room/:code', function (req, res) {
   const thisGame = games[req.params.code.toUpperCase()]
   res.render('game-screen', {code: thisGame.code})
})
const isUsernameAvailable = (username, game) => {
  console.log(game.players)
  return !game.players.find(player => {
    player.username === username
  })
}

app.post('/room', function (req, res) {
  const code = req.body.room_code
  const username = req.body.username
  const game = games[code]
  if (!game) {
    const message = 'There is no room available for that code.'
    res.redirect('/', {message: message})
  } else if (!game.open) {
    res.redirect('/')
  } else if (!isUsernameAvailable(username, game)) {
    res.redirect('/')
  } else {
    // game.addPlayer(socket, username)
    res.render('player-screen')
  }
})

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', function() {
    console.log('A user disconnected')
  })
});

server.listen(port, function () {
  console.log(`listening on ${port}`)
});


