import {combineReducers} from 'redux';
import auth from './modules/auth';
// import users from './modules/usermanagement';
export default combineReducers({
  auth: auth,
//   users: users,
});
