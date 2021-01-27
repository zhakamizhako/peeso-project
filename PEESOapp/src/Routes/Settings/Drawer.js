import React, { Children, Component } from 'react';
import {
    Button,
    WhiteSpace,
    WingBlank,
    Modal,
    Card,
    Grid,
    Icon,
    Drawer,
    List
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logout, checkMe } from '../../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import CardHeader from '@ant-design/react-native/lib/card/CardHeader';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleUser = {
    firstname: "Paolo",
    middlename: "Kailus",
    lastname: "Kilus"
}
class UserDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.drawer = React.createRef();
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const sidebar = (<View style={{ flex: 1, height: '100%', backgroundColor: 'white' }}>

            <List.Item><Card><Card.Header title="Username" /></Card></List.Item>
            <List.Item><Text>Notifications</Text></List.Item>
            <List.Item><Text>Privacy Statement</Text></List.Item>
            <List.Item><Text>Terms and Conditions</Text></List.Item>
            <List.Item><Text>About</Text></List.Item>
            <List.Item onPress={() => {
                this.props.navigatorProps.current.navigate("login")
                console.log("EH")
                console.log(this.drawer)
                this.drawer.current.drawer.closeDrawer()
                // this.drawer.setDrawerClosed();
                // console.log(this.drawer)
                // this.props.setDrawerClosed()
            }}><Text>Logout</Text></List.Item></View>)
        return (<>
            <Drawer ref={this.drawer} open={this.props != null ? this.props.drawerOpen : false} sidebar={sidebar} >
                {this.props.children}
            </Drawer>
        </>)
    }

}
export default UserDrawer;