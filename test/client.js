var dgram = require('dgram');
var client = dgram.createSocket("udp4");

// message variable is used to save user input text.
var message = "";

client.on('message', (message, rinfo) => {
	let realMsg = JSON.parse(message.toString('utf8'))
	console.log(`client got: ${Buffer.from(realMsg.data).toString('utf8')} from ${rinfo.address}:${rinfo.port}`)
})

console.log("User input : " + message);

// Create a node Buffer object to wrap message object.
message = new Buffer(JSON.stringify({type: 'String', data: 'hahah🙂'}));

// Send message to udp server through client socket.
client.send(message, 0, message.length, 3000, "localhost");