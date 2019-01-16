const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const angularApp = __dirname + "/app/dist/gmud/";
const apiRoutes = require('./api/v1/routes/apiRoutes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(angularApp));

apiRoutes(app);
app.listen(port);

console.log('Bat RESTful API server started on: ' + port);
// https://api.bitbucket.org/2.0/repositories/tiago-santos-bandeiranteslog/paradisemicroledwms/
//taskkill /f /im node.exe