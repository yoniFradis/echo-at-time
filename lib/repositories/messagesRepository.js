'use strict';

const redis = require('redis');
const bluebird = require('bluebird');
const setName = "scheduled_msgs";

let redisClient = null;
function initRedisClient() {
	redisClient = redis.createClient();
	bluebird.promisifyAll(redisClient);

  	redisClient.on('connect', function() {
    	console.log('Redis client connected');
	});

	redisClient.on('error', function (err) {
	    console.log('Redis Client - Something went wrong' + err);
	});
}

async function add(msg) {
	const result = await redisClient.zaddAsync(setName, msg.runAt, JSON.stringify(msg));
	return { msg, ok: result === 1 };
}

async function remove(msg) {
	const result = await redisClient.zrem(setName, JSON.stringify(msg));
	return { msg, ok: result };
}

async function getNext() {
	var message;
	const messages = await redisClient.zrangeAsync(setName, 0, 0);
	const msg = messages.pop();
	message = msg ? JSON.parse(msg) : null;
	return message;
}

initRedisClient();

module.exports = {
	add: add,
	getNext: getNext,
	remove: remove
}
