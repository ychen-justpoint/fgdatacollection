import { connect } from 'react-redux';

import {
  fetchActivityIfNotBusy,
  upsertActivityIfNotBusy,
  deleteActivityIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';

import {
  fetchBatchActivityIfNotBusy,
  upsertBatchActivityIfNotBusy,
  deleteBatchActivityIfNotBusy,
  updateBatchActivitySearchstateIfNotBusy,
  initBatchActivityState,
  accessToken as accessTokenBatchActivity,
  batchIdAccessor as batchIdAccessorBatchActivity
} from '../batchactivity/actions';

import { default as ModulePage } from './ui';

const mapStateToProps = (state, ownProps) => {

  const { activity, batch ,batchactivity} = state

  const selectedRepo = ownProps.batchid ? batchactivity[ownProps.batchid] : activity

  return {
    repo: selectedRepo,
    batch: batch,
    batchid: ownProps.batchid,
    accessToken: accessToken,
    accessTokenBatchActivity: accessTokenBatchActivity,
    batchIdAccessorBatchActivity: batchIdAccessorBatchActivity
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchActivityIfNotBusy: (data) => dispatch(fetchActivityIfNotBusy(data)),
    upsertActivityIfNotBusy: (insert, data) => dispatch(upsertActivityIfNotBusy(insert, data)),
    deleteActivityIfNotBusy: (data) => dispatch(deleteActivityIfNotBusy(data)),
    updateSearchstateIfNotBusy: (data) => dispatch(updateSearchstateIfNotBusy(data)),
    fetchBatchActivityIfNotBusy: (data) => dispatch(fetchBatchActivityIfNotBusy(data)),
    upsertBatchActivityIfNotBusy: (insert, data) => dispatch(upsertBatchActivityIfNotBusy(insert, data)),
    deleteBatchActivityIfNotBusy: (data) => dispatch(deleteBatchActivityIfNotBusy(data)),
    updateBatchActivitySearchstateIfNotBusy: (data) => dispatch(updateBatchActivitySearchstateIfNotBusy(data)),
    initBatchActivityState: (data) => dispatch(initBatchActivityState(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
