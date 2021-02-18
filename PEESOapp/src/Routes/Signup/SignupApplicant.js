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
    ActivityIndicator
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import { TextInput } from 'react-native-gesture-handler';

class SignupApplicant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            middlename: null,
            lastname: null,
            address: null,
            contact_no: null,
            email: null,
            keySkills: [],
            educationalBackground: [],
            jobExperiences: [],
            expectedSalary: null,
            openingStatement: null,
            visiblePassword: false,
            isSubmitting: false,
        };
    }

    componentDidMount() {
        // console.log(this.props.auth);
        // ws = Ws(`ws://${this.state.auth}`)
    }

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

    selectRadio(value) {
        console.log(value)
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text style={{ fontSize: 25 }}>Let's start with a few things.</Text>
                    <WhiteSpace size={"lg"} />
                    <WhiteSpace size={"lg"} />
                    <List>
                        <List.Item>
                            <Text>Email</Text>
                            <InputItem type={'email-address'} value={this.props.email ? this.props.email : this.state.email} disabled={this.props.email}></InputItem>
                        </List.Item>

                        <List.Item>
                            <Text>Password</Text>
                            <InputItem disabled={this.props.email ? true : false} type={this.state.visiblePassword ? 'visible-password' : 'password'} value={this.props.email ? null : this.state.password}></InputItem>
                            <Checkbox disabled={this.props.email ? true : false} onChange={() => this.setState({ visiblePassword: !this.state.visiblePassword })}>Show Password</Checkbox>
                        </List.Item>
                    </List>
                    <WhiteSpace size='lg' />
                    <WhiteSpace size='lg' />
                    <List>
                        <List.Item>
                            <Text>Opening Statement</Text>
                            <TextAreaItem autoHeight value={this.state.openingStatement} onChange={(val) => this.setState(state => {
                                let { openingStatement } = state
                                openingStatement = val
                                return { openingStatement }
                            })}></TextAreaItem>
                        </List.Item>

                        <List.Item>
                            <Text>First Name</Text>
                            <InputItem value={this.state.firstname} onChange={(val) => this.setState(state => {
                                let { firstname } = state
                                firstname = val
                                return { firstname }
                            })}></InputItem>
                        </List.Item>

                        <List.Item>
                            <Text>Middle Name</Text>
                            <InputItem value={this.state.middlename} onChange={(val) => this.setState(state => {
                                let { middlename } = state
                                middlename = val
                                return { middlename }
                            })}></InputItem>
                        </List.Item>

                        <List.Item>
                            <Text>Last Name</Text>
                            <InputItem value={this.state.lastname} onChange={(val) => this.setState(state => {
                                let { lastname } = state
                                lastname = val
                                return { lastname }
                            })}></InputItem>
                        </List.Item>

                        <List.Item>
                            <Text>Address</Text>
                            <TextAreaItem autoHeight value={this.state.address} onChange={(val) => this.setState(state => {
                                let { address } = state
                                address = val
                                return { address }
                            })}></TextAreaItem >
                        </List.Item>

                        <List.Item>
                            <Text>Contact Number</Text>
                            <InputItem value={this.state.contact_no} onChange={(val) => this.setState(state => {
                                let { contact_no } = state
                                contact_no = val
                                return { contact_no }
                            })}></InputItem>
                        </List.Item>
                    </List>
                    <WhiteSpace size='lg' />

                    <Button type="primary" onPress={() => {
                        Modal.alert('Disclaimer', (<ScrollView>
                            <View>
                                <Text style={{ textAlign: 'justify' }}>Based on Republic Act 10183--Data Privacy Act of 2012, </Text>
                                <WhiteSpace />
                                <Text style={{ textAlign: 'justify' }}>By pressing Accept, You are allowing the City Public Education and Employment Services Ofice to use your personal information in employment purpose only and in accordance to RA 10173.</Text>
                            </View>
                        </ScrollView>), [
                            { text: 'Accept', onPress: () => console.log('ok') },
                            {
                                text: 'Decline',
                                onPress: () => console.log('cancel'),
                                style: 'cancel',
                            },
                        ]);
                    }}>Next</Button>

                    <Modal transparent visible={this.state.isSubmitting} >
                        <ActivityIndicator text="Creating your Account..."> </ActivityIndicator>
                    </Modal>


                </WingBlank>
            </ScrollView>
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
)(SignupApplicant);

SignupApplicant.propTypes = {};

// export default SignupScreen;
