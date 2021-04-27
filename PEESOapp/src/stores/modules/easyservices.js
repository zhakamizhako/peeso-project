/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const GET_EASY_SERVICES_SUCCESS = 'company/GET_EASY_SERVICES_SUCCESS';
export const GET_EASY_SERVICES_ERROR = 'company/GET_EASY_SERVICES_ERROR';
export const GET_EASY_SERVICES_FAIL = 'company/GET_EASY_SERVICES_FAIL';

export const GET_AVAILABLE_PERSONNEL_SUCCESS = 'company/GET_AVAILABLE_PERSONNEL_SUCCESS';
export const GET_AVAILABLE_PERSONNEL_ERROR = 'company/GET_AVAILABLE_PERSONNEL_ERROR';
export const GET_AVAILABLE_PERSONNEL_FAIL = 'company/GET_AVAILABLE_PERSONNEL_FAIL';

export const BOOK_SUCCESS = 'company/BOOK_SUCCESS';
export const BOOK_ERROR = 'company/BOOK_ERROR';
export const BOOK_FAIL = 'company/BOOK_FAIL';

// export const UNBOOK_SUCCESS = 'company/UNBOOK_SUCCESS';
// export const UNBOOK_ERROR = 'company/UNBOOK_ERROR';
// export const UNBOOK_FAIL = 'company/UNBOOK_FAIL';

export function getEasyServices(data) {
    console.log('::login:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/companies/${data}`, {
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

export function getAvailablePersonnel(data) {
    console.log('::login:::');
    // console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/companies`, {
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

export function editCompany(data) {
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/companies`, {
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

export const actions = {
    getEasyServices,
    getEasyServices,
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

};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
