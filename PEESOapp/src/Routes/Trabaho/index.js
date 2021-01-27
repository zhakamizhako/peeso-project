import React, { Component } from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
  { JobTitle: "Trabaho 1", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 2", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 3", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 4", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 5", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 6", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 7", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 8", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 9", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 10", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], deadline: now(), status: 'Verified and hired applicants through P App' },
]

class Trabaho extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderJobData(data, index) {
    return (<Card key={index} style={{ marginTop: 5 }}>
      <Card.Header title={(<>
        <Text>{data.JobTitle}</Text>
        <Text>{data.company}</Text>
      </>
      )} extra={<Text>SaveIcon</Text>} />
      <Card.Body style={{ marginLeft: 10 }}>
        <Text>Location: {data.location}</Text>
        <Text>Salary: {data.salary}</Text>
        {/* <Text>Highlight: {data.Highlight != null ? data.Highlight.map(entry => (<Text>{entry}</Text>)) : null}</Text> */}
        {/* <Text>Deadline: {moment(data.deadline)}</Text> */}
        <Text>Status: {data.status}</Text>
      </Card.Body>
    </Card>)
  }

  render() {
    return (<>
      <WingBlank>
        <ScrollView>
          {SampleData.map((entry, index) => { return (this.renderJobData(entry, index)) })}
        </ScrollView>
      </WingBlank>
    </>)
  }

}
export default Trabaho;