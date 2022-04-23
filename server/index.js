const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const path = require('path');


const sequelize = require('./util/database');
const product = require('./models/product')
const errorController = require('./controllers/error')
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');

app.get('/testing', (req, res) => {
  res.send('Hello World!')
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404)






sequelize.sync().then(result =>{
    console.log(result);
    app.listen(port, () => {
        console.log(` app listening on port ${port}`)
      })
}).catch(err =>{
    console.log(err);
})


