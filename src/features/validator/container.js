import { connect } from 'react-redux';

import {
  fetchValidatorsIfNotBusy,
  upsertValidatorIfNotBusy,
  deleteValidatorIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {validator,stream,source} = state

    return {
      repo : validator,
      stream : stream,
      source : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchValidatorsIfNotBusy : (data) => dispatch(fetchValidatorsIfNotBusy(data)),
      upsertValidatorIfNotBusy : (insert,data) => dispatch(upsertValidatorIfNotBusy(insert,data)),
      deleteValidatorIfNotBusy: (data) => dispatch(deleteValidatorIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
