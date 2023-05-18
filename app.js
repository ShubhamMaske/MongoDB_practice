const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("6465ec033dd076854dc6200e")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

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
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: "max",
          email: "max@gmail.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })