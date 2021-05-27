import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  ActivityIndicator,
  Icon,
  List,
} from '@ant-design/react-native';
import moment from 'moment';
import { Rating } from 'react-native-elements';
import { View, Text, ScrollView, Image } from 'react-native';
import { getApplicant } from '../../stores/modules/user';
import { connect } from 'react-redux';
import imageLogo from '../../logo.png';
import { Avatar } from 'react-native-elements';
import { API_HOST } from '@env'
const dateFormat = "MM/DD/YYYY"
class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null, //Easy service? or typical?
      profile: null,
      profile_pic: null,
      key_skills: [],
      experiences: [],
      educationalBackground: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    console.log('viewpofile')
    console.log(this.props)
    // console.log(this.props.route.params.id)


    if (this.props.route.params && this.props.route.params.id) {
      this.setState({ isFetching: true })
      this.props.getApplicant(this.props.route.params.id)
    }
  }

  componentDidUpdate(prevProps) {
    let { user } = this.props

    if (user != prevProps.user) {
      this.setState(state => {
        let { profile, profile_pic, experiences, educationalBackground, key_skills, isFetching } = state
        let data = user.getApplicantData
        isFetching = false
        profile = data
        profile_pic = data.user && data.user.profile && data.user.profile && data.user.profile.picture
        experiences = data.experiences.length > 0 && data.experiences
        key_skills = data.keySkills.length > 0 && data.keySkills
        educationalBackground = data.educationalBackground.length > 0 && data.educationalBackground
        return { isFetching, profile, profile_pic, experiences, key_skills, educationalBackground }
      })
      // this.setState({ profile: user.getApplicantData, isFetching: false })
      console.log(user.getApplicantData)
      console.log('get')
    }
  }

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (
      <ScrollView style={{ height: '100%' }}>
        <WhiteSpace size="lg" />
        <WingBlank>
          {this.props.auth && this.props.auth.loginData && this.props.auth.loginData.applicant && this.props.auth.loginData.applicant.id == (this.props.route.params && this.props.route.params.id) && (
            <Icon name="edit" style={{ alignSelf: 'flex-end' }} />
          )}
          <View style={{ alignSelf: 'center' }}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:
                  this.state.profile_pic ? `${API_HOST}/${this.state.profile_pic.path}` :
                    'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
              }}
            />
          </View>


          {this.state.isFetching && (<ActivityIndicator text="Loading.." />)}
          {!this.state.isFetching && this.state.profile && (
            <>
              <WhiteSpace size="lg" />
              <Text
                style={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                {this.state.profile.first_name} {this.state.profile.middle_name}{' '}
                {this.state.profile.last_name}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontStyle: 'italic',
                }}>
                {this.state.profile.title ? this.state.profile.title : "No Title"}
              </Text>

              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />

              <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                <WingBlank>
                  <WhiteSpace size="lg" />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Key Skills </Text>
                  <WhiteSpace size="lg" />
                  {this.state.key_skills && (<>
                    <List>
                      {this.state.key_skills.map((entry, index) => (
                        <List.Item>
                          {entry.name ? entry.name.skill_name : "Unknown"}
                          <Rating
                            ratingCount={5}
                            imageSize={12}
                            readonly
                            startingValue={entry.rating ? entry.rating : 0}
                            fractions={0}>
                          </Rating>{' '}
                        </List.Item>))}
                    </List>
                  </>)}
                  {!this.state.key_skills && (<Text style={{ alignSelf: 'center' }}>None</Text>)}

                  <WhiteSpace size="lg" />
                  <WhiteSpace size="lg" />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Experiences </Text>
                  <WhiteSpace size="lg" />
                  {this.state.experiences && (<>
                    <List>
                      {this.state.experiences.map((entry, index) => (
                        <List.Item>
                          {`${entry.role}`}
                          <Text style={{ fontStyle: 'italic' }}>{`${entry.name}`}</Text>
                          {` ${moment(new Date(entry.date_start)).format(dateFormat)} - ${moment(new Date(entry.date_end)).format(dateFormat)}`}
                        </List.Item>))}
                    </List>
                  </>)}
                  {!this.state.experiences && (<Text style={{ alignSelf: 'center' }}>None</Text>)}

                  <WhiteSpace size="lg" />
                  <WhiteSpace size="lg" />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Educational Background </Text>
                  <WhiteSpace size="lg" />
                  {this.state.educationalBackground && (<>
                    <List>
                      {this.state.educationalBackground.map((entry, index) => (
                        <List.Item>
                          {`${entry.course}`}
                          <Text style={{ fontStyle: 'italic' }}>{`${entry.name}`}</Text>
                          {` ${moment(new Date(entry.date_start)).format(dateFormat)} - ${moment(new Date(entry.date_end)).format(dateFormat)}`}

                        </List.Item>))}
                    </List>
                  </>)}
                  {!this.state.educationalBackground && (<Text style={{ alignSelf: 'center' }}>None</Text>)}
                  <WhiteSpace size="lg" />
                </WingBlank>
              </View>
            </>
          )}
          <WhiteSpace size="lg" />

        </WingBlank>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

const mapActionCreators = {
  getApplicant
};

export default connect(mapStateToProps, mapActionCreators)(ViewProfile);

ViewProfile.propTypes = {};

// export default ViewProfile;
