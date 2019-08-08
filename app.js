const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res, next) => {
    try {
        res.send(layout(''));
        console.log('Hello World!');
    } catch(next) {
        next(error);
    }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
