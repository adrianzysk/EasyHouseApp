import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SwitchComponent from '../../components/switchComponent';
import DeviceRoom from '../../components/mutations/deviceRoom';
import DeviceName from '../../components/mutations/switchName';
import Indicator from '../../components/statusIndicator';
import {socket} from '../../components/header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import 'status-indicator/styles.css'
const useStyles = makeStyles({
  table: {
    minWidth: '650px',
    maxWidth: '90%',
    margin: 'auto',
    backgroundColor: 'silver',
  },
  cell: {
    border: '1px solid',
    width: '20%',
    textAlign: 'center'
  },
  cellMain: {
    border: '1px solid',
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    backgroundColor: 'gray',
    color: 'white'
  },
  row: {
    maxWidth: '100%'
  },
  button: {
    background: 'lightblue',
    borderRadius: '2px',
    color: 'black',
  },
  div: {
    itemAlign: 'center',
    textAlign: 'center'
  }
});
 const GET_SWITCHES = gql` {
  switches{
    isOn
  device {
      name
      status
      room
      deviceid
    }
  }
  thermometers{
    value
  device {
      name
      status
      room
      deviceid
    }
  }
  fridges{
    value
  device {
      name
      status
      room
      deviceid
    }
  }
}` ;

const Home = () => {
  const classes = useStyles();
  return (
    <Query query={GET_SWITCHES} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.cellMain}> Nazwa</TableCell>
                      <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
                      <TableCell className={classes.cellMain} align="right"> status</TableCell>
                      <TableCell className={classes.cellMain} align="right"> stan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(data.switches).map(data => (
                      <TableRow className={classes.row} key={data.deviceid}>
                        <TableCell className={classes.cell} align="right"> <DeviceName data={data.device.name}  data2={data.device.deviceid} /></TableCell>
                        <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
                        <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
                        <TableCell className={classes.cell} align="right"> <div className={classes.div}><SwitchComponent  isItOn={data.isOn} switchid={data.device.deviceid}
                                    handleToggle={(e) => {e.preventDefault(); 
                                    socket.emit('change-switch-value',{id1: data.device.deviceid,isOn: !data.isOn})
                                    }}/></div></TableCell> 
                      </TableRow>                                                                                           
                    ))}
                    <TableRow>
                      <TableCell className={classes.cellMain}> Nazwa</TableCell>
                      <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
                      <TableCell className={classes.cellMain} align="right"> status</TableCell>
                      <TableCell className={classes.cellMain} align="right"> temperatura</TableCell>
                    </TableRow>
                    {data.thermometers.map(data => (
                      <TableRow className={classes.row} key={data.device.deviceid}>
                        <TableCell className={classes.cell} align="right"> 
                          <DeviceName data={data.device.name}  data2={data.device.deviceid} />
                        </TableCell>
                        <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
                        <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
                        <TableCell className={classes.cell} align="right"> {data.value}</TableCell>
                    </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className={classes.cellMain}> Nazwa</TableCell>
                      <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
                      <TableCell className={classes.cellMain} align="right"> status</TableCell>
                      <TableCell className={classes.cellMain} align="right"> temperatura</TableCell>
                    </TableRow> 
                    {data.fridges.map(data => (
                      <TableRow className={classes.row} key={data.device.deviceid}>
                        <TableCell className={classes.cell} align="right"><DeviceName data={data.device.name}  data2={data.device.deviceid} /></TableCell>
                        <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
                        <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
                        <TableCell className={classes.cell} align="right">
                          <button onClick={() => {
                            socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value + 1})
                          }}>
                            +
                          </button>
                          <h2>{data.value}*C</h2> 
                          <button onClick={() =>{
                            socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value -1})
                          }}>
                            -
                          </button> 
                       </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>              
            </div>                              
          );
        }}
      </Query>
  );       
};

export default Home;
