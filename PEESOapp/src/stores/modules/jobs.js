/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const GET_JOBS_SUCCESS = 'jobs/GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'jobs/GET_JOBS_ERROR';
export const GET_JOBS_FAIL = 'jobs/GET_JOBS_FAIL';

export const GET_JOB_DATA_SUCCESS = 'jobs/GET_JOB_DATA_SUCCESS';
export const GET_JOB_DATA_ERROR = 'jobs/GET_JOB_DATA_ERROR';
export const GET_JOB_DATA_FAIL = 'jobs/GET_JOB_DATA_FAIL';

export const NEW_APPLICATION_SUCCESS = 'jobs/NEW_APPLICATION_SUCCESS'; //GET APPLICATIO NQUESTIONS
export const NEW_APPLICATION_ERROR = 'jobs/NEW_APPLICATION_ERROR';
export const NEW_APPLICATION_FAIL = 'jobs/NEW_APPLICATION_FAIL';

export const NEW_JOB_SUCCESS = 'jobs/NEW_JOB_SUCCESS';
export const NEW_JOB_ERROR = 'jobs/NEW_JOB_ERROR';
export const NEW_JOB_FAIL = 'jobs/NEW_JOB_FAIL';

export const APPLY_JOB_SUCCESS = 'jobs/APPLY_JOB_SUCCESS';
export const APPLY_JOB_ERROR = 'jobs/APPLY_JOB_ERROR';
export const APPLY_JOB_FAIL = 'jobs/APPLY_JOB_FAIL';

export const SAVE_JOB_SUCCESS = 'jobs/SAVE_JOB_SUCCESS';
export const SAVE_JOB_ERROR = 'jobs/SAVE_JOB_ERROR';
export const SAVE_JOB_FAIL = 'jobs/SAVE_JOB_FAIL';

export const UNSAVE_JOB_SUCCESS = 'jobs/UNSAVE_JOB_SUCCESS';
export const UNSAVE_JOB_ERROR = 'jobs/UNSAVE_JOB_ERROR';
export const UNSAVE_JOB_FAIL = 'jobs/UNSAVE_JOB_FAIL';

export const GET_SAVED_JOBS_SUCCESS = 'jobs/GET_SAVED_JOBS_SUCCESS';
export const GET_SAVED_JOBS_ERROR = 'jobs/GET_SAVED_JOBS_ERROR';
export const GET_SAVED_JOBS_FAIL = 'jobs/GET_SAVED_JOBS_FAIL';

export const GET_BENEFITS_SUCCESS = 'jobs/GET_BENEFITS_SUCCESS';
export const GET_BENEFITS_ERROR = 'jobs/GET_BENEFITS_ERROR';
export const GET_BENEFITS_FAIL = 'jobs/GET_BENEFITS_FAIL';

// export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export const CLEAR_DATA = 'jobs/CLEAR_DATA';

