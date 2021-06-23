import { RSAA } from 'redux-api-middleware-native';
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';
import ToastNice from 'react-native-toast-message';

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';

export const CHECK_ME_SUCCESS = 'auth/CHECK_ME_SUCCESS';
export const CHECK_ME_ERROR = 'auth/CHECK_ME_ERROR';
export const CHECK_ME_FAIL = 'auth/CHECK_ME_FAIL';

export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
// export const SET_IP = 'network/SET_IP';

// export function login(data) {
//   console.log('::LOGIN:::');
//   console.log(this);
//   return (dispatch, getState) => {
//     let hostname = API_HOST
//     return dispatch({
//       [CALL_API]: {
//         endpoint: `${hostname}/v1/accounts/login`,
//         method: 'POST',
//         body: data,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         types: [
//           LOGIN_SUCCESS,
//           LOGIN_FAIL,
//           {
//             type: LOGIN_ERROR,
//             payload: (action, state, payload) => {
//               console.log(payload);
//               return payload;
//             },
//           },
//         ],
//       },
//     });
//   };
// }

export function login(data) {
  console.log('::login:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        if (data.type == 'signup') {
          resuults.type = 'signup';
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function checkMe() {
  console.log('::checkMe:::');
  return (dispatch, getState) => {
    let { accessToken } = getState().auth;
    let hostname = API_HOST;
    console.log(accessToken);
    axios
      .get(`${hostname}/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: CHECK_ME_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        dispatch({
          type: CHECK_ME_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function logout() {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT_SUCCESS,
      meta: {
        done: true,
      },
    });
  };
}

export const actions = {
  login,
  checkMe,
  logout,
};

const actionHandlers = {};

actionHandlers[LOGOUT_SUCCESS] = () => {
  return initialState;
};

// actionHandlers[SET_IP] = (state, action) => {
//   let newState;
//   // console.log(action);
//   newState = objectAssign({}, state);
//   newState.hostname = action.meta.value;
//   return newState;
// };

actionHandlers[LOGIN_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.loginSuccess = true;
  newState.loginError = false;
  newState.loginData = action.payload.userData;
  newState.logoutSuccess = false;
  newState.noAccount = action.payload.noAccount;
  newState.accessToken = action.payload.accessToken;
  return newState;
};

actionHandlers[LOGIN_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.loginSuccess = false;
  newState.loginError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[LOGIN_ERROR] = (state, action) => {
  let newState;
  newState.loginSuccess = false;

  newState.loginError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[CHECK_ME_SUCCESS] = (state, action) => {
  console.log('User token check');
  ToastNice.show({
    text1: 'Welcome back, ' + action.payload.user.profile.first_name,
    text2: 'You have logged back in!',
  });
  let newState;
  newState = objectAssign({}, state);
  newState.tokenCheck = true;
  newState.tokenError = false;
  newState.loginData = action.payload.user;
  return newState;
};

actionHandlers[CHECK_ME_FAIL] = (state, action, test1, test2) => {
  console.log('Token check fail');
  let newState;
  newState = objectAssign({}, state);
  newState.tokenCheck = false;
  newState.tokenError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[CHECK_ME_ERROR] = (state, action) => {
  console.log('Token check error.');
  let newState;
  newState = objectAssign({}, state);
  return newState;
};

actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
  // return initialState;
  let newState = initialState;
  newState.logoutSuccess = true;
  return newState;
  // let newState = objectAssign({}, state)
};

const initialState = {
  loginError: false,
  loginSuccess: false,
  loginData: null,
  accessToken: null,
  tokenSuccess: false,
  tokenError: null,
  logoutSuccess: false,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
