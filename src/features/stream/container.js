import { connect } from 'react-redux';

import {
  fetchStreamsIfNotBusy,
  upsertStreamIfNotBusy,
  deleteStreamIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken,
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {stream} = state

    return {
      repo : stream,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchStreamsIfNotBusy : (data) => dispatch(fetchStreamsIfNotBusy(data)),
      upsertStreamIfNotBusy : (insert,data) => dispatch(upsertStreamIfNotBusy(insert,data)),
      deleteStreamIfNotBusy: (data) => dispatch(deleteStreamIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
