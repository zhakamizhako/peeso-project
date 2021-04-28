import { CALL_API } from 'redux-api-middleware-native';
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';
import { checkMe as check } from './auth';

export const CREATE_ACCOUNT_SUCCESS = 'signup/CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_ERROR = 'signup/CREATE_ACCOUNT_ERROR';
export const CREATE_ACCOUNT_FAIL = 'signup/CREATE_ACCOUNT_FAIL';

export const CREATE_APPLICANT_SUCCESS = 'signup/CREATE_APPLICANT_SUCCESS';
export const CREATE_APPLICANT_ERROR = 'signup/CREATE_APPLICANT_ERROR';
export const CREATE_APPLICANT_FAIL = 'signup/CREATE_APPLICANT_FAIL';

export const CREATE_FREELANCE_EMPLOYER_SUCCESS =
  'signup/CREATE_FREELANCE_EMPLOYER_SUCCESS';
export const CREATE_FREELANCE_EMPLOYER_ERROR =
  'signup/CREATE_FREELANCE_EMPLOYER_ERROR';
export const CREATE_FREELANCE_EMPLOYER_FAIL =
  'signup/CREATE_FREELANCE_EMPLOYER_FAIL';

export const CREATE_COMPANY_SUCCESS = 'signup/CREATE_COMPANY_SUCCESS';
export const CREATE_COMPANY_ERROR = 'signup/CREATE_COMPANY_ERROR';
export const CREATE_COMPANY_FAIL = 'signup/CREATE_COMPANY_FAIL';

export const VERIFY_OTP_SUCCESS = 'signup/VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_ERROR = 'signup/VERIFY_OTP_ERROR';
export const VERIFY_OTP_FAIL = 'signup/VERIFY_OTP_FAIL';

export const NEW_OTP_SUCCESS = 'signup/NEW_OTP_SUCCESS';
export const NEW_OTP_ERROR = 'signup/NEW_OTP_ERROR';
export const NEW_OTP_FAIL = 'signup/NEW_OTP_FAIL';

export const CHECK_ME_SUCCESS = 'signup/CHECK_ME_SUCCESS';
export const CHECK_ME_ERROR = 'signup/CHECK_ME_ERROR';
export const CHECK_ME_FAIL = 'signup/CHECK_ME_FAIL';

export const UPDATE_PROFILE_PIC_SUCCESS = 'signup/UPDATE_PROFILE_PIC_SUCCESS';
export const UPDATE_PROFILE_PIC_ERROR = 'signup/UPDATE_PROFILE_PIC_ERROR';
export const UPDATE_PROFILE_PIC_FAIL = 'signup/UPDATE_PROFILE_PIC_FAIL';

export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

