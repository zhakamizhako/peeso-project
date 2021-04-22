import { combineReducers } from 'redux';
import auth from './modules/auth';
import user from './modules/user';
import jobs from './modules/jobs';
import company from './modules/company';
// import users from './modules/usermanagement';
export default combineReducers({
  auth: auth,
  user: user,
  jobs: jobs,
  company: company,
});
