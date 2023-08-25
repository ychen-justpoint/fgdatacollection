import {
    gotBatchMessages as gotAction,
    processingBatchMessage as processingAction,
    processingBatchMessageFailed  as failedAction,
    addedBatchMessage as addedAction,
    updatedBatchMessage as updatedAction,
    deletedBatchMessage as deletedAction,
    updateBatchMessageSearchstate as searchAction,
    initBatchMessageState as initBatchMessageStateAction
} from './slice';

//import { fetchStreamsIfNotBusy } from '../stream/actions';

import { accessToken as accessTokenCommon, batchId as batchIdCommon } from '../../common';

export const accessToken = accessTokenCommon

export const batchIdAccessor = batchIdCommon

const resourceUrl = process.env.REACT_APP_API + 'api/messages/';
const odataResourceUrl = process.env.REACT_APP_API + 'odata/messages/';

//const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + process.env.ACCESS_TOKEN});

// const myHeaders = new Headers({ "Content-Type": "application/json"});

const ifNotBusy = (state) => {
    return !state.isbusy;
}

const myState = (state) => { return  state.batchmessage[batchIdCommon.getBatchId()]}

const returnQueryUrl = (data) => {

    let queryUrl = null;

    let filter = null;

    if (data.hasOwnProperty('messagetypeid') && data['messagetypeid'] !== undefined && data['messagetypeid'] !== null && data['messagetypeid'].length > 0) {

        if (filter){
            filter = filter +  ' and messagetypeid eq ' + encodeURIComponent(data['messagetypeid']) + ''
        }
        else
            filter = '$filter=messagetypeid eq ' + encodeURIComponent(data['messagetypeid']) + '' ;
    }

    if (data.hasOwnProperty('batchid') && data['batchid'] !== undefined && data['batchid'] !== null && data['batchid'].length > 0) {

        if (filter){
            filter = filter +  ' and batchid eq ' + encodeURIComponent(data['batchid']) + ''
        }
        else
            filter = '$filter=batchid eq ' + encodeURIComponent(data['batchid']) + '' ;
    }

    if (data.hasOwnProperty('jsondataid') && data['jsondataid'] !== undefined && data['jsondataid'] !== null && data['jsondataid'].length > 0) {

        if (filter){
            filter = filter +  ' and jsondataid eq ' + encodeURIComponent(data['jsondataid']) + ''
        }
        else
            filter = '$filter=jsondataid eq ' + encodeURIComponent(data['jsondataid']) + '' ;
    }

    if (data.hasOwnProperty('keyword') && data['keyword'] !== undefined && data['keyword'] !== null && data['keyword'].length > 0) {

        if (filter){
            filter = filter +  ' and contains(message1,\'' + encodeURIComponent(data['keyword']) + '\')';
        }
        else
            filter = '$filter=contains(message1,\'' + encodeURIComponent(data['keyword']) + '\')';

    }


    if(filter){
        queryUrl='?'+filter;
    }

    let top = null;

    if (data.hasOwnProperty('itemperpage') && data['itemperpage'] !== undefined) {
        top = '$top=' + encodeURIComponent(data['itemperpage'])
    }

    if(queryUrl)
        queryUrl=queryUrl + '&' + top
    else
        queryUrl='?'+top;

    let skip = null;

    if (data.hasOwnProperty('currentpage') && data['currentpage'] !== undefined){
        if (data.hasOwnProperty('itemperpage') && data['itemperpage'] !== undefined) {
            let offset = 0
            if (data['currentpage'] > 0) {
                offset= data['itemperpage'] * (data['currentpage']-1)
                skip = '$skip=' + offset
            }

        }
    }

    if(queryUrl)
        queryUrl=queryUrl + '&' + skip
    else
        queryUrl='?'+skip;

    let orderby= null;

    if (data.hasOwnProperty('sortby') && data['sortby'] !== undefined) {
        orderby = '$orderby=' +  encodeURIComponent(data['sortby']) ;
        if (data.hasOwnProperty('sortorder') && data['sortorder'] !== undefined){

            if (data['sortorder']==='ascend'){

                orderby = orderby +' asc';
            }
            else {
                orderby = orderby +' desc';
            }
        }
    }

    if(queryUrl)
        queryUrl=queryUrl + '&' + orderby
    else
        queryUrl='?'+orderby;


    if(queryUrl)
        queryUrl=queryUrl + '&' + '$count=true'
    else
        queryUrl='?'+'$count=true';

    if(queryUrl)
        queryUrl=queryUrl + '&' + '$expand=Batch'
    else
        queryUrl='?'+'$expand=Batch';

    return queryUrl
}

