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
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { newApplication, applyJob } from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import Input from '@ant-design/react-native/lib/input-item/Input';
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
      // user: { firstname: '', middlename: '', lastname: '', contact_no: '' },
      // input_name: '',
      // input_email: '',
      // input_contact_no: '',
      questions_additional: [],
      questions_authorization: [],
      jobData: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    console.log('AAAA');
    console.log(this.props);
    if (this.props.route) {
      this.props.newApplication(this.props.route.params.id);
      this.setState({ isLoading: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.jobs != prevProps.jobs) {
      console.log('AAAAAAAAAAAAAa');
      if (this.props.jobs.getJobApplicationInfoData) {
        console.log('AASSDD');
        console.log(this.props.jobs.getJobApplicationInfoData);
        this.setState((state) => {
          let {
            jobData,
            questions_additional,
            questions_authorization,
            isLoading,
          } = state;
          let { questions } = this.props.jobs.getJobApplicationInfoData;
          jobData = this.props.jobs.getJobApplicationInfoData;
          jobData.questions = null;
          isLoading = false;

          questions.map((entry) => {
            if (entry.type == 0) {
              questions_additional.push(entry);
            }
            if (entry.type == 1) {
              questions_authorization.push(entry);
            }
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

  saveJob() {
    Toast.success('Your application was sent to ' + this.state.company_name);
    this.props.navigation.navigate('homepage');
  }

  renderJobData(data) {
    return (
      <Card style={{ marginTop: 5 }}>
        <Card.Header
          title={
            <>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Applying to {data.company.name}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                ({data.JobTitle})
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
            {data.questions != null &&
              data.questions.map((entry, index) => (
                <List.Item>
                  <Text>
                    {index + 1}. {entry.text}
                  </Text>{' '}
                  <InputItem />{' '}
                </List.Item>
              ))}
          </View>
          <WhiteSpace />
          <Text style={{ fontWeight: 'bold' }}>Work Authorization</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            {data.authorization_questions != null &&
              data.authorization_questions.map((entry, index) => (
                <List.Item>
                  <Text>
                    {index + 1}. {entry.text}
                  </Text>{' '}
                  <InputItem />{' '}
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
          <InputItem value={this.state.input_name}>Name</InputItem>
        </List.Item>
        <List.Item>
          <InputItem value={this.state.input_email}>Email Address</InputItem>
        </List.Item>
        <List.Item>
          <InputItem value={this.state.input_contact_no}>
            Contact Number
          </InputItem>
        </List.Item>
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
                {this.state.jobData && this.renderJobData(this.state.jobData)}
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
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const mapActionCreators = {
  applyJob,
  newApplication,
};

export default connect(mapStateToProps, mapActionCreators)(ApplyHere);
