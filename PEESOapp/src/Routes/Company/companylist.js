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
} from '@ant-design/react-native';
import {
  View,
  Text,
  ScrollView,
  EventEmitter,
  RefreshControl,
} from 'react-native';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCompanies } from '../../stores/modules/company';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HomeStyles } from '../homeStyles'
let ws = {};
let wsInstance = {};
var intervalObject = null;
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  followCompany() {
    Toast.success('Followed Company!');
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getCompanies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.company != prevProps.company) {
      if (this.props.company.companiesData != prevProps.company.companiesData) {
        this.setState({
          data: this.props.company.companiesData,
          isLoading: false,
        });
      }
    }
  }

  renderCompanyData(data, index) {
    return (
      <Card key={index} style={HomeStyles.entryCards}>
        <Card.Header
          title={
            <>
              <Text style={{ fontWeight: 'bold' }}> {data.name}</Text>
              <Text style={{ fontStyle: 'italic' }}> {data.address}</Text>
            </>
          }
          extra={
            <TouchableOpacity onPress={() => this.followCompany()}>
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
              this.props.navigation.navigate('viewCompany', { id: data.id })
            }>
            <Text>Opening Statement: {data.shortdesc}</Text>
            <Text>
              Number of Employees: {data.employees_min} - {data.employees_max}{' '}
            </Text>
            <Text>Category: {data.category}</Text>

            {data.rating && (
              <>
                <Text>
                  Company Rating:{' '}
                  <Rating
                    ratingCount={5}
                    imageSize={12}
                    readonly
                    startingValue={data.rating}
                    fractions={0}>
                    {' '}
                  </Rating>{' '}
                </Text>
                <Text>
                  {data.rating} stars out of {data.review_count} reviews{' '}
                </Text>
              </>
            )}
            {!data.rating && <Text>This company has no ratings yet...</Text>}
          </TouchableOpacity>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <View style={HomeStyles.ScrollViewLimit}>
        <WingBlank>
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => {
              this.setState({ isLoading: true });
              this.props.getCompanies();
            }}>
            <ScrollView>
              {this.state.data.map((entry, index) => {
                return this.renderCompanyData(entry, index);
              })}
            </ScrollView>
          </RefreshControl>
        </WingBlank>
      </View>
    );
  }
}

const mapActionCreators = {
  getCompanies,
};

const mapStateToProps = (state) => ({
  company: state.company,
  // jobs: state.jobs,
  // auth: state.auth,
});

export default connect(mapStateToProps, mapActionCreators)(Company);
