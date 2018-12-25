const express = require('express')
const app = express()
const http = require('http').createServer(app);

require('./soket-server')(http)

const Op = require('sequelize').Op
const connection = require('./util/database')

const Room = require('./models/room')


const PORT = 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/createRoom', (req, res, next) => {
    if (!req.query.name) {
        res
        .send("Please enter you name!")
    }
    Room.create({ name: req.query.name })
    .then(room => {
        res
        .status(200)
        .json(JSON.stringify(room))
    })
    .catch(err => {
        console.log(err)
    })
})


app.get('/room/:id', (req, res, next) => {
    if (req.params.id) {
        Room.findByPk(req.params.id)
        .then(data => {
            res
            .redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
})





connection
  .sync({ force: true })//  params for reset db
  .then(user => {
        http.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
      });
  });