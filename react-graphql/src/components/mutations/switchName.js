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
const POST_DEVICE = gql`
mutation editDevice($deviceid: Int!, $name: String!) {
  editDevice(deviceid: $deviceid,name: $name) {
    deviceid
  }
}
`; 
const SwitchName = ({data,data2}) => {
  const classes = useStyles();
  let input;
  return(
    <Popup trigger={<Button variant="contained" className={classes.button}> {data}</Button>} position="right center">
            <div> 
              <Mutation mutation={POST_DEVICE} >
                {(editThermometer, {data3}) => (
                  <div>                   
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        editThermometer({ variables: { deviceid: data2, name: input.value } });   
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
export default graphql(POST_DEVICE)(SwitchName);