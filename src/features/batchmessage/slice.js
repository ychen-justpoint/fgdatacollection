
import { createSlice } from '@reduxjs/toolkit';

const processingReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = true;
};

const processingFailedReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = false;

   let msg = { level: 'error', data: action.payload.payload }
   state[action.payload._batchid]['msg']['msgs'].push(msg);
   state[action.payload._batchid]['msg']['latest'] = msg;
}

const gotReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = false;
   state[action.payload._batchid]['data'] = action.payload.payload;
   state[action.payload._batchid]['msg']['latest'] = {};
}

const addedReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = false;
   state[action.payload._batchid]['new'] = action.payload.payload;

   //let msg = { level: 'success', data: `New item created with id = ${action.payload.id}` }
   let msg = { level: 'success', data: `New item created` }
   state[action.payload._batchid]['msg']['msgs'].push(msg);
   state[action.payload._batchid]['msg']['latest'] = msg;
}

const updatedReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = false;
   state[action.payload._batchid]['current'] = action.payload.payload;

   // let msg = { level: 'success', data: `Successfully Updated item with id = ${action.payload.id}` }
   let msg = { level: 'success', data: 'Successfully Updated item' }
   state[action.payload._batchid]['msg']['msgs'].push(msg);
   state[action.payload._batchid]['msg']['latest'] = msg;
}

const deletedReducer = (state, action) => {
   state[action.payload._batchid]['isbusy'] = false;
   state[action.payload._batchid]['deleted'] = action.payload.payload;

   //let msg = { level: 'success', data: `Successfully Deleted item with id = ${action.payload.id}` }

   let msg = { level: 'success', data: `Successfully Deleted item` }
   state[action.payload._batchid]['msg']['msgs'].push(msg);
   state[action.payload._batchid]['msg']['latest'] = msg;
}

const updateSearchstateReducer = (state, action) => {

   state[action.payload._batchid]['search'] = action.payload.payload;

}

const initStateReducer = (state, action) => {

   if (action.payload._batchid) {
      if (!state[action.payload._batchid]) {
         state[action.payload._batchid] = state.default;
      }
   }

   if (action.payload.batches){
      action.payload.batches.forEach(element => {
         state[element.id] = state.default;
      });
   }
}

const mySlice = createSlice({
   name: 'batchmessage',
   initialState: {
      default: {
         isbusy: false,
         search: {
            id: null,
            currentpage: 1,
            itemperpage: 5,
            sortby: 'id',
            sortorder: 'ascend',
            numberofsearch: 0
         },
         data: [],
         msg: {
            // level:'success',logdate: new Date() ,data:'successful'
            latest: {},
            msgs: []
         }
      }
   },
   reducers: {
      processingBatchMessage: processingReducer,
      processingBatchMessageFailed: processingFailedReducer,
      gotBatchMessages: gotReducer,
      addedBatchMessage: addedReducer,
      updatedBatchMessage: updatedReducer,
      deletedBatchMessage: deletedReducer,
      updateBatchMessageSearchstate: updateSearchstateReducer,
      initBatchMessageState: initStateReducer
   }
});

export const { initBatchMessageState, updateBatchMessageSearchstate, processingBatchMessage, 
               processingBatchMessageFailed, gotBatchMessages, addedBatchMessage, updatedBatchMessage, 
               deletedBatchMessage } = mySlice.actions;

export default mySlice.reducer;