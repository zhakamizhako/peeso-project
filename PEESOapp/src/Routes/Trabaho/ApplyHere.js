import React, {Component} from 'react';
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
} from '@ant-design/react-native';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
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
    {text: 'Do you have a job experience related to government services?'},
    {text: 'Have you completed college?'},
    {text: 'Do you have a second-level eligibility?'},
  ],
  authorization_questions: [
    {
      text:
        'Are you willing to be assigned to other partner-government agency of LGU?',
    },
    {text: 'Are you willing to be wat?'},
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
      company_name: '',
      user: {firstname: '', middlename: '', lastname: '', contact_no: ''},
      input_name: '',
      input_email: '',
      input_contact_no: '',
    };
  }

  componentDidMount() {
    this.setState({
      company_name: SampleData.company.name,
      user: SampleUser,
      input_name: SampleUser.firstname + ' ' + SampleUser.lastname,
      input_email: SampleUser.email,
      input_contact_no: SampleUser.contact_no,
    });
  }

  saveJob() {
    Toast.success('Your application was sent to ' + this.state.company_name);
    this.props.navigation.navigate('homepage');
  }

  renderJobData(data) {
    return (
      <Card style={{marginTop: 5}}>
        <Card.Header
          title={
            <>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Applying to {data.company.name}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                ({data.JobTitle})
              </Text>
            </>
          }
        />
        <Card.Body style={{marginLeft: 10}}>
          {this.renderContactInformation()}
          <WhiteSpace size="lg" />
          <Text style={{fontWeight: 'bold'}}>Additional Questions</Text>
          <WhiteSpace />
          <View style={{marginLeft: 10, marginRight: 10}}>
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
          <Text style={{fontWeight: 'bold'}}>Work Authorization</Text>
          <WhiteSpace />
          <View style={{marginLeft: 10, marginRight: 10}}>
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
        <Text style={{fontWeight: 'bold'}}>Contact Information</Text>
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
            {this.renderJobData(SampleData)}
            <WhiteSpace size="lg" />
            <Button onPress={() => this.saveJob()}>Submit Application</Button>
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}
export default ApplyHere;
