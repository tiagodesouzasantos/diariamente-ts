const port = process.env.PORT || 3001;
const app = require('./configs/express-config.js');
app.listen(port,function(){
    console.log('update RESTful API server started on: ' + port);
});
