import React, {Component} from 'react';
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
} from '@ant-design/react-native';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {getBenefits} from '../../stores/modules/jobs';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import {now} from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      deadline: null,
      job_description: null,
      work_from: null,
      work_to: null,
      highlights: [],
      salary: null,
      salary_included_benefits: false,
      category: null,
      benefits: [],
      // benefits: [],
      error: null,
      isLoadingBenefits: false,
    };
  }

  componentDidMount() {
    this.setState({isLoadingBenefits: true});
    this.props.getBenefits();
  }

  componentDidUpdate(prevProps) {
    if (this.props.jobs != prevProps.jobs) {
      if (this.props.jobs.benefitsData) {
        this.setState({
          benefits: this.props.jobs.benefitsData,
          isLoadingBenefits: false,
        });
        this.setState((state) => {
          let {benefits, isLoadingBenefits} = state;

          benefits = this.props.jobs.benefitsData;
          isLoadingBenefits = false;
          return {benefits, isLoadingBenefits};
        });
      }
      if (this.props.jobs.getBenefitsError) {
        this.setState({
          error: this.props.jobs.getBenefitsError,
          isLoadingBenefits: false,
        });
      }
    }
  }

  save(data) {
    this.props.saveJob(data);
  }

  render() {
    return (
      <>
        <WingBlank>
          <ScrollView>
            <Text>Create a job thingy</Text>
            <List>
              <List.Item>
                <Text>Job Title</Text>
                <TextAreaItem
                  autoHeight
                  value={this.state.title}
                  onChange={(val) =>
                    this.setState((state) => {
                      let {title} = state;
                      title = val;
                      return {title};
                    })
                  }
                />
              </List.Item>

              <List.Item>
                <Text>Description</Text>
                <TextAreaItem
                  autoHeight
                  value={this.state.description}
                  onChange={(val) =>
                    this.setState((state) => {
                      let {description} = state;
                      description = val;
                      return {description};
                    })
                  }
                />
              </List.Item>

              <List.Item>
                <Text>Salary</Text>
                <InputItem
                  value={this.state.salary}
                  onChange={(val) =>
                    this.setState((state) => {
                      let {salary} = state;
                      salary = val;
                      return {salary};
                    })
                  }
                />
              </List.Item>

              <List.Item>
                <Text>Category</Text>
                <InputItem
                  value={this.state.salary}
                  onChange={(val) =>
                    this.setState((state) => {
                      let {salary} = state;
                      salary = val;
                      return {salary};
                    })
                  }
                />
              </List.Item>
            </List>

            <List.Item>
              <Text>Benefits</Text>
              {/* <View style={{flex:1, flexDirection:'row'}}> */}
              {this.state.isLoadingBenefits && (
                <ActivityIndicator text="Loading Benefits..." />
              )}
              {!this.state.isLoadingBenefits &&
                this.state.benefits &&
                this.state.benefits.map((entry, index) => {
                  return (
                    <Checkbox
                      checked={this.state.benefits[index].value}
                      onChange={(val) => {
                        this.setState((state) => {
                          let {benefits} = state;
                          benefits[index].value = val;
                          return {benefits};
                        });
                      }}>
                      {entry.name}
                    </Checkbox>
                  );
                })}
              {/* </View> */}
            </List.Item>
            <WhiteSpace size="lg" />
            {!this.state.isLoadingBenefits && this.state.error && (
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            )}
            <Button onPress={() => console.log(this.state)}> Test</Button>
          </ScrollView>
        </WingBlank>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const mapActionCreators = {
  getBenefits,
};

export default connect(mapStateToProps, mapActionCreators)(PostJob);
// export default PostJob
