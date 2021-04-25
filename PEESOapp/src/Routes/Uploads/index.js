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
                <WhiteSpace size="lg" />
                <WingBlank>
                    <View style={{ alignSelf: 'center' }}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{
                                uri:
                                    'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                            }}
                        />
                    </View>
                    <WhiteSpace size="lg" />
                    <Text
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}>
                        {this.state.first_name} {this.state.middle_name}{' '}
                        {this.state.last_name}
                    </Text>
                    {this.props.auth.loginData &&
                        this.props.auth.loginData.profile &&
                        this.props.auth.loginData.profile.is_company && (
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontSize: 16,
                                    fontStyle: 'italic',
                                }}>
                                CompanyName
                            </Text>
                        )}
                    {this.props.auth.loginData &&
                        this.props.auth.loginData.profile &&
                        !this.props.auth.loginData.profile.is_company && (
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontSize: 16,
                                    fontStyle: 'italic',
                                }}>
                                Government Employee Freelancer
                            </Text>
                        )}
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    {this.props.auth.loginData &&
                        this.props.auth.loginData.profile &&
                        this.props.auth.loginData.profile.is_company && (
                            <List>
                                <List.Item
                                    onPress={() => this.props.navigation.navigate('createjob')}>
                                    Post a Job
                                </List.Item>
                                <List.Item>Current Applications</List.Item>
                                <List.Item>Uploads</List.Item>
                                <List.Item>View Company Profile</List.Item>
                                <List.Item>Edit Company Profile</List.Item>
                            </List>
                        )}
                    {this.props.auth.loginData &&
                        this.props.auth.loginData.profile &&
                        !this.props.auth.loginData.profile.is_company && (
                            <List>
                                <List.Item>My Resume</List.Item>
                                <List.Item>My Freelancing Profile</List.Item>
                                <List.Item>Application History</List.Item>
                                <List.Item>Freelancing Booking</List.Item>
                                <List.Item>View Applicant Profile</List.Item>
                                <List.Item>Edit Applicant Profile</List.Item>
                            </List>
                        )}
                    <List.Item>Settings</List.Item>
                    <List.Item style={{ backgroundColor: 'red' }}>
                        <Text style={{ color: 'white' }} onPress={() => this.props.logout()}>
                            Logout
                        </Text>
                    </List.Item>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />

                    <Image
                        source={imageLogo}
                        style={{ height: 80, width: '100%', alignSelf: 'center' }}
                        resizeMode="center"
                    />
                </WingBlank>
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