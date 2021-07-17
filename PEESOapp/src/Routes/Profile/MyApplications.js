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
import {getMyApplications, unsavejob} from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HomeStyles, homeStyles} from '../homeStyles';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

let ws = {};
let wsInstance = {};
var intervalObject = null;

class MyApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
      cancelPopup:false,
      cancelData:null,
      isCancelling:false,
    };
    this.menu = [];
  }

  removeJob(data) {
    this.props.unsavejob(data.id);
  }

  askCancellation(data){
    
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.getMyApplications();
  }

  componentDidUpdate(prevProps) {
    let {jobs} = this.props;

    if (jobs != prevProps.jobs) {
      if (jobs.myApplicationsData != prevProps.jobs.myApplicationsData) {
        this.setState({data: jobs.myApplicationsData, isLoading: false});
      }
      if (jobs.getMyApplicationsError) {
        this.setState({error: jobs.getMyApplicationsError});
      }
    }
  }

  renderMenu(entry, index, type) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Menu
          key={index}
          ref={(menu) => (this.menu[index] = menu)}
          id={index}
          button={
            <View>
              <Text
                style={{fontSize: 20}}
                onPress={(a) => {
                  this.menu[index].show();
                }}>
                {' '}
                ...{' '}
              </Text>
            </View>
          }>
          <MenuItem>Cancel Application</MenuItem>
        </Menu>
      </View>
    );
  }

  renderJobData(data, index, entrySaved) {
    return (
      <Card key={index} style={HomeStyles.entryCards}>
        <Card.Header
          extra={this.renderMenu(null, index, null)}
          title={
            <>
              <Text>{data.job.name}</Text>
              <Text>{data.job.company.name}</Text>
            </>
          }
          // extra={
          //   <TouchableOpacity onPress={() => this.removeJob(data)}>
          //     <Icon
          //       style={{ alignSelf: 'flex-end' }}
          //       size={30}
          //       color="black"
          //       name="book"
          //     />
          //   </TouchableOpacity>
          // }
        />
        <Card.Body style={{marginLeft: 10}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('viewtrabaho', {id: data.job.id})
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
            <Text>Status: {data.status}</Text>
            <Text>Category: {data.job.category}</Text>
            <Text>
              Applied on: {moment(entrySaved).format('MMMM DD, yyyy')} at{' '}
              {moment(entrySaved).format('HH:MM A')}
            </Text>
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
              style={[
                {
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginVertical: '50%',
                },
              ]}>
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
                Why don't you apply{' '}
                <Text
                  style={{color: 'blue'}}
                  onPress={() => this.props.navigation.replace('trabaho')}>
                  some
                </Text>
                ?
              </Text>
            </View>
          )}
          <ScrollView style={[HomeStyles.ScrollViewLimit]}>
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
  getMyApplications,
  unsavejob,
};

export default connect(mapStateToProps, mapActionCreators)(MyApplications);
