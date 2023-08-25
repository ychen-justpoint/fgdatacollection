import { connect } from 'react-redux';

import {
  fetchJsonschemasIfNotBusy,
  upsertJsonschemaIfNotBusy,
  deleteJsonschemaIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {jsonschema,stream,subscriber,source} = state

    return {
      repo : jsonschema,
      stream : stream,
      source : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchJsonschemasIfNotBusy : (data) => dispatch(fetchJsonschemasIfNotBusy(data)),
      upsertJsonschemaIfNotBusy : (insert,data) => dispatch(upsertJsonschemaIfNotBusy(insert,data)),
      deleteJsonschemaIfNotBusy: (data) => dispatch(deleteJsonschemaIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
