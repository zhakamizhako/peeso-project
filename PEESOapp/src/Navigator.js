// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Switch from '@react-navigation/switch';
import LoginScreen from './LoginScreen';

import HomePage from './Routes/HomePage';
import Trabaho from './Routes/Trabaho';
// import ViewTrabaho from './Routes/ViewTrabaho';
import Drawer from "./Routes/Settings/Drawer"

import { connect } from 'react-redux';
import { View } from 'react-native'
import { TabBar } from '@ant-design/react-native';
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
        <View style={{ flex: 1, marginBottom: 50 }}>
          <Drawer drawerOpen={this.state.drawerOpen} navigatorProps={this.NavigationContainerRef} setDrawerClosed={this.setDrawerClosed}>

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
                  options={{ title: 'Overview', headerShown: false }}
                />
                <Stack.Screen
                  name="trabaho"
                  component={Trabaho}
                  options={{ title: 'Trabaho Corner', headerShown: true }}
                />
                {/* <Stack.Screen
                name="viewtrabaho"
                component={ViewTrabaho}
                options={{ title: 'View Trabaho', headerShown: true }}
              /> */}
                {/* // )} */}
                {!this.props.auth.loginData && (
                  <Stack.Screen
                    {...this.props}
                    name="login"
                    component={LoginScreen}
                    options={{ title: 'Login Screen', headerShown: false }}
                  />
                )}
              </Stack.Navigator>
              {console.log(this)}
              {/* {this.NavigationContainerRef != null && this.NavigationContainerRef.current != null && this.NavigationContainerRef.current.getCurrentRoute().name != "login" && ( */}

              <View style={{ positon: 'absolute' }}>
              </View>

              {/* )} */}
            </NavigationContainer>
          </Drawer>
        </View >
        <View style={{ position: 'absolute', width: '100%', bottom: 1, zIndex: 2, height: 49 }}>
          <TabBar >
            <TabBar.Item title="Menu" onPress={() => {
              this.setState({ drawerOpen: !this.state.drawerOpen })
            }}></TabBar.Item>
            <TabBar.Item title="P{roceddural" selected={this.state.wtf}></TabBar.Item>
          </TabBar>
        </View>
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
