const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const sequelize = require('./util/database');
const User = require('./models/user')
const errorController = require('./controllers/error')
const shopRoutes = require('./routes/shop');

app.use(cors({
  origin: "*",
}))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const Product = require('./models/product');

app.get('/testing', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res, next)=>{
  User.findByPk(1).then(user=>{
    req.user = user
  }).catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404)


Product.belongsTo(User, {constraints: true, onDelete:'CASCADE'});
User.hasMany(Product)

sequelize.sync().then(result =>{
    User.findByPk(1)
    app.listen(port, () => {
        console.log(` app listening on port ${port}`)
      })
}).then( user =>{
  if(!user){
    return User.create({name:Maz, email:'test@gmail.com'})
  } 
  return user
}
  
).then(
 user => {console.log(user);}
).catch(err =>{
    console.log(err);
})


