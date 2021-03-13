import { combineReducers } from 'redux';
import auth from './modules/auth';
import user from './modules/user'
// import users from './modules/usermanagement';
export default combineReducers({
  auth: auth,
  user: user,
});