const fetchObjects = (data) => dispatch => {

    dispatch(processingAction({_batchid : batchIdCommon.getBatchId()}))

    const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + accessToken.getAccessToken()});

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
      } 

    let finalUrl = odataResourceUrl;

    let queryUrl = returnQueryUrl(data);
  
    if (queryUrl != null) {
          finalUrl=finalUrl+queryUrl
    }

    return fetch(finalUrl,requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => { 
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(gotAction({_batchid : batchIdCommon.getBatchId(),payload : json})); }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
        )    

}


export const fetchBatchMessageIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        if (data === undefined || data === null){
            // let newSearch ={...state.search,numberofsearch:state.search.numberofsearch+1}
            return dispatch(fetchObjects({...state.search, batchid : batchIdCommon.getBatchId()}))
        }
        return dispatch(fetchObjects({...data,batchid : batchIdCommon.getBatchId()}))
    }
}

const insertObject = (data) => dispatch => {

    dispatch(processingAction({_batchid : batchIdCommon.getBatchId()}))
    
    const body = JSON.stringify(data);

    const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + accessToken.getAccessToken()});

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
      }

    return fetch(resourceUrl,requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => { 
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(addedAction({_batchid : batchIdCommon.getBatchId(),payload : json})); dispatch(fetchBatchMessageIfNotBusy()) }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
        )

}

const updateObject = (data) => dispatch => {

    dispatch(processingAction({_batchid : batchIdCommon.getBatchId()}))
    
    if (data === undefined || !data)
        throw new Error('update missing data');

    let url = resourceUrl + data.id +'/'   

    const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + accessToken.getAccessToken()});

    const body = JSON.stringify(data);

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
      }

    return fetch(url,requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => { 
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
                )
            } else {
                return res.json()
            }
        })
        .then(
            (json) => { dispatch(updatedAction({_batchid : batchIdCommon.getBatchId(),payload : json})); dispatch(fetchBatchMessageIfNotBusy()) }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
        )        
}

export const upsertBatchMessageIfNotBusy = (insert,data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        if (insert)
            return dispatch(insertObject(data))
        else
            return dispatch(updateObject(data))   
    }
}

const deleteObject = (data) => dispatch => {

    dispatch(processingAction({_batchid : batchIdCommon.getBatchId()}))

    if (data === undefined || !data)
        throw new Error('update missing data');

    let url = resourceUrl + data.id +'/'  
    
    const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + accessToken.getAccessToken()});

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      }

    return fetch(url,requestOptions)
        .then(res => {
            if (!res.ok) {
                //throw new Error(res.statusText);
                res.json().then(
                    (json) => { 
                        throw new Error(JSON.stringify(json));
                    }
                ).catch(
                    (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
                )
            }
            else{
                dispatch(deletedAction({_batchid : batchIdCommon.getBatchId(),payload : data})); dispatch(fetchBatchMessageIfNotBusy());
            }
        })
        .catch(
            (error) => { console.log(error); dispatch(failedAction({_batchid : batchIdCommon.getBatchId(),payload : error.message})); }
        )        
}

export const deleteBatchMessageIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(deleteObject(data)) 
    }
}


export const updateBatchMessageSearchstateIfNotBusy = (data) => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(searchAction({_batchid : batchIdCommon.getBatchId(),payload : data})) 
    }
}

export const initBatchMessageState = (data) => (dispatch, getState) => {
    return dispatch(initBatchMessageStateAction(data)) 
}