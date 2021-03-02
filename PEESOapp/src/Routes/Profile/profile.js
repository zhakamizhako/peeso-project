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
// import { login } from './stores/modules/auth';
import { connect } from 'react-redux';
import imageLogo from './logo.png'

class ProfileScreen extends Component {
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

    }

    componentWillReceiveProps(props) {
        let { auth } = props;
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text>PROFILE</Text>
                </WingBlank>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapActionCreators = {
    // login,
};

export default connect(
    mapStateToProps,
    mapActionCreators,
)(ProfileScreen);

ProfileScreen.propTypes = {};

// export default ProfileScreen;
