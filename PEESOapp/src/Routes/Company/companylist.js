import React, { Component } from 'react';
import {
    Button,
    WhiteSpace,
    WingBlank,
    Modal,
    Card,
    Grid,
    Icon,
    Toast
} from '@ant-design/react-native';
import { View, Text, ScrollView } from 'react-native';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
// import {logout, checkMe} from '../stores/modules/auth';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

const SampleData = [
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
    { company: "ABCD Co. Ltd.", location: "ABC street, Mapa, Western Dabaw, Isla Probinsya, Pinas", category: 'Private', rating: 5, review_count: 20, employees_min: 50, employees_max: 100, shortdesc: "A Company with super class standings", },
]

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    followCompany() {
        Toast.success("Followed Company!")
    }

    renderCompanyData(data, index) {
        return (<Card key={index} style={{ marginTop: 5 }}>
            <Card.Header title={(<>
                <Text style={{ fontWeight: 'bold' }}> {data.company}</Text>
                <Text style={{ fontStyle: 'italic' }}> {data.location}</Text>
            </>
            )} extra={<TouchableOpacity onPress={() => this.followCompany()}><Icon style={{ alignSelf: "flex-end" }} size={30} color="black" name="book"></Icon></TouchableOpacity>} />
            <Card.Body style={{ marginLeft: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("viewCompany")}>
                    <Text>Opening Statement: {data.shortdesc}</Text>
                    <Text>Number of Employees: {data.employees_min} - {data.employees_max} </Text>
                    <Text>Category: {data.category}</Text>
                    <Text>Company Rating: <Rating ratingCount={5} imageSize={12} readonly startingValue={data.rating} fractions={0}> </Rating> </Text>
                    <Text>{data.rating} stars out of {data.review_count} reviews </Text>
                </TouchableOpacity>
            </Card.Body>
        </Card>)
    }

    render() {
        return (<>
            <WingBlank>
                <ScrollView>
                    {SampleData.map((entry, index) => { return (this.renderCompanyData(entry, index)) })}
                </ScrollView>
            </WingBlank>
        </>)
    }

}
export default Company;