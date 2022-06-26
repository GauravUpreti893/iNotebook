const ConnectToMongo = require('./mongodb')
const express = require('express')

ConnectToMongo();

const app = express()
const port = 5000

app.use(express.json());

app.use('/api/auth',require('./Routes/Auth'));
app.use('/api/notes',require('./Routes/Notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})