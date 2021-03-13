import { CALL_API } from 'redux-api-middleware-native';
import objectAssign from 'object-assign';
import { API_HOST } from '@env'

export const CREATE_ACCOUNT_SUCCESS = 'auth/CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_ERROR = 'auth/CREATE_ACCOUNT_ERROR';
export const CREATE_ACCOUNT_FAIL = 'auth/CREATE_ACCOUNT_FAIL';

export const CHECK_ME_SUCCESS = 'auth/CHECK_ME_SUCCESS';
export const CHECK_ME_ERROR = 'auth/CHECK_ME_ERROR';
export const CHECK_ME_FAIL = 'auth/CHECK_ME_FAIL';

export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
// export const SET_IP = 'network/SET_IP';

export function createAccount(data) {
  console.log('::createAccount:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    return dispatch({
      [CALL_API]: {
        endpoint: `${hostname}/v1/user/createUser`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
        types: [
          CREATE_ACCOUNT_SUCCESS,
          CREATE_ACCOUNT_FAIL,
          {
            type: CREATE_ACCOUNT_ERROR,
            payload: (action, state, res) => {
              console.log(res)
              return res;
            },
          },
        ],
      },
    });
  };
}


export function logout() {
  return async dispatch => {
    await dispatch({
      type: LOGOUT_SUCCESS,
      meta: {
        done: true,
      },
    });
  };
}

export function checkMe(data) {
  return (dispatch, getState) => {
    let hostname = getState().network.hostname;
    return dispatch({
      [CALL_API]: {
        endpoint: `${hostname}/v1/accounts/me`,
        method: 'GET',
        // body: data,
        headers: {
          Authorization: `Bearer ${data}`,
        },
        types: [
          CHECK_ME_SUCCESS,
          CHECK_ME_FAIL,
          {
            type: CHECK_ME_ERROR,
            payload: (action, state, payload) => {
              console.log(payload);
              return payload;
            },
          },
        ],
      },
    });
  };
}

export const actions = {
  createAccount,
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

actionHandlers[CREATE_ACCOUNT_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountSuccess = true;
  newState.createAccountError = false;
  newState.createAccountData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};

actionHandlers[CREATE_ACCOUNT_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountSuccess = false;
  newState.connectionError = null;
  newState.createAccountError = action.payload.error.message;
  return newState;
};

actionHandlers[CREATE_ACCOUNT_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountError = action.payload.message;
  return newState;
};

actionHandlers[CHECK_ME_SUCCESS] = (state, action) => {
  console.log('User token check');
  let newState;
  newState = objectAssign({}, state);
  newState.tokenCheck = true;
  return newState;
};

actionHandlers[CHECK_ME_FAIL] = (state, action, test1, test2) => {
  console.log('Token check fail');
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountSuccess = false;
  newState.createAccountError = action.payload.error.message;
  return newState;
};

actionHandlers[CHECK_ME_ERROR] = (state, action) => {
  console.log('Token check error.');
  let newState;
  newState = objectAssign({}, state);
  return newState;
};

actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
  return initialState;
};

const initialState = {
  createAccountError: false,
  createAccountSuccess: false,
  createAccountData: null,
  accessToken: null,
  tokenSuccess: false,
  connectionError: false,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
