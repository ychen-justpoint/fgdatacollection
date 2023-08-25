import { configureStore } from '@reduxjs/toolkit'

import { default as streamReducer} from '../features/stream/slice'
import { default as batchReducer} from '../features/batch/slice'
import { default as messageReducer} from '../features/message/slice'
import { default as messagetypeReducer} from '../features/messagetype/slice'
import { default as sourceReducer} from '../features/source/slice'
import { default as collectorReducer} from '../features/collector/slice'
import { default as validatorReducer} from '../features/validator/slice'
import { default as subscriberReducer} from '../features/subscriber/slice'
import { default as destinationReducer} from '../features/destination/slice'
import { default as publisherReducer} from '../features/publisher/slice'
import { default as subscriptionReducer} from '../features/subscription/slice'
import { default as jsonschemaReducer} from '../features/jsonschema/slice'
import { default as jsondataReducer} from '../features/jsondata/slice'
import { default as fileReducer} from '../features/file/slice'
import { default as activityReducer} from '../features/activity/slice'
import { default as batchfileReducer} from '../features/batchfile/slice'
import { default as batchdataReducer} from '../features/batchdata/slice'
import { default as batchactivityReducer} from '../features/batchactivity/slice'
import { default as batchmessageReducer} from '../features/batchmessage/slice'

export default configureStore({
  reducer: {
    stream : streamReducer,
    batch : batchReducer,
    batchfile : batchfileReducer,
    batchdata : batchdataReducer,
    batchactivity : batchactivityReducer,
    batchmessage:batchmessageReducer,
    message : messageReducer,
    messagetype : messagetypeReducer,
    source : sourceReducer,
    collector : collectorReducer,
    validator : validatorReducer,
    subscriber : subscriberReducer,
    destination : destinationReducer,
    publisher : publisherReducer,
    subscription : subscriptionReducer,
    jsonschema : jsonschemaReducer,
    jsondata : jsondataReducer,
    file : fileReducer,
    activity : activityReducer
  },
})