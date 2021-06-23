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
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getEasyServices } from '../../stores/modules/easyservices';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

// const SampleData = [
//   { freelanceJob: 'Aircon Cleaner', min: 800, max: 1200 },
//   { freelanceJob: 'Barber', min: 800, max: 1200 },
//   { freelanceJob: 'Beautician', min: 800, max: 1200 },
//   { freelanceJob: 'Carpenter', min: 800, max: 1200 },
//   { freelanceJob: 'Technician', min: 800, max: 1200 },
// ];

class EasyServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getEasyServices();
    // this.setState({ data: SampleData });
  }

  componentDidUpdate(prevProps) {
    let { easyservices } = this.props;

    if (easyservices != prevProps.easyservices) {
      if (easyservices.getEasyServicesData) {
        this.setState({
          data: easyservices.getEasyServicesData,
          isLoading: false,
        });
      }
    }
  }

  renderJobData(data, index) {
    return (
      <List.Item
        extra={'PHP ' + (data.min ? data.min : '0') + '-' + (data.max ? data.max : '0')}
        onPress={() =>
          this.props.navigation.navigate('easyservicesfreelancers', {
            id: data.id,
          })
        }>
        {data.name}
      </List.Item>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>
            {this.state.data.map((entry, index) => {
              return this.renderJobData(entry, index);
            })}
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  easyservices: state.easyservices,
});

const mapActionCreators = {
  getEasyServices,
};

export default connect(mapStateToProps, mapActionCreators)(EasyServices);
