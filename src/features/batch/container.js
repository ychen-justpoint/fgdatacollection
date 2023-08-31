import { connect } from 'react-redux';

import {
  fetchBatchesIfNotBusy,
  upsertBatchIfNotBusy,
  deleteBatchIfNotBusy,
  validateBatchIfNotBusy,
  collectBatchIfNotBusy,
  updateSearchstateIfNotBusy,
  uploadFileIfNotBusy,
  accessToken
} from './actions';




import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {
    
    const {batch,stream,source} = state  

    return {
      repo : batch,
      stream : stream,
      source : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      validateBatchIfNotBusy : (data) => dispatch(validateBatchIfNotBusy(data)),
      fetchBatchesIfNotBusy : (data) => dispatch(fetchBatchesIfNotBusy(data)),
      upsertBatchIfNotBusy : (insert,data) => dispatch(upsertBatchIfNotBusy(insert,data)),
      deleteBatchIfNotBusy: (data) => dispatch(deleteBatchIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data)),
      uploadFileIfNotBusy : (data) => dispatch(uploadFileIfNotBusy(data)),
      collectBatchIfNotBusy : (data) => dispatch(collectBatchIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)