const socket = io('http://localhost:2000')
const messageContainer = document.getElementById('message-container')

const id = prompt('Id urzadzenia')
socket.emit('check-id', id)
socket.on('new-id', id => {
    const name = prompt('Nazwa urzadzenia')
    socket.emit('new-device', { id, name })
    appendMessage(`Nowe urządzenie zostało dodane`)
})
socket.on('old-id', id => {
    
    socket.emit('old-device',  id )
    appendMessage(`Urządzenie zostało podłączone`)
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}