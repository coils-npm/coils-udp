# UDP 
[application._udp]

### Install
```
$ npm i coils-udp -S
```

### Usage

Coils application constructor
```
let CoilsUdp = require('coils-udp')
this.use(CoilsUdp)
this._udp.startUdp({
	PORT: 3000,
	onMessage (message) {
		console.log(message)
		message.replyText('haha received!')
	}
})
```

### Udp

- sendText
- sendBuffer
- sendObject
- sendPing

### Message

- replyText
- replyBuffer