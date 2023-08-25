import { connect } from 'react-redux';

import {
  fetchMessagesIfNotBusy,
  upsertMessageIfNotBusy,
  deleteMessageIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';

import {
  fetchBatchMessageIfNotBusy,
  upsertBatchMessageIfNotBusy,
  deleteBatchMessageIfNotBusy,
  updateBatchMessageSearchstateIfNotBusy,
  initBatchMessageState,
  accessToken as accessTokenBatchMessage,
  batchIdAccessor as batchIdAccessorBatchMessage
} from '../batchmessage/actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {message,messagetype,batchmessage} = state

    const selectedRepo = ownProps.batchid ? batchmessage[ownProps.batchid] : message

    return {
      repo : selectedRepo,
      messagetype : messagetype,
      jsondataid : ownProps.jsondataid,
      batchid : ownProps.batchid,
      accessToken : accessToken,
      accessTokenBatchMessage : accessTokenBatchMessage,
      batchIdAccessorBatchMessage : batchIdAccessorBatchMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchMessagesIfNotBusy : (data) => dispatch(fetchMessagesIfNotBusy(data)),
      upsertMessageIfNotBusy : (insert,data) => dispatch(upsertMessageIfNotBusy(insert,data)),
      deleteMessageIfNotBusy: (data) => dispatch(deleteMessageIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data)),
      fetchBatchMessageIfNotBusy : (data) => dispatch(fetchBatchMessageIfNotBusy(data)),
      upsertBatchMessageIfNotBusy : (insert,data) => dispatch(upsertBatchMessageIfNotBusy(insert,data)),
      deleteBatchMessageIfNotBusy: (data) => dispatch(deleteBatchMessageIfNotBusy(data)),
      updateBatchMessageSearchstateIfNotBusy : (data) => dispatch(updateBatchMessageSearchstateIfNotBusy(data)),
      initBatchMessageState : (data) => dispatch(initBatchMessageState(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
