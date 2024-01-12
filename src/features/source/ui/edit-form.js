import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Form, Input,InputNumber,Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function StreamEditForm(props) {

  const { record, form, onSubmit,rest } = props;

  const inserting = (record.id === undefined || record.id === null)

  const convertedRecord = inserting ? {
    ...record
  } :{...record}

  const onFinish = values => {
    
    let insert = true

    let id = form.getFieldValue('id')
    if (id !== null && id !== undefined){
       insert = false   
    }

    let processedRecord = {
      ...values
    }

    onSubmit(insert,processedRecord)

  };

  useEffect(() => form.resetFields(), [record.id]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={convertedRecord} >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="id"
            label="Id">
            <Input placeholder="Id" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            >
            <Input placeholder="name" disabled={!inserting}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={'description'}
            label="Description"
            >
              <Input placeholder="description"/>
          </Form.Item>
        </Col>
        
      </Row>
    </Form>
  );
}