import React, { useEffect, useState } from 'react';

//import 'antd/dist/antd.less';
import {Tabs,Layout, Form, Input, Checkbox, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

import { default as DataMessage } from '../../message/container'


const { TabPane } = Tabs;

export default function Detail(props) {

  const {
    record,
    ...rest
  } = props;

  return (
    <Layout>
      <Row>
        <Col span={24}>
        <Tabs defaultActiveKey="message" tabPosition='top' style={{ height: '100%'}}>
            <TabPane tab='Message' key='message'>
              <DataMessage jsondataid ={record.id} batchid = {record.batchid}/>
            </TabPane>
        </Tabs>
        </Col>
      </Row>
    </Layout>
    );
}
