import React, { Component } from 'react';
import {
    WhiteSpace,
    WingBlank,
    InputItem,
    Button,
    Checkbox,
    Icon,
    List,
    Card
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image } from 'react-native';
import { logout } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import imageLogo from '../../logo.png';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { updateProfilePic } from '../../stores/modules/user';
import RNFetchBlob from 'rn-fetch-blob';
import { API_HOST } from '@env';
import { HomeStyles } from '../homeStyles';
import moment from 'moment'
// import { profileStyles } from './styles';
class ViewApplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
            id: null,
        };
    }

    componentDidMount() {
        if (this.props.route != null && this.props.route.params != null) {
            this.setState({ applicants: this.props.route.params.applicants, id: this.props.route.params.id })
        }
    }

    componentWillReceiveProps(props) {

    }

    renderApplicant(data) {
        console.log(data)
        return (<>
            <Card style={HomeStyles.entryCards}>
                <Card.Body style={{ marginHorizontal: 10 }}>
                    <Text>Applicant's Name: {`${data.first_name} ${data.middle_name} ${data.last_name}`}</Text>
                    <Text>Application Date: {`${moment(new Date(data.created_at)).format("HH:MMA MM/DD/YYYY")}`}</Text>
                    <Text>Status: {data.status}</Text>
                </Card.Body>

            </Card>
        </>)
    }


    render() {
        return (
            <ScrollView style={HomeStyles.ScrollViewLimit}>
                <WingBlank>
                    {this.state.applicants && this.state.applicants.map(entry => this.renderApplicant(entry))}
                </WingBlank >
            </ScrollView >
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

export default connect(mapStateToProps, mapActionCreators)(ViewApplicants);

ViewApplicants.propTypes = {};

// export default ViewApplicants;
