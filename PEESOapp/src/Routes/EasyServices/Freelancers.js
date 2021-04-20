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
  List,
} from '@ant-design/react-native';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
  {firstname: 'Juanito', lastname: 'Almera', userId: 1},
  {firstname: 'Julio', lastname: 'Miranda', userId: 2},
  {firstname: 'Jessa', lastname: 'Kalamay', userId: 3},
  {firstname: 'Baga na', lastname: 'Wong', userId: 4},
  {firstname: 'Naku', lastname: 'Yawan', userId: 5},
];

class EasyServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({data: SampleData});
  }

  renderFreelancer(data, index) {
    return (
      <List.Item
        extra={'Book'}
        onPress={() => this.props.navigation.navigate('book')}
        multipleLine={false}>
        {data.firstname + ' ' + data.lastname}
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
export default EasyServices;
