const EventEmitter = require('events');

class Message extends EventEmitter{

    constructor() {
        super();
        this.message = 'lol'
        this.showMessage = () => {
            this.emit('showIt', this.message)
        }
    }

}

const message = new Message();
console.log(message.message)

message.on('showIt', (data) => {
    console.log(data)
})

message.showMessage();