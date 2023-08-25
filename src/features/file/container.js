import { connect } from 'react-redux';

import {
  fetchFileIfNotBusy,
  upsertFileIfNotBusy,
  deleteFileIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';

import {
  fetchBatchFileIfNotBusy,
  upsertBatchFileIfNotBusy,
  deleteBatchFileIfNotBusy,
  updateBatchFileSearchstateIfNotBusy,
  initBatchFileState,
  accessToken as accessTokenBatchFile,
  batchIdAccessor as batchIdAccessorBatchFile
} from '../batchfile/actions';

import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {file,batch,batchfile} = state

    const selectedRepo = ownProps.batchid ? batchfile[ownProps.batchid] : file
    
    return {
      repo : selectedRepo,
      batch : batch,
      batchid : ownProps.batchid,
      accessToken : accessToken,
      accessTokenBatchFile : accessTokenBatchFile,
      batchIdAccessorBatchFile : batchIdAccessorBatchFile
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchFileIfNotBusy : (data) => dispatch(fetchFileIfNotBusy(data)),
      upsertFileIfNotBusy : (insert,data) => dispatch(upsertFileIfNotBusy(insert,data)),
      deleteFileIfNotBusy: (data) => dispatch(deleteFileIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data)),
      initBatchFileState : (data) => dispatch(initBatchFileState(data)),
      fetchBatchFileIfNotBusy: (data) => dispatch(fetchBatchFileIfNotBusy(data)),
      upsertBatchFileIfNotBusy : (insert,data) => dispatch(upsertBatchFileIfNotBusy(insert,data)),
      deleteBatchFileIfNotBusy : (data) => dispatch(deleteBatchFileIfNotBusy(data)),
      updateBatchFileSearchstateIfNotBusy : (data) => dispatch(updateBatchFileSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
