import { combineReducers } from 'redux';
import auth from './modules/auth';
import user from './modules/user';
import jobs from './modules/jobs';
import company from './modules/company';
import easyservices from './modules/easyservices';
import notifications from './modules/notification'
import uploadmanager from './modules/uploadmanager'
// import users from './modules/usermanagement';
export default combineReducers({
  auth: auth,
  user: user,
  jobs: jobs,
  company: company,
  easyservices: easyservices,
  notifications: notifications,
  uploadmanager: uploadmanager
});
