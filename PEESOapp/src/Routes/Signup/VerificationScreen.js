import React, {Component} from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  Radio,
  List,
  ActivityIndicator,
  Modal,
} from '@ant-design/react-native';
import {View, Text, ScrollView} from 'react-native';
import {login} from '../../stores/modules/auth';
import {verifyOTP, newOTP} from '../../stores/modules/user';
import {connect} from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';

class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verification_code: null,
      error: false,
      isSubmitting: false,
      isNewOTP: false,
      otperror: false,
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({mounted: true});
    // console.log(this.props.auth);
    // ws = Ws(`ws://${this.state.auth}`)
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  componentWillReceiveProps(props) {
    let {user} = props;

    if (user.OTPError) {
      this.setState({error: user.OTPError, isSubmitting: false});
    }
    if (user.OTPSuccess && this.state.mounted) {
      this.setState({isSubmitting: false, mounted: false});
      this.props.navigation.replace('signup');
    }
    if (user.NewOTPSuccess) {
      this.setState({isNewOTP: false, otperror: null});
    }
    if (user.NewOTPError) {
      this.setState({isNewOTP: false, otperror: user.NewOTPError});
    }
  }

  selectRadio(value) {
    console.log(value);
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{fontSize: 25}}>Let's make sure you're not a bot.</Text>
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <Text>Enter the OTP code that was sent to your email.</Text>
          <WhiteSpace size={'lg'} />
          <List.Item>
            <InputItem
              placeholder="XXXXXX"
              value={this.state.verification_code}
              onChange={(val) =>
                this.setState((state) => {
                  let {verification_code} = state;
                  var str = val;
                  str = str.toUpperCase();
                  // str.toUpperCase();
                  verification_code = str;
                  // verification_code.toUpperCase()
                  return {verification_code};
                })
              }
            />
          </List.Item>
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <List.Item
            style={{borderRadius: 25, backgroundColor: '#108ee9'}}
            type="primary"
            loading={this.state.isLoggingIn}
            onPress={() => {
              this.setState({isSubmitting: true});
              // let signupData = {
              //     email: this.state.email,
              //     password: this.state.password,
              // };

              this.props.verifyOTP({
                user_id: this.props.user.data.id,
                otp_code: this.state.verification_code,
              });
              // this.props.navigation.navigate("signup")
              // this.props.login(loginData);
            }}>
            <Text style={{alignSelf: 'center', color: 'white'}}>Next</Text>
          </List.Item>

          <WhiteSpace size={'lg'} />
          {this.state.error && (
            <Text style={{color: 'red'}}>{this.state.error}</Text>
          )}
          {this.state.otperror && (
            <Text style={{color: 'red'}}>{this.state.otperror}</Text>
          )}
          <View style={{flex: 1}}>
            <Text>
              Didn't receive your code?{' '}
              <Text
                style={{color: 'blue', fontWeight: 'bold'}}
                onPress={() => {
                  this.setState({isNewOTP: true});
                  this.props.newOTP({user_id: this.props.user.data.id});
                }}>
                Resend it
              </Text>
            </Text>
          </View>
          <Modal transparent visible={this.state.isSubmitting} closable={false}>
            <ActivityIndicator text="Checking if OTP is right...">
              {' '}
            </ActivityIndicator>
          </Modal>
          <Modal transparent visible={this.state.isNewOTP} closable={false}>
            <ActivityIndicator text="Requesting new OTP...">
              {' '}
            </ActivityIndicator>
          </Modal>
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapActionCreators = {
  // login,
  verifyOTP,
  newOTP,
};

export default connect(mapStateToProps, mapActionCreators)(VerificationScreen);

VerificationScreen.propTypes = {};

// export default VerificationScreen;
