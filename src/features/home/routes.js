import React , { Suspense, lazy } from 'react';
import { Routes, Route, useLocation,Link } from 'react-router-dom';
import { Alert, Breadcrumb } from 'antd';

const SourcePage = lazy(() => import('../source/container'));
const StreamPage = lazy(() => import('../stream/container'));
const BatchPage = lazy(() => import('../batch/container'));
const MessagePage = lazy(() => import('../message/container'));
const CollectorPage = lazy(() => import('../collector/container'));
const ValidatorPage = lazy(() => import('../validator/container'));
const SubscriberPage = lazy(() => import('../subscriber/container'));
const PublisherPage = lazy(() => import('../publisher/container'));
const SubscriptionPage = lazy(() => import('../subscription/container'));
const JsonSchemaPage = lazy(() => import('../jsonschema/container'));
const JsonDataPage = lazy(() => import('../jsondata/container'));
const FilePage = lazy(() => import('../file/container'));
const ActivityPage = lazy(() => import('../activity/container'));

const Dashboard = lazy(() => import('../dashboard/container'));

const BatchFilePage = lazy(() => import('../batchfile/container'));

//import {default as StreamPage} from '../stream/stream-container';

function HomeRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  // let  { path, url } = useMatch();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path= "/stream" element={<StreamPage />}/>
          <Route path= "/source" element={<SourcePage />}/>
          <Route path= "/batch" element={<BatchPage />}/>
          <Route path= "/message" element={<MessagePage />}/>
          <Route path= "/collector" element={<CollectorPage />}/>
          <Route path= "/validator" element={<ValidatorPage />}/>
          <Route path= "/subscriber" element={<SubscriberPage />}/>
          <Route path= "/publisher" element={<PublisherPage />}/>
          <Route path= "/subscription" element={<SubscriptionPage />}/>
          <Route path= "/jsonschema" element={<JsonSchemaPage />}/>
          <Route path= "/data" element={<JsonDataPage />}/>
          <Route path= "/file" element={<FilePage />}/>
          <Route path= "/activity" element={<ActivityPage />}/>
          <Route path= "/batchfile" element={<BatchFilePage />}/>
          
        </Routes>
      </Suspense>
      
    </div>
  );
}
export default HomeRoutes;