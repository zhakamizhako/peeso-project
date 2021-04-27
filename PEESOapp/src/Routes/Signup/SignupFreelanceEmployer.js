/* eslint-disable prettier/prettier */
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
    Modal,
    Progress,
    ActivityIndicator,
    Stepper,
    DatePicker,
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { createFreelanceEmployer } from '../../stores/modules/user';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import { TextInput } from 'react-native-gesture-handler';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { now } from 'moment';

class SignupFreelanceEmployer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            middlename: null,
            lastname: null,
            address: null,
            contact_no: null,
            email: null,
            photo_verification: null,
            filetype_verification: null,
            photo_house: null,
            filetype_house: null,
            isSubmitting: false,
            isLoggingIn: false,
            error: null,
            profile_id: null,
        };
    }

    componentDidMount() {
        if (
            this.props.auth.loginData != null &&
            this.props.auth.loginData.profile != null
        ) {
            let {
                first_name,
                middle_name,
                last_name,
                email,
                id,
            } = this.props.auth.loginData.profile;
            this.setState({
                first_name,
                middle_name,
                last_name,
                email,
                profile_id: id,
            });
        }
        // console.log(this.props.auth);
        // ws = Ws(`ws://${this.state.auth}`)
    }

    componentWillReceiveProps(props) {
        let { user, auth } = props;

        console.log('SignupFreelanceEmployer props');
        console.log(props);
        console.log('------------');

        console.log('currentprops');
        console.log(this.props);
        console.log('-------!----');

        if (
            this.props.user.createFreelanceEmployerSuccess != user.createFreelanceEmployerSuccess &&
            !auth.loginError
        ) {
            this.setState({
                isSubmitting: false,
            });
            // if (!this.props.auth.loginData) {
            this.setState({ isLoggingIn: true });
            this.props.login({
                email: this.props.user.data.email,
                username: this.props.user.data.username,
                password: this.props.user.tempPassword,
                type: 'signup',
            });
            // }
        }
        if (user.createFreelanceEmployerError) {
            this.setState({
                error: user.createFreelanceEmployerError,
                isLoggingIn: false,
                isSubmitting: false,
            });
        }

        if (
            auth.loginSuccess &&
            this.props.auth.loginData != auth.loginData &&
            auth.loginData &&
            auth.accessToken
        ) {
            // if (auth.loginData.type == "signup") {
            this.props.navigation.replace('homepage');
            // }
        }

        if (auth.loginError) {
            this.setState({
                loginError: auth.loginError,
                isLoggingIn: false,
            });

            Modal.alert(
                'Create Account Error',
                <ScrollView>
                    <View>
                        <Text style={{ textAlign: 'justify' }}>
                            Account Creation has been successful, but there was an error on
                            login.
                        </Text>
                        <WhiteSpace />
                        <Text style={{ textAlign: 'justify' }}>{auth.loginError}</Text>
                        <Text style={{ textAlign: 'justify' }}>Try again?</Text>
                    </View>
                </ScrollView>,
                [
                    {
                        text: 'Accept',
                        onPress: () => {
                            this.props.login({
                                email: this.props.user.data.email,
                                username: this.props.user.data.username,
                                password: this.props.user.tempPassword,
                                type: 'signup',
                            });
                            this.setState({ isLoggingIn: true });
                        },
                    },
                    {
                        text: 'Decline',
                        onPress: () => console.log('cancel'),
                        style: 'cancel',
                    },
                ],
            );
        }
    }

    selectRadio(value) {
        console.log(value);
    }

    submitInfo() {
        console.log('submit shit');
        console.log(this.state);
        this.setState({ isSubmitting: true });
        let data = {
            user_id: this.props.auth.loginData
                ? this.props.auth.loginData.id
                : this.props.user.data
                    ? this.props.user.data.id
                    : null,
            email: this.props.auth.loginData
                ? this.props.auth.loginData.email
                : this.props.user.data
                    ? this.props.user.data.email
                    : null,
            company_name: this.state.company_name,
            first_name: this.state.firstname,
            middle_name: this.state.middlename,
            last_name: this.state.lastname,
            address: this.state.address,
            contact_no: this.state.contact_no,
            profile: this.props.auth.loginData && this.props.auth.loginData.profile
                ? this.props.auth.loginData.profile.id
                : this.props.user.data
                    ? this.props.user.data.id
                    : null,
        };

        this.setState({ isSubmitting: true });
        this.props.createFreelanceEmployer(data);
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text style={{ fontSize: 25 }}>Tell us about you and your place.</Text>
                    <WhiteSpace size={'lg'} />
                    <WhiteSpace size={'lg'} />

                    <List>
                        <List.Item>
                            <Text>First Name</Text>
                            <InputItem
                                value={this.state.firstname}
                                onChange={(val) =>
                                    this.setState((state) => {
                                        let { firstname } = state;
                                        firstname = val;
                                        return { firstname };
                                    })
                                }
                            />
                        </List.Item>

                        <List.Item>
                            <Text>Middle Name</Text>
                            <InputItem
                                value={this.state.middlename}
                                onChange={(val) =>
                                    this.setState((state) => {
                                        let { middlename } = state;
                                        middlename = val;
                                        return { middlename };
                                    })
                                }
                            />
                        </List.Item>

                        <List.Item>
                            <Text>Last Name</Text>
                            <InputItem
                                value={this.state.lastname}
                                onChange={(val) =>
                                    this.setState((state) => {
                                        let { lastname } = state;
                                        lastname = val;
                                        return { lastname };
                                    })
                                }
                            />
                        </List.Item>

                        <List.Item>
                            <Text>Address</Text>
                            <TextAreaItem
                                autoHeight
                                value={this.state.address}
                                onChange={(val) =>
                                    this.setState((state) => {
                                        let { address } = state;
                                        address = val;
                                        return { address };
                                    })
                                }
                            />
                        </List.Item>

                        <List.Item>
                            <Text>Contact Number</Text>
                            <InputItem
                                value={this.state.contact_no}
                                type="phone-pad"
                                onChange={(val) =>
                                    this.setState((state) => {
                                        let { contact_no } = state;
                                        contact_no = val;
                                        return { contact_no };
                                    })
                                }
                            />
                        </List.Item>
                        <WhiteSpace size="lg" />
                    </List>
                    <WhiteSpace size="lg" />

                    <List>
                        <List.Item>Photo of your house</List.Item>
                        {this.state.photo_house && (
                            <List.Item
                                thumb={`file://${this.state.photo_house.path}`}
                                extra={
                                    <Icon
                                        name={'delete'}
                                        color="red"
                                        onPress={() => {
                                            this.setState({ photo_house: null });
                                        }}
                                    />
                                }>
                                <Text>{this.state.photo_house.fileName}</Text>
                            </List.Item>
                        )}
                        <Button
                            onPress={() => {
                                FilePickerManager.showFilePicker(null, (response) => {
                                    console.log('response');
                                    console.log(response);

                                    if (response.didCancel) {
                                        console.log('Cancelled');
                                    } else if (response.error) {
                                        console.log('picker error');
                                        console.log(response.error);
                                    } else {
                                        console.log('good');
                                        this.setState({ photo_house: response });
                                        console.log(response);
                                    }
                                });
                            }}>
                            Select
                        </Button>
                    </List>

                    <WhiteSpace size="lg" />

                    <List>
                        <List.Item>ID Verification</List.Item>
                        {this.state.photo_verification && (
                            <List.Item
                                thumb={`file://${this.state.photo_verification.path}`}
                                extra={
                                    <Icon
                                        name={'delete'}
                                        color="red"
                                        onPress={() => {
                                            this.setState({ photo_verification: null });
                                        }}
                                    />
                                }>
                                <Text>{this.state.photo_verification.fileName}</Text>
                            </List.Item>
                        )}
                        <Button
                            onPress={() => {
                                FilePickerManager.showFilePicker(null, (response) => {
                                    console.log('response');
                                    console.log(response);

                                    if (response.didCancel) {
                                        console.log('Cancelled');
                                    } else if (response.error) {
                                        console.log('picker error');
                                        console.log(response.error);
                                    } else {
                                        console.log('good');
                                        this.setState({ photo_verification: response });
                                        console.log(response);
                                    }
                                });
                            }}>
                            Select ID Photo
                        </Button>
                    </List>

                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />

                    <Button
                        type="primary"
                        onPress={() => {
                            if (!this.state.photo_house || !this.state.photo_verification) {
                                this.setState({ error: 'Photo of the house and ID verification fields are required.' });
                            } else {
                                Modal.alert(
                                    'Disclaimer',
                                    <ScrollView>
                                        <View>
                                            <Text style={{ textAlign: 'justify' }}>
                                                Based on Republic Act 10183--Data Privacy Act of 2012,{' '}
                                            </Text>
                                            <WhiteSpace />
                                            <Text style={{ textAlign: 'justify' }}>
                                                By pressing Accept, You are allowing the City Public
                                                Education and Employment Services Ofice to use your
                                                personal information in employment purpose only and in
                                                accordance to RA 10173.
                                            </Text>
                                            <Text style={{ textAlign: 'justify' }}>
                                                Not the final disclaimer notice and agreement notice
                                                either way.
                                            </Text>
                                        </View>
                                    </ScrollView>,
                                    [
                                        { text: 'Accept', onPress: () => this.submitInfo() },
                                        {
                                            text: 'Decline',
                                            onPress: () => console.log('cancel'),
                                            style: 'cancel',
                                        },
                                    ],
                                );
                            }

                        }}>
                        Next
                    </Button>

                    <Modal transparent visible={this.state.isSubmitting} closable={false}>
                        <ActivityIndicator text="Creating your Account...">
                            {' '}
                        </ActivityIndicator>
                    </Modal>

                    <Modal transparent visible={this.state.error} closable onClose={() => this.setState({ error: null })}>
                        <Text>{this.state.error}</Text>
                    </Modal>

                    <Modal transparent visible={this.state.isLoggingIn} closable={false}>
                        <ActivityIndicator text="Logging In..."> </ActivityIndicator>
                    </Modal>
                </WingBlank>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
});

const mapActionCreators = {
    createFreelanceEmployer,
    login,
};

export default connect(
    mapStateToProps,
    mapActionCreators,
)(SignupFreelanceEmployer);

SignupFreelanceEmployer.propTypes = {};

// export default SignupScreen;
