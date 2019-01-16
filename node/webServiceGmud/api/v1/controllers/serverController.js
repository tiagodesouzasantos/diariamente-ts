'use strict';
let serverModel = require('../models/serverModel');
// let serverPlugin = require('../plugins/serverPlugin');

exports.list = function (req, res) {   
    res.send(serverModel.get());
};

exports.get = function (req, res) {
    console.log(req, res);
    res.json("{'returnMsg':'oi'}");
};
exports.insert = function (req, res) {
    console.log(req, res);
    res.json("{'returnMsg':'oi'}");
};
exports.update = function (req, res) {
    console.log(req, res);
    res.json("{'returnMsg':'oi'}");
};
exports.delete = function (req, res) {
    console.log(req, res);
    res.json("{'returnMsg':'oi'}");
};