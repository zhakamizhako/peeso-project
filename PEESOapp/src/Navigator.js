// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Switch from '@react-navigation/switch';
import LoginScreen from './LoginScreen';

import HomePage from './Routes/HomePage';
import Trabaho from './Routes/Trabaho';
import ViewTrabaho from './Routes/Trabaho/viewTrabaho';
import ApplyHere from './Routes/Trabaho/ApplyHere';

import SavedJobs from './Routes/SavedJobs/index';

import Company from './Routes/Company/companylist';
import ViewCompany from './Routes/Company/viewCompany';

import CreateJob from './Routes/CompanyDashboard/postjob';
import MyApplications from './Routes/CompanyDashboard/CurrentApplications';
import EditCompanyProfile from './Routes/CompanyDashboard/EditCompanyProfile';

import EasyServices from './Routes/EasyServices/index';
import EasyServicesFreelancers from './Routes/EasyServices/Freelancers';
import Book from './Routes/EasyServices/Book';
import Signup from './Routes/Signup';
import SignupApplicant from './Routes/Signup/SignupApplicant';
import SignupCompany from './Routes/Signup/SignupCompany';
import SignupFreelanceEmployer from './Routes/Signup/SignupFreelanceEmployer';

import VerificationScreen from './Routes/Signup/VerificationScreen';
import SignupEmail from './Routes/Signup/SignupEmail';

import Profile from './Routes/Profile/profile';
import ApplicationHistory from './Routes/Profile/MyApplications';
import ViewProfile from './Routes/Profile/viewprofile';
import EditFreelancer from './Routes/Profile/EditFreelancer';
import FreelanceProfile from './Routes/Profile/FreelanceProfile';

import Uploads from './Routes/Uploads'

import NotificationsScreen from './Routes/Settings/Notifications';

import Search from './Routes/Search/index';

import Drawer from './Routes/Settings/Drawer';

import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { TabBar, Icon } from '@ant-design/react-native';
import { Badge } from 'react-native-elements'
import { useNavigationState } from '@react-navigation/native';

//Icons
import tabbar_home from './icons/tabbar/home.png'
import tabbar_companies from './icons/tabbar/companies.png'
import tabbar_jobs from './icons/tabbar/jobs.png'
import tabbar_profile from './icons/tabbar/profile.png'
import tabbar_savedjobs from './icons/tabbar/savedjobs.png'
import tabbar_search from './icons/tabbar/search.png'
import tabbar_telework from './icons/tabbar/telework.png'

import Toast from 'react-native-toast-message';
import logo from './icons/logo.png'
import ViewApplicants from './Routes/CompanyDashboard/ViewApplicants';


