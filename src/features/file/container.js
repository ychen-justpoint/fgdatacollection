import { connect } from 'react-redux';

import {
  fetchFileIfNotBusy,
  upsertFileIfNotBusy,
  deleteFileIfNotBusy,
  updateSearchstateIfNotBusy,
  buildBatchIfNotBusy,
  accessToken
} from './actions';

import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {file,stream,source} = state
    
    return {
      repo : file,
      stream : stream,
      source : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchFileIfNotBusy : (data) => dispatch(fetchFileIfNotBusy(data)),
      upsertFileIfNotBusy : (insert,data) => dispatch(upsertFileIfNotBusy(insert,data)),
      deleteFileIfNotBusy: (data) => dispatch(deleteFileIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data)),
      buildBatchIfNotBusy : (data) => dispatch(buildBatchIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
