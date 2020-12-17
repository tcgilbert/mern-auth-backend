//imports
require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const passport = require('passport');


const PORT = process.env.PORT || 8000;

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes and controllers
app.get('/', (req, res) => {
  res.status(200).json({ message: 'You have found the backend'})
})

app.listen(PORT, () => {
  console.log(`🔥LIVE FROM SERVER ${PORT}🔥`);
})