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
  ActivityIndicator,
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getSavedJobs, unsavejob } from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

class Trabaho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  removeJob(data) {
    this.props.unsavejob(data.id);
    // this.setState((state) => {
    //   let { data } = state;

    //   data.splice(index, 1);
    //   return { data };
    // });

    // Toast.success('Job Removed', 0.1);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getSavedJobs();
  }

  componentDidUpdate(prevProps) {
    let { jobs } = this.props;

    if (jobs != prevProps.jobs) {
      if (jobs.getSavedJobsData != prevProps.jobs.getSavedJobsData) {
        this.setState({ data: jobs.getSavedJobsData, isLoading: false });
      }
      if (jobs.getSavedJobsError) {
        this.setState({ error: jobs.getSavedJobsError });
      }
    }
  }

  renderJobData(data, index, entrySaved) {
    return (
      <Card key={index} style={{ marginTop: 5 }}>
        <Card.Header
          title={
            <>
              <Text>{data.job.name}</Text>
              <Text>{data.job.company.name}</Text>
            </>
          }
          extra={
            <TouchableOpacity onPress={() => this.removeJob(data)}>
              <Icon
                style={{ alignSelf: 'flex-end' }}
                size={30}
                color="black"
                name="book"
              />
            </TouchableOpacity>
          }
        />
        <Card.Body style={{ marginLeft: 10 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('viewtrabaho', { id: data.job.id })
            }>
            <Text>Location: {data.job.location}</Text>
            <Text>Salary: {data.job.salary}</Text>
            <Text>
              Highlights:{' '}
              {data.job.highlight != null
                ? data.job.highlight.map((entry) => (
                  <Text>{'\n-' + entry.description}</Text>
                ))
                : null}
            </Text>
            <Text>
              Deadline: {moment(data.job.deadline).format('MMMM DD, yyyy')}
            </Text>
            <Text>Status: {data.job.status}</Text>
            <Text>Category: {data.job.category}</Text>
            <Text>Saved on: {moment(entrySaved).format('MMMM DD, yyyy')}</Text>
          </TouchableOpacity>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          {this.state.isLoading && (
            <View
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                marginVertical: '50%',
              }}>
              <ActivityIndicator text="Loading Data..."> </ActivityIndicator>
            </View>
          )}
          {this.state.data.length == 0 && !this.state.isLoading && (
            <View
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                marginVertical: '50%',
              }}>
              <Text
                style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>
                No Data :(
              </Text>
              <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 15 }}>
                Why don't you try saving a few{' '}
                <Text
                  style={{ color: 'blue' }}
                  onPress={() => this.props.navigation.replace('trabaho')}>
                  jobs
                </Text>
                ?
              </Text>
            </View>
          )}
          <ScrollView>
            {console.log(this.state.data)}
            {this.state.data.map((entry, index) => {
              return this.renderJobData(entry, index, entry.created_at);
            })}
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
  getSavedJobs,
  unsavejob,
};

export default connect(mapStateToProps, mapActionCreators)(Trabaho);
