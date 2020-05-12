var express = require('express')
var http = require('http')
var port = process.env.PORT || 3000

var app = express()
let server = http.createServer(app)
let Game = require('./game.js')
let games = []
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/room', function (req, res) {
  console.log("adding a new room!")
  let newGame = new Game();
  games.push(newGame)
  res.render('game-screen', {code: newGame.code})
})

server.listen(port, function () {
  console.log(`listening on ${port}`)
})


