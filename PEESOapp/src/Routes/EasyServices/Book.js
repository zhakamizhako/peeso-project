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
import {book} from '../../stores/modules/easyservices';
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
      date: null,
      time_from: null,
      time_to: null,
      location: null,
      contact_person: null,
      contact_no: null,
      details: null,
      isLoading: false,
      isSubmitting: false,
    };
  }

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.user) {
      console.log(this.props.route.params);
      this.setState((state) => {
        let {data} = state;
        let {user} = this.props.route.params.user;
        data.firstname = user.profile.first_name;
        data.lastname = user.profile.last_name;
        data.id = user.id;
        return {data};
      });
    }
    // this.setState({data: SampleData});
  }

  submitInfo() {
    let data = {
      dateTime: this.state.dateTime,
      location: this.state.location,
      contact_person: this.state.contact_person,
      contact_no: this.state.contact_no,
      details: this.state.details,
      isLoading: this.state.isLoading,
      employer_id: this.props.auth.loginData.id,
      freelancer_id: this.props.route.params.user.id,
    };

    this.setState({isSubmitting: true});

    this.props.book(data);
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
        <List.Item
          multipleLine={false}
          extra={
            <Text
              onPress={() =>
                this.props.navigation.navigate('freelanceprofile', {
                  id: data.id,
                })
              }>
              View Profile
            </Text>
          }>
          Name of Freelancer: {data.firstname + ' ' + data.lastname}
        </List.Item>
        <DatePicker
          value={this.state.date}
          mode="date"
          minDate={new Date()}
          onChange={(value) => {
            this.setState((state) => {
              let {date} = state;
              date = new Date(value);
              return {date};
            });
          }}>
          <List.Item>Date</List.Item>
        </DatePicker>

        <DatePicker
          value={this.state.time_from}
          mode="time"
          minDate={new Date()}
          onChange={(value) => {
            this.setState((state) => {
              let {time_from} = state;
              time_from = new Date(value);
              return {time_from};
            });
          }}>
          <List.Item>Time From</List.Item>
        </DatePicker>

        <DatePicker
          value={this.state.time_to}
          mode="time"
          minDate={new Date()}
          onChange={(value) => {
            this.setState((state) => {
              let {time_to} = state;
              time_to = new Date(value);
              return {time_to};
            });
          }}>
          <List.Item>Time To</List.Item>
        </DatePicker>

        <List.Item multipleLine={false}>Location</List.Item>
        <InputItem
          value={this.state.location}
          onChange={(val) =>
            this.setState((state) => {
              let {location} = state;
              location = val;
              return {location};
            })
          }
        />
        <List.Item multipleLine={false}>Name of Contact Person</List.Item>
        <InputItem
          value={this.state.contact_person}
          onChange={(val) =>
            this.setState((state) => {
              let {contact_person} = state;
              contact_person = val;
              return {contact_person};
            })
          }
        />
        <List.Item multipleLine={false}>Contact No.</List.Item>
        <InputItem
          value={this.state.contact_no}
          onChange={(val) =>
            this.setState((state) => {
              let {contact_no} = state;
              contact_no = val;
              return {contact_no};
            })
          }
        />
        <List.Item multipleLine={false}>Brief Details of the Issue:</List.Item>
        <InputItem
          multiline
          value={this.state.details}
          onChange={(val) =>
            this.setState((state) => {
              let {details} = state;
              details = val;
              return {details};
            })
          }
        />
        <Button onPress={() => this.submitInfo()}>Confirm</Button>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  easyservices: state.easyservices,
});

const mapActionCreators = {
  book,
  // login,
};

export default connect(mapStateToProps, mapActionCreators)(Book);
