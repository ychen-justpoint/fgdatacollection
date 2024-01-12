import { connect } from 'react-redux';

import {
  fetchBatchFileIfNotBusy,
  upsertBatchFileIfNotBusy,
  deleteBatchFileIfNotBusy,
  updateBatchFileSearchstateIfNotBusy,
  accessToken
} from './actions';

import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {batchfile,batch} = state

    return {
      repo : batchfile,
      batchid : ownProps.batchid,
      fileid : ownProps.fileid,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchBatchFileIfNotBusy: (data) => dispatch(fetchBatchFileIfNotBusy(data)),
      upsertBatchFileIfNotBusy : (insert,data) => dispatch(upsertBatchFileIfNotBusy(insert,data)),
      deleteBatchFileIfNotBusy : (data) => dispatch(deleteBatchFileIfNotBusy(data)),
      updateBatchFileSearchstateIfNotBusy : (data) => dispatch(updateBatchFileSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
