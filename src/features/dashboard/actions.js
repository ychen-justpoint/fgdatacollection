import {
    gotDashboard as gotAction,
    processingDashboard as processingAction,
    processingDashboardFailed  as failedAction
} from './slice';


// import { fetchStreamsIfNotBusy } from '../stream/actions';
import { accessToken as accessTokenCommon } from '../../common';
export const accessToken = accessTokenCommon

const resourceUrl = process.env.REACT_APP_API + 'api/dashboard/';

const ifNotBusy = (state) => {
    return !state.isbusy;
}

const myState = (state) => { return state.dashboard }

const fetchObjects = () => dispatch => {

    dispatch(processingAction())

    const myHeaders = new Headers({ "Content-Type": "application/json","Authorization": "Bearer " + accessToken.getAccessToken()});

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
      }

    let finalUrl = resourceUrl
    
    return fetch(finalUrl,requestOptions)
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
            (json) => { dispatch(gotAction(json)); }
        )
        .catch(
            (error) => { console.log(error); dispatch(failedAction(error.message)); }
        )

}


export const fetchDashboardIfNotBusy = () => (dispatch, getState) => {
    let state = myState(getState())
    if (ifNotBusy(state)) {
        return dispatch(fetchObjects())
    }
}
