import { connect } from 'react-redux';

import {
  fetchCollectorsIfNotBusy,
  upsertCollectorIfNotBusy,
  deleteCollectorIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {collector,source,stream} = state

    return {
      repo : collector,
      source : source,
      stream : stream,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchCollectorsIfNotBusy : (data) => dispatch(fetchCollectorsIfNotBusy(data)),
      upsertCollectorIfNotBusy : (insert,data) => dispatch(upsertCollectorIfNotBusy(insert,data)),
      deleteCollectorIfNotBusy: (data) => dispatch(deleteCollectorIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
