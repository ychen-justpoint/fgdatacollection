import { useMsal } from '@azure/msal-react';

import { Layout, Menu, Breadcrumb, Typography, Row, Col, Button, Avatar, Space } from 'antd';

import {
  UserOutlined, LaptopOutlined, NotificationOutlined, ContainerOutlined,
  DiffOutlined, HomeOutlined, MailOutlined, AppstoreOutlined, SettingOutlined,
  LogoutOutlined, LoginOutlined
} from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const LoginPage = () => {

  const { instance } = useMsal();

  const initializeSignIn = () => {
    // instance.loginPopup();
    instance.loginRedirect();
  };

  return (

    <Layout >
      <Header style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Space size={20}>
          <h1>Natural Factors</h1>
          <h4>Data Collection Platform</h4>
          {/* <Typography.Space/> */}
          <Text strong>Please Sign in</Text>
          <Button onClick={initializeSignIn}> <LoginOutlined /> </Button>
        </Space>

      </Header>
    </Layout>
  );
};

export default LoginPage;