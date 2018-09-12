let CoilsUdp = require('../index')
let application = {}
CoilsUdp.mounted(application)
application._udp.startUdp({
	PORT: 3000,
	onMessage (message) {
		console.log(message)
		message.replyText('haha received!')
	}
})

setTimeout(() => {
	application._udp.sendText('I give you', 53390, 'localhost')
	application._udp.sendBuffer(new Buffer('I give you 2222'), 53390, 'localhost')
}, 3000)