//Create applicant
export function createApplicant(data) {
  console.log('::createApplicant:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/createApplicant`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: CREATE_APPLICANT_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: CREATE_APPLICANT_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function createFreelanceEmployer(data) {
  // console.log('::createApplicant:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/createFreelance`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: CREATE_FREELANCE_EMPLOYER_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: CREATE_FREELANCE_EMPLOYER_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function updateProfilePic(data) {
  console.log('::createApplicant:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    let { accessToken } = getState().auth;
    axios
      .post(`${hostname}/v1/user/updateProfilePic`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: UPDATE_PROFILE_PIC_SUCCESS,
          payload: resuults.data,
        });
        dispatch(check());
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: UPDATE_PROFILE_PIC_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function createCompany(data) {
  console.log('::createCompany:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/createCompany`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: CREATE_COMPANY_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: CREATE_COMPANY_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function createAccount(data) {
  console.log('::createAccount:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/createUser`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        resuults.data.tempPassword = data.password;
        dispatch({
          type: CREATE_ACCOUNT_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error);
        return dispatch({
          type: CREATE_ACCOUNT_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function verifyOTP(data) {
  console.log('::verifyOTP:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/verifyOTP`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: VERIFY_OTP_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function newOTP(data) {
  console.log('::verifyOTP:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_HOST;
    axios
      .post(`${hostname}/v1/user/newOTP`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: NEW_OTP_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: NEW_OTP_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

// export function logout() {
//   return async dispatch => {
//     await dispatch({
//       type: LOGOUT_SUCCESS,
//       meta: {
//         done: true,
//       },
//     });
//   };
// }

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
};

const actionHandlers = {};

// actionHandlers[LOGOUT_SUCCESS] = () => {
//   return initialState;
// };
//Create Account
actionHandlers[CREATE_ACCOUNT_SUCCESS] = (state, action) => {
  console.log('action handler');
  console.log(action);
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountSuccess = true;
  newState.createAccountError = false;
  newState.data = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  newState.tempPassword = action.payload.tempPassword;
  return newState;
};
actionHandlers[CREATE_ACCOUNT_FAIL] = (state, action) => {
  console.log('action failed');
  console.log(action);
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountSuccess = false;
  newState.connectionError = null;
  newState.createAccountError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};
actionHandlers[CREATE_ACCOUNT_ERROR] = (state, action) => {
  console.log('action error');
  console.log(action);
  let newState;
  newState = objectAssign({}, state);
  newState.createAccountError = action.payload.message;
  return newState;
};
//VerifyOTP
actionHandlers[VERIFY_OTP_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.OTPSuccess = true;
  newState.OTPError = false;
  newState.OTPData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};
actionHandlers[VERIFY_OTP_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.OTPSuccess = false;
  newState.connectionError = null;
  newState.OTPError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};
actionHandlers[VERIFY_OTP_ERROR] = (state, action) => {
  console.log('!');
  let newState;
  newState = objectAssign({}, state);
  newState.OTPError = action.payload.message;
  return newState;
};
//Request OTP
actionHandlers[NEW_OTP_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.NewOTPSuccess = true;
  newState.NewOTPError = false;
  newState.NewOTPData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};
actionHandlers[NEW_OTP_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.NewOTPSuccess = false;
  newState.connectionError = null;
  newState.NewOTPError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};
actionHandlers[NEW_OTP_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.NewOTPError = action.payload.message;
  return newState;
};

actionHandlers[CREATE_APPLICANT_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createApplicantSuccess = true;
  newState.createApplicantError = false;
  newState.createApplicantData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};

actionHandlers[CREATE_COMPANY_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createCompanySuccess = true;
  newState.createCompanyError = false;
  newState.createCompanyData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};

actionHandlers[CREATE_APPLICANT_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createApplicantSuccess = false;
  newState.createApplicantError = null;
  newState.createApplicantError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[CREATE_APPLICANT_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createApplicantError = action.payload.message;
  return newState;
};

//ME?
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
  newState.createAccountError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[UPDATE_PROFILE_PIC_SUCCESS] = (state, action) => {
  // console.log('User token check');
  let newState;
  newState = objectAssign({}, state);
  newState.updateProfilePicSuccess = true;
  newState.updateProfilePicError = false;
  return newState;
};

actionHandlers[UPDATE_PROFILE_PIC_FAIL] = (state, action, test1, test2) => {
  // console.log('Token check fail');
  let newState;
  newState = objectAssign({}, state);
  newState.updateProfilePicSuccess = false;
  newState.updateProfilePicError = action.payload.error
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

actionHandlers[CREATE_FREELANCE_EMPLOYER_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createFreelanceEmployerSuccess = true;
  newState.createFreelanceEmployerError = false;
  newState.createFreelanceEmployerData = action.payload.user;
  newState.accessToken = action.payload.accessToken;
  return newState;
};

actionHandlers[CREATE_FREELANCE_EMPLOYER_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.createFreelanceEmployerError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

// actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
//   return initialState;
// };

const initialState = {
  createAccountError: false,
  createAccountSuccess: false,
  createAccountData: null,
  accessToken: null,
  tokenSuccess: false,
  connectionError: false,
  OTPSuccess: false,
  OTPError: false,
  createApplicantError: false,
  createApplicantSuccess: false,
  createApplicantData: null,
  createCompanyError: false,
  createCompanySuccess: false,
  createCompanyData: null,
  createFreelanceEmployerSuccess: false,
  createFreelanceEmployerError: null,
  createFreelanceEmployerData: null,
  data: null,
  tempPassword: null,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
