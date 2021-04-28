/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    WhiteSpace,
    WingBlank,
    InputItem,
    Button,
    Checkbox,
    Icon,
    List,
    Modal,
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { logout } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import imageLogo from '../../logo.png';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { getPersonData } from '../../stores/modules/easyservices';
import RNFetchBlob from 'rn-fetch-blob';
import { API_HOST } from '@env';
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorDialog: false,
            errorMessage: null,
            first_name: null,
            middle_name: null,
            last_name: null,
            freelancerData: null,
            popRegistration: false,
        };
    }

    componentDidMount() {
        console.log('A');
        console.log(this.props);
        if (
            this.props.route &&
            this.props.auth.loginData &&
            this.props.auth.loginData.id == this.props.route.params.id
        ) {
            if (!this.props.auth.loginData.freelancer) {
                this.setState({ popRegistration: true });
                Modal.alert(
                    'Whoah hey!',
                    <ScrollView>
                        <View>
                            <Text style={{ textAlign: 'justify' }}>
                                You don't have a freelancer profile yet!{' '}
                            </Text>
                            <WhiteSpace />
                            <Text style={{ textAlign: 'justify' }}>
                                Would you like to create and customize your profile first?
                            </Text>
                        </View>
                    </ScrollView>,
                    [
                        {
                            text: 'Yeah, why not.',
                            onPress: () => this.props.navigation.replace('editfreelance'),
                        },
                        {
                            text: 'Nope.',
                            onPress: () => this.props.navigation.goBack(),
                            style: 'cancel',
                        },
                    ],
                );
            } else {
                this.props.getPersonData(this.props.route.params.id);
            }
        } else if (this.props.route && this.props.route.params.id) {
            this.props.getPersonData(this.props.route.params.id);
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.easyservices != prevProps.easyservices && this.props.easyservices.getPersonData) {
            console.log('a?');
            this.setState({
                freelancerData: this.props.easyservices.getPersonData[0],
            });
        }

    }

    render() {
        let { freelancerData } = this.state;
        // let { first_name, middle_name, last_name } = this.state
        return (
            <View style={{ height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank>
                    {this.props.route.params && this.props.route.params.id == (this.props.auth.loginData && this.props.auth.loginData.id) && (
                        <Icon name="edit" size="lg" style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('editfreelance')} />
                    )}
                    <View style={{ alignSelf: 'center' }}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{
                                uri: this.state.freelancerData && this.state.freelancerData.user.profile.picture ? `${API_HOST}/${this.state.freelancerData.user.profile.picture.path}` : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                            }}
                        />
                    </View>
                    <WhiteSpace size="lg" />
                    <Text
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}>
                        {freelancerData && freelancerData.user && (`${freelancerData.user.profile.first_name} ${freelancerData.user.profile.middle_name} ${freelancerData.user.profile.last_name}`)}
                    </Text>
                    <Text
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            fontStyle: 'italic',
                        }}>
                        {freelancerData && freelancerData.category && freelancerData.category.name}
                    </Text>

                    <List>
                        <List.Item>Email: {freelancerData && freelancerData.email}</List.Item>
                        <List.Item>Contact No:{freelancerData && freelancerData.contact_no}</List.Item>
                    </List>
                    <WhiteSpace size="lg" />
                    <List>
                        <List.Item>Job Experience</List.Item>
                        <List.Item>{freelancerData && freelancerData.job_experience}</List.Item>
                    </List>

                    <List>
                        <List.Item>Reviews</List.Item>
                        <WhiteSpace size="lg" />
                        {/* <Text>No Reviews yet...</Text> */}
                        <List.Item>No reviews yet...</List.Item>
                    </List>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                </WingBlank>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    easyservices: state.easyservices,
    // user: state.user,
});

const mapActionCreators = {
    getPersonData,
};

export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);

ProfileScreen.propTypes = {};

// export default ProfileScreen;
