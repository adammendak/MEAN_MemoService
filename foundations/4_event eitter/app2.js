const eventEmitter = require('events');
const util = require('util');

function Message() {
    this.message = 'lol'
}

util.inherits(Message, eventEmitter)


Message.prototype.showMessage = function() {
    this.emit('showIt', this.message)
}


const message = new Message();

message.on('showIt', (data) => {
    console.log(data)
})

message.showMessage();