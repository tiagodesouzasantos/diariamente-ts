var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'gmude',
  description: 'Projeto destinado para atualização dos repositórios com projetos microled',
    script: 'C:\\Users\\tiago.santos\\Desktop\\Labs\\diariamente-ts\\node\\webServiceGmud\\server.js'
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();