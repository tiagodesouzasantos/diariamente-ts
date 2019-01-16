const port = process.env.PORT || 3000;
const app = require('./configs/express-config.js');
app.listen(port,function(){
    console.log('Gmude RESTful API server started on: ' + port);
});
