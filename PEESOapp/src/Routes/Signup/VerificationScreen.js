import React, { Component } from 'react';
import {
    WhiteSpace,
    WingBlank,
    InputItem,
    Button,
    Checkbox,
    Icon,
    Radio,
    List
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';

class VerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verification_code: null
        };
    }

    componentDidMount() {
        // console.log(this.props.auth);
        // ws = Ws(`ws://${this.state.auth}`)
    }

    componentWillReceiveProps(props) {
        let { auth } = props;
    }

    selectRadio(value) {
        console.log(value)
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Text>Please Enter the verification code that was sent to your email.</Text>
                    <List.Item><TextAreaItem placeholder="XXXXXX" value={this.state.verification_code} onChange={(val) => this.setState(state => {
                        let { verification_code } = state
                        verification_code = val
                        return verification_code
                    })}></TextAreaItem></List.Item>
                </WingBlank>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapActionCreators = {
    login,
};

export default connect(
    mapStateToProps,
    mapActionCreators,
)(VerificationScreen);

VerificationScreen.propTypes = {};

// export default VerificationScreen;
