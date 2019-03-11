'use strict';
function get(_language, _idMsg){
    let msgs = {
        "pt_Br": {
            "200": "Concluido com sucesso!",
            "400": "Problemas na execução da tarefa!"
        }
    }
    return msgs[_language][_idMsg];
}

module.exports = {
    get
}