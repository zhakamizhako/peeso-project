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
import imageLogo from '../../logo.png'
import { Avatar } from 'react-native-elements'
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
                    <View style={{ alignSelf: 'center' }}>
                        <Avatar rounded size='xlarge' source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}></Avatar>
                    </View>
                    <WhiteSpace size="lg" />
                    <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 'bold' }}>Antonio Manuel Turoy</Text>
                    <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 16, fontStyle: 'italic' }}>Government Employee Freelancer</Text>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <List>
                        <List.Item>My Resume</List.Item>
                        <List.Item>My Freelancing Profile</List.Item>
                        <List.Item>Application History</List.Item>
                        <List.Item>Freelancing Booking</List.Item>
                        <List.Item>Settings</List.Item>
                        <List.Item style={{ backgroundColor: 'red' }}><Text style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('login')}>Logout</Text></List.Item>
                    </List>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />

                    <Image source={imageLogo} style={{ height: 80, width: '100%', alignSelf: 'center', }} resizeMode='center' />
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
