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
  ActivityIndicator,
} from '@ant-design/react-native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getCompany } from '../../stores/modules/company';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;
class ViewCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: null,
      isLoading: false,
      name: null,
      description: null,
      shortdesc: null,
      address: null,
      contact_no: null,
      email: null,
      vision: null,
      mission: null,
      development_thrusts: null,
      corevalues: [],
      type: null,
      employees_max: null,
      employees_min: null,
      lat: null,
      lng: null,
      salary: null,
      industry: null,
    };
  }

  saveJob() {
    Toast.success('Job Saved.');
  }

  componentDidMount() {
    console.log('company shit');
    console.log(this.props);
    this.setState({ isLoading: true });
    // this.props.getCompany
  }

  componentDidUpdate(prevProps) {
    let { company } = this.props;
    let company_prev = prevProps.company;

    if (company != company_prev) {
      if (company.getCompanyData) {
        this.setState({ companyData: company.getCompanyData, isLoading: false });
      }
    }
  }

  renderJobData(data) {
    return (
      <Card style={{ marginTop: 5 }}>
        <Card.Header
          title={
            <>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {data.name}
              </Text>
              <Text style={{ fontStyle: 'italic' }}>{data.address}</Text>
            </>
          }
        />
        <Card.Body style={{ marginLeft: 10 }}>
          <WhiteSpace size="lg" />
          <Text style={{ fontWeight: 'bold' }}>Description of the Company:</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text>{data.description}</Text>
          </View>
          <WhiteSpace />

          <Text style={{ fontWeight: 'bold' }}>Vision</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text>{data.vision}</Text>
          </View>
          <WhiteSpace />

          <Text style={{ fontWeight: 'bold' }}>Mission</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text>{data.mission}</Text>
          </View>
          <WhiteSpace />

          <Text style={{ fontWeight: 'bold' }}>Core Values</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            {data.corevalues &&
              data.corevalues.map((entry) => <Text>- {entry.text}</Text>)}
          </View>
          <WhiteSpace />

          <Text style={{ fontWeight: 'bold' }}>Developmental Thrusts</Text>
          <WhiteSpace />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text>{data.developmental_thrusts}</Text>
          </View>
          <WhiteSpace />

          <Text style={{ fontWeight: 'bold' }}>Type: {data.type}</Text>
          <Text style={{ fontWeight: 'bold' }}>
            Company Size: {data.employees_min} - {data.employees_max}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Specialties:{' '}
            {data.specialties &&
              data.specialties.map((entry) => entry.text + ', ')}{' '}
          </Text>
        </Card.Body>
      </Card>
    );
  }

  //   renderReviews() { }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>
            {this.state.companyData &&
              this.renderJobData(this.state.companyData)}
            <WhiteSpace size="lg" />
            <Button>Save</Button>
            <Modal
              transparent
              visible={this.state.isLoading && !this.state.companyData}
              closable={false}>
              <ActivityIndicator text="Loading Company Data...">
                {' '}
              </ActivityIndicator>
            </Modal>
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  company: state.company,
  auth: state.auth,
});

const mapActionCreators = {
  getCompany,
};

export default connect(mapStateToProps, mapActionCreators)(ViewCompany);
