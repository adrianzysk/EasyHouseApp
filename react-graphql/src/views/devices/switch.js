import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import SwitchComponent from '../../components/switchComponent'
const val = 3347589
const deviceid = parseInt(val)
const type = 'switch'

const MainSwitch = () => {
    const [value, setValue] = useState(false);
    const socket = socketIOClient('http://localhost:2000')

    useEffect(() => {
        const messageContainer = document.getElementById('message-container')
        socket.emit('check-id', {deviceid})
        socket.on('new-id', deviceid => {
            socket.emit('add-device', { deviceid,type })
            appendMessage(`Urządzenie zostało dodane`)
        })
        socket.on('old-id', deviceid => {
            socket.emit('old-device',  deviceid )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        socket.on('value', ( {id1, isOn} ) => {
          socket.emit('test')
            if(id1 == deviceid)
            {
              setValue(isOn)
            }
        })
        socket.emit('send-switch-value', {deviceid, value})

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }
    }, []);
    useEffect(() => {
      socket.emit('send-switch-value', {deviceid, value})
    },[value])
    
    const thermostyle = {
      padding: "20px",
      margin: "0 auto",
      textAlign: "center",
      width: "10%"
    };
    const infostyle = {
      padding: "20px",
      textAlign: "center",
    };
    return (
        <div >
            <div style={thermostyle}>
            <SwitchComponent  isItOn={value} switchid={deviceid}
             handleToggle={() => setValue(!value)}/>
             {value}
            </div>
            <div style={thermostyle}>
            </div>
        <div style={infostyle} id="message-container"></div>
        </div>
    )
};
export default MainSwitch;