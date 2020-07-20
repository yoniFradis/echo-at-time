'use strict';
const messageService = require('../services/messagesService');

async function echoAtTime(req, res) {
    const time = req.query.time;
    const msg = req.query.msg;
    const result = await messageService.echoAtTime(msg,time);
    res.status(200).json(result);
}

module.exports = {
    echoAtTime: echoAtTime
};
