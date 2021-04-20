// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Switch from '@react-navigation/switch';
import LoginScreen from './LoginScreen';

import HomePage from './Routes/HomePage';
import Trabaho from './Routes/Trabaho';
import ViewTrabaho from './Routes/Trabaho/viewTrabaho'
import ApplyHere from './Routes/Trabaho/ApplyHere'

import SavedJobs from './Routes/SavedJobs/index';

import Company from './Routes/Company/companylist'
import ViewCompany from './Routes/Company/viewCompany'

import CreateJob from './Routes/CompanyDashboard/postjob'

import EasyServices from './Routes/EasyServices/index'
import EasyServicesFreelancers from './Routes/EasyServices/Freelancers'
import Book from './Routes/EasyServices/Book';
import Signup from './Routes/Signup';
import SignupApplicant from './Routes/Signup/SignupApplicant'
import SignupCompany from './Routes/Signup/SignupCompany'

import VerificationScreen from './Routes/Signup/VerificationScreen'
import SignupEmail from './Routes/Signup/SignupEmail'

import Profile from './Routes/Profile/profile'

import Search from './Routes/Search/index'

import Drawer from "./Routes/Settings/Drawer"

import { connect } from 'react-redux';
import { View } from 'react-native'
import { TabBar, Icon } from '@ant-design/react-native';
import { useNavigationState } from '@react-navigation/native';
import TabBarItem from '@ant-design/react-native/lib/tab-bar/TabBarItem';

const Stack = createStackNavigator();

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.NavigationContainerRef = React.createRef();
    this.state = {
      mounted: false,
      naviListener: null,
      drawerOpen: false
    }
    this.setDrawerClosed = this.setDrawerClosed.bind(this)
  }

  componentDidMount() {
    console.log(this)

    // this.setState({ mounted: true })
  }

  setDrawerClosed() {
    this.setState({ drawerOpen: false })
  }

  render() {
    // const routes = useNavigationState(state => state.routes)

    return (
      <>
        <View style={{ flex: 1 }}>
          {/* <Drawer drawerOpen={this.state.drawerOpen} navigatorProps={this.NavigationContainerRef} setDrawerClosed={this.setDrawerClosed}> */}

          <NavigationContainer ref={this.NavigationContainerRef}>
            <Stack.Navigator initialRouteName="login">
              {this.props.auth.loginData && this.props.auth.noAccount == false && (<>
                <Stack.Screen
                  name="homepage"
                  component={HomePage}
                  options={{ title: 'Overview', headerShown: false }}
                />
                <Stack.Screen
                  name="trabaho"
                  component={Trabaho}
                  options={{ title: 'Trabaho Corner', headerShown: true }}
                />
                <Stack.Screen
                  name="viewtrabaho"
                  component={ViewTrabaho}
                  options={{ title: 'View Trabaho', headerShown: true }}
                />
                <Stack.Screen
                  name="apply"
                  component={ApplyHere}
                  options={{ title: 'Apply to Trabaho', headerShown: true }}
                />

                <Stack.Screen
                  name="companies"
                  component={Company}
                  options={{ title: 'Companies', headerShown: true }}
                />
                <Stack.Screen
                  name="viewCompany"
                  component={ViewCompany}
                  options={{ title: 'View Company', headerShown: true }}
                />

                <Stack.Screen
                  name="savedjobs"
                  component={SavedJobs}
                  options={{ title: 'Saved Jobs', headerShown: true }}
                />

                <Stack.Screen
                  name="easyservices"
                  component={EasyServices}
                  options={{ title: 'Easy Services', headerShown: true }}
                />

                <Stack.Screen
                  name="easyservicesfreelancers"
                  component={EasyServicesFreelancers}
                  options={{ title: 'Freelancers', headerShown: true }}
                />
                <Stack.Screen
                  name="book"
                  component={Book}
                  options={{ title: 'Freelancers', headerShown: true }}
                />

                <Stack.Screen
                  name="search"
                  component={Search}
                  options={{ title: 'Search', headerShown: true }}
                />

                <Stack.Screen
                  name="profile"
                  component={Profile}
                  options={{ title: 'Profile', headerShown: true }}
                />
              </>)}
              {this.props.auth.loginData && this.props.auth.loginData.profile && this.props.auth.loginData.profile.is_company && (<>
                <Stack.Screen
                  name="createjob"
                  component={CreateJob}
                  options={{ title: 'Create a Job Post', headerShown: true }}
                />
              </>)}
              {!this.props.auth.loginData && (
                <>
                  <Stack.Screen
                    {...this.props}
                    name="login"
                    component={LoginScreen}
                    options={{ title: 'Login Screen', headerShown: false }}
                  />
                  <Stack.Screen
                    {...this.props}
                    name="signupemail"
                    component={SignupEmail}
                    options={{ title: 'Sign Up Email', headerShown: false }}
                  />
                </>
              )}

              {/* {this.props.auth.noAccount && this.props.auth.loginData == null(
               
              )} */}
              <Stack.Screen
                {...this.props}
                name="signup"
                component={Signup}
                options={{ title: 'Sign Up', headerShown: false }}
              />
              <Stack.Screen
                name="signupapplicant"
                component={SignupApplicant}
                options={{ title: 'Sign Up Applicant', headerShown: false }}
              />
              <Stack.Screen
                name="signupcompany"
                component={SignupCompany}
                options={{ title: 'Sign Up Company', headerShown: false }}
              />
              <Stack.Screen
                name="verificationotp"
                component={VerificationScreen}
                options={{ title: 'OTP', headerShown: false }}
              />
            </Stack.Navigator>
            {console.log(this)}
            {/* {this.NavigationContainerRef != null && this.NavigationContainerRef.current != null && this.NavigationContainerRef.current.getCurrentRoute().name != "login" && ( */}

            <View style={{ positon: 'absolute' }}>
            </View>

            {/* )} */}
          </NavigationContainer>
          {/* </Drawer> */}
        </View >
        {/* <View style={{ position: 'absolute', width: '100%', bottom: 1, zIndex: 2, height: 49 }}>
          <TabBar >
            <TabBar.Item title="Menu" icon={(<Icon name="menu" > </Icon>)} onPress={() => {
              this.setState({ drawerOpen: !this.state.drawerOpen })
            }}></TabBar.Item>
            <TabBar.Item title="This Tab bar will only appear while logged in. Or should we remove it?" selected={this.state.wtf}></TabBar.Item>
          </TabBar>
        </View> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapActionCreators = {};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(Navigator);
