import React, { Component } from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon,
  Toast,
  List,
  InputItem,
  ActivityIndicator,
} from '@ant-design/react-native';
import FilePickerManager from 'react-native-file-picker';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { newApplication, applyJob } from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import Input from '@ant-design/react-native/lib/input-item/Input';
import RNFetchBlob from 'rn-fetch-blob';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = {
  JobTitle: 'Trabaho 1',
  company: {
    name: 'ABCD Co. Ltd',
    shortdesc:
      'A first-class private company of the Province of Davao del Norte.',
  },
  questions: [
    { text: 'Do you have a job experience related to government services?' },
    { text: 'Have you completed college?' },
    { text: 'Do you have a second-level eligibility?' },
  ],
  authorization_questions: [
    {
      text:
        'Are you willing to be assigned to other partner-government agency of LGU?',
    },
    { text: 'Are you willing to be wat?' },
  ],
};

const SampleUser = {
  firstname: 'Nakura',
  lastname: 'Tan',
  email: 'nakuratan@mailmail.com',
  contact_no: '12345678901',
};

class ApplyHere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // company_name: '',
      user: { firstname: '', middlename: '', lastname: '', contact_no: '' },
      input_email: '',
      input_contact_no: '',
      questions_additional: [],
      questions_authorization: [],
      jobData: null,
      isLoading: false,
      selectedFile: null,
      isSubmitting: false,
      // answers_additional: [],
      // answers_authorization: [],
    };
  }

  componentDidMount() {
    console.log('AAAA');
    console.log(this.props);
    if (this.props.route) {
      this.props.newApplication(this.props.route.params.id);
      this.setState({ isLoading: true });
    }
    this.setState((state) => {
      let { user, input_email, input_contact_no } = state;
      if (this.props.auth.loginData && this.props.auth.loginData.profile) {
        let d = this.props.auth.loginData.applicant;
        user.firstname = d.first_name;
        user.middlename = d.middle_name;
        user.lastname = d.last_name;
        input_email = this.props.auth.loginData.email;
        input_contact_no = d.contact_no;
      }

      return { user, input_email, input_contact_no };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.jobs != prevProps.jobs) {
      console.log('AAAAAAAAAAAAAa');
      if (
        this.props.jobs.getJobApplicationInfoData !=
        prevProps.jobs.getJobApplicationInfoData
      ) {
        console.log('AASSDD');
        console.log(this.props.jobs.getJobApplicationInfoData);
        this.setState((state) => {
          let {
            jobData,
            questions_additional,
            questions_authorization,
            isLoading,
            answers_additional,
            answers_authorization,
          } = state;
          let { questions } = this.props.jobs.getJobApplicationInfoData;
          jobData = this.props.jobs.getJobApplicationInfoData;
          // jobData.questions = null;
          isLoading = false;

          questions.map((entry) => {
            entry.answer = null;
            if (entry.type == 0) {
              questions_additional.push(entry);
              // answers_additional.push({id: entry.id, value: null});
            }
            if (entry.type == 1) {
              questions_authorization.push(entry);
              // answers_authorization.push({id: entry.id, value: null});
            }

            // answers.push({id:entry.id, value:null})
          });

          return {
            jobData,
            questions_additional,
            questions_authorization,
            isLoading,
          };
        });
      }
    }
  }

  async saveJob() {
    console.log('AAA');
    console.log(this.state);
    const data = {};
    let answers = [];
    this.state.questions_additional.map((entry) => {
      answers.push(entry);
    });
    this.state.questions_authorization.map((entry) => {
      answers.push(entry);
    });
    data.id = this.state.jobData.id;
    data.applicant_id = this.props.auth.loginData.applicant.id;
    data.answers = answers;
    data.firstname = this.state.user.firstname;
    data.middlename = this.state.user.middlename;
    data.lastname = this.state.user.lastname;
    data.contact_no = this.state.input_contact_no;
    data.email = this.state.input_email;
    var temp = null;
    var pathuri = this.state.selectedFile.uri;
    console.log('pathuri', pathuri);
    temp = await RNFetchBlob.fs
      .readFile(`${pathuri}`, 'base64')
      .then((dataX) => {
        data.resume = dataX;
        data.filetype = /[.]/.exec(this.state.selectedFile.fileName)
          ? /[^.]+$/.exec(this.state.selectedFile.fileName)[0]
          : undefined;
      });

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(data);

    this.props.applyJob(data);

    // data.append('id', this.state.jobData.id);
    // data.append('firstname', this.state.user.firstname);
    // data.append('middlename', this.state.user.middlename);
    // data.append('lastname', this.state.user.lastname);
    // data.append('contact_no', this.state.input_contact_no);
    // data.append('email', this.state.input_email);
    // data.append('answers', JSON.stringify(answers));
    // data.append(
    //   'applicant_id',
    //   this.props.auth.loginData ? this.props.auth.loginData.applicant.id : null,
    // );
    // data.append('resume', this.state.selectedFile);

    // this.setState({ isSubmitting: true });
    // this.props.applyJob(data);
    // Toast.success('Your application was sent to ' + this.state.company_name);
    // this.props.navigation.navigate('homepage');
  }

  renderJobData() {
    let data = this.state.jobData;
    let questionsData = this.state.questions_additional;
    let authorizationData = this.state.questions_authorization;
    return (
      <Card style={{ marginTop: 5 }}>
        <Card.Header
          title={
            <>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Applying to {data.company.name}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                ({data.name})
              </Text>
            </>
          }
        />
        <Card.Body style={{ marginLeft: 10 }}>
          {this.renderContactInformation()}
          <WhiteSpace size="lg" />
          <Text style={{ fontWeight: 'bold' }}>Additional Questions</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            {questionsData != null &&
              questionsData.map((entry, index) => (
                <List.Item>
                  <Text>
                    {index + 1}. {entry.question}
                  </Text>{' '}
                  <InputItem
                    value={this.state.questions_additional[index].answer}
                    onChange={(val) =>
                      this.setState((state) => {
                        let { questions_additional } = state;
                        questions_additional[index].answer = val;
                        return { questions_additional };
                      })
                    }
                  />{' '}
                </List.Item>
              ))}
          </View>
          <WhiteSpace />
          <Text style={{ fontWeight: 'bold' }}>Work Authorization</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            {authorizationData != null &&
              authorizationData.map((entry, index) => (
                <List.Item>
                  <Text>
                    {index + 1}. {entry.question}
                  </Text>{' '}
                  <InputItem
                    value={this.state.questions_authorization[index].answer}
                    onChange={(val) => {
                      this.setState((state) => {
                        let { questions_authorization } = state;
                        questions_authorization[index].answer = val;
                        return { questions_authorization };
                      });
                    }}
                  />
                </List.Item>
              ))}
          </View>
        </Card.Body>
      </Card>
    );
  }

  renderContactInformation() {
    return (
      <>
        <Text style={{ fontWeight: 'bold' }}>Contact Information</Text>
        <List.Item>
          <InputItem
            value={this.state.user.firstname}
            onChange={(val) =>
              this.setState((state) => {
                let { user } = state;
                user.firstname = val;
                return { user };
              })
            }>
            First Name
          </InputItem>

          <InputItem
            value={this.state.user.middlename}
            onChange={(val) =>
              this.setState((state) => {
                let { user } = state;
                user.middlename = val;
                return { user };
              })
            }>
            Middle
          </InputItem>

          <InputItem
            value={this.state.user.lastname}
            onChange={(val) =>
              this.setState((state) => {
                let { user } = state;
                user.lastname = val;
                return { user };
              })
            }>
            Last Name
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            value={this.state.input_email}
            onChange={(val) =>
              this.setState((state) => {
                let { input_email } = state;
                input_email = val;
                return { input_email };
              })
            }>
            Email Address
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            value={this.state.input_contact_no}
            onChange={(val) =>
              this.setState((state) => {
                let { input_contact_no } = state;
                input_contact_no = val;
                return { input_contact_no };
              })
            }>
            Contact Number
          </InputItem>
        </List.Item>
        {this.state.selectedFile && (
          <List.Item
            thumb={`file://${this.state.selectedFile.path}`}
            extra={
              <Icon
                name={'delete'}
                color="red"
                onPress={() => {
                  this.setState({ selectedFile: null });
                }}
              />
            }>
            <Text>{this.state.selectedFile.fileName}</Text>
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
                this.setState({ selectedFile: response });
                console.log(response);
              }
            });
          }}>
          Select Resume File
        </Button>
      </>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>
            {this.state.jobData && (
              <>
                {this.state.jobData && this.renderJobData()}
                <WhiteSpace size="lg" />
                <Button onPress={() => this.saveJob()}>
                  Submit Application
                </Button>
              </>
            )}
            {!this.state.jobData && this.state.isLoading && (
              <>
                <ActivityIndicator text="Loading Data......" />
              </>
            )}

            <Modal
              transparent
              visible={this.state.isSubmitting}
              closable={false}>
              <ActivityIndicator text="Sending your Application Info..." />
            </Modal>
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  auth: state.auth,
});

const mapActionCreators = {
  applyJob,
  newApplication,
};

export default connect(mapStateToProps, mapActionCreators)(ApplyHere);
