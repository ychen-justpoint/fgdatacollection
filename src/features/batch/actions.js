import {
    gotBatches as gotAction,
    processingBatch as processingAction,
    processingBatchFailed as failedAction,
    addedBatch as addedAction,
    updatedBatch as updatedAction,
    deletedBatch as deletedAction,
    updateSearchstate as searchAction
} from './slice';

import {
    initBatchFileState as initBatchFileStateAction
} from '../batchfile/slice'

import {
    initBatchDataState as initBatchDataStateAction
} from '../batchdata/slice'

import {
    initBatchActivityState as initBatchActivityStateAction
} from '../batchactivity/slice'

import {
    initBatchMessageState as initBatchMessageStateAction
} from '../batchmessage/slice'

import { fetchStreamsIfNotBusy } from '../stream/actions';

import { accessToken as accessTokenCommon } from '../../common';
export const accessToken = accessTokenCommon

const resourceUrl = process.env.REACT_APP_API + 'api/batches/';
const odataResourceUrl = process.env.REACT_APP_API + 'odata/batches/';

// const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + process.env.ACCESS_TOKEN});

//const myHeaders = new Headers({ "Content-Type": "application/json"});

const ifNotBusy = (state) => {
    return !state.isbusy;
}

const myState = (state) => { return state.batch }

const returnQueryUrl = (data) => {

    let queryUrl = null;

    let filter = null;

    if (data.hasOwnProperty('status') && data['status'] !== undefined && data['status'] !== null && data['status'].length > 0) {
        filter = '$filter=contains(status,\'' + encodeURIComponent(data['status']) + '\')';
    }

    if (data.hasOwnProperty('streamid') && data['streamid'] !== undefined && data['streamid'] !== null && data['streamid'].length > 0) {

        if (filter) {
            filter = filter + ' and streamid eq ' + encodeURIComponent(data['streamid']) + ''
        }
        else
            filter = '$filter=streamid eq ' + encodeURIComponent(data['streamid']) + '';
    }

    if (data.hasOwnProperty('sourceid') && data['sourceid'] !== undefined && data['sourceid'] !== null && data['sourceid'].length > 0) {

        if (filter) {
            filter = filter + ' and sourceid eq ' + encodeURIComponent(data['sourceid']) + ''
        }
        else
            filter = '$filter=sourceid eq ' + encodeURIComponent(data['sourceid']) + '';
    }

    if (filter) {
        queryUrl = '?' + filter;
    }

    let top = null;

    if (data.hasOwnProperty('itemperpage') && data['itemperpage'] !== undefined) {
        top = '$top=' + encodeURIComponent(data['itemperpage'])
    }

    if (queryUrl)
        queryUrl = queryUrl + '&' + top
    else
        queryUrl = '?' + top;

    let skip = null;

    if (data.hasOwnProperty('currentpage') && data['currentpage'] !== undefined) {
        if (data.hasOwnProperty('itemperpage') && data['itemperpage'] !== undefined) {
            let offset = 0
            if (data['currentpage'] > 0) {
                offset = data['itemperpage'] * (data['currentpage'] - 1)
                skip = '$skip=' + offset
            }

        }
    }

    if (queryUrl)
        queryUrl = queryUrl + '&' + skip
    else
        queryUrl = '?' + skip;

    let orderby = null;

    if (data.hasOwnProperty('sortby') && data['sortby'] !== undefined) {
        orderby = '$orderby=' + encodeURIComponent(data['sortby']);
        if (data.hasOwnProperty('sortorder') && data['sortorder'] !== undefined) {

            if (data['sortorder'] === 'ascend') {

                orderby = orderby + ' asc';
            }
            else {
                orderby = orderby + ' desc';
            }
        }
    }

    if (queryUrl)
        queryUrl = queryUrl + '&' + orderby
    else
        queryUrl = '?' + orderby;


    if (queryUrl)
        queryUrl = queryUrl + '&' + '$count=true'
    else
        queryUrl = '?' + '$count=true';

    return queryUrl
}

const fetchObjects = (data) => dispatch => {

    dispatch(processingAction())

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    }

    let finalUrl = odataResourceUrl;

    let queryUrl = returnQueryUrl(data);

    if (queryUrl != null) {
        finalUrl = odataResourceUrl + queryUrl
    }

    return fetch(finalUrl, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => {
                dispatch(gotAction(json));
                dispatch(fetchStreamsIfNotBusy());
                dispatch(initBatchFileStateAction({ batches: json.value }));
                dispatch(initBatchDataStateAction({ batches: json.value }));
                dispatch(initBatchActivityStateAction({ batches: json.value }));
                dispatch(initBatchMessageStateAction({ batches: json.value }));

            }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )

}


export const fetchBatchesIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        if (data === undefined || data === null) {
            // let newSearch ={...state.search,numberofsearch:state.search.numberofsearch+1}
            return dispatch(fetchObjects(state.search))
        }
        return dispatch(fetchObjects(data))
    }
}

const uploadFile = (data) => dispatch => {

    dispatch(processingAction())

    if (data === undefined || !data)
        throw new Error('update missing data');

    let url = resourceUrl + data.record.id + '/files'

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const body = JSON.stringify(data);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    }

    return fetch(url, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(addedAction(json)); dispatch(fetchBatchesIfNotBusy()) }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )

}

const insertObject = (data) => dispatch => {

    dispatch(processingAction())

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const body = JSON.stringify(data);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    }

    return fetch(resourceUrl, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(addedAction(json)); dispatch(fetchBatchesIfNotBusy()) }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )

}

const updateObject = (data) => dispatch => {

    dispatch(processingAction())


    if (data === undefined || !data)
        throw new Error('update missing data');

    let url = resourceUrl + data.id + '/'

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const body = JSON.stringify(data);

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    }

    return fetch(url, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(updatedAction(json)); dispatch(fetchBatchesIfNotBusy()) }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )
}

export const upsertBatchIfNotBusy = (insert, data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        if (insert)
            return dispatch(insertObject(data))
        else
            return dispatch(updateObject(data))
    }
}

const deleteObject = (data) => dispatch => {

    dispatch(processingAction())

    if (data === undefined || !data)
        throw new Error('update missing data');

    let url = resourceUrl + data.id + '/'

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    }

    return fetch(url, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            }
            else {
                dispatch(deletedAction(data)); dispatch(fetchBatchesIfNotBusy());
            }
        })
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )
}



export const deleteBatchIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(deleteObject(data))
    }
}

const validateBatch = (data) => dispatch => {

    dispatch(processingAction())

    let url = resourceUrl + data.id + '/validate'

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    }

    return fetch(url, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            }
            else {
                dispatch(updatedAction()); dispatch(fetchBatchesIfNotBusy());
            }
        })
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )
}

export const validateBatchIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(validateBatch(data))
    }
}

const collectBatch = (data) => dispatch => {

    dispatch(processingAction())

    let url = resourceUrl + data.id + '/collect'

    const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    }

    return fetch(url, requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => {
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction(error.message)); }
                )
            }
            else {
                dispatch(updatedAction()); dispatch(fetchBatchesIfNotBusy());
            }
        })
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )
}

export const collectBatchIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(collectBatch(data))
    }
}

export const updateSearchstateIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(searchAction(data))
    }
}

export const uploadFileIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(uploadFile(data));
    }
}
