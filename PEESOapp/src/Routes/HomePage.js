import React, { Component } from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon,
  Toast,
} from '@ant-design/react-native';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { login, checkMe, logout } from '../stores/modules/auth';
import imageLogo from './../logo.png';
import ToastNice from 'react-native-toast-message';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment, { now } from 'moment';
import { HomeStyles } from './homeStyles'
let ws = {};
let wsInstance = {};
var intervalObject = null;
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      loginErrorDetails: '',
      devices: [],
      userDetails: null,
      networkError: true,
    };
  }

  componentDidMount() {
    this.props.checkMe();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.tokenError && prevProps.auth != this.props.auth) {
      console.log(this.props.auth.tokenError);
      if (this.props.auth.tokenError == 'Network Error') {
        console.log('Conn error');
        Toast.offline('No connection', Toast.SHORT);
      } else {
        // this.setState({ networkError: this.props.auth.tokenError })
        console.log('WTFFFF!?');
        Modal.alert('Session Expired', <Text>Try logging in again</Text>, [
          { text: 'OK', onPress: () => this.props.logout() },
        ]);
      }
      if (
        this.props.auth.tokenCheck &&
        this.props.auth.loginData &&
        this.props.auth.loginData.profile
      ) {
        console.log('A?');
      }
    }
  }

  render() {

    return (
      <View style={{ height: '100%' }}>
        <ScrollView>
          <WingBlank>
            <WhiteSpace size='lg' />
            <View style={{ alignSelf: 'center' }}><Text style={{ fontSize: 25, fontWeight: 'bold' }}>Dashboard</Text></View>

            <Card style={HomeStyles.homeCards}>
              <Card.Header title="Announcements and upcoming Events" />
              <WingBlank>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>PESLA SEMINAR</Text>
              </WingBlank>
            </Card>

            <Card style={HomeStyles.homeCards}>
              <Card.Header title="Limited Time Event" />
              <WingBlank>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignContent: 'flex-start' }}>
                  JOBSTART{'\n'}
                  PHILIPPINES{'\n'}
                  PROGRAM{'\n'}
                </Text>
              </WingBlank>
            </Card>


            <Card style={HomeStyles.homeCards}>
              <Card.Header title="Try Something new" />
              <WingBlank>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignContent: 'flex-start' }}>
                  TRENDING{'\n'}
                  SERVICES{'\n'}
                </Text>
              </WingBlank>
            </Card>
          </WingBlank>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionCreators = {
  login,
  checkMe,
  logout,
};

export default connect(mapStateToProps, mapActionCreators)(HomePage);
