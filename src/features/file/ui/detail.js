import React, { useEffect, useState } from 'react';

//import 'antd/dist/antd.less';
import {Tabs,Layout, Form, Input, Checkbox, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

import { default as BatchFile} from './batchfiletable';

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
        <Tabs defaultActiveKey="batch" tabPosition='top' style={{ height: '100%'}}>
            <TabPane tab='Batch' key='batch'>
              <BatchFile record = {record}/>
            </TabPane>
        </Tabs>
        </Col>
      </Row>
    </Layout>
    );
}
