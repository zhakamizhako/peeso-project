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
  DatePicker,
  InputItem,
} from '@ant-design/react-native';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Input from '@ant-design/react-native/lib/input-item/Input';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = {firstname: 'Juanito', lastname: 'Almera', userId: 1};

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {firstname: '', lastname: ''},
    };
  }

  componentDidMount() {
    this.setState({data: SampleData});
  }

  onConfirm() {
    Modal.alert(
      'Information',
      'The City Public Education and Employment Service office will contact you toconfirm your booking reservation and for more addtional details. Thank you.',
      [
        {
          text: 'Okay!',
          onPress: () => this.props.navigation.navigate('homepage'),
        },
      ],
    );
  }

  renderBook(data, index) {
    return (
      <List>
        <List.Item multipleLine={false}>
          Name of Freelancer: {data.firstname + ' ' + data.lastname}
        </List.Item>
        <DatePicker>
          <List.Item>Date and Time</List.Item>
        </DatePicker>
        <List.Item multipleLine={false}>Location</List.Item>
        <List.Item multipleLine={false}>Name of Contact Person</List.Item>
        <InputItem />
        <List.Item multipleLine={false}>Contact No.</List.Item>
        <InputItem />
        <List.Item multipleLine={false}>Brief Details of the Issue:</List.Item>
        <InputItem multiline />
        <Button onPress={() => this.onConfirm()}>Confirm</Button>
      </List>
    );
  }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>{this.renderBook(this.state.data)}</ScrollView>
        </WingBlank>
      </>
    );
  }
}
export default Book;
