import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker, Checkbox } from 'antd';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

const { Option } = Select;
const { TextArea } = Input;

export default function EditForm(props) {

  const { record, form, onSubmit, rest } = props;

  const inserting = (record.id === undefined || record.id === null)

  const convertedRecord = inserting ? {
    ...record
  } : { ...record }

  const onFinish = values => {

    let insert = true

    let id = form.getFieldValue('id')
    if (id !== null && id !== undefined) {
      insert = false
    }

    let processedRecord = {
      ...values
    }

    onSubmit(insert, processedRecord)

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
        <Col span={12}>
          <Form.Item
            name="batchid"
            label="Batch Id"
            rules={[
              {
                required: true, message: 'Batch is required.'
              },
            ]}>
            <Input placeholder="Batchid" disabled={!inserting}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="container"
            label="Container"
            rules={[
              {
                required: true, message: 'Container is required.'
              },
            ]}>
            <Input placeholder="container"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="filename"
            label="Filename"
            rules={[
              {
                required: true, message: 'File name is required.'
              },
            ]}>
            <Input placeholder="Filename"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="collectorid"
            label="Collector">
            <Input placeholder="collectorid" disabled={!inserting}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="format"
            label="Format">
            <Input placeholder="format"/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}