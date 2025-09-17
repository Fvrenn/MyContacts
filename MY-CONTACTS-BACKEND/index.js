const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
mongoose.connect('mongodb+srv://Timothe:E764A6F1B3@cluster0.y6mu7.mongodb.net/MyContacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})