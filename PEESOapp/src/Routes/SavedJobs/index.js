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
  ActivityIndicator,
} from '@ant-design/react-native';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {getSavedJobs, unsavejob} from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
  {
    JobTitle: 'Trabaho 1',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 2',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 3',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 4',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 5',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 6',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 7',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 8',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 9',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
  {
    JobTitle: 'Trabaho 10',
    company: 'ABCD Co. Ltd.',
    location: '',
    lat: 125.0,
    lng: 5.0,
    salary: 5000,
    Highlight: [{name: 'highlight1'}, {name: 'highlight2'}],
    category: 'Engineering',
    deadline: now(),
    status: 'Verified and hired applicants through P App',
  },
];

class Trabaho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  removeJob(index) {
    this.setState((state) => {
      let {data} = state;

      data.splice(index, 1);
      return {data};
    });

    Toast.success('Job Removed', 0.1);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.getSavedJobs();
  }

  componentDidUpdate(prevProps) {
    let {jobs} = this.props;

    if (jobs != prevProps.jobs) {
      if (jobs.getSavedJobsData != prevProps.jobs.getSavedJobsData) {
        this.setState({data: jobs.getSavedJobsData, isLoading: false});
      }
      if (jobs.getSavedJobsError) {
        this.setState({error: jobs.getSavedJobsError});
      }
    }
  }

  renderJobData(data, index, entrySaved) {
    return (
      <Card key={index} style={{marginTop: 5}}>
        <Card.Header
          title={
            <>
              <Text>{data.name}</Text>
              <Text>{data.company.name}</Text>
            </>
          }
          extra={
            <TouchableOpacity onPress={() => this.removeJob(index)}>
              <Icon
                style={{alignSelf: 'flex-end'}}
                size={30}
                color="black"
                name="book"
              />
            </TouchableOpacity>
          }
        />
        <Card.Body style={{marginLeft: 10}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('viewtrabaho')}>
            <Text>Location: {data.location}</Text>
            <Text>Salary: {data.salary}</Text>
            <Text>
              Highlights:{' '}
              {data.highlight != null
                ? data.highlight.map((entry) => (
                    <Text>{'\n-' + entry.name}</Text>
                  ))
                : null}
            </Text>
            <Text>
              Deadline: {moment(data.deadline).format('MMMM DD, yyyy')}
            </Text>
            <Text>Status: {data.status}</Text>
            <Text>Category: {data.category}</Text>
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
                style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 25}}>
                No Data :(
              </Text>
              <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15}}>
                Why don't you try saving a few{' '}
                <Text
                  style={{color: 'blue'}}
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
              return this.renderJobData(entry.job, index, entry.created_at);
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
};

export default connect(mapStateToProps, mapActionCreators)(Trabaho);
