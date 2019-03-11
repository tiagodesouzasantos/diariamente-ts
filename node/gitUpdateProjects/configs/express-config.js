const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('../src/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(session({ 
    secret: 'gitUpdateSecret', 
    cookie: { maxAge: 60000 }, 
    language:"pt_Br",
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next){
    req.session.language = req.session.language ? req.session.language:"pt_Br";
    next();
});    

routes(app);
module.exports = app;