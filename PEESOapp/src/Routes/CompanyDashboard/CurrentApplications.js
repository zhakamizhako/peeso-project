/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
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
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getCompanyJobs } from '../../stores/modules/jobs';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

class Trabaho extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: null,
        };
    }

    removeJob(index) {
        this.setState((state) => {
            let { data } = state;

            data.splice(index, 1);
            return { data };
        });

        Toast.success('Job Removed', 0.1);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.props.getCompanyJobs(this.props.auth.loginData.company.id);
    }

    componentDidUpdate(prevProps) {
        let { jobs } = this.props;

        if (jobs != prevProps.jobs) {
            if (jobs.getCompanyJobsData != prevProps.jobs.getCompanyJobsData) {
                this.setState({ data: jobs.getCompanyJobsData, isLoading: false });
            }
            if (jobs.getSavedJobsError) {
                this.setState({ error: jobs.getSavedJobsError });
            }
        }
    }

    renderJobData(data, index, entrySaved) {
        console.log('render');
        console.log(data);
        return (
            <Card key={index} style={{ marginTop: 5 }}>
                <Card.Header
                    title={
                        <>
                            <Text>{data.name}</Text>
                            <Text>{data.location}</Text>
                        </>
                    }
                    extra={
                        <TouchableOpacity onPress={() => this.removeJob(index)}>
                            <Icon
                                style={{ alignSelf: 'flex-end' }}
                                size={30}
                                color="black"
                                name="book"
                            />
                        </TouchableOpacity>
                    }
                />
                <Card.Body style={{ marginLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('viewtrabaho', { id: data.id })
                        }>
                        <Text>Location: {data.location}</Text>
                        <Text>Salary: {data.salary}</Text>
                        <Text>
                            Highlights:{' '}
                            {data.highlight != null
                                ? data.highlight.map((entry) => (
                                    <Text>{'\n-' + entry.description}</Text>
                                ))
                                : null}
                        </Text>
                        <Text>
                            Deadline: {moment(data.deadline).format('MMMM DD, yyyy')}
                        </Text>
                        <Text>Status: {data.status}</Text>
                        <Text>Category: {data.category}</Text>
                        <Text>Saved on: {moment(entrySaved).format('MMMM DD, yyyy')}</Text>
                        <Text>Applications: ??</Text>

                        {/* <Text>Tap here to view Applicants</Text> */}
                    </TouchableOpacity>

                    <WhiteSpace size="lg"/>
                    <Button disabled={!data.is_approved}>{!data.is_approved && ('This Job is awaiting admin approval.')}{data.status != 'Pending' && ('View Applicants')}</Button>
                </Card.Body>
            </Card>
        );
    }

    render() {
        return (
            <>
                <WingBlank>
                    {this.state.isLoading && (
                        <View
                            style={{
                                alignSelf: 'center',
                                alignContent: 'center',
                                marginVertical: '50%',
                            }}>
                            <ActivityIndicator text="Loading Data..."> </ActivityIndicator>
                        </View>
                    )}
                    {this.state.data.length == 0 && !this.state.isLoading && (
                        <View
                            style={{
                                alignSelf: 'center',
                                alignContent: 'center',
                                marginVertical: '50%',
                            }}>
                            <Text
                                style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>
                                No Data :(
                            </Text>
                            <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 15 }}>
                                Why don't you create a new
                                <Text
                                    style={{ color: 'blue' }}
                                    onPress={() => this.props.navigation.replace('createjob')}>
                                    {' '}job
                                </Text>
                                ?
                            </Text>
                        </View>
                    )}
                    <ScrollView>
                        {console.log(this.state.data)}
                        {this.state.data.map((entry, index) => {
                            console.log(entry);
                            console.log('ha?');
                            return this.renderJobData(entry, index, entry.created_at);
                        })}
                    </ScrollView>
                </WingBlank>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    jobs: state.jobs,
    auth: state.auth,
});

const mapActionCreators = {
    getCompanyJobs,
};

export default connect(mapStateToProps, mapActionCreators)(Trabaho);
