var Service = require('node-windows').Service;

var svc = new Service({
  name:'HeatTemperature',
  description: 'Projeto destinado para controle de temperatura dos servidores',
  script: 'C:\\node\\projetos\\HeatTemperature\\index.js'
});
// svc.user.domain = 'new.band';
// svc.user.account = 'user';
// svc.user.password = '#########';

svc.on('install',function(){
  svc.start();
});
 
svc.install();
