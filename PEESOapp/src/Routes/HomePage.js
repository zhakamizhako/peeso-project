import React, { Component } from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { logout, checkMe } from '../stores/modules/auth';
import imageLogo from './../logo.png'
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const menuItems = [
  { text: "Trabaho", type: 'trabaho', icon: (<Icon size={60} name="laptop"></Icon>) },
  { text: "Companies", type: 'companies', icon: (<Icon size={60} name="bank" />) },
  { text: "Saved Jobs", type: 'savedjobs', icon: (<Icon size={60} name="book" />) },
  { text: "Search Jobs", type: 'search', icon: (<Icon size={60} name="search" />) },
  { text: "Easy Services", type: 'easyservices', icon: (<Icon size={60} name="smile" />) },
  { text: "My Profile", type: 'profile', icon: (<Icon name="solution" size={60}></Icon>) },
]

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      loginErrorDetails: '',
      devices: [],
      userDetails: null,
    };
  }


  render() {
    return (<View style={{ height: '100%' }}>
      <WhiteSpace />
      {/* <View style={{ alignSelf: 'center', marginBottom: 50, marginTop: 50 }}> */}
      <Image source={imageLogo} style={{ height: 150, width: '100%', alignSelf: 'center', }} resizeMode='center' />
      {/* </View> */}
      <WhiteSpace size="lg" />
      <Grid
        data={menuItems}
        columnNum={2}
        isCarousel

        onPress={(data) => { if (data.type != null && this.props.navigation != null) { this.props.navigation.navigate(data.type) } }}
        carouselMaxRow={3}
      />
    </View>)
  }

}
export default HomePage;