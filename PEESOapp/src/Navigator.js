// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import Switch from '@react-navigation/switch';
import LoginScreen from './LoginScreen';

import HomePage from './Routes/HomePage';

import {connect} from 'react-redux';
import { TabBar } from '@ant-design/react-native';

const Stack = createStackNavigator();

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.NavigationContainerRef = 
  }

  componentDidMount() {}

  render() {
    return (
        <>
        {/* <Text>NAV</Text> */}
      <NavigationContainer ref={this.NavigationContainerRef}>
        <Stack.Navigator initialRouteName="login">
          {/* {this.props.auth.loginData && this.props.auth.loginData.role === 999 && (
            <>
              <Stack.Screen
                name="admin"
                component={AdminPage}
                options={{
                  title: 'Administrative Management',
                  headerShown: true,
                }}
              />
            </>
          )} */}
          {/* {this.props.auth.loginData && */}
            {/* // this.props.auth.loginData.role === 1 && ( */}
              <Stack.Screen
                name="homepage"
                component={HomePage}
                options={{title: 'Overview', headerShown: false}}
              />
            {/* // )} */}
          {!this.props.auth.loginData && (
            <Stack.Screen
              {...this.props}
              name="login"
              component={LoginScreen}
              options={{title: 'Login Screen', headerShown: false}}
            />
          )}
        </Stack.Navigator>
        {/* <TabBar>
            <TabBar.Item title="Menu"></TabBar.Item>
            <TabBar.Item title="Companies"></TabBar.Item>
            <TabBar.Item title="Saved Jobs"></TabBar.Item>
            <TabBar.Item title="Easy Services"></TabBar.Item>
            <TabBar.Item title="Search Jobs"></TabBar.Item>
            <TabBar.Item title="Profile"></TabBar.Item>
        </TabBar> */}
      </NavigationContainer>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapActionCreators = {};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(Navigator);
