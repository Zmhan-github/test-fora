const express = require('express')
const app = express()
const http = require('http').createServer(app);

require('./soket-server')(http)

const connection = require('./util/database')

const PORT = 3006

app.use(express.static('public'))

connection
  .sync({ force: true })//  params for reset db
  .then(user => {
        http.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
      });
  });