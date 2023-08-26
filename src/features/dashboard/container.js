import { connect } from 'react-redux';

import {
  fetchDashboardIfNotBusy,
  accessToken
} from './actions';

import { default as ModulePage } from './ui';

const mapStateToProps = (state,ownProps) => {

    const {dashboard} = state

    return {
      repo : dashboard,
      accessToken : accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchDashboardIfNotBusy : () => dispatch(fetchDashboardIfNotBusy())
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage)
