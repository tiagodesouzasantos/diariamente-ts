'use strict';
let serverModel = require('../models/serverModel');
let serverPlugin = require('../plugins/serverPlugin');

exports.list = function (req, res) {
    serverModel.get().then(docs => {
        let listServer = serverPlugin.groupDbData(docs);
        res.send(listServer)
    }).catch(reason => {
        console.log(reason)
        res.send(reason)
    });
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