import React, { useState, useEffect, useContext } from 'react';

import { default as CommonContext } from '../../app/common-context';


export default function Dashboard() {

  const { common, updateCommon } = useContext(CommonContext);
  
  common.module = 'Dashboard';

  updateCommon(common);

  return (
    <h1>Dashboard</h1>
  )
}

