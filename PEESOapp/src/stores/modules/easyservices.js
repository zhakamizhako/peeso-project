/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const GET_EASY_SERVICES_SUCCESS = 'easyservices/GET_EASY_SERVICES_SUCCESS';
export const GET_EASY_SERVICES_ERROR = 'easyservices/GET_EASY_SERVICES_ERROR';
export const GET_EASY_SERVICES_FAIL = 'easyservices/GET_EASY_SERVICES_FAIL';

export const GET_AVAILABLE_PERSONNEL_SUCCESS = 'easyservices/GET_AVAILABLE_PERSONNEL_SUCCESS';
export const GET_AVAILABLE_PERSONNEL_ERROR = 'easyservices/GET_AVAILABLE_PERSONNEL_ERROR';
export const GET_AVAILABLE_PERSONNEL_FAIL = 'easyservices/GET_AVAILABLE_PERSONNEL_FAIL';

export const GET_PERSON_DATA_SUCCESS = 'easyservices/GET_PERSON_DATA_SUCCESS';
export const GET_PERSON_DATA_ERROR = 'easyservices/GET_PERSON_DATA_ERROR';
export const GET_PERSON_DATA_FAIL = 'easyservices/GET_PERSON_DATA_FAIL';


export const BOOK_SUCCESS = 'easyservices/BOOK_SUCCESS';
export const BOOK_ERROR = 'easyservices/BOOK_ERROR';
export const BOOK_FAIL = 'easyservices/BOOK_FAIL';

export const UPDATE_PROFILE_PIC_SUCCESS = 'easyservices/UPDATE_PROFILE_PIC_SUCCESS';
export const UPDATE_PROFILE_PIC_ERROR = 'easyservices/UPDATE_PROFILE_PIC_ERROR';
export const UPDATE_PROFILE_PIC_FAIL = 'easyservices/UPDATE_PROFILE_PIC_FAIL';

export const UPDATE_PROFILE_SUCCESS = 'easyservices/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'easyservices/UPDATE_PROFILE_ERROR';
export const UPDATE_PROFILE_FAIL = 'easyservices/UPDATE_PROFILE_FAIL';

export const CLEAR_DATA_PROFILE = 'easyservices/CLEAR_DATA_PROFILE';
import { check } from '../modules/user';

// export const UNBOOK_SUCCESS = 'company/UNBOOK_SUCCESS';
// export const UNBOOK_ERROR = 'company/UNBOOK_ERROR';
// export const UNBOOK_FAIL = 'company/UNBOOK_FAIL';

export function getEasyServices(data) {
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/easyservice/types`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_EASY_SERVICES_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_EASY_SERVICES_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function getPersonData(data) {
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/easyservice/getpersondata/${data}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_PERSON_DATA_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_PERSON_DATA_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function updateProfile(data) {
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .post(`${hostname}/v1/easyservice/updateProfile`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: UPDATE_PROFILE_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function updateProfilePic(data) {
    console.log(data);
    return (dispatch, getState) => {
        let hostname = API_HOST;
        let { accessToken } = getState().auth;
        axios
            .post(`${hostname}/v1/easyservice/updateProfilePic`, data, {
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

export function getAvailablePersonnel(data) {
    // console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/easyservice/getpersonnel`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_AVAILABLE_PERSONNEL_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_AVAILABLE_PERSONNEL_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function clearDataApplication() {
    return async (dispatch) => {
        await dispatch({
            type: CLEAR_DATA_PROFILE,
            meta: {
                done: true,
            },
        });
    };
}

export const actions = {
    getEasyServices,
    getAvailablePersonnel,
};

const actionHandlers = {};

// actionHandlers[LOGOUT_SUCCESS] = () => {
//     return initialState;
// };

// actionHandlers[SET_IP] = (state, action) => {
//   let newState;
//   // console.log(action);
//   newState = objectAssign({}, state);
//   newState.hostname = action.meta.value;
//   return newState;
// };

actionHandlers[GET_EASY_SERVICES_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getEasyServicesSuccess = true;
    newState.getEasyServicesError = false;
    newState.getEasyServicesData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_EASY_SERVICES_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getEasyServicesSuccess = false;
    newState.getEasyServicesError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};


actionHandlers[GET_PERSON_DATA_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getPersonDataSuccess = true;
    newState.getPersonDataError = false;
    newState.getPersonData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_PERSON_DATA_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getPersonDataSuccess = false;
    newState.getPersonDataError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[GET_AVAILABLE_PERSONNEL_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getAvailablePersonnelSuccess = true;
    newState.getAvailablePersonnelError = false;
    newState.getAvailablePersonnelData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_AVAILABLE_PERSONNEL_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getAvailablePersonnelSuccess = false;
    newState.getAvailablePersonnelError = action.payload.error
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

actionHandlers[UPDATE_PROFILE_SUCCESS] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.updateProfileSuccess = true;
    newState.updateProfileError = false;
    return newState;
};

actionHandlers[UPDATE_PROFILE_FAIL] = (state, action, test1, test2) => {
    // console.log('Token check fail');
    let newState;
    newState = objectAssign({}, state);
    newState.updateProfileSuccess = false;
    newState.updateProfileError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[CLEAR_DATA_PROFILE] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.updateProfileSuccess = false;
    newState.updateProfileError = null;
    return newState;
};

// actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
//     return initialState;
// };

const initialState = {
    getEasyServicesError: false,
    getEasyServicesSuccess: false,
    getEasyServicesData: null,

    getAvailablePersonnelSuccess: false,
    getAvailablePersonnelError: null,
    getAvailablePersonnelData: null,

    updateProfileError: null,
    updateProfileSuccess: false,

    getPersonData: null,
    getPersonDataError: null,
    getPersonDataSuccess: false,


};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
