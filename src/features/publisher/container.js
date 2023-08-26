import { connect } from 'react-redux';

import {
  fetchPublishersIfNotBusy,
  upsertPublisherIfNotBusy,
  deletePublisherIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {publisher,stream,destination,source} = state

    return {
      repo : publisher,
      stream : stream,
      destination : destination,
      source : source,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchPublishersIfNotBusy : (data) => dispatch(fetchPublishersIfNotBusy(data)),
      upsertPublisherIfNotBusy : (insert,data) => dispatch(upsertPublisherIfNotBusy(insert,data)),
      deletePublisherIfNotBusy: (data) => dispatch(deletePublisherIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
