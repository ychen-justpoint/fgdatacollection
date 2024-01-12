import { connect } from 'react-redux';

import {
  fetchSourcesIfNotBusy,
  upsertSourceIfNotBusy,
  deleteSourceIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken,
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {source} = state

    return {
      repo : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchSourcesIfNotBusy : (data) => dispatch(fetchSourcesIfNotBusy(data)),
      upsertSourceIfNotBusy : (insert,data) => dispatch(upsertSourceIfNotBusy(insert,data)),
      deleteSourceIfNotBusy: (data) => dispatch(deleteSourceIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
