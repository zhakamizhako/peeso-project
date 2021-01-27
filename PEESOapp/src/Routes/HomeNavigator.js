// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import Switch from '@react-navigation/switch';

import HomePage from '../Routes/HomePage';

import {connect} from 'react-redux';
import {TabBar, Icon} from '@ant-design/react-native';

const Stack = createStackNavigator();

class HomeNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <>
        {/* <Text>NAV</Text> */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="login">
            {/* {this.props.auth.loginData && */}
            {/* // this.props.auth.loginData.role === 1 && ( */}
            <Stack.Screen
              name="homepage"
              component={HomePage}
              options={{title: 'Overview', headerShown: false}}
            />
            {/* // )} */}
          </Stack.Navigator>
        </NavigationContainer>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#f5f5f5">
          <TabBar.Item title="Home"   icon={<Icon name="like" />}></TabBar.Item>
        </TabBar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(HomeNavigator);
