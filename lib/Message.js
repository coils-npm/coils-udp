class Message {
	constructor ({udp, message, rinfo} = options) {
		message = JSON.parse(message.toString('utf8'))
		console.log(message)
		this.udp = udp
		this.rinfo = rinfo
		this.type = message.type
		switch (message.type) {
			case 'Buffer':
				this.data = Buffer.from(message.data)
				break
			case 'String':
				this.data = message.data.toString('utf8')
				break
			default:
				this.data = message.data
		}
	}
	
	_reply (msgObj) {
		this.udp._send(msgObj, this.rinfo.port, this.rinfo.address)
	}
	
	replyText (message) {
		this._reply({type: 'String', data: message})
	}
	
	replyBuffer (buffer) {
		this._reply(buffer)
	}
}
module.exports = Message