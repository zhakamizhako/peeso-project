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
  ActivityIndicator
} from '@ant-design/react-native';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getJobs, saveJob, unsaveJob } from '../../stores/modules/jobs';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
  { name: "Trabaho 1", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 2", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 3", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 4", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 5", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 6", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 7", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 8", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 9", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { name: "Trabaho 10", company: { name: "ABCD Co. Ltd." }, location: "", lat: 125.000, lng: 5.0000, salary: 5000, highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
]

class Trabaho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_fetched: false,
      is_fetching: false,
      jobsData: [],
      error: null,
    };
  }

  componentDidMount() {
    this.props.getJobs()
    this.setState({ is_fetching: true })
    console.log('geting jobs?')
  }

  componentDidUpdate(prevProps) {
    console.log('--------')
    console.log(this.props)
    console.log(prevProps)
    console.log('--------')
    if (this.props.jobs.getJobsData != prevProps.jobs.getJobsData) {
      this.setState({ jobsData: this.props.jobs.getJobsData, has_fetched: true, is_fetching: false, error: false })
    }
    if (this.props.jobs.getJobsError != prevProps.jobs.getJobsError) {
      console.log('karumba')
      this.setState({ error: this.props.jobs.getJobsError, has_fetched: true, is_fetching: false })
    }
    if (this.props.jobs.saveJob)
  }

  save(data) {
    this.props.saveJob(data)
  }

  renderJobData(data, index) {
    console.log(data)
    return (<Card key={index} style={{ marginTop: 5 }}>
      <Card.Header title={(<>
        <Text>{data.name}</Text>
        <Text>{data.company.name}</Text>
      </>
      )} extra={<TouchableOpacity onPress={() => this.save(data.id)}><Icon style={{ alignSelf: "flex-end" }} size={30} color="black" name="book"></Icon></TouchableOpacity>} />
      <Card.Body style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("viewtrabaho", { id: data.id })}>
          <Text>Location: {data.location}</Text>
          <Text>Salary: {data.salary}</Text>
          <Text>
            Highlights: {data.highlight != null ? data.highlight.map(entry => (<Text>{`\n-` + entry.name}</Text>)) : null}
          </Text>
          <Text>Deadline: {moment(data.deadline).format("MMMM DD, yyyy")}</Text>
          <Text>Status: {data.status}</Text>
          <Text>Category: {data.category}</Text>
        </TouchableOpacity>
      </Card.Body>
    </Card>)
  }

  render() {
    return (<>
      <WingBlank>
        <RefreshControl refreshing={this.state.is_fetching} onRefresh={() => this.props.getJobs()}>
          <ScrollView>
            {this.state.has_fetched && this.state.jobsData && this.state.jobsData.map((entry, index) => { return (this.renderJobData(entry, index)) })}
            {!this.state.has_fetched && (<ActivityIndicator text="Fetching Jobs Data..."> </ActivityIndicator>)}
            {this.state.has_fetched && this.state.jobsData.length == 0 && (<View style={{ alignSelf: 'center', alignContent: 'center', marginVertical: '50%' }}><Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>No Jobs available at the moment :(</Text></View>)}
            {this.state.has_fetched && this.state.error && (<View style={{ alignSelf: 'center', alignContent: 'center' }}><Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>Error Fetching Data. </Text><Text>{this.state.error}</Text></View>)}
          </ScrollView>
        </RefreshControl>
      </WingBlank>
    </>)
  }

}


const mapStateToProps = state => ({
  jobs: state.jobs,
});

const mapActionCreators = {
  getJobs,
  saveJob,
  unsaveJob
};

export default connect(mapStateToProps, mapActionCreators)(Trabaho);
// export default Trabaho