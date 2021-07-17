import React, {Component} from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  List,
} from '@ant-design/react-native';
import {View, Text, ScrollView, Image} from 'react-native';
import {logout} from '../../stores/modules/auth';
import {connect} from 'react-redux';
import imageLogo from '../../logo.png';
import {Avatar} from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import {updateProfilePic} from '../../stores/modules/user';
import RNFetchBlob from 'rn-fetch-blob';
import {API_HOST} from '@env';
import {profileStyles, MAIN_COLOR} from './styles';
import profile_applicationhistory from '../../icons/profile/applicationhistory.png';
import profile_freelancingbooking from '../../icons/profile/freelancingbooking.png';
import profile_freelancingprofile from '../../icons/profile/freelancingprofile.png';
import profile_logout from '../../icons/profile/logout.png';
import profile_resume from '../../icons/profile/resume.png';
import profile_settings from '../../icons/profile/settings.png';
// import { profileStyles } from './styles';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      isLoggingIn: false,
      loginError: false,
      loginErrorDetails: '',
      connectionError: false,
      errorDialog: false,
      errorMessage: null,
      first_name: null,
      middle_name: null,
      last_name: null,
    };
  }

  componentDidMount() {
    // if (this.props.auth.loginData && this.props.loginData.profile != null) {
    this.setState({
      first_name: this.props.auth.loginData.profile
        ? this.props.auth.loginData.profile.first_name
        : 'Unknown',
      middle_name: this.props.auth.loginData.profile
        ? this.props.auth.loginData.profile.middle_name
        : 'Unknown',
      last_name: this.props.auth.loginData.profile
        ? this.props.auth.loginData.profile.last_name
        : 'Unknown',
    });
    // }
  }

  componentWillReceiveProps(props) {
    let {auth} = props;

    if (auth.logoutSuccess) {
      this.props.navigation.replace('login');
    }
  }

  uploadProfilePic(data) {}

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (
      <View style={{height: '100%'}}>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              avatarStyle={{
                borderRadius: 90,
                borderWidth: 3,
                borderColor: '#061e69',
              }}
              // iconStyle={{ borderRadius: 45, borderWidth: 15 }}
              onPress={() => {
                FilePickerManager.showFilePicker(null, async (response) => {
                  console.log('response');
                  console.log(response);

                  if (response.didCancel) {
                    console.log('Cancelled');
                  } else if (response.error) {
                    console.log('picker error');
                    console.log(response.error);
                  } else {
                    let data = {};
                    data.photo = await RNFetchBlob.fs
                      .readFile(`${response.uri}`, 'base64')
                      .then((dataX) => {
                        console.log('UPLOAD FILE PHOTO');
                        console.log(dataX);
                        data.photo = dataX;
                        data.fileType = /[.]/.exec(response.fileName)
                          ? /[^.]+$/.exec(response.fileName)[0]
                          : undefined;

                        this.props.updateProfilePic(data);
                      });
                    // console.log('good');
                    // this.setState({selectedFile: response});
                    // console.log(response);
                  }
                });
              }}
              rounded
              size="xlarge"
              source={{
                uri:
                  this.props.auth.loginData &&
                  this.props.auth.loginData.profile &&
                  this.props.auth.loginData.profile.picture
                    ? `${API_HOST}/${this.props.auth.loginData.profile.picture.path}`
                    : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
              }}
            />
            <View>
              <View
                style={{
                  marginTop: 30,
                  marginLeft: 20,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                  {this.state.last_name}
                </Text>
                <Text style={{fontSize: 20, color: '#777'}}>
                  {this.state.first_name} {this.state.middle_name}
                </Text>
              </View>
              {this.props.auth.loginData &&
                this.props.auth.loginData.profile &&
                this.props.auth.loginData.profile.is_company && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontStyle: 'italic',
                      color: '#777',
                      marginLeft: 20,
                    }}>
                    {this.props.auth.loginData &&
                      this.props.auth.loginData.company.name}
                  </Text>
                )}
              {this.props.auth.loginData &&
                this.props.auth.loginData.profile &&
                !this.props.auth.loginData.profile.is_company && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontStyle: 'italic',
                      color: '#777',
                      marginLeft: 20,
                    }}>
                    {this.props.auth.loginData.applicant &&
                    this.props.auth.loginData.applicant.title
                      ? this.props.auth.loginData.applicant.title
                      : 'No title'}
                  </Text>
                )}
            </View>
          </View>
          <WhiteSpace size="lg" />

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <View style={profileStyles.listOptions}>
            <WhiteSpace size="lg" />
            {this.props.auth.loginData &&
              this.props.auth.loginData.profile &&
              this.props.auth.loginData.profile.is_company && (
                <List>
                  <List.Item
                    onPress={() => this.props.navigation.navigate('createjob')}>
                    <Text style={profileStyles.listItem}>Post a Job</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to create a new job posting
                    </Text>
                  </List.Item>
                  <List.Item
                    onPress={() => this.props.navigation.navigate('myjobs')}>
                    <Text style={profileStyles.listItem}>
                      Current Applications
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to view current applications
                    </Text>
                  </List.Item>
                  <List.Item
                    onPress={() => this.props.navigation.navigate('uploads')}>
                    <Text style={profileStyles.listItem}>Uploads</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Manage your uploaded documents
                    </Text>
                  </List.Item>
                  <List.Item
                    onPress={() =>
                      this.props.navigation.navigate('viewCompany', {
                        id: this.props.auth.loginData.company.id,
                      })
                    }>
                    <Text style={profileStyles.listItem}>
                      View Company Profile
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap view your company profile
                    </Text>
                  </List.Item>
                  <List.Item
                    onPress={() =>
                      this.props.navigation.navigate('editcompany')
                    }>
                    <Text style={profileStyles.listItem}>
                      Edit Company Profile
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to modify your company profile
                    </Text>
                  </List.Item>
                </List>
              )}
            {this.props.auth.loginData &&
              this.props.auth.loginData.profile &&
              !this.props.auth.loginData.profile.is_company && (
                <List>
                  <List.Item
                    thumb={
                      <Image
                        source={profile_resume}
                        style={profileStyles.imageStyle}
                      />
                    }
                    style={{paddingVertical: 10}}
                    onPress={() =>
                      this.props.navigation.navigate('viewprofile', {
                        id: this.props.auth.loginData.applicant.id,
                      })
                    }>
                    <Text style={profileStyles.listItem}>Resume</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to modify details about your resume
                    </Text>
                  </List.Item>
                  <List.Item
                    thumb={
                      <Image
                        source={profile_freelancingprofile}
                        style={profileStyles.imageStyle}
                      />
                    }
                    onPress={() =>
                      this.props.navigation.navigate('freelanceprofile', {
                        id: this.props.auth.loginData.id,
                      })
                    }>
                    <Text style={profileStyles.listItem}>
                      Freelancing Profile
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to modify details about your freelancing details
                    </Text>
                  </List.Item>
                  <List.Item
                    thumb={
                      <Image
                        source={profile_applicationhistory}
                        style={profileStyles.imageStyle}
                      />
                    }
                    onPress={() =>
                      this.props.navigation.navigate('myapplications')
                    }>
                    <Text style={profileStyles.listItem}>
                      Application History
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to view your employment and work records
                    </Text>
                  </List.Item>
                  <List.Item
                    onPress={() => this.props.navigation.navigate('uploads')}>
                    <Text style={profileStyles.listItem}>Uploads</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Manage your uploaded documents
                    </Text>
                  </List.Item>
                  <List.Item
                    thumb={
                      <Image
                        source={profile_freelancingbooking}
                        style={profileStyles.imageStyle}
                      />
                    }>
                    <Text style={profileStyles.listItem}>
                      Freelancing Booking
                    </Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to view your jobs/services records
                    </Text>
                  </List.Item>
                  {/* <List.Item>View Applicant Profile</List.Item>
                <List.Item>Edit Applicant Profile</List.Item> */}
                </List>
              )}
            <List.Item
              thumb={
                <Image
                  source={profile_settings}
                  style={profileStyles.imageStyle}
                />
              }>
              <Text style={profileStyles.listItem}>Settings</Text>
              <Text style={profileStyles.listItemSubtitle}>
                Tap to view settings
              </Text>
            </List.Item>
            <List.Item
              onPress={() => this.props.logout()}
              thumb={
                <Image
                  source={profile_logout}
                  style={profileStyles.imageStyle}
                />
              }>
              <Text style={profileStyles.listItem}>Logout</Text>
              <Text style={profileStyles.listItemSubtitle}>
                Tap to end your current session
              </Text>
            </List.Item>

            <WhiteSpace size="lg" />
          </View>

          {/* <Image
            source={imageLogo}
            style={{ height: 80, width: '100%', alignSelf: 'center' }}
            resizeMode="center"
          /> */}
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapActionCreators = {
  logout,
  updateProfilePic,
  // login,
};

export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);

ProfileScreen.propTypes = {};

// export default ProfileScreen;
