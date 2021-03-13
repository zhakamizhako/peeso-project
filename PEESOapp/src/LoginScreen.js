import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  List
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { login } from './stores/modules/auth';
import { connect } from 'react-redux';
import { API_HOST } from '@env'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import imageLogo from './logo.png'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      isLoggingIn: false,
      loginError: false,
      loginErrorDetails: '',
      connectionError: false,
      errorDialog: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '362915694741-8riiobkpvlh1udujs4ukrn5hn7bq2j1g.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId:
      //   '670264534086-r10o4napfrupjho108d6qtqbmdhmj3ri.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    // console.log(this.props.auth);
    // ws = Ws(`ws://${this.state.auth}`)
  }

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;

      console.log("LOGIN!")
      console.log(user)

      // login({
      //   ftoken: ftoken,
      //   username: user.id,
      //   email: user.email,
      //   type: 'google',
      //   first_name: user.givenName,
      //   last_name: user.familyName,
      //   name: user.name,
      // });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error, 'SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error, 'statusCodes');

        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error, 'PLAY_SERVICES_NOT_AVAILABLE');

        // play services not available or outdated
      } else {
        console.log(error, 'else');

        // some other error happened
      }
    }
  };


  componentWillReceiveProps(props) {
    let { auth } = props;
    if (auth.connectionError) {
      this.setState({
        loginError: true,
        isLoggingIn: false,
        loginErrorDetails: auth.connectionError,
      });
    }
    if (auth.loginError) {
      this.setState({
        loginError: true,
        loginErrorDetails: auth.loginError,
        isLoggingIn: false,
      });
    }
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <WhiteSpace size="lg" />
        <WingBlank>

          {/* <Text style={{ fontSize: 30, textAlign: 'center' }}>PEESO</Text> */}
          <Image source={imageLogo} style={{ height: 250, width: '100%', alignSelf: 'center', }} resizeMode='center' />
          <InputItem
            clear
            error={this.state.loginError}
            onChange={e => {
              if (this.state.loginError) {
                this.setState({ loginError: false, loginErrorDetails: '' });
              }
              this.setState(state => {
                let { email } = state;
                email = e;
                return { email };
              });
            }}
            placeholder="Email"
          />
          <InputItem
            type={!this.state.showPassword ? 'password' : ''}
            clear
            error={this.state.loginError}
            onChange={e => {
              if (this.state.loginError) {
                this.setState({ loginError: false, loginErrorDetails: '' });
              }
              this.setState(state => {
                let { password } = state;
                password = e;
                return { password };
              });
            }}
            placeholder="Password"
          />
          <WhiteSpace />
          <Text style={{ alignSelf: 'center', color: 'red' }}>
            {this.state.loginErrorDetails}
          </Text>
          <WhiteSpace />
          <Checkbox
            style={{ marginLeft: 12 }}
            checked={this.state.showPassword}
            onChange={event => {
              this.setState({ showPassword: event.target.checked });
            }}>
            Show Password
          </Checkbox>
          <WhiteSpace size="lg" />
          <List.Item
            style={{ borderRadius: 25, backgroundColor: '#108ee9' }}
            type="primary"
            loading={this.state.isLoggingIn}

            onPress={() => {
              let loginData = {
                email: this.state.email,
                password: this.state.password,
              };
              this.setState({ isLoggingIn: true });
              this.props.login(loginData);
            }}>
            <Text style={{ alignSelf: 'center', color: 'white' }}>Login</Text>
          </List.Item>
          <Text style={{ alignSelf: 'center' }}>--or--</Text>
          <List.Item style={{ backgroundColor: '#e2402b', borderRadius: 25, }} thumb={(<Icon name="google-plus" color="white"></Icon>)} onPress={() => this.signInGoogle()}><Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Sign in with Google</Text></List.Item>
          {/* <Button style={{ borderRadius: 25, backgroundColor: 'red' }} onPress={() => this.signInGoogle()}></Button> */}
          <WhiteSpace size="lg" />
          <Text>Don't have an account?</Text>
          <Button style={{ borderRadius: 25, }} type="primary" onPress={() => this.props.navigation.navigate('signupemail')}>Sign Up</Button>

          <WhiteSpace size="lg" />
          <Button onPress={() => this.props.navigation.navigate('homepage')}>(Debug) Skip</Button>

          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: 50 }}><Text>API Hostname: {API_HOST}</Text></View>
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapActionCreators = {
  login,
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(LoginScreen);

LoginScreen.propTypes = {};

// export default LoginScreen;