const Stack = createStackNavigator();

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.NavigationContainerRef = React.createRef();
    this.state = {
      mounted: false,
      naviListener: null,
      drawerOpen: false,
      currentRoute: null,
    };
    this.setDrawerClosed = this.setDrawerClosed.bind(this);
  }

  componentDidMount() {
    console.log(this);

    // this.setState({ mounted: true })
  }

  setDrawerClosed() {
    this.setState({ drawerOpen: false });
  }

  updateNavigation() {
    this.setState({ currentRoute: this.NavigationContainerRef.current.getCurrentRoute().name })
  }

  render() {
    const bar1 = (<TabBar>
      <TabBar.Item title="Home" icon={tabbar_home} selected={this.NavigationContainerRef.current && this.NavigationContainerRef.current.getCurrentRoute().name == "homepage"} onPress={() => {
        console.log(this.NavigationContainerRef)
        this.NavigationContainerRef.current.navigate("homepage")
        this.updateNavigation();
        // console.log(this.NavigationContainerRef.current.getCurrentRoute())
        // this.NavigationContainerRef.current
      }} />
      <TabBar.Item title="Jobs" iconStyle={{ marginBottom: 3 }} icon={tabbar_jobs} selected={this.state.currentRoute == "trabaho"} onPress={() => {
        this.NavigationContainerRef.current.navigate("trabaho")
        this.updateNavigation();
      }} />
      <TabBar.Item title="Companies" iconStyle={{ marginBottom: 3 }} icon={tabbar_companies} selected={this.state.currentRoute == "companies"} onPress={() => {
        this.NavigationContainerRef.current.navigate("companies")
        this.updateNavigation();
      }} />
      <TabBar.Item title="Saved Jobs" iconStyle={{ marginBottom: 3 }} icon={tabbar_savedjobs} selected={this.state.currentRoute == "savedjobs"} onPress={() => {
        this.NavigationContainerRef.current.navigate("savedjobs")
        this.updateNavigation();
      }} />
      <TabBar.Item title="Search" iconStyle={{ marginBottom: 3 }} icon={tabbar_search} selected={this.state.currentRoute == "search"} onPress={() => {
        this.NavigationContainerRef.current.navigate("search")
        this.updateNavigation();
      }} />
      <TabBar.Item title="TeleWork" iconStyle={{ marginBottom: 3 }} icon={tabbar_telework} selected={this.state.currentRoute == "easyservices"} onPress={() => {
        this.NavigationContainerRef.current.navigate("easyservices")
        this.updateNavigation();
      }} />
      <TabBar.Item title="Account" iconStyle={{ marginBottom: 3 }} icon={tabbar_profile} selected={this.state.currentRoute == "profile"} onPress={() => {
        this.NavigationContainerRef.current.navigate("profile")
        this.updateNavigation();
      }} />
    </TabBar>)

    const bar2 = <TabBar >
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="Home" icon={tabbar_home} selected={this.NavigationContainerRef.current && this.NavigationContainerRef.current.getCurrentRoute().name == "homepage"} onPress={() => {
        console.log(this.NavigationContainerRef)
        this.NavigationContainerRef.current.navigate("homepage")
        this.updateNavigation();
        // console.log(this.NavigationContainerRef.current.getCurrentRoute())
        // this.NavigationContainerRef.current
      }} />
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="Jobs" icon={tabbar_jobs} selected={this.state.currentRoute == "trabaho"} onPress={() => {
        this.NavigationContainerRef.current.navigate("trabaho")
        this.updateNavigation();
      }} />
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="Companies" icon={tabbar_companies} selected={this.state.currentRoute == "companies"} onPress={() => {
        this.NavigationContainerRef.current.navigate("companies")
        this.updateNavigation();
      }} />
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="Search" icon={tabbar_search} selected={this.state.currentRoute == "search"} onPress={() => {
        this.NavigationContainerRef.current.navigate("search")
        this.updateNavigation();
      }} />
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="TeleWork" icon={tabbar_telework} selected={this.state.currentRoute == "easyservices"} onPress={() => {
        this.NavigationContainerRef.current.navigate("easyservices")
        this.updateNavigation();
      }} />
      <TabBar.Item iconStyle={{ marginBottom: 3 }} title="Account" icon={tabbar_profile} selected={this.state.currentRoute == "profile"} onPress={() => {
        this.NavigationContainerRef.current.navigate("profile")
        this.updateNavigation();
      }} />
    </TabBar>
    // const routes = useNavigationState(state => state.routes)

    return (
      <>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 1 }} />
        <View style={{ flex: 1 }}>
          {/* <Drawer drawerOpen={this.state.drawerOpen} navigatorProps={this.NavigationContainerRef} setDrawerClosed={this.setDrawerClosed}> */}

          <NavigationContainer ref={this.NavigationContainerRef}>
            <Stack.Navigator initialRouteName="login">
              {this.props.auth.loginData && this.props.auth.noAccount == false && (
                <>
                  <Stack.Screen
                    name="homepage"
                    component={HomePage}
                    options={{
                      title: 'Overview', headerShown: true, headerTitle: props => <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={logo} style={{ height: 40, width: 40 }}></Image>
                          <Text style={{ fontWeight: 'bold', color: '#061e69', fontSize: 25, paddingLeft: 10, textAlignVertical: 'center' }}>JOB HUB</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginLeft: '50%', flexDirection: 'row' }}>
                          <Icon name="bell" size='lg' onPress={() => this.NavigationContainerRef.current.navigate('notifications')}></Icon>
                          <Badge value="99" />
                        </View>
                      </View>
                    }}
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
                  <Stack.Screen
                    name="viewprofile"
                    component={ViewProfile}
                    options={{ title: 'View Profile', headerShown: true }}
                  />
                  <Stack.Screen
                    name="freelanceprofile"
                    component={FreelanceProfile}
                    options={{ title: "Freelancer's Profile", headerShown: true }}
                  />
                  <Stack.Screen
                    name="myapplications"
                    component={ApplicationHistory}
                    options={{
                      title: 'My Application History',
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="notifications"
                    component={NotificationsScreen}
                    options={{
                      title: 'Notifications',
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="editfreelance"
                    component={EditFreelancer}
                    options={{
                      title: 'Edit your Freelancer Profile',
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="uploads"
                    component={Uploads}
                    options={{
                      title: 'Uploaded Files',
                      headerShown: true,
                    }}
                  />
                </>
              )}
              {this.props.auth.loginData &&
                this.props.auth.loginData.profile &&
                this.props.auth.loginData.profile.is_company && (
                  <>
                    <Stack.Screen
                      name="createjob"
                      component={CreateJob}
                      options={{ title: 'Create a Job Post', headerShown: true }}
                    />
                    <Stack.Screen
                      name="myjobs"
                      component={MyApplications}
                      options={{
                        title: 'Current Jobs/Applications',
                        headerShown: true,
                      }}
                    />
                    <Stack.Screen
                      name="editcompany"
                      component={EditCompanyProfile}
                      options={{
                        title: 'Edit Company Profile',
                        headerShown: true,
                      }}
                    />
                    <Stack.Screen
                      name="viewapplicants"
                      component={ViewApplicants}
                      options={{
                        title: 'View Applicants',
                        headerShown: true
                      }}
                    />
                  </>
                )}
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
                {...this.props}
                name="signupfreelance"
                component={SignupFreelanceEmployer}
                options={{
                  title: 'Sign Up Freelance Employer',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="verificationotp"
                component={VerificationScreen}
                options={{ title: 'OTP', headerShown: false }}
              />
            </Stack.Navigator>
            {console.log(this)}
            {/* {this.NavigationContainerRef != null && this.NavigationContainerRef.current != null && this.NavigationContainerRef.current.getCurrentRoute().name != "login" && ( */}

            <View style={{ positon: 'absolute' }} />

            {/* )} */}
          </NavigationContainer>
          {/* </Drawer> */}
        </View>
        <View style={{ position: 'absolute', width: '100%', bottom: 1, zIndex: 2, height: 49 }}>
          {this.props.auth.loginData && this.props.auth.loginData.profile && this.NavigationContainerRef.current != null && (
            <>
              {this.props.auth.loginData.profile.is_company ? (bar2) : (bar1)}
            </>
          )}

        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(Navigator);
