var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Gmude',
  description: 'Projeto destinado para atualização dos repositórios com projetos microled',
  script: 'C:\\node\\projetos\\webServiceGmud\\gmud-server.js'
});
svc.user.domain = 'new.band';
svc.user.account = 'servicerepmicroled';
svc.user.password = 'uxWDXIDNd2d2@@';
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();
