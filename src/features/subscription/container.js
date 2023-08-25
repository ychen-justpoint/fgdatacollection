import { connect } from 'react-redux';

import {
  fetchSubscriptionsIfNotBusy,
  upsertSubscriptionIfNotBusy,
  deleteSubscriptionIfNotBusy,
  updateSearchstateIfNotBusy,
  accessToken
} from './actions';


import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {subscription,messagetype,subscriber} = state

    return {
      repo : subscription,
      messagetype : messagetype,
      subscriber : subscriber,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchSubscriptionsIfNotBusy : (data) => dispatch(fetchSubscriptionsIfNotBusy(data)),
      upsertSubscriptionIfNotBusy : (insert,data) => dispatch(upsertSubscriptionIfNotBusy(insert,data)),
      deleteSubscriptionIfNotBusy: (data) => dispatch(deleteSubscriptionIfNotBusy(data)),
      updateSearchstateIfNotBusy : (data) => dispatch(updateSearchstateIfNotBusy(data))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
