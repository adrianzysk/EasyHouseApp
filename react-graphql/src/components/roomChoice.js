import React from "react";
import { Query} from 'react-apollo';
import gql from 'graphql-tag';
const GET_DEVICES = gql` {
    switches {
        id
      name
      isOn
      status
      room
      deviceid
    }
    thermometers {
      id
    name
    value
    status
    room
    deviceid
  },
  fridges {
    id
  name
  value
  status
  room
  deviceid
},`;

const Rooms = ({ onRoomSelected }) => (
    <Query query={GET_DEVICES}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`; 
        return (
          <select name="room" onChange={onRoomSelected}>
            {data.switches.map(device => ( 
              <option key={device.deviceid} value={device.room}>
                {device.room}
              </option>
            ))}
            {data.fridges.map(device => ( 
              <option key={device.deviceid} value={device.room}>
                {device.room}
              </option>
            ))}
            {data.thermometers.map(device => ( 
              <option key={device.deviceid} value={device.room}>
                {device.room}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  );
  export default Rooms;