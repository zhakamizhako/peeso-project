/* eslint-disable react/jsx-no-duplicate-props */
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
import { createApplicant } from '../../stores/modules/user';
import { login, checkMe } from '../../stores/modules/auth';
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
      isLoggingIn: false,
      error: null,
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

    console.log('signupapplicant props');
    console.log(props);
    console.log('------------');

    console.log('currentprops');
    console.log(this.props);
    console.log('-------!----');

    if (
      this.props.user.createApplicantSuccess != user.createApplicantSuccess &&
      !auth.loginError
    ) {
      this.setState({
        isSubmitting: false,
      });
      if (!this.props.auth.loginData) {
        this.setState({ isLoggingIn: true });
        this.props.login({
          email: this.props.user.data.email,
          username: this.props.user.data.username,
          password: this.props.user.tempPassword,
          type: 'signup',
        });
      } else {
        this.props.checkMe();
        // this.props.navigation.replace("homepage")
      }
    }
    if (user.createApplicantError) {
      this.setState({
        error: user.createApplicantError,
        isLoggingIn: false,
      });
    }

    if (
      this.props.user.createApplicantSuccess &&
      this.props.auth.tokenCheck &&
      this.props.auth.loginData &&
      this.props.auth.loginData.profile
    ) {
      this.props.navigation.replace('homepage');
    }

    if (
      auth.loginSuccess &&
      this.props.auth.loginData != auth.loginData &&
      auth.loginData &&
      auth.accessToken
    ) {
      if (auth.loginData.type == 'signup') {
        this.props.navigation.replace('homepage');
      }
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
    console.log('STATEW');
    console.log(this.props);
    console.log('-------------');
    this.setState({ isSubmitting: true });
    let data = {
      user_id: this.props.user.data
        ? this.props.user.data.id
        : this.props.auth.loginData
          ? this.props.auth.loginData.id
          : null,
      email: this.props.user.data
        ? this.props.user.data.email
        : this.props.auth.loginData
          ? this.props.auth.loginData.email
          : null,
      opening_statement: this.state.openingStatement,
      first_name: this.state.firstname,
      middle_name: this.state.middlename,
      last_name: this.state.lastname,
      address: this.state.address,
      contact_no: this.state.contact_no,
      expected_salary: this.state.expectedSalary,
      key_skills: this.state.keySkills,
      educational_backgrounds: this.state.educationalBackground,
      job_experiences: this.state.educationalBackground,
    };
    this.setState({ isSubmitting: true });
    this.props.createApplicant(data);
  }

  render() {
    return (
      <ScrollView style={{ height: '100%' }}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Text style={{ fontSize: 25 }}>Tell us about yourself.</Text>
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
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
              <TextAreaItem
                autoHeight
                value={this.state.openingStatement}
                onChange={(val) =>
                  this.setState((state) => {
                    let { openingStatement } = state;
                    openingStatement = val;
                    return { openingStatement };
                  })
                }
              />
            </List.Item>

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

          <List.Item
            extra={
              <Icon
                name="plus"
                onPress={() =>
                  this.setState((state) => {
                    let { keySkills } = state;
                    keySkills.push({ name: null, rate: 0 });
                    return { keySkills };
                  })
                }
              />
            }>
            <Text>Key Skills</Text>
          </List.Item>
          {this.state.keySkills != null &&
            this.state.keySkills.map((data, index) => (
              <List.Item
                extra={
                  <Icon
                    name="delete"
                    onPress={() =>
                      this.setState((state) => {
                        let { keySkills } = state;
                        keySkills.splice(index, 1);
                        return { keySkills };
                      })
                    }
                    color="red"
                  />
                }
                key={index}>
                <InputItem
                  value={this.state.keySkills[index].name}
                  placeholder="Graphic Designing : Adobe Photoshop"
                  onChange={(val) =>
                    this.setState((state) => {
                      let { keySkills } = state;
                      keySkills[index].name = val;
                      return { keySkills };
                    })
                  }
                />
                <Text>Rate of Mastery</Text>
                <Stepper
                  value={this.state.keySkills[index].rate}
                  min={1}
                  max={5}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { keySkills } = state;
                      keySkills[index].rate = val;
                      return { keySkills };
                    })
                  }
                />
              </List.Item>
            ))}
          <WhiteSpace size="lg" />

          <List.Item
            extra={
              <Icon
                name="plus"
                onPress={() =>
                  this.setState((state) => {
                    let { educationalBackground } = state;
                    educationalBackground.push({
                      name: 'University',
                      startDate: new Date(),
                      endDate: new Date(),
                      degree: '',
                    });
                    return { educationalBackground };
                  })
                }
              />
            }>
            <Text>Educational Background</Text>
          </List.Item>
          {this.state.educationalBackground != null &&
            this.state.educationalBackground.map((data, index) => (
              <List.Item
                extra={
                  <Icon
                    name="delete"
                    onPress={() =>
                      this.setState((state) => {
                        let { educationalBackground } = state;
                        educationalBackground.splice(index, 1);
                        return { educationalBackground };
                      })
                    }
                    color="red"
                  />
                }
                key={index}>
                <InputItem
                  value={this.state.educationalBackground[index].name}
                  placeholder="University of ABC"
                  onChange={(val) =>
                    this.setState((state) => {
                      let { educationalBackground } = state;
                      educationalBackground[index].name = val;
                      return { educationalBackground };
                    })
                  }
                />
                <Text>Degree/Course</Text>
                <InputItem
                  value={this.state.educationalBackground[index].degree}
                  min={1}
                  max={5}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { educationalBackground } = state;
                      educationalBackground[index].degree = val;
                      return { educationalBackground };
                    })
                  }
                />

                <DatePicker
                  mode="date"
                  defaultDate={new Date()}
                  minDate={new Date(1700, 1, 1)}
                  maxDate={new Date()}
                  // onChange={this.onChange}
                  format="YYYY-MM-DD"
                  value={this.state.educationalBackground[index].startDate}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { educationalBackground } = state;
                      educationalBackground[index].startDate = val;
                      return { educationalBackground };
                    })
                  }>
                  <List.Item>
                    <Text>Start Date</Text>
                  </List.Item>
                </DatePicker>
                <DatePicker
                  mode="date"
                  defaultDate={new Date()}
                  minDate={new Date(1700, 7, 6)}
                  maxDate={new Date()}
                  // onChange={this.onChange}
                  format="YYYY-MM-DD"
                  value={this.state.educationalBackground[index].endDate}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { educationalBackground } = state;
                      educationalBackground[index].endDate = val;
                      return { educationalBackground };
                    })
                  }>
                  <List.Item>
                    <Text>End Date</Text>
                  </List.Item>
                </DatePicker>
              </List.Item>
            ))}
          <WhiteSpace size="lg" />

          <List.Item
            extra={
              <Icon
                name="plus"
                onPress={() =>
                  this.setState((state) => {
                    let { job_experiences } = state;
                    job_experiences.push({
                      name: null,
                      startDate: new Date(),
                      endDate: new Date(),
                      role: null,
                      isPresent: false,
                    });
                    return { job_experiences };
                  })
                }
              />
            }>
            <Text>Job Experience</Text>
          </List.Item>
          {this.state.job_experiences != null &&
            this.state.job_experiences.map((data, index) => (
              <List.Item
                extra={
                  <Icon
                    name="delete"
                    onPress={() =>
                      this.setState((state) => {
                        let { job_experiences } = state;
                        job_experiences.splice(index, 1);
                        return { job_experiences };
                      })
                    }
                    color="red"
                  />
                }
                key={index}>
                <InputItem
                  value={this.state.job_experiences[index].name}
                  placeholder="Juan and Company Ltd."
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_experiences } = state;
                      job_experiences[index].name = val;
                      return { job_experiences };
                    })
                  }>
                  Company
                </InputItem>
                {/* <Text>Role</Text> */}
                <InputItem
                  placeholder="Typist"
                  value={this.state.job_experiences[index].role}
                  min={1}
                  max={5}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_experiences } = state;
                      job_experiences[index].role = val;
                      return { job_experiences };
                    })
                  }>
                  Role
                </InputItem>
                <DatePicker
                  mode="date"
                  defaultDate={new Date()}
                  minDate={new Date(1700, 1, 1)}
                  maxDate={new Date()}
                  onChange={this.onChange}
                  format="YYYY-MM-DD"
                  value={this.state.job_experiences[index].startDate}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_experiences } = state;
                      job_experiences[index].startDate = val;
                      return { job_experiences };
                    })
                  }>
                  <List.Item>
                    <Text>Start Date</Text>
                  </List.Item>
                </DatePicker>
                <DatePicker
                  mode="date"
                  defaultDate={new Date()}
                  minDate={new Date(1700, 1, 1)}
                  maxDate={new Date()}
                  onChange={this.onChange}
                  format="YYYY-MM-DD"
                  value={this.state.job_experiences[index].endDate}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_experiences } = state;
                      job_experiences[index].endDate = val;
                      return { job_experiences };
                    })
                  }>
                  <List.Item>
                    <Text>End Date</Text>
                  </List.Item>
                </DatePicker>
                <Checkbox
                  value={this.state.job_experiences[index].isPresent}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_experiences } = state;
                      job_experiences[index].isPresent = val;
                      return { job_experiences };
                    })
                  }>
                  Up to Present?
                </Checkbox>
              </List.Item>
            ))}
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />

          <Button
            type="primary"
            onPress={() => {
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
            }}>
            Next
          </Button>

          <Modal transparent visible={this.state.isSubmitting} closable={false}>
            <ActivityIndicator text="Creating your Account...">
              {' '}
            </ActivityIndicator>
          </Modal>

          <Modal transparent visible={this.state.error} closable={true}>
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
  createApplicant,
  login,
  checkMe,
};

export default connect(mapStateToProps, mapActionCreators)(SignupApplicant);

SignupApplicant.propTypes = {};

// export default SignupScreen;
