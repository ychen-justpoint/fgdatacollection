import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Form, Input,InputNumber,Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function EditForm(props) {

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
            name="batchid"
            label="Batch Id"
            rules={[
              {
                required: true, message: 'Batch is required.'
              },
            ]}
            >
            <Input disabled={!inserting} placeholder="batchid"/>
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
            name="messagetypeid"
            label="Message Type"
            rules={[
              {
                required: true, message: 'Message type is required.'
              },
            ]}>
            <Select
                    showSearch
                    placeholder="Search for message type"
                    optionFilterProp="items"
                    filterOption={(input, option) =>
                      option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
              {rest.messagetype.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
        </Row>
        <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            disabled={!inserting} 
            name="jsondataid"
            label="Jsondata id"
            >
            <Input disabled={!inserting} placeholder="jsondata"/>
          </Form.Item>
        </Col>
        
        </Row>  

        <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="message1"
            label="Message"
            >
            <Input disabled={!inserting} placeholder="message"/>
          </Form.Item>
        </Col>
        
        </Row>  
    </Form>
  );
}