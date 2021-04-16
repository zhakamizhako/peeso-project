import objectAssign from 'object-assign';
import { API_HOST } from '@env'
import axios from 'axios'

export const NEW_JOB_SUCCESS = 'auth/NEW_JOB_SUCCESS';
export const NEW_JOB_ERROR = 'auth/NEW_JOB_ERROR';
export const NEW_JOB_FAIL = 'auth/NEW_JOB_FAIL';

export const UPDATE_JOB_SUCCESS = 'auth/UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_ERROR = 'auth/UPDATE_JOB_ERROR';
export const UPDATE_JOB_FAIL = 'auth/UPDATE_JOB_FAIL';

export const CLOSE_JOB_SUCCESS = 'auth/CLOSE_JOB_SUCCESS';
export const CLOSE_JOB_ERROR = 'auth/CLOSE_JOB_ERROR';
export const CLOSE_JOB_FAIL = 'auth/CLOSE_JOB_FAIL';

export function newJob(data) {
    console.log('::crete Job:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth
        let hostname = API_HOST;
        axios.post(`${hostname}/v1/jobs/save/${data}`, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then(resuults => {
            console.log('status good')
            console.log(resuults)
            dispatch({
                type: SAVE_JOB_SUCCESS,
                payload: resuults.data
            })
        })
            .catch(error => {
                console.log('error')
                console.log(error.response)
                console.log(error.message)
                dispatch({
                    type: SAVE_JOB_FAIL,
                    payload:
                        (error.response ? error.response.data : error)
                })
            })
    };
}


export const actions = {

};

const actionHandlers = {};

actionHandlers[NEW_JOB_SUCCESS] = (state, action) => {
    console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.newJob = true;
    newState.newJobError = false;
    newState.newJobData = action.payload.user
    return newState;
};

actionHandlers[NEW_JOB_FAIL] = (state, action, test1, test2) => {
    console.log('Create Job Fail');
    let newState;
    newState = objectAssign({}, state);
    newState.newJob = false;
    newState.newJobError = action.payload.error ? action.payload.error.message : action.payload.message;
    return newState;
};

const initialState = {
    newJob: false,
    newJobData: [],
    newJobError: false,


};


export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
