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
class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null, //Easy service? or typical?
      profile: null,
    };
  }

  componentDidMount() {
    //?
  }

  componentWillReceiveProps(props) {
    //??
  }

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (
      <View style={{height: '100%'}}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <View style={{alignSelf: 'center'}}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:
                  'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
              }}
            />
          </View>
          <WhiteSpace size="lg" />
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionCreators = {
  // logout,
  // login,
};

export default connect(mapStateToProps, mapActionCreators)(ViewProfile);

ViewProfile.propTypes = {};

// export default ViewProfile;
