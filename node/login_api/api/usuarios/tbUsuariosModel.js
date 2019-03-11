'use stricts';
const Sequelize = require('Sequelize');
function getTable(_sequelize){
    return _sequelize.define('usuarios', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            cpf: { type: Sequelize.STRING },
            matricula: { type: Sequelize.STRING },
            nome: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
            senha: { type: Sequelize.STRING },
            foto: { type: Sequelize.STRING }
        },
        { tableName: 'TB_USUARIOS', freezeTableName: true, timestamps: false}
    );
}

module.exports = {
    getTable
}