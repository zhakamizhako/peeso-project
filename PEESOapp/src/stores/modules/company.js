/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const GET_COMPANY_SUCCESS = 'company/GET_COMPANY_SUCCESS';
export const GET_COMPANY_ERROR = 'company/GET_COMPANY_ERROR';
export const GET_COMPANY_FAIL = 'company/GET_COMPANY_FAIL';

export const FOLLOW_SUCCESS = 'company/FOLLOW_SUCCESS';
export const FOLLOW_ERROR = 'company/FOLLOW_ERROR';
export const FOLLOW_FAIL = 'company/FOLLOW_FAIL';

export const UNFOLLOW_SUCCESS = 'company/UNFOLLOW_SUCCESS';
export const UNFOLLOW_ERROR = 'company/UNFOLLOW_ERROR';
export const UNFOLLOW_FAIL = 'company/UNFOLLOW_FAIL';

export function getCompany(data) {
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
                    type: GET_COMPANY_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_COMPANY_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export const actions = {
    getCompany,
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

actionHandlers[GET_COMPANY_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getCompanySuccess = true;
    newState.getCompanyError = false;
    newState.getCompanyData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_COMPANY_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getCompanySuccess = false;
    newState.getCompanyError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

// actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
//     return initialState;
// };

const initialState = {
    getCompanyError: false,
    getCompanySuccess: false,
    getCompanyData: null,

};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
