import React, { Component } from 'react';
import {
    WhiteSpace,
    WingBlank,
    InputItem,
    Button,
    Checkbox,
    Icon,
    List,
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { logout } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import imageLogo from '../../logo.png';
import { Avatar } from 'react-native-elements';
class MyUploads extends Component {
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
            first_name: null,
            middle_name: null,
            last_name: null,
        };
    }

    componentDidMount() {
        // if (this.props.auth.loginData && this.props.loginData.profile != null) {
        this.setState({
            first_name: this.props.auth.loginData.profile
                ? this.props.auth.loginData.profile.first_name
                : 'Unknown',
            middle_name: this.props.auth.loginData.profile
                ? this.props.auth.loginData.profile.middle_name
                : 'Unknown',
            last_name: this.props.auth.loginData.profile
                ? this.props.auth.loginData.profile.last_name
                : 'Unknown',
        });
        // }
    }

    componentWillReceiveProps(props) {
        let { auth } = props;

        if (auth.logoutSuccess) {
            this.props.navigation.replace('login');
        }
    }

    render() {
        // let { first_name, middle_name, last_name } = this.state
        return (
            <View style={{ height: '100%' }}>
                <Text>Uploads Screen</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapActionCreators = {
    logout,
    // login,
};

export default connect(mapStateToProps, mapActionCreators)(MyUploads);

MyUploads.propTypes = {};

// export default MyUploads;
