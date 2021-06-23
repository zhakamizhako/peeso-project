/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const GET_NOTIFICATIONS_SUCCESS = 'notifications/GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'notifications/GET_NOTIFICATIONS_FAIL';


export function getNotifications() {
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .put(`${hostname}/v1/notifications/`, { query: data }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_NOTIFICATIONS_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_NOTIFICATIONS_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export const actions = {
    getNotifications,
};

const actionHandlers = {};

actionHandlers[GET_NOTIFICATIONS_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getNotificationsSuccess = true;
    newState.getNotificationsError = false;
    newState.jobData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_NOTIFICATIONS_FAIL] = (state, action) => {
    let newState;
    newState.getJobsSuccess = false;

    newState.getJobsError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};


const initialState = {
    getNotificationsError: false,
    getNotificationsSuccess: false,
    getNotificationsData: null,
};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
