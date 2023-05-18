const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById("64632f4821b910ec6bb80274")
//     .then(user => {
//       req.user = new User(user.name,user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(()=> {
//   app.listen(3000);
// });


mongoose
  .connect('mongodb+srv://shubhammaske:Shubh099@cluster0.xcvdj4q.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    console.log('Connected!');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })