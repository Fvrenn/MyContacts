const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const contact = require('./routes/contact');
mongoose.connect('mongodb+srv://Timothe:E764A6F1B3@cluster0.y6mu7.mongodb.net/MyContacts');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', contact);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})