import React , { Suspense, lazy } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';

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

const Dashboard = lazy(() => import('../dashboard'));

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
          
        </Routes>
      </Suspense>
    </div>
  );
}
export default HomeRoutes;