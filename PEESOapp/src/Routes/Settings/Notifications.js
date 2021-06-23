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
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import {
  getJobs,
  saveJob,
  unsaveJob,
  getByCategoryId,
} from '../../stores/modules/jobs';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HomeStyles } from '../homeStyles'
let ws = {};
let wsInstance = {};
var intervalObject = null;

class NotificationsScreen extends Component {
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
    console.log('geting notifs');
  }

  componentDidUpdate(prevProps) {
    console.log('--------');
    console.log(this.props);
    console.log(prevProps);
    console.log('--------');
    if (this.props.jobs.getJobsData != prevProps.jobs.getJobsData) {
      this.setState({
        jobsData: this.props.jobs.getJobsData,
        has_fetched: true,
        is_fetching: false,
        error: false,
      });
    }
    if (this.props.jobs.getJobsError != prevProps.jobs.getJobsError) {
      console.log('karumba');
      this.setState({
        error: this.props.jobs.getJobsError,
        has_fetched: true,
        is_fetching: false,
      });
    }
    if (this.props.jobs.saveJob) {
    }
  }

  renderNotificationCard(data, index) {
    console.log(data);
    return (
      <Card key={index} style={HomeStyles.entryCards}>
        <Card.Header
          title={
            <>
              <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
              <Text style={{ fontStyle: 'italic' }}>{data.company.name}</Text>
            </>
          }
          extra={
            <TouchableOpacity onPress={() => this.save(data.id)}>
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
              this.props.navigation.navigate('viewNotificationsScreen', { id: data.id })
            }>
            <></>
          </TouchableOpacity>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          <RefreshControl
            refreshing={this.state.is_fetching}
            onRefresh={() => this.props.getJobs()}
            style={HomeStyles.ScrollViewLimit}
          >
            <ScrollView>
              {this.renderNotificationCard()}
            </ScrollView>
          </RefreshControl>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const mapActionCreators = {
  getJobs,
  saveJob,
  unsaveJob,
  getByCategoryId,
};

export default connect(mapStateToProps, mapActionCreators)(NotificationsScreen);
// export default NotificationsScreen
