import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { default as Home } from './features/home';
import './App.css';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";


// import { default as CommonContext } from './app/common-context'
import { fetchStreamsIfNotBusy,accessToken as accessTokenStream } from './features/stream/actions'
import { fetchMessagetypesIfNotBusy,accessToken as accessTokenMessagetype } from './features/messagetype/actions'
import { fetchSubscribersIfNotBusy,accessToken as accessTokenSubscriber } from './features/subscriber/actions'
import { fetchSourcesIfNotBusy,accessToken as accessTokenSource } from './features/source/actions'
import { fetchBatchesIfNotBusy,accessToken as accessTokenBatch } from './features/batch/actions'

function App() {

  const dispatch = useDispatch();
  
  const { instance, accounts } = useMsal();

  useEffect(()=>{

    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    }).then((response) => {
      console.log(response);
      accessTokenStream.setAccessToken(response.accessToken);
      accessTokenMessagetype.setAccessToken(response.accessToken);
      accessTokenSubscriber.setAccessToken(response.accessToken);
      accessTokenSource.setAccessToken(response.accessToken);
      accessTokenBatch.setAccessToken(response.accessToken);

      dispatch(fetchStreamsIfNotBusy());
      dispatch(fetchMessagetypesIfNotBusy());
      dispatch(fetchSubscribersIfNotBusy());
      dispatch(fetchSourcesIfNotBusy());
      dispatch(fetchBatchesIfNotBusy());
    });

  },[])

  

  // useEffect(() => {

  //   dispatch(fetchStreamsIfNotBusy());
  //   dispatch(fetchMessagetypesIfNotBusy());
  //   dispatch(fetchSubscribersIfNotBusy());
  //   dispatch(fetchSourcesIfNotBusy());
  //   dispatch(fetchBatchesIfNotBusy());

  //   // instance.acquireTokenSilent({
  //   //   ...loginRequest,
  //   //   account: accounts[0]
  //   // }).then((response) => {
  //   //   console.log(response);

  //   //   accessToken.setAccessToken(response.accessToken);

  //   //   dispatch(fetchBatchesIfNotBusy());
  //   // });

  // }, [dispatch]);

  return (
    <div className="App">
      <Home />
      {/* <CommonContext.Provider value={{ common, updateCommon }}>
          <Home />
      </CommonContext.Provider>  */}
    </div>
  );
}

export default App;
