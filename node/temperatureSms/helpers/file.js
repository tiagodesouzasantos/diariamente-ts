'use strict';
const fs = require('fs');
// https://stackoverflow.com/questions/18386361/read-a-file-in-node-js
async function read(dir,file){
    try {
        return await fs.readFileSync(dir + file, { encoding: 'utf-8' });
    } catch (error) {
        throw error;
    }
}
async function copy(src,dst){
    try {
        return await fs.copyFile(src, dst, (error) => {
            console.log(error);
        });
    } catch (error) {
        throw error;
    }    
}
async function exists(path) {
    try {
        return await fs.existsSync(path);
    } catch (error) {
        throw error;
    }  
}
async function remove(fullPathFile){
    try {
        return await fs.unlinkSync(fullPathFile);
    } catch (error) {
        throw error;
    }  
}
module.exports = {
    read, copy, exists,remove
}
