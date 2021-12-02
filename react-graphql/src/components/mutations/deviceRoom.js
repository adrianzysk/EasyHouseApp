import React from "react";
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Popup from "reactjs-popup";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/button';
const useStyles = makeStyles({
  button: {
    background: 'lightgray',
    borderRadius: '2px',
    color: 'black',
  },
  div: {
    textAlign: 'center',
  }
});
const POST_DEVICE_ROOM = gql`
mutation editDeviceRoom($deviceid: Int!, $room: String!) {
    editDeviceRoom(deviceid: $deviceid,room: $room) {
    deviceid
  }
}`; 
const DeviceRoom = ({deviceName,deviceID}) => {
  const classes = useStyles();
  let input;
  return(
    <Popup trigger={<Button variant="contained" classname={classes.button}> {deviceName}</Button>} position="right center">
            <div> 
              <Mutation mutation={POST_DEVICE_ROOM} >
                {(editThermometer, {data3}) => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        editThermometer({ variables: { deviceid: deviceID, room: input.value } });    
                        input.value = "";
                      }}
                    >
                      <input type="text" minlength="3"
                        ref={node => {
                          input = node;
                        }}
                      />
                      <button type="submit">Zmień nazwę</button>
                    </form> 
                  </div>
                )}
              </Mutation> 
            </div>
  </Popup>
  )
};
export default graphql(POST_DEVICE_ROOM)(DeviceRoom);