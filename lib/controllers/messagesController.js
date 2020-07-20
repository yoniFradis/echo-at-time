'use strict';
var messageService = require('../services/messagesService');

async function echoAtTime(req, res) {
    var time = req.query.time;
    var msg = req.query.msg;
    const result = await messageService.echoAtTime(msg,time);
    res.status(200).json(result);
}

module.exports = {
    echoAtTime: echoAtTime
};
