import { connect } from 'react-redux';

import {
  fetchJsondataIfNotBusy,
  upsertJsondataIfNotBusy,
  deleteJsondataIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';

import {
  fetchBatchDataIfNotBusy,
  upsertBatchDataIfNotBusy,
  deleteBatchDataIfNotBusy,
  updateBatchDataSearchstateIfNotBusy,
  initBatchDataState,
  accessToken as accessTokenBatchData,
  batchIdAccessor as batchIdAccessorBatchData
} from '../batchdata/actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {jsondata,stream,batch,batchdata} = state

    const selectedRepo = ownProps.batchid ? batchdata[ownProps.batchid] : jsondata

    return {
      repo : selectedRepo,
      stream : stream,
      batch : batch,
      batchid : ownProps.batchid,
      accessToken : accessToken,
      accessTokenBatchData : accessTokenBatchData,
      batchIdAccessorBatchData : batchIdAccessorBatchData
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchJsondataIfNotBusy : (data) => dispatch(fetchJsondataIfNotBusy(data)),
      upsertJsondataIfNotBusy : (insert,data) => dispatch(upsertJsondataIfNotBusy(insert,data)),
      deleteJsondataIfNotBusy: (data) => dispatch(deleteJsondataIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data)),
      fetchBatchDataIfNotBusy : (data) => dispatch(fetchBatchDataIfNotBusy(data)),
      upsertBatchDataIfNotBusy : (insert,data) => dispatch(upsertBatchDataIfNotBusy(insert,data)),
      deleteBatchDataIfNotBusy : (data) => dispatch(deleteBatchDataIfNotBusy(data)),
      updateBatchDataSearchstateIfNotBusy : (data) => dispatch(updateBatchDataSearchstateIfNotBusy(data)),
      initBatchDataState : (data) => dispatch(initBatchDataState(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
