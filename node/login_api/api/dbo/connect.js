'use strict';
const config = require(__dirname+'/../../config/env.json');
const environment = require(__dirname +'/../../config/environment');
const tbUsuariosModel = require(__dirname +'/../../usuarios/tbUsuariosModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function dbCon(_dbname){
    const env = environment.getStatus();
    const dbInfo = config.connections[env.server][_dbname];
    const dbConfig = config.connections[env.server].servers[dbInfo.serverName];
    return new Sequelize(
        dbInfo.dbname, dbConfig.dbUsername, dbConfig.dbPassword, {
            host: dbConfig.dbHost,
            dialect: 'mssql',
            pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
            operatorsAliases: { $and: Op.and, $or: Op.or, $eq: Op.eq, $gt: Op.gt, $lt: Op.lt, $lte: Op.lte, $like: Op.like}
        });
    const usuario = tbUsuariosModel.getTable(sequelize);
    let teste = usuario.findAll();
    teste.then(function (result) { 
        console.log('result', result);
    }).catch(function (error) { 
        console.error(error);
    });
}

// module.exports = {
//     con
// }
dbCon("usuarios");