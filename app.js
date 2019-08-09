const PORT = 3000;
const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db }= require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', async (req, res, next) => {
    try {
        res.send(layout(''));
        //res.redirect('/wiki');
        console.log('Hello World!');
    } catch(error) {
        next(error);
    }
})

db.authenticate().
then(() => {
  console.log('Connected to the database');
})

const init = async () => {
    // await db.User.sync();
    // await db.Page.sync();
    await db.sync();

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
      });
}

init();
