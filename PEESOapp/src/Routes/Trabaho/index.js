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
import { View, Text, ScrollView } from 'react-native';
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
    };
  }

  componentDidMount() {
    this.props.getJobs()
    this.setState({ is_fetching: true })
    console.log('geting jobs?')
  }

  componentDidUpdate(prevProps) {
    if (this.props.jobs.getJobsData != prevProps.jobs.getJobsData) {
      this.setState({ jobsData: this.props.jobs.getJobsData, has_fetched: true, is_fetching: false })
    }
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
        <ScrollView>
          {this.state.has_fetched && this.state.jobsData && this.state.jobsData.map((entry, index) => { return (this.renderJobData(entry, index)) })}
          {!this.state.has_fetched && (<ActivityIndicator text="Fetching Jobs Data..."> </ActivityIndicator>)}
        </ScrollView>
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