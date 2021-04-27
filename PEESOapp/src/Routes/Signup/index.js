import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  Radio,
  List,
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { login, logout } from '../../stores/modules/auth';
import { connect } from 'react-redux';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      isLoggingIn: false,
      loginError: false,
      loginErrorDetails: '',
      connectionError: false,
      selectedRadio: null,
    };
  }

  componentDidMount() {
    // console.log(this.props.auth);
    // ws = Ws(`ws://${this.state.auth}`)
  }

  componentWillReceiveProps(props) {
    let { auth } = props;
    if (auth != this.props.auth) {
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
      if (auth.logoutSuccess) {
        console.log('a?');
        this.props.navigation.replace('login');
      }
    }
  }

  selectRadio(value) {
    console.log(value);
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{ fontSize: 25 }}>
            What are you creating an account for?
          </Text>
          <WhiteSpace size={'lg'} />
          <Radio />
          <List>
            <Radio.RadioItem
              name="Applicant"
              checked={this.state.selectedRadio == 0}
              onChange={(event) => {
                if (event.target.checked) {
                  this.setState({ selectedRadio: 0 });
                }
              }}>
              Applicant
            </Radio.RadioItem>
            <Radio.RadioItem
              name="Freelance Employer"
              checked={this.state.selectedRadio == 1}
              onChange={(event) => {
                if (event.target.checked) {
                  this.setState({ selectedRadio: 1 });
                }
              }}>
              Freelance Employer
            </Radio.RadioItem>
            <Radio.RadioItem
              name="Company"
              checked={this.state.selectedRadio == 2}
              onChange={(event) => {
                if (event.target.checked) {
                  this.setState({ selectedRadio: 2 });
                }
              }}>
              Company
            </Radio.RadioItem>
          </List>

          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <Button
            type="primary"
            disabled={this.state.selectedRadio == null}
            onPress={() => {
              if (this.state.selectedRadio == 0) {
                this.props.navigation.navigate('signupapplicant');
              }
              if (this.state.selectedRadio == 1) {
                this.props.navigation.navigate('signupfreelance');
              }
              if (this.state.selectedRadio == 2) {
                this.props.navigation.navigate('signupcompany');
              }
            }}>
            Next
          </Button>
          <WhiteSpace size={'lg'} />
          <Button onPress={() => this.props.logout()}>Cancel</Button>
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionCreators = {
  login,
  logout,
};

export default connect(mapStateToProps, mapActionCreators)(SignupScreen);

SignupScreen.propTypes = {};

// export default SignupScreen;
