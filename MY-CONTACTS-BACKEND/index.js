const dotenv = require("dotenv");
dotenv.config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const contact = require('./routes/contact');
const me = require('./routes/me');

mongoose.connect(process.env.DATABASE_URL);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', contact);
app.use('/', me);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})