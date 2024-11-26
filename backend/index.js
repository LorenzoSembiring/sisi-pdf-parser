const express = require('express');
const cors = require('cors')
const route = require('./src/routes/route');
require('dotenv').config();
const app = express();
const port = process.env.PORT

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/', route)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
