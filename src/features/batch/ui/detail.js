import React, { useEffect, useState } from 'react';

//import 'antd/dist/antd.less';
import { Tabs, Layout, Form, Input, Checkbox, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

import { default as BatchFile } from '../../file/container'
import { default as BatchData } from '../../jsondata/container'
import { default as BatchActivity } from '../../activity/container'
import { default as BatchMessage } from '../../message/container'

const { TabPane } = Tabs;


export default function Detail(props) {

  const {
    record,
    ...rest
  } = props;

  const items = [
    {
      key: "activity",
      label: "Activity",
      children: <BatchActivity batchid={record.id} />
    }, {
      key: "file",
      label: "File",
      children: <BatchFile batchid={record.id} />
    }, {
      key: "data",
      label: "Data",
      children: <BatchData batchid={record.id} />
    }
    , {
      key: "message",
      label: "Message",
      children: <BatchMessage batchid={record.id} />
    }
  ]


  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="file" tabPosition='top' style={{ height: '100%' }} items={items} />
        </Col>
      </Row>
    </Layout>
  );
}
