import React, { Component } from 'react';
import {
    WhiteSpace,
    WingBlank,
    InputItem,
    Button,
    Checkbox,
    Icon,
    Radio,
    List
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';

class SignupEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verification_code: null
        };
    }

    componentDidMount() {
        // console.log(this.props.auth);
        // ws = Ws(`ws://${this.state.auth}`)
    }

    componentWillReceiveProps(props) {
        let { auth } = props;
    }

    selectRadio(value) {
        console.log(value)
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text style={{ fontSize: 25 }}>Let's start with this.</Text>
                    <WhiteSpace size={"lg"} />
                    <WhiteSpace size={"lg"} />
                    <List>
                        <List.Item>
                            <Text>Email</Text>
                            <InputItem type={'email-address'} value={this.props.email ? this.props.email : this.state.email} onChange={(val) => this.setState(state => {
                                let { email } = state
                                email = val
                                return { email }
                            })} disabled={this.props.email}></InputItem>
                        </List.Item>

                        <List.Item>
                            <Text>Password</Text>
                            <InputItem disabled={this.props.email ? true : false} type={this.state.visiblePassword ? 'visible-password' : 'password'} value={this.props.email ? null : this.state.password} onChange={(val) => this.setState(state => {
                                let { password } = state
                                password = val
                                return { password }
                            })}></InputItem>
                            <Checkbox disabled={this.props.email ? true : false} onChange={() => this.setState({ visiblePassword: !this.state.visiblePassword })}>Show Password</Checkbox>
                        </List.Item>

                        <List.Item
                            style={{ borderRadius: 25, backgroundColor: '#108ee9' }}
                            type="primary"
                            loading={this.state.isLoggingIn}

                            onPress={() => {
                                let signupData = {
                                    email: this.state.email,
                                    password: this.state.password,
                                };
                                this.props.navigation.navigate("verificationotp")
                                // this.props.login(loginData);
                            }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>Next</Text>
                        </List.Item>
                    </List>
                    <WhiteSpace size='lg' />
                    <WhiteSpace size='lg' />
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
)(SignupEmail);

SignupEmail.propTypes = {};

// export default SignupEmail;
