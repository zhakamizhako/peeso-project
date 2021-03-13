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
    DatePicker
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import { TextInput } from 'react-native-gesture-handler';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { now } from 'moment';

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
            job_experiences: [],
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

    submitInfo() {
        console.log("submit shit")
        console.log(this.state)
        this.setState({ isSubmitting: true })
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text style={{ fontSize: 25 }}>Tell us about yourself.</Text>
                    <WhiteSpace size={"lg"} />
                    <WhiteSpace size={"lg"} />
                    {/* <List>
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
                    </List>
                    <WhiteSpace size='lg' />
                    <WhiteSpace size='lg' /> */}
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
                            <InputItem value={this.state.contact_no} type="phone-pad" onChange={(val) => this.setState(state => {
                                let { contact_no } = state
                                contact_no = val
                                return { contact_no }
                            })}></InputItem>
                        </List.Item>
                        <WhiteSpace size="lg" />


                    </List>
                    <WhiteSpace size='lg' />


                    <List.Item extra={(<Icon name="plus" onPress={() => this.setState(state => {
                        let { keySkills } = state
                        keySkills.push({ name: null, rate: 0 })
                        return { keySkills }
                    })} />)}><Text>Key Skills</Text></List.Item>
                    {this.state.keySkills != null && this.state.keySkills.map((data, index) => (<List.Item extra={(<Icon name="delete" onPress={() => this.setState(state => {
                        let { keySkills } = state
                        keySkills.splice(index, 1)
                        return { keySkills }
                    })} color="red"></Icon>)} key={index}>
                        <InputItem value={this.state.keySkills[index].name} placeholder="Graphic Designing : Adobe Photoshop" onChange={(val) => this.setState(state => {
                            let { keySkills } = state
                            keySkills[index].name = val
                            return { keySkills }
                        })}></InputItem>
                        <Text>Rate of Mastery</Text>
                        <Stepper value={this.state.keySkills[index].rate} min={1} max={5} onChange={(val) => this.setState(state => {
                            let { keySkills } = state
                            keySkills[index].rate = val
                            return { keySkills }
                        })}></Stepper>
                    </List.Item>))}
                    <WhiteSpace size='lg' />

                    <List.Item extra={(<Icon name="plus" onPress={() => this.setState(state => {
                        let { educationalBackground } = state
                        educationalBackground.push({ name: "University", startDate: new Date(), endDate: new Date(), degree: '' })
                        return { educationalBackground }
                    })} />)}><Text>Educational Background</Text></List.Item>
                    {this.state.educationalBackground != null && this.state.educationalBackground.map((data, index) => (<List.Item extra={(<Icon name="delete" onPress={() => this.setState(state => {
                        let { educationalBackground } = state
                        educationalBackground.splice(index, 1)
                        return { educationalBackground }
                    })} color="red"></Icon>)} key={index}>
                        <InputItem value={this.state.educationalBackground[index].name} placeholder="University of ABC" onChange={(val) => this.setState(state => {
                            let { educationalBackground } = state
                            educationalBackground[index].name = val
                            return { educationalBackground }
                        })}></InputItem>
                        <Text>Degree/Course</Text>
                        <InputItem value={this.state.educationalBackground[index].degree} min={1} max={5} onChange={(val) => this.setState(state => {
                            let { educationalBackground } = state
                            educationalBackground[index].degree = val
                            return { educationalBackground }
                        })}></InputItem>

                        <DatePicker mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2015, 7, 6)}
                            maxDate={new Date(2026, 11, 3)}
                            // onChange={this.onChange}
                            format="YYYY-MM-DD" value={this.state.educationalBackground[index].startDate} onChange={(val) => this.setState(state => {
                                let { educationalBackground } = state
                                educationalBackground[index].startDate = val
                                return { educationalBackground }
                            })}>
                            <List.Item>
                                <Text>Start Date</Text>
                            </List.Item>
                        </DatePicker>
                        <DatePicker mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2015, 7, 6)}
                            maxDate={new Date(2026, 11, 3)}
                            // onChange={this.onChange}
                            format="YYYY-MM-DD" value={this.state.educationalBackground[index].endDate} onChange={(val) => this.setState(state => {
                                let { educationalBackground } = state
                                educationalBackground[index].endDate = val
                                return { educationalBackground }
                            })}>
                            <List.Item>
                                <Text>End Date</Text>
                            </List.Item>
                        </DatePicker>
                    </List.Item>))}
                    <WhiteSpace size='lg' />

                    <List.Item extra={(<Icon name="plus" onPress={() => this.setState(state => {
                        let { job_experiences } = state
                        job_experiences.push({ name: null, startDate: new Date(), endDate: new Date(), role: null, isPresent: false })
                        return { job_experiences }
                    })} />)}><Text>Job Experience</Text></List.Item>
                    {this.state.job_experiences != null && this.state.job_experiences.map((data, index) => (<List.Item extra={(<Icon name="delete" onPress={() => this.setState(state => {
                        let { job_experiences } = state
                        job_experiences.splice(index, 1)
                        return { job_experiences }
                    })} color="red"></Icon>)} key={index}>
                        <InputItem value={this.state.job_experiences[index].name} placeholder="Juan and Company Ltd." onChange={(val) => this.setState(state => {
                            let { job_experiences } = state
                            job_experiences[index].name = val
                            return { job_experiences }
                        })}>Company</InputItem>
                        {/* <Text>Role</Text> */}
                        <InputItem placeholder="Typist" value={this.state.job_experiences[index].role} min={1} max={5} onChange={(val) => this.setState(state => {
                            let { job_experiences } = state
                            job_experiences[index].role = val
                            return { job_experiences }
                        })}>Role</InputItem>
                        <DatePicker mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2015, 7, 6)}
                            maxDate={new Date(2026, 11, 3)}
                            onChange={this.onChange}
                            format="YYYY-MM-DD" value={this.state.job_experiences[index].startDate} onChange={(val) => this.setState(state => {
                                let { job_experiences } = state
                                job_experiences[index].startDate = val
                                return { job_experiences }
                            })}>
                            <List.Item><Text>Start Date</Text></List.Item>
                        </DatePicker>
                        <DatePicker mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2015, 7, 6)}
                            maxDate={new Date(2026, 11, 3)}
                            onChange={this.onChange}
                            format="YYYY-MM-DD" value={this.state.job_experiences[index].endDate} onChange={(val) => this.setState(state => {
                                let { job_experiences } = state
                                job_experiences[index].endDate = val
                                return { job_experiences }
                            })}>
                            <List.Item><Text>End Date</Text></List.Item>
                        </DatePicker>
                        <Checkbox value={this.state.job_experiences[index].isPresent} onChange={(val) => this.setState(state => {
                            let { job_experiences } = state
                            job_experiences[index].isPresent = val
                            return { job_experiences }
                        })}>Up to Present?</Checkbox>
                    </List.Item>))}
                    <WhiteSpace size='lg' />
                    <WhiteSpace size='lg' />

                    <Button type="primary" onPress={() => {
                        Modal.alert('Disclaimer', (<ScrollView>
                            <View>
                                <Text style={{ textAlign: 'justify' }}>Based on Republic Act 10183--Data Privacy Act of 2012, </Text>
                                <WhiteSpace />
                                <Text style={{ textAlign: 'justify' }}>By pressing Accept, You are allowing the City Public Education and Employment Services Ofice to use your personal information in employment purpose only and in accordance to RA 10173.</Text>
                            </View>
                        </ScrollView>), [
                            { text: 'Accept', onPress: () => this.submitInfo() },
                            {
                                text: 'Decline',
                                onPress: () => console.log('cancel'),
                                style: 'cancel',
                            },
                        ]);
                    }}>Next</Button>

                    <Modal transparent visible={this.state.isSubmitting} closable={false} >
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
