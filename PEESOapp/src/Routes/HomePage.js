import React, {Component} from 'react';
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
import {View, Text, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {login, checkMe, logout} from '../stores/modules/auth';
import imageLogo from './../logo.png';
import ToastNice from 'react-native-toast-message';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment, {now} from 'moment';
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
          {text: 'OK', onPress: () => this.props.logout()},
        ]);
      }
    }
    if (
      this.props.auth.tokenCheck &&
      this.props.auth.loginData &&
      this.props.auth.loginData.profile
    ) {
      console.log('A?');
      ToastNice.show({
        text1: 'Welcome back, ' + this.props.auth.loginData.profile.first_name,
        text2: 'test!',
      });
      Toast.success(
        'Welcome back, ' + this.props.auth.loginData.profile.first_name,
        Toast.SHORT,
      );
    }
  }

  render() {
    const menuItems = [
      {
        text: 'Trabaho',
        type: 'trabaho',
        icon: <Icon size={60} name="laptop" />,
      },
      {
        text: 'Companies',
        type: 'companies',
        icon: <Icon size={60} name="bank" />,
      },
      {
        text: 'Saved Jobs',
        type: 'savedjobs',
        icon: <Icon size={60} name="book" />,
      },
      {
        text: 'Search Jobs',
        type: 'search',
        icon: <Icon size={60} name="search" />,
      },
      {
        text: 'Easy Services',
        type: 'easyservices',
        icon: <Icon size={60} name="smile" />,
      },
      {
        text:
          this.props.auth.loginData &&
          this.props.auth.loginData.profile &&
          this.props.auth.loginData.profile.is_company
            ? 'Manage Company'
            : 'My Profile',
        type: 'profile',
        icon: <Icon name="solution" size={60} />,
      },
    ];

    return (
      <View style={{height: '100%'}}>
        <ScrollView>
          <WhiteSpace />
          {/* {this.state.networkError && (<Text>Warning: Connection Error</Text>)} */}
          {/* <View style={{ alignSelf: 'center', marginBottom: 50, marginTop: 50 }}> */}
          <Image
            source={imageLogo}
            style={{height: 150, width: '100%', alignSelf: 'center'}}
            resizeMode="center"
          />
          {/* </View> */}

          <WhiteSpace size="lg" />
          <Grid
            data={menuItems}
            columnNum={2}
            isCarousel
            onPress={(data) => {
              if (data.type != null && this.props.navigation != null) {
                this.props.navigation.navigate(data.type);
              }
            }}
            carouselMaxRow={3}
          />
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
