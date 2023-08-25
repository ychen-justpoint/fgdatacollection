import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

import { default as Detail } from './detail';

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
            name="name"
            label="Name">
            <Input placeholder="Name" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true, message: 'Status is required.'
              },
            ]}>
            <Select>
              <Option value='init'>init</Option>
              <Option value='closed'>closed</Option>
              <Option value='invalid'>invalid</Option>
              <Option value='valid'>valid</Option>
              <Option value='published'>published</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={'streamid'}
            label="Stream"
            rules={[
              {
                required: true, message: 'Stream is required.'
              },
            ]}>
            <Select disabled={!inserting}
              showSearch
              placeholder="Search for stream"
              optionFilterProp="items"
              filterOption={(input, option) =>
                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rest.stream.data.value.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={'sourceid'}
            label="Source"
            >
            <Select
              showSearch
              placeholder="Search for source"
              optionFilterProp="items"
              filterOption={(input, option) =>
                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rest.source.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          {
            inserting?<div></div>:<Detail record={record}></Detail>
            
          }
            
        </Col>
      </Row>
    </Form>
  );
}