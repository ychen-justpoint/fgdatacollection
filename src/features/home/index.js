import React, { useState, useEffect, useContext } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import { Routes, Route, Link, useMatch, Outlet, useNavigate } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Typography, Row, Col, Button, Avatar, Space } from 'antd';

import {
  UserOutlined, LaptopOutlined, NotificationOutlined, ContainerOutlined,
  DiffOutlined, HomeOutlined, MailOutlined, AppstoreOutlined, SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import { default as CommonContext } from '../../app/common-context';
import { default as HomeRoutes } from './routes';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Dashboard', 'dashboard',<LaptopOutlined />),
  getItem('Home', 'home', <HomeOutlined />, [
    getItem('Batch', 'batch'),
    getItem('Message', 'message'),
    getItem('Data', 'data'),
    getItem('File', 'file'),
    getItem('Activity', 'activity'),
  ]),
  getItem('Settings', 'settings', <AppstoreOutlined />, [
    getItem('Stream', 'stream'),
    //getItem('Source', 'source'),
    //getItem('Destination', 'destination'),
    getItem('Collector', 'collector'),
    getItem('Validator', 'validator'),
    getItem('Publisher', 'publisher'),
    getItem('Subscriber', 'subscriber'),
    getItem('Subscription', 'subscription'),
    getItem('Schema', 'jsonschema'),

  ])
];

export default function Home() {


  const { instance } = useMsal();

  const signOut = () => { instance.logoutPopup() };

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(!collapsed)
  };

  const onClick = (e) => {

    switch (e.key) {
      case 'stream':
        navigate('/stream');
        break;
      case 'batch':
        navigate('/batch');
        break;
      case 'message':
        navigate('/message');
        break;
      case 'collector':
        navigate('/collector');
        break;
      case 'validator':
        navigate('/validator');
        break;
      case 'subscriber':
        navigate('/subscriber');
        break;
      case 'publisher':
        navigate('/publisher');
        break;
      case 'subscription':
        navigate('/subscription');
        break;
      case 'jsonschema':
        navigate('/jsonschema');
        break;
      case 'data':
        navigate('/data');
        break;
      case 'file':
        navigate('/file');
        break;
      case 'activity':
        navigate('/activity');
        break;
      case 'dashboard':
        navigate('/');
        break;
      default:
        navigate('/');
    }

  };

  const isAuthenticated = useIsAuthenticated();

  // const { common, updateCommon } = useContext(CommonContext);

  // const [ name, setName] = useState(common.module)

  // const onCommonChanged = value => {
  //   setName(value)
  // };

  const init = { module: "Home", user: "guest" };

  const [common, setCommon] = useState(init);

  const updateCommon = (data) => {
    setCommon(data);
  };

  // useEffect(()=>{
  //   updateCommon(common);
  // },[common.module]);

  return (

    <CommonContext.Provider value={{ common, updateCommon }}>
      <Layout >
        <Header style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Space size={20}>
            <h1>Natural Factors</h1>
            <h4>Data Collection Platform</h4>
            {/* <Text strong>{common.module}</Text> */}
            <Button disabled={!isAuthenticated} onClick={() => signOut()}><LogoutOutlined /></Button>
          </Space>

        </Header>

        <Layout hasSider>
          <Sider
            style={{
              backgroundColor: 'transparent'
            }}
            width={196} collapsible={false} collapsed={collapsed} onCollapse={() => onCollapse(collapsed)} >
            <Menu
              onClick={onClick}
              style={{
                width: 196
              }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content>
            <HomeRoutes />
          </Content>
        </Layout>
      </Layout>
    </CommonContext.Provider>


  )
}