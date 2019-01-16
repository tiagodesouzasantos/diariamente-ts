'use strict';
exports.requestStatus = function(codeError){
    let status = {};
    switch (codeError) {
        case 0:
            status = {"msg":"Processamente executado com sucesso","code":200};
            break;
        default:
            status = { "msg":"Ocorreu algum problema","code":500};
    }
    return status;
}