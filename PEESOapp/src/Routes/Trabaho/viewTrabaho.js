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
    List
} from '@ant-design/react-native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = {
    JobTitle: "Trabaho 1",
    location: "",
    lat: 125.000,
    lng: 5.0000,
    salary: 5000,
    salary_included_benefits: true,
    Highlight: [{ name: 'highlight1' }, { name: 'highlight2' }],
    deadline: now(),
    description: [
        { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit quam ac felis dictum tincidunt. Sed sit amet sem pellentesque, convallis urna eu, lacinia sem. Donec tincidunt urna felis, ut malesuada ipsum pretium sed. Aliquam volutpat enim pulvinar sollicitudin pulvinar. Phasellus varius nisi enim, eu fringilla nisl faucibus vel. Proin efficitur orci a mi sollicitudin, ut ullamcorper lacus posuere. Fusce sit amet nibh sit amet erat scelerisque gravida vitae quis odio. Donec sed lorem a diam dignissim pellentesque. Nulla non elit a neque tincidunt varius ac ut nibh. Morbi sapien est, lobortis nec condimentum eget, sollicitudin quis felis. Curabitur eget pharetra justo, quis auctor lectus. Etiam dictum interdum ligula nec mattis. Duis rutrum placerat tellus, nec tempus libero imperdiet at. Etiam fringilla quis ligula ut pretium." },
        { text: "Curabitur blandit lacus ligula, vel placerat diam vestibulum id. Sed eu quam vestibulum, euismod augue eget, interdum nunc. Nulla sed orci orci. Fusce molestie auctor quam, non tincidunt urna pharetra quis. Sed sed erat erat. Nulla porttitor mi sed molestie rutrum. Nullam ut sapien enim. Vestibulum vel purus sit amet mauris rutrum rutrum." },
        { text: "Pellentesque est nibh, egestas vel pharetra at, rhoncus ac lorem. Maecenas a pharetra velit. Mauris ut dignissim nisl. Fusce ac molestie augue, ac hendrerit massa. Ut malesuada augue ut eros convallis blandit. Nam porttitor pulvinar nisl, et lobortis tortor suscipit id. Donec eu vulputate tortor. Nam varius sagittis bibendum. Phasellus dictum scelerisque justo, ut rhoncus odio efficitur ut. Integer eleifend quam at enim eleifend laoreet. Aliquam molestie iaculis condimentum. Aenean ultrices hendrerit neque nec vehicula. Quisque placerat a dui ac sollicitudin. Morbi semper arcu nec accumsan ornare.        " },
        { text: "Integer condimentum orci libero, vel lobortis quam aliquam dictum. Vestibulum a erat feugiat, ultricies ipsum ac, luctus ligula. Vestibulum egestas tincidunt urna at ullamcorper. Aenean finibus ac purus rhoncus sagittis. Etiam in blandit mauris. Maecenas sodales venenatis condimentum. Praesent commodo tellus in neque volutpat, vel commodo enim aliquet. Etiam eu turpis in eros interdum interdum. Aliquam erat volutpat. Curabitur viverra lectus nec porta ornare. Fusce vehicula leo quis facilisis ullamcorper. Aenean enim tortor, egestas ut pellentesque at, volutpat vehicula turpis. Aenean eu vulputate eros, ac gravida neque. Curabitur neque mi, ullamcorper sed tortor non, tristique tincidunt nunc." }],
    status: 'Verified and hired applicants through P App',
    category: "Private",
    company: {
        name: "ABCD Co. Ltd",
        shortdesc: "A first-class private company of the Province of Davao del Norte."
    },
    benefits: [
        { name: "Pag Ibig" },
        { name: "GSIS" },
        { name: "PhilHealth" },
        { name: "Acapera" }
    ],
    workHours: ["8:00AM", "5:00PM"],

}

class ViewTrabaho extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    saveJob() {
        Toast.success("Job Saved.")
    }

    renderJobData(data) {
        return (<Card style={{ marginTop: 5 }}>
            <Card.Header title={(<>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{data.JobTitle}</Text>
                <Text style={{ fontStyle: 'italic' }}>{data.company.name}</Text>
            </>
            )} extra={<TouchableOpacity onPress={() => this.saveJob()}><Icon style={{ alignSelf: 'flex-end' }} color="black" name="book" size={40}></Icon></TouchableOpacity>} />
            <Card.Body style={{ marginLeft: 10 }}>
                <WhiteSpace size="lg" />
                <Text style={{ fontWeight: "bold" }}>Job Description:</Text>
                <WhiteSpace />
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    {data.description != null && data.description.map(entry => (<><Text style={{ textAlign: 'justify' }}>- {entry.text}</Text><WhiteSpace size="xs" /></>))}
                </View>
                <WhiteSpace />
                <Text style={{ fontWeight: "bold" }}>Work Hours and Benefits</Text>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text>- {data.workHours[0] + "-" + data.workHours[1]}</Text>
                    <Text>- {data.benefits && data.benefits.map(entry => (entry.name + ", "))}</Text>
                </View>
                <WhiteSpace />
                <Text style={{ fontWeight: "bold" }}>Location: {data.location} ???</Text>
                <WhiteSpace />
                <Text style={{ fontWeight: "bold" }}>Expected Salary:</Text>
                <View style={{ marginLeft: 10, marginRight: 10 }}><Text>PHP{data.salary} {data.salary_included_benefits ? "with included benefits" : "without benefits"}</Text></View>
                {/* <Text>Highlight: {data.Highlight != null ? data.Highlight.map(entry => (<Text>{entry}</Text>)) : null}</Text> */}
                {/* <Text>Deadline: {moment(data.deadline)}</Text> */}
                <WhiteSpace />
                <Text style={{ fontWeight: "bold" }}>Company</Text>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <WhiteSpace size="sm" />
                    <Text>{data.company.name}</Text>
                    <WhiteSpace />
                    <Text>{data.company.shortdesc}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('viewCompany')}><Text style={{ fontWeight: 'bold' }}>Tap here for more information</Text></TouchableOpacity>
                </View>
            </Card.Body>
        </Card>)
    }

    render() {
        return (<>
            <WingBlank>
                <ScrollView>
                    {(this.renderJobData(SampleData))}
                    <WhiteSpace size="lg" />
                    <Button onPress={() => this.props.navigation.navigate('apply')}>Apply Here</Button>
                </ScrollView>
            </WingBlank>
        </>)
    }

}
export default ViewTrabaho;