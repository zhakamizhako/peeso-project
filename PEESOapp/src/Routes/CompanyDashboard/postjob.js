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
  List,
  InputItem

} from '@ant-design/react-native';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
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

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      deadline: null,
      job_description: null,
      work_from: null,
      work_to: null,
      highlights: [],
      salary: null,
      salary_included_benefits: false,
      category: null,
      benefits: [],
      error: null,
    };
  }

  componentDidMount() {
    this.props.getJobs()
    this.setState({ is_fetching: true })
    console.log('geting jobs?')
  }

  componentDidUpdate(prevProps) {

  }

  save(data) {
    this.props.saveJob(data)
  }


  render() {
    return (<>
      <WingBlank>
        <ScrollView>
          <Text>Create a job thingy</Text>
          <List>
            <List.Item>
              <Text>Job Title</Text>
              <TextAreaItem autoHeight value={this.state.title} onChange={(val) => this.setState(state => {
                let { title } = state
                title = val
                return { title }
              })}></TextAreaItem>
            </List.Item>

            <List.Item>
              <Text>Description</Text>
              <TextAreaItem autoHeight value={this.state.description} onChange={(val) => this.setState(state => {
                let { description } = state
                description = val
                return { description }
              })}></TextAreaItem>
            </List.Item>

            <List.Item>
              <Text>Salary</Text>
              <InputItem value={this.state.salary} onChange={(val) => this.setState(state => {
                let { salary } = state
                salary = val
                return { salary }
              })}></InputItem>
            </List.Item>

            <List.Item>
              <Text>Category</Text>
              <InputItem value={this.state.salary} onChange={(val) => this.setState(state => {
                let { salary } = state
                salary = val
                return { salary }
              })}></InputItem>
            </List.Item>

          </List>
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
};

export default connect(mapStateToProps, mapActionCreators)(PostJob);
// export default PostJob