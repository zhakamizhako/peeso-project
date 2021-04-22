/* eslint-disable react/jsx-no-duplicate-props */
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
  List,
  InputItem,
  Checkbox,
  Radio,
  DatePicker,
  SegmentedControl,
  Picker,
} from '@ant-design/react-native';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  DynamicColorIOS,
} from 'react-native';
import { connect } from 'react-redux';
import { getBenefits, newJob, clearData } from '../../stores/modules/jobs';
// import Ws from '../Tools/@adonisjs/websocket-client';
import moment from 'moment';
import { now } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
let ws = {};
let wsInstance = {};
var intervalObject = null;

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
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
      location: null,
      lat: null,
      lng: null,
      // benefits: [],
      error: null,
      isLoadingBenefits: false,
      deadline: new Date(),

      isSubmitting: false,
      postSuccess: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoadingBenefits: true });
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
          let { benefits, isLoadingBenefits, categories } = state;

          benefits = this.props.jobs.benefitsData.benefits;
          let b = [];
          this.props.jobs.benefitsData.categories.map((entry) => {
            b.push({ value: entry.id, label: entry.name });
          });
          categories = b;
          isLoadingBenefits = false;
          return { benefits, isLoadingBenefits, categories };
        });
      }
      if (this.props.jobs.getBenefitsError) {
        this.setState({
          error: this.props.jobs.getBenefitsError,
          isLoadingBenefits: false,
        });
      }

      if (this.props.jobs.newJobSuccess) {
        this.props.clearData();
        Modal.alert(
          'Job Pos Success!',
          <Text>
            The admins will review this job entry. We will notify you once it
            has been approved.
          </Text>,
          [
            {
              text: 'Okay',
              onPress: () => this.props.navigation.replace('homepage'),
            },
          ],
        );
      }
    }
  }

  submit() {
    console.log(this.state);
    let data = {
      title: this.state.title,
      job_description: this.state.job_description,
      work_from: this.state.work_from,
      work_to: this.state.work_to,
      highlights: this.state.highlights,
      salary: this.state.salary,
      salary_included_benefits: this.state.salary_included_benefits,
      category: this.state.category[0],
      questions: this.state.questions,
      benefits: this.state.benefits,
      location: this.state.location,
      lat: this.state.lat,
      lng: this.state.lng,
      deadline: this.state.deadline,
    };
    // this.setState({isSubmitting: true});
    this.props.newJob(data);
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
                      let { title } = state;
                      title = val;
                      return { title };
                    })
                  }
                />
              </List.Item>

              <List.Item>
                <Text>Description</Text>
                <TextAreaItem
                  autoHeight
                  value={this.state.job_description}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { job_description } = state;
                      job_description = val;
                      return { job_description };
                    })
                  }
                />
              </List.Item>

              <List.Item>
                <Text>Location</Text>
                <TextAreaItem
                  autoHeight
                  value={this.state.location}
                  onChange={(val) =>
                    this.setState((state) => {
                      let { location } = state;
                      location = val;
                      return { location };
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
                      let { salary } = state;
                      salary = val;
                      return { salary };
                    })
                  }
                />
                <WhiteSpace />
                <Checkbox
                  checked={this.state.salary_included_benefits}
                  onChange={(val) => {
                    this.setState((state) => {
                      let { salary_included_benefits } = state;
                      salary_included_benefits = val.target.checked;
                      return { salary_included_benefits };
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
                            let { benefits } = state;
                            benefits[index].value = val.target.checked;
                            return { benefits };
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
              <List.Item
                extra={
                  <Icon
                    name="plus"
                    onPress={() =>
                      this.setState((state) => {
                        let { highlights } = state;
                        highlights.push({
                          description: null,
                        });
                        return { highlights };
                      })
                    }
                  />
                }>
                Job Highlights
              </List.Item>
              {this.state.highlights != null &&
                this.state.highlights.map((data, index) => (
                  <List.Item
                    extra={
                      <Icon
                        name="delete"
                        onPress={() =>
                          this.setState((state) => {
                            let { highlights } = state;
                            highlights.splice(index, 1);
                            return { highlights };
                          })
                        }
                        color="red"
                      />
                    }
                    key={index}>
                    <Text>Highlight {index + 1}</Text>
                    <InputItem
                      placeholder={'Enter a job highlight' + (index + 1)}
                      value={this.state.highlights[index].description}
                      onChange={(val) =>
                        this.setState((state) => {
                          let { highlights } = state;
                          highlights[index].description = val;
                          return { highlights };
                        })
                      }
                    />
                  </List.Item>
                ))}
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
              {/* <View style={{flex:1, flexDirection:'row'}}> */}
              {this.state.isLoadingBenefits && (
                <ActivityIndicator text="Loading Benefits..." />
              )}
              {/* {!this.state.isLoadingBenefits &&
                this.state.categories &&
                this.state.categories.map((entry, index) => {
                  return (
                    <List.Item>
                      <Radio
                        checked={this.state.category == entry.id}
                        onChange={(val) => {
                          this.setState((state) => {
                            let { category } = state;
                            category = entry.id;
                            return { category };
                          });
                        }}>
                        {entry.name}
                      </Radio>

                    </List.Item>
                  );
                })} */}
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
                  let { deadline } = state;
                  deadline = val;
                  return { deadline };
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
                    let { work_from } = state;
                    work_from = val;
                    return { work_from };
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
                    let { work_to } = state;
                    work_to = val;
                    return { work_to };
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
                        let { questions } = state;
                        questions.push({
                          question: null,
                          type: 0,
                        });
                        return { questions };
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
                            let { questions } = state;
                            questions.splice(index, 1);
                            return { questions };
                          })
                        }
                        color="red"
                      />
                    }
                    key={index}>
                    <Text>Question {index + 1}</Text>
                    <InputItem
                      placeholder={'What, when, where, how?'}
                      value={this.state.questions[index].question}
                      onChange={(val) =>
                        this.setState((state) => {
                          let { questions } = state;
                          questions[index].question = val;
                          return { questions };
                        })
                      }
                    />
                    <SegmentedControl
                      values={['Normal Question', 'Work Authorization']}
                      selectedIndex={this.state.questions[index].type}
                      // onValueChange={(value) => console.log(value)}
                      onChange={(v) => {
                        let bb = v.nativeEvent.selectedSegmentIndex;
                        this.setState((state) => {
                          let { questions } = state;
                          questions[index].type = bb;
                          return { questions };
                        });
                        // console.log(v.nativeEvent.selectedSegmentIndex);
                      }}
                    />
                  </List.Item>
                ))}
            </List>
            <WhiteSpace size="lg" />

            {!this.state.isLoadingBenefits && this.state.error && (
              <Text style={{ color: 'red' }}>{this.state.error}</Text>
            )}
            <Button
              type="primary"
              onPress={() => {
                console.log(this.state);
                Modal.alert(
                  'Have you reviewed your entry?',
                  <View>
                    <Text>
                      Please review this job entry before submitting. Have you
                      reviewed it? Submitting this will notify the admins for
                      this job entry, and will await approval.
                    </Text>
                  </View>,
                  [
                    { text: 'Cancel' },
                    {
                      text: 'Yeah, submit this.',
                      onPress: () => {
                        this.submit();
                      },
                    },
                  ],
                );
              }}>
              {' '}
              Submit
            </Button>
          </ScrollView>
        </WingBlank>

        <Modal transparent visible={this.state.isSubmitting} closable={false}>
          <ActivityIndicator text="Submitting your job entry..." />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const mapActionCreators = {
  getBenefits,
  newJob,
  clearData,
};

export default connect(mapStateToProps, mapActionCreators)(PostJob);
// export default PostJob
