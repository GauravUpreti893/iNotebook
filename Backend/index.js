const ConnectToMongo = require('./mongodb')
const express = require('express')
const cors = require('cors')

ConnectToMongo();

const app = express();
require('dotenv').config();
app.use(cors())
const port = process.env.PORT || 5000 ;

app.use(express.json());

app.use('/api/auth',require('./Routes/Auth'));
app.use('/api/notes',require('./Routes/Notes'));

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`);
});