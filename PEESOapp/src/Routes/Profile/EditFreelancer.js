/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import {
    Button,
    WhiteSpace,
    WingBlank,
    Modal,
    Card,
    Grid,
    Icon,
    Toast,
    ActivityIndicator,
    List,
    InputItem,
    Checkbox,
    Radio,
    DatePicker,
    SegmentedControl,
    Picker,
} from '@ant-design/react-native';
import { getEasyServices, clearDataApplication } from '../../stores/modules/easyservices';
import { checkMe } from '../../stores/modules/auth';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import { connect } from 'react-redux';
import imageLogo from '../../logo.png';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { updateProfile } from '../../stores/modules/easyservices';
import { updateProfilePic } from '../../stores/modules/user';
import RNFetchBlob from 'rn-fetch-blob';
import { API_HOST } from '@env';
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorDialog: false,
            errorMessage: null,
            isLoading: false,
            categories: [],
            category: null,
            is_available: false,
            job_experience: null,
            available: null,
            price_max: 0,
            price_min: 0,
            isSaving: false,
        };
    }

    componentDidMount() {
        this.props.checkMe();
        if (this.props.auth.loginData) {
            if (!this.props.auth.loginData.freelancer) {
                this.setState({
                    email: this.props.auth.loginData.email,
                    contact_no: this.props.auth.loginData.applicant ? this.props.auth.loginData.applicant.contact_no : (this.props.auth.loginData.company ? this.props.auth.loginData.company.contact_no : null),
                });
            } else {
                let props = this.props.auth.loginData.freelancer;
                this.setState({
                    email: props.email,
                    contact_no: props.contact_no,
                    category: props.freelance_service_id,
                    price_max: props.price_max,
                    price_min: props.price_min,
                    is_available: props.is_available,
                    job_experience: props.job_experience,
                });
            }
        }
        this.setState({ isLoading: true });
        this.props.getEasyServices();
        // if (this.props.auth.loginData && this.props.loginData.profile != null) {
        // this.setState({
        //     first_name: this.props.auth.loginData.profile
        //         ? this.props.auth.loginData.profile.first_name
        //         : 'Unknown',
        //     middle_name: this.props.auth.loginData.profile
        //         ? this.props.auth.loginData.profile.middle_name
        //         : 'Unknown',
        //     last_name: this.props.auth.loginData.profile
        //         ? this.props.auth.loginData.profile.last_name
        //         : 'Unknown',
        // });
        // }
    }

    saveProfile() {
        console.log(this.state);
        let data = {
            category: this.state.category[0],
            price_min: this.state.price_min,
            price_max: this.state.price_max,
            is_available: this.state.is_available,
            job_experience: this.state.job_experience,
            contact_no: this.state.contact_no,
            email: this.state.email,
        };

        this.setState({ isSaving: true });
        this.props.updateProfile(data);
    }

    componentWillReceiveProps(prevProps) {
        let { easyservices } = this.props;

        if (easyservices != prevProps.easyservices) {
            if (easyservices.getEasyServicesData) {
                this.setState(state => {
                    let { categories, isLoading } = state;
                    let b = [];
                    easyservices.getEasyServicesData.map((entry, index) => {
                        b.push({ value: entry.id, label: entry.name });
                    });
                    categories = b;
                    isLoading = false;

                    return { categories, isLoading };
                });
                // this.setState({ categories: easyservices.getEasyServicesData });
            }
        }
        if (easyservices != prevProps.easyservices) {
            if (this.props.easyservices.updateProfileSuccess) {
                Modal.alert('Good!', 'Profile Update Success.', [{
                    text: 'OK', onPress: () => {
                        this.props.clearDataApplication();
                        this.props.navigation.goBack();
                    }
                }]);
            }
            if (this.props.easyservices.updateProfileError) {
                {
                    Modal.alert('Save Error', this.props.easyservice.updateProfileError, [{ text: 'OK' }]);
                }
            }
        }
        // if (auth.logoutSuccess) {
        //     this.props.navigation.replace('login');
        // }
    }

    // uploadProfilePic(data) { }

    render() {
        // let { first_name, middle_name, last_name } = this.state
        return (
            <View style={{ height: '100%' }}>
                <ScrollView>
                    <WhiteSpace size="lg" />
                    <WingBlank>
                        <List.Item>Edit Profile Picture</List.Item>
                        <List.Item><View style={{ alignSelf: 'center' }}>

                            <Avatar
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
                        </View></List.Item>
                        <WhiteSpace size="lg" />

                        <List>
                            <List.Item>Email
                                <InputItem value={this.state.email} autoHeight onChange={(val) => this.setState(state => {
                                    let { email } = state;
                                    email = val;
                                    return { email };
                                })} />
                            </List.Item>

                            <List.Item>Contact No.
                                <InputItem value={this.state.contact_no} type="phone" autoHeight onChange={(val) => this.setState(state => {
                                    let { contact_no } = state;
                                    contact_no = val;
                                    return { contact_no };
                                })} />
                            </List.Item>
                        </List>

                        <WhiteSpace size="lg" />


                        <List>
                            <Picker
                                cols={1}
                                value={this.state.category}
                                onChange={(val) => {
                                    console.log(val);
                                    this.setState({ category: val });
                                }}
                                data={this.state.categories}>
                                <List.Item>Select a Category</List.Item>
                            </Picker>
                            <List>
                                <List.Item>Estimated Service Fee Ranges</List.Item>
                                <InputItem value={this.state.price_min} type="number" autoHeight onChange={(val) => this.setState(state => {
                                    let { price_min } = state;
                                    price_min = val;
                                    return { price_min };
                                })} ><Text>Minimum Price</Text></InputItem>
                                <InputItem value={this.state.price_max} type="number" autoHeight onChange={(val) => this.setState(state => {
                                    let { price_max } = state;
                                    price_max = val;
                                    return { price_max };
                                })} ><Text>Maximum Price</Text></InputItem>
                            </List>
                        </List>

                        <WhiteSpace size="lg" />

                        <List>
                            <List.Item>
                                Available?
                                <WhiteSpace />
                                <SegmentedControl
                                    values={['Yes', 'No']}
                                    selectedIndex={this.state.available}
                                    // onValueChange={(value) => console.log(value)}
                                    onChange={(v) => {
                                        let bb = v.nativeEvent.selectedSegmentIndex;
                                        this.setState((state) => {
                                            let { available, is_available } = state;
                                            available = bb;
                                            is_available = available == 0;
                                            return { available, is_available };
                                        });
                                        // console.log(v.nativeEvent.selectedSegmentIndex);
                                    }}
                                />
                            </List.Item>

                            <List.Item>
                                Job Experience(s)
                                <TextAreaItem value={this.state.job_experience} autoHeight onChange={(val) => this.setState(state => {
                                    let { job_experience } = state;
                                    job_experience = val;
                                    return { job_experience };
                                })} />
                            </List.Item>
                        </List>

                        <List.Item >
                            <Button type="primary" onPress={() => this.saveProfile()}>Save</Button>
                        </List.Item>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                    </WingBlank>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    easyservices: state.easyservices,
});

const mapActionCreators = {
    getEasyServices,
    updateProfilePic,
    updateProfile,
    checkMe,
    clearDataApplication,
    // login,
};

export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);

ProfileScreen.propTypes = {};

// export default ProfileScreen;
