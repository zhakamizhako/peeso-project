/* eslint-disable react/jsx-no-duplicate-props */
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
  Radio,
  DatePicker,
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
      deadline: new Date(),
      job_description: null,
      work_from: null,
      work_to: null,
      highlights: [],
      salary: null,
      salary_included_benefits: false,
      category: null,
      categories: [],
      benefits: [],
      questions: [],
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
        // this.setState({
        //   benefits: this.props.jobs.benefitsData.benefits,
        //   categories
        //   isLoadingBenefits: false,
        // });
        this.setState((state) => {
          let {benefits, isLoadingBenefits, categories} = state;

          benefits = this.props.jobs.benefitsData.benefits;
          categories = this.props.jobs.benefitsData.categories;
          isLoadingBenefits = false;
          return {benefits, isLoadingBenefits, categories};
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
                <WhiteSpace />
                <Checkbox
                  checked={this.state.salary_included_benefits}
                  onChange={(val) => {
                    this.setState((state) => {
                      let {salary_included_benefits} = state;
                      salary_included_benefits = val.target.checked;
                      return {salary_included_benefits};
                    });
                  }}>
                  Does salary include benefits?
                </Checkbox>
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
                    <List.Item>
                      <Checkbox
                        checked={this.state.benefits[index].value}
                        onChange={(val) => {
                          this.setState((state) => {
                            let {benefits} = state;
                            benefits[index].value = val.target.checked;
                            return {benefits};
                          });
                        }}>
                        {entry.name}
                      </Checkbox>
                    </List.Item>
                  );
                })}
              {/* </View> */}
            </List.Item>
            <WhiteSpace size="lg" />

            <List>
              <List.Item>Select a Category</List.Item>
              {/* <View style={{flex:1, flexDirection:'row'}}> */}
              {this.state.isLoadingBenefits && (
                <ActivityIndicator text="Loading Benefits..." />
              )}
              {!this.state.isLoadingBenefits &&
                this.state.categories &&
                this.state.categories.map((entry, index) => {
                  return (
                    <List.Item>
                      <Radio
                        checked={this.state.category == entry.id}
                        onChange={(val) => {
                          this.setState((state) => {
                            let {category} = state;
                            category = entry.id;
                            return {category};
                          });
                        }}>
                        {entry.name}
                      </Radio>
                      {/* <WhiteSpace/> */}
                    </List.Item>
                  );
                })}
              {/* </View> */}
            </List>
            <WhiteSpace size="lg" />

            <DatePicker
              mode="date"
              defaultDate={new Date()}
              minDate={new Date()}
              // maxDate={new Date()}
              onChange={this.onChange}
              format="YYYY-MM-DD"
              value={this.state.deadline}
              onChange={(val) =>
                this.setState((state) => {
                  let {deadline} = state;
                  deadline = val;
                  return {deadline};
                })
              }>
              <List.Item>
                <Text>Deadline</Text>
              </List.Item>
            </DatePicker>

            {/* <Text>Work Hours</Text>
             */}
            <WhiteSpace />
            <List>
              <List.Item>Work Hours</List.Item>
              <DatePicker
                mode="time"
                defaultDate={new Date()}
                // minDate={new Date()}
                // maxDate={new Date()}
                onChange={this.onChange}
                format="HH:mm"
                value={this.state.work_from}
                onChange={(val) =>
                  this.setState((state) => {
                    let {work_from} = state;
                    work_from = val;
                    return {work_from};
                  })
                }>
                <List.Item>
                  <Text>From</Text>
                </List.Item>
              </DatePicker>

              <DatePicker
                mode="time"
                defaultDate={new Date()}
                // minDate={new Date()}
                // maxDate={new Date()}
                onChange={this.onChange}
                format="HH:mm"
                value={this.state.work_to}
                onChange={(val) =>
                  this.setState((state) => {
                    let {work_to} = state;
                    work_to = val;
                    return {work_to};
                  })
                }>
                <List.Item>
                  <Text>To</Text>
                </List.Item>
              </DatePicker>
            </List>
            <WhiteSpace />

            <List>
              <List.Item
                extra={
                  <Icon
                    name="plus"
                    onPress={() =>
                      this.setState((state) => {
                        let {questions} = state;
                        questions.push({
                          question: 'University',
                          type: 0,
                        });
                        return {questions};
                      })
                    }
                  />
                }>
                Additional Questions
              </List.Item>
              {this.state.questions != null &&
                this.state.questions.map((data, index) => (
                  <List.Item
                    extra={
                      <Icon
                        name="delete"
                        onPress={() =>
                          this.setState((state) => {
                            let {questions} = state;
                            questions.splice(index, 1);
                            return {questions};
                          })
                        }
                        color="red"
                      />
                    }
                    key={index}>
                    <Text>Question {index + 1}</Text>
                    <InputItem
                      value={this.state.questions[index].question}
                      onChange={(val) =>
                        this.setState((state) => {
                          let {questions} = state;
                          questions[index].question = val;
                          return {questions};
                        })
                      }
                    />
                  </List.Item>
                ))}
            </List>
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
