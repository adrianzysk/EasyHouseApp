import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import thermometer from './views/devices/thermometer';
import switch1 from './views/devices/switch';
import fridge from './views/devices/fridge';
import  {Header} from "./components/header";
import home from './views/home/home';
import Rooms from './views/rooms/Rooms';
import device from './views/devices/devices';
import swiatlo from './views/devices/swiatlo';
import register from './views/register/Register';

export default class App extends Component {
    render() {
        return (
            <>
            <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/devices/thermometer" component={thermometer} />
                <Route path="/devices/switch" component={switch1} />
                <Route path="/devices/fridge" component={fridge} />
                <Route path="/devices/swiatlo" component={swiatlo} />
                <Route path="/devices" component={device} />
                <Route path="/rooms" component={Rooms} />
                <Route path="/register" component={register} />
                <Route path="/" component={home} />
            </Switch>
            </BrowserRouter>
            </>
        );
    }
}