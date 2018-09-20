const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const Message = require('./Message')
class CoilsUdp {
	static mounted (application) {
		Object.defineProperties(application, {
			'_udp': { "get": () => {
				return new CoilsUdp(application)
			}}
		})
	}
	constructor (application) {
		this.application = application
	}
	
	startUdp ({PORT, onError, onListening, onMessage}) {
		PORT = PORT || this.application.PORT
		server.on('error', (err) => {
			if (onError) {
				onError(err)
			} else {
				console.log(`server error:\n${err.stack}`);
			}
			server.close();
		});
		
		server.on('message', (message, rinfo) => {
			onMessage(new Message({udp: this, message, rinfo}))
		})
		
		server.on('listening', () => {
			const address = server.address()
			if (onListening) {
				onListening(address)
			} else {
				console.log(`udp listening ${address.address}:${address.port}`)
			}
		})
		
		server.bind(PORT || this.application.PORT)
	}
	
	_send (msgObj, remotePort, remoteIp) {
		let message = new Buffer(JSON.stringify(msgObj))
		server.send(message, 0, message.length, remotePort, remoteIp)
	}
	
	sendText (message, remotePort, remoteIp) {
		this._send({type: 'String', data: message}, remotePort, remoteIp)
	}
	
	sendBuffer (buffer, remotePort, remoteIp) {
		this._send(buffer, remotePort, remoteIp)
	}
	
	sendObject (object, remotePort, remoteIp) {
		this._send({type: 'Object', data: object}, remotePort, remoteIp)
	}
	
	sendPing (remotePort, remoteIp) {
		this._reply({type: 'Ping'}, remotePort, remoteIp)
	}
}
module.exports = CoilsUdp