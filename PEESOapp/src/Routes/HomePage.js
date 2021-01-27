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
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logout, checkMe } from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const menuItems = [
  { text: "Trabaho", type: 'trabaho' },
  { text: "Companies" },
  { text: "Saved Jobs" },
  { text: "Search Jobs" },
  { text: "Easy Services" },
  { text: "My Profile" },
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
      <View style={{ alignSelf: 'center' }}>
        <Text>[PEESO LOGO HERE]</Text>
      </View>
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