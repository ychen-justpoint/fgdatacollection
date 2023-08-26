
import { createSlice } from '@reduxjs/toolkit';

const processingReducer = (state, action) => {
   state['isbusy'] = true;
};

const processingFailedReducer = (state, action) => {
   state['isbusy'] = false;

   let msg = { level: 'error', data: action.payload }
   state['msg']['msgs'].push(msg);
   state['msg']['latest'] = msg;
}

const gotReducer = (state, action) => {
   state['isbusy'] = false;
   state['data'] = action.payload;
   state['msg']['latest'] = {};
}

const mySlice = createSlice({
   name: 'dashboard',
   initialState: {
      isbusy: false,
      data: [],
      msg: {
         // level:'success',logdate: new Date() ,data:'successful'
         latest: {},
         msgs: []
      }
   },
   reducers: {
      processingDashboard: processingReducer,
      processingDashboardFailed: processingFailedReducer,
      gotDashboard: gotReducer
   }
});

export const { processingDashboard,processingDashboardFailed,gotDashboard } = mySlice.actions;

export default mySlice.reducer;