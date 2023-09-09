
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

const addedReducer = (state, action) => {
   state['isbusy'] = false;
   state['new'] = action.payload;

   //let msg = { level: 'success', data: `New item created with id = ${action.payload.id}` }
   let msg = { level: 'success', data: `New item created` }
   state['msg']['msgs'].push(msg);
   state['msg']['latest'] = msg;
}

const updatedReducer = (state, action) => {
   state['isbusy'] = false;
   state['current'] = action.payload;

   // let msg = { level: 'success', data: `Successfully Updated item with id = ${action.payload.id}` }
   let msg = { level: 'success', data: 'Successfully Updated item' }
   state['msg']['msgs'].push(msg);
   state['msg']['latest'] = msg;
}

const deletedReducer = (state, action) => {
   state['isbusy'] = false;
   state['deleted'] = action.payload;

   //let msg = { level: 'success', data: `Successfully Deleted item with id = ${action.payload.id}` }

   let msg = { level: 'success', data: `Successfully Deleted item` }
   state['msg']['msgs'].push(msg);
   state['msg']['latest'] = msg;
}

const updateSearchstateReducer = (state, action) => {
   
   state['search'] = action.payload;

}

const mySlice = createSlice({
   name: 'activity',
   initialState: {
      isbusy: false,
      search: {
         id: null,
         currentpage: 1,
         itemperpage: 5,
         sortby: 'id',
         sortorder: 'descend',
         numberofsearch: 0
      },
      data: [],
      msg: {
         // level:'success',logdate: new Date() ,data:'successful'
         latest: {},
         msgs: []
      }
   },
   reducers: {
      processingActivity: processingReducer,
      processingActivityFailed: processingFailedReducer,
      gotActivities: gotReducer,
      addedActivity: addedReducer,
      updatedActivity: updatedReducer,
      deletedActivity: deletedReducer,
      updateSearchstate : updateSearchstateReducer
   }
});

export const { updateSearchstate,processingActivity, processingActivityFailed, gotActivities, addedActivity, updatedActivity, deletedActivity } = mySlice.actions;

export default mySlice.reducer;