import React, { Component } from 'react';
import {
  Button,
  WhiteSpace,
  WingBlank,
  Modal,
  Card,
  Grid,
  Icon,
  Toast
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
  { JobTitle: "Trabaho 1", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 2", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 3", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 4", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 5", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 6", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 7", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 8", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 9", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
  { JobTitle: "Trabaho 10", company: "ABCD Co. Ltd.", location: "", lat: 125.000, lng: 5.0000, salary: 5000, Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }], category: "Engineering", deadline: now(), status: 'Verified and hired applicants through P App' },
]

class Trabaho extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  saveJob() {
    Toast.success("Job Saved")
  }

  renderJobData(data, index) {
    return (<Card key={index} style={{ marginTop: 5 }}>
      <Card.Header title={(<>
        <Text>{data.JobTitle}</Text>
        <Text>{data.company}</Text>
      </>
      )} extra={<TouchableOpacity onPress={() => this.saveJob()}><Icon style={{ alignSelf: "flex-end" }} size={30} color="black" name="book"></Icon></TouchableOpacity>} />
      <Card.Body style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("viewtrabaho")}>
          <Text>Location: {data.location}</Text>
          <Text>Salary: {data.salary}</Text>
          <Text>
            Highlights: {data.Highlight != null ? data.Highlight.map(entry => (<Text>{`\n-` + entry.name}</Text>)) : null}
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
          {SampleData.map((entry, index) => { return (this.renderJobData(entry, index)) })}
        </ScrollView>
      </WingBlank>
    </>)
  }

}
export default Trabaho;