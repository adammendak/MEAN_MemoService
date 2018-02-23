const events = require('events');

const eventEmitter = new events.EventEmitter();

const ringBell = () => {
    console.log('guest is here')
}

eventEmitter.on('guestHere', ringBell);

///////////
const sayHello = () => {
    console.log('ello whos here governer')

}

eventEmitter.on('guestHere', sayHello)

eventEmitter.on('guestHere', (action) => {
    console.log(action)
})

////////////
eventEmitter.emit('guestHere', 'its me your guest');