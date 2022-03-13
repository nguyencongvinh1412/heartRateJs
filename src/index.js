const path = require('path')
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// helpers 
const helperCustom = require('./helpers/helper');

// requite routes
const routeHome = require('./resources/routes/home.route');
const routeAcc = require('./resources/routes/acc.route');
const routeAdmin = require('./resources/routes/admin.route');
const routeUser = require('./resources/routes/user.route');
const server = require('./resources/routes/server.route');

// middleware routes
const auth = require('./resources/middlewares/authentication');

const port = process.env.PORT || 3000;

// databae 
const db = require('./config/db/connect');
db.connect();

// body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// cookie-parser 
app.use(cookieParser('cookie-parser'));

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: false,
    helpers: {
        index: helperCustom.index,
        checkValueBox: helperCustom.checkedRadio,
        checkedValue: helperCustom.checkedValue,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/', routeHome);
app.use('/acc', routeAcc);
app.use('/admin', auth.authenticate, routeAdmin);
app.use('/user', auth.authenticate, routeUser);
app.use('/server', server);


app.listen(port, (req, res) => {
    console.log(`listening http://localhost:${port}`);
})