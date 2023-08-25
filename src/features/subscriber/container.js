import { connect } from 'react-redux';

import {
  fetchSubscribersIfNotBusy,
  upsertSubscriberIfNotBusy,
  deleteSubscriberIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {subscriber} = state

    return {
      repo : subscriber,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchSubscribersIfNotBusy : (data) => dispatch(fetchSubscribersIfNotBusy(data)),
      upsertSubscriberIfNotBusy : (insert,data) => dispatch(upsertSubscriberIfNotBusy(insert,data)),
      deleteSubscriberIfNotBusy: (data) => dispatch(deleteSubscriberIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
