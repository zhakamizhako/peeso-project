/* eslint-disable prettier/prettier */
import objectAssign from 'object-assign';
import { API_HOST } from '@env';
import axios from 'axios';

export const SET_TYPE = "uploadmanager/SET_TYPE"

export const UPLOAD_FILE_SUCCESS =
    'uploadmanage/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_ERROR = 'uploadmanage/UPLOAD_FILE_ERROR';
export const UPLOAD_FILE_FAIL = 'uploadmanage/UPLOAD_FILE_FAIL';

export const GET_FILES_SUCCESS =
    'uploadmanage/GET_FILES_SUCCESS';
export const GET_FILES_ERROR = 'uploadmanage/GET_FILES_ERROR';
export const GET_FILES_FAIL = 'uploadmanage/GET_FILES_FAIL';

export const CLEAN_UP = "uploadmanage/cleanup"

export function uploadFile(data) {
    console.log(data);
    return (dispatch, getState) => {
        let hostname = API_HOST;
        let { accessToken } = getState().auth;

        dispatch(setType(data.type))
        axios
            .post(`${hostname}/v1/user/upload`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: UPLOAD_FILE_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                dispatch({
                    type: UPLOAD_FILE_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}

export function setType(data) {
    return async (dispatch) => {
        await dispatch({
            type: SET_TYPE,
            meta: {
                type: data
            }
        })
    }
}

export function cleanup() {
    return async (dispatch) => {
        await dispatch({
            type: CLEAN_UP,
        })
    }
}


export function getFiles(data) {
    console.log(data);
    return (dispatch, getState) => {
        let hostname = API_HOST;
        let { accessToken } = getState().auth;
        axios
            .get(`${hostname}/v1/user/files`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((resuults) => {
                console.log('status good');
                console.log(resuults);
                dispatch({
                    type: GET_FILES_SUCCESS,
                    payload: resuults.data,
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.response);
                dispatch({
                    type: GET_FILES_FAIL,
                    payload: error.response ? error.response.data : error,
                });
            });
    };
}


export const actions = {
    getFiles, uploadFile,
};

const actionHandlers = {};

actionHandlers[UPLOAD_FILE_SUCCESS] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.uploadFileSuccess = true;
    newState.uploadFileError = false;
    newState.fileInstance = action.payload
    return newState;
};

actionHandlers[UPLOAD_FILE_FAIL] = (state, action, test1, test2) => {
    // console.log('Token check fail');
    let newState;
    newState = objectAssign({}, state);
    newState.uploadFileSuccess = false;
    newState.uploadFileError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

actionHandlers[SET_TYPE] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    console.log('ayayaya')
    console.log(action)
    newState.type = action.meta.type
    return newState;
};

actionHandlers[CLEAN_UP] = (state, action) => {
    // console.log('User token check');
    return initialState;
};

actionHandlers[GET_FILES_SUCCESS] = (state, action) => {
    // console.log('User token check');
    let newState;
    newState = objectAssign({}, state);
    newState.getFilesSuccess = true;
    newState.getFilesError = false;
    return newState;
};

actionHandlers[GET_FILES_FAIL] = (state, action, test1, test2) => {
    // console.log('Token check fail');
    let newState;
    newState = objectAssign({}, state);
    newState.getFilesSuccess = false;
    newState.getFilesError = action.payload.error
        ? action.payload.error.message
        : action.payload.message;
    return newState;
};

const initialState = {
    getFilesError: null,
    getFilesSuccess: false,
    uploadFileSuccess: false,
    uploadFileError: null,

    type: null,
};

export default function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type];

    return handler ? handler(state, action) : state;
}
