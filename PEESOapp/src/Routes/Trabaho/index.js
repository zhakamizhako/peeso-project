import React, {Component} from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon
} from '@ant-design/react-native';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
    {text: "Trabaho"},
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

  render(){
      return(<>
      <Text>A?</Text>
      <Icon name="alert"></Icon>
      <Grid
          data={menuItems}
          columnNum={3}
          isCarousel
          onPress={(_el, index) => alert(index)}
          carouselMaxRow={3}
        />
      </>)
  }

}
export default HomePage;