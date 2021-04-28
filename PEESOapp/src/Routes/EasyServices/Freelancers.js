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
import { getAvailablePersonnel } from '../../stores/modules/easyservices';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;
class EasyServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.route) {
      this.setState({ isLoading: true });
      this.props.getAvailablePersonnel(this.props.route.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    let { easyservices } = this.props;

    if (easyservices != prevProps.easyservices) {
      if (easyservices.getAvailablePersonnelData) {
        console.log('F?');
        this.setState({
          data: easyservices.getAvailablePersonnelData,
          isLoading: false,
        });
      }
    }
  }

  renderFreelancer(data, index) {
    return (
      <List.Item
        extra={'Book'}
        onPress={() =>
          this.props.navigation.navigate('book', { id: data.id, user: data })
        }
        multipleLine={false}>
        {`${data.user.profile.first_name} ${data.user.profile.middle_name} ${data.user.profile.last_name}`}
        {`PHP ${data.price_min} - ${data.price_max}`}
      </List.Item>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>
            {this.state.data.map((entry, index) => {
              return this.renderFreelancer(entry, index);
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
  getAvailablePersonnel,
};

export default connect(mapStateToProps, mapActionCreators)(EasyServices);
