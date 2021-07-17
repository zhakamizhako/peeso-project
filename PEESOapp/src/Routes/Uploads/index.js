import React, {Component, useRef} from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  Modal,
  ActivityIndicator,
  List,
} from '@ant-design/react-native';
import {View, Text, ScrollView, Image} from 'react-native';
import {
  uploadFile,
  getFiles,
  cleanup,
} from '../../stores/modules/uploadmanager';
import {connect} from 'react-redux';
import imageLogo from '../../logo.png';
import {Avatar} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {ScrollViewLimit} from '../homeStyles';
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';

class MyUploads extends Component {
  constructor(props) {
    const temp = {
      file: null,
      uploading: false,
      error: false,
      status: null,
    };
    super(props);
    this.state = {
      data: [],
      isUploading: false,
      uploadingType: null,

      loi: Object.create(temp),
      crbir2303: Object.create(temp),
      bp: Object.create(temp),
      cnpc: Object.create(temp),
      por: Object.create(temp),

      noc: Object.create(temp),
      cajoipoea: Object.create(temp),
      auloa: Object.create(temp),
      arpoea: Object.create(temp),
      drl: Object.create(temp),

      sc: Object.create(temp),
      ec: Object.create(temp),
      jv: Object.create(temp),
    };
    this.menu = [];
  }

  componentDidMount() {
    console.log(this.props.auth);
    this.props.getFiles();
    console.log(this.state);
  }

  componentWillUnmount() {
    this.props.cleanup();
  }

  componentDidUpdate(props) {
    let up = this.props.uploadmanager;
    console.log(this.props);
    if (up != props.uploadmanager) {
      console.log('changes');
      console.log(up);
      if (up.uploadFileError) {
        console.log('error');
        console.log(up);
        this.setState((state) => {
          console.log(this.state);
          // console.log('attempt')
          // console.log(state[`${up.type}`])
          // console.log(up)
          state.isUploading = false;
          // state[`${up.type}`].uploading = false
          state[`${up.type}`].error = up.uploadFileError;

          return state;
        });
      }
      if (up.uploadFileSuccess) {
        console.log(up);
        this.setState((state) => {
          state.isUploading = false;
          state[`${up.type}`].error = false;
          state[`${up.type}`].uploading = false;
          let data = up.fileInstance.data;
          data.file = up.fileInstance.file;
          state[`${up.type}`].file = data;
          // state[`${up.type}`].file =
          return state;
        });
      }
    }
  }

  renderMenu(entry, index, type) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Menu
          key={index}
          ref={(menu) => (this.menu[index] = menu)}
          id={index}
          button={
            <View>
              <Text
                style={{fontSize: 20}}
                onPress={(a) => {
                  this.menu[index].show();
                }}>
                {' '}
                ...{' '}
              </Text>
            </View>
          }>
          <MenuItem>Download</MenuItem>
          <MenuItem
            onPress={() => {
              this.filePicker(type);
            }}>
            Upload
          </MenuItem>
        </Menu>
      </View>
    );
  }

  renderApplicant() {
    return (
      <View>
        <List>
          <List.Item extra={this.renderMenu(null, 1, 'sc')}>
            Skill Certificate
            <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
              <Text>
                {(!this.state.sc.error || !this.state.sc.file) &&
                  'None uploaded'}
              </Text>
              <Text style={{color: '#F00'}}>{this.state.sc.error}</Text>
            </View>
          </List.Item>

          <List.Item extra={this.renderMenu(null, 2, 'ec')}>
            Educational Certificate
            <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
              <Text>
                {!this.state.ec.error && !this.state.ec.file && 'None uploaded'}
              </Text>
              <Text style={{color: '#F00'}}>{this.state.ec.error}</Text>
            </View>
          </List.Item>
          <List.Item extra={this.renderMenu(null, 3, 'jv')}>
            Job / Volunteering Certificate
            <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
              <Text>
                {!this.state.jv.error && !this.state.jv.file && 'None uploaded'}
              </Text>
              <Text style={{color: '#F00'}}>{this.state.jv.error}</Text>
            </View>
          </List.Item>
        </List>
      </View>
    );
  }

  renderFreelancer() {}

  filePicker(type) {
    FilePickerManager.showFilePicker(null, async (response) => {
      console.log('response');
      console.log(response);

      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.error) {
        console.log('picker error');
        console.log(response.error);
      } else {
        this.setState((state) => {
          state.isUploading = true;
          state.uploadingType = type;
          state[`${type}`].uploading = true;

          return state;
          // { isUploading: true, uploadingType: type }
        });
        let data = {};
        data.photo = await RNFetchBlob.fs
          .readFile(`${response.uri}`, 'base64')
          .then((dataX) => {
            console.log('UPLOAD FILE');
            data.type = type;
            data.file = dataX;
            data.fileType = /[.]/.exec(response.fileName)
              ? /[^.]+$/.exec(response.fileName)[0]
              : undefined;

            this.props.uploadFile(data);
          });
        // console.log('good');
        // this.setState({selectedFile: response});
        // console.log(response);
      }
    });
  }

  RenderButtonUpload() {}

  renderCompany() {
    return (
      <View>
        <List>
          <List.Item>Letter of Intent</List.Item>
          {!this.props.auth.loginData.company.is_overseas && (
            <>
              <List.Item>Company Registration BIR 2303</List.Item>
              <List.Item>Business Permit</List.Item>
              <List.Item>Certificate of No Pending Case</List.Item>
              <List.Item>Picture of the Official Receipt</List.Item>
            </>
          )}

          {this.props.auth.loginData.company.is_overseas && (
            <>
              <List.Item>No Objective Certificate (NOC)</List.Item>
              <List.Item>Copy of Approved Job order issued by POEA</List.Item>
              <List.Item>
                Affidavit of undertaking signed by the pres/VP of the company,
                LOA from POEA
              </List.Item>
              <List.Item>Authority to Recruit issued by POEA</List.Item>
              <List.Item>
                Deployment Report of the last SRA conducted in Tagum City
              </List.Item>
            </>
          )}
        </List>
      </View>
    );
  }

  componentWillReceiveProps(props) {}

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (
      <ScrollView style={ScrollViewLimit}>
        <WingBlank>
          {this.props.auth.loginData.applicant && this.renderApplicant()}
          {this.props.auth.loginData.company && this.renderCompany()}
        </WingBlank>

        <Modal transparent visible={this.state.isUploading} closable={false}>
          <ActivityIndicator text="Uploading..."> </ActivityIndicator>
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  uploadmanager: state.uploadmanager,
});

const mapActionCreators = {
  uploadFile,
  getFiles,
  cleanup,
  // login,
};

export default connect(mapStateToProps, mapActionCreators)(MyUploads);

MyUploads.propTypes = {};

// export default MyUploads;
