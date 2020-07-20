'use strict';

const msgsRepo = require('../repositories/messagesRepository');
const uuid4 = require('uuid/v4');

async function echoAtTime(text, time) {
    const msg = { text: text, runAt:time, id:  uuid4() };
    return await msgsRepo.add(msg);
}

function echoMsg(msg) {
	const date = new Date(parseInt(msg.runAt));
	console.log(`${msg.text} (${date.toString()})`);
}


async function echoMsgs() {

	try {
		const msg = await msgsRepo.getNext();
		if (msg) {
			const time = msg.runAt;
			const currentTime = Date.now();

			if (time < currentTime) {
				const result = await msgsRepo.remove(msg);
				// The only one who managed to remove the item should echo it (to avoid duplicates)
				if (result.ok) {
					echoMsg(msg);
				}
			}
		}
	} catch (err) {
        console.error('Error processing delayed messages', err);
    }

}

function initScheduler() {
	setInterval(echoMsgs, 1000);
}

initScheduler();

module.exports = {
    echoAtTime: echoAtTime
};