export function getJobData(data) {
    console.log('::getJboData:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/jobs/${data}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_JOB_DATA_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_JOB_DATA_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function getJobs(data) {
    // console.log('::login:::')
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/jobs`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_JOBS_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_JOBS_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function saveJob(data) {
    console.log('::saveJob:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .post(`${hostname}/v1/jobs/save/${data}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: SAVE_JOB_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: SAVE_JOB_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function applyJob(data) {
    console.log('::applyjob:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .post(`${hostname}/v1/jobs/apply/${data}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: APPLY_JOB_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: APPLY_JOB_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}


export function newJob(data) {
    console.log('::newJob:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .post(`${hostname}/v1/jobs/new`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: NEW_JOB_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: NEW_JOB_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function getBenefits() {
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/jobs/getBenefits`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_BENEFITS_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_BENEFITS_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function newApplication(data) {
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/jobs/getInfo/${data}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: NEW_APPLICATION_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: NEW_APPLICATION_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function unsavejob(data) {
    console.log('::unsavejob:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .post(`${hostname}/v1/jobs/unsave/${data}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: UNSAVE_JOB_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: UNSAVE_JOB_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function getSavedJobs(data) {
    console.log('::getSavedJobs:::');
    console.log(data);
    return (dispatch, getState) => {
        let { accessToken } = getState().auth;
        let hostname = API_HOST;
        axios
            .get(`${hostname}/v1/jobs/getsaved`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_SAVED_JOBS_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                console.log(error.message);
                dispatch({
                    type: GET_SAVED_JOBS_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}
export function clearData() {
    return async (dispatch) => {
        await dispatch({
            type: CLEAR_DATA,
            meta: {
                done: true,
            },
        });
    };
}

export const actions = {
    getJobs,
    saveJob,
    unsavejob,
    getSavedJobs,
    clearData,
    newApplication,
    applyJob,
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

actionHandlers[GET_JOBS_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobsSuccess = true;
    newState.getJobsError = false;
    newState.getJobsData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_JOBS_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobsSuccess = false;
    newState.getJobsError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

//
actionHandlers[NEW_APPLICATION_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobApplicationInfoSuccess = true;
    newState.getJobApplicationInfoError = false;
    newState.getJobApplicationInfoData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[NEW_APPLICATION_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobApplicationInfoSuccess = false;
    newState.getJobApplicationInfoError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};
//

actionHandlers[GET_JOB_DATA_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobDataSuccess = true;
    newState.getJobDataError = false;
    newState.jobData = action.payload.data;
    newState.accessToken = action.payload.accessToken;
    return newState;
};

actionHandlers[GET_JOB_DATA_FAIL] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getJobDataSuccess = false;
    newState.getJobDataError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[GET_JOBS_ERROR] = (state, action) => {
    let newState;
    newState.getJobsSuccess = false;

    newState.getJobsError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[NEW_JOB_SUCCESS] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.newJob = true;
    newState.newJobError = false;
    newState.newJobData = action.payload.user;
    return newState;
};

actionHandlers[NEW_JOB_FAIL] = (state, action, test1, test2) => {
    console.log('Create Job Fail');
    let newState;
    newState = objectAssign({}, state);
    newState.newJob = false;
    newState.newJobError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[SAVE_JOB_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.saveJob = true;
    return newState;
};

actionHandlers[SAVE_JOB_FAIL] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.saveJob = false;
    newState.saveJobError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[APPLY_JOB_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.applyJobSuccess = true;
    return newState;
};

actionHandlers[APPLY_JOB_FAIL] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.applyJobSuccess = false;
    newState.applyJobError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[GET_BENEFITS_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getBenefitsSuccess = true;
    newState.getBenefitsError = false;
    newState.benefitsData = action.payload.data;
    return newState;
};

actionHandlers[GET_BENEFITS_FAIL] = (state, action) => {
    console.log('getBenefits Error');
    let newState;
    newState = objectAssign({}, state);
    newState.getBenefits = false;
    newState.getBenefitsError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[GET_SAVED_JOBS_SUCCESS] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.getSavedJobs = true;
    newState.getSavedJobsError = false;
    newState.getSavedJobsData = action.payload.data;
    return newState;
};

actionHandlers[GET_SAVED_JOBS_FAIL] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.getSavedJobs = false;
    newState.getSavedJobsError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[NEW_JOB_ERROR] = (state, action) => {
    // console.log('Token check error.');
    let newState;
    newState = objectAssign({}, state);
    return newState;
};

actionHandlers[CLEAR_DATA] = (state, action) => {
    return initialState;
};

const initialState = {
    getJobsError: false,
    getJobsSuccess: false,
    getJobsData: null,

    getJobError: false,
    getJobSuccess: false,
    getJobData: null,

    getSavedJobs: false,
    getSavedJobsData: [],
    getSavedJobsError: false,

    saveJob: false,
    saveJobError: null,

    benefitsData: [],
    getBenefitsSuccess: false,
    getBenefitsError: null,

    getJobDataSuccess: false,
    getJobDataError: null,

    getJobApplicationInfoSuccess: false,
    getJobApplicationInfoError: null,
    getJobApplicationInfoData: null,

    applyJobError: null,
    applyJobSuccess: false,

};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
