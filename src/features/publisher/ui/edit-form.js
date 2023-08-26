import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, InputNumber, Select, Tooltip, Button, Row, Col, DatePicker } from 'antd';

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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="streamid"
            label="Stream"
            rules={[
              {
                required: true, message: 'Stream is required.'
              },
            ]}>
            <Select 
              showSearch
              placeholder="Search for Stream"
              optionFilterProp="items"
              filterOption={(input, option) =>
                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rest.stream.data.value.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="destinationid"
            label="Destination"
            rules={[
              {
                required: true, message: 'Destination is required.'
              },
            ]}>
            <Select 
              showSearch
              placeholder="Search for Destination"
              optionFilterProp="items"
              filterOption={(input, option) =>
                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rest.destination.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
          <Form.Item
            name="sourceid"
            label="Source"
            >
            <Select 
              showSearch
              placeholder="Search for Source"
              optionFilterProp="items"
              filterOption={(input, option) =>
                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rest.source.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            disabled={!inserting}
            name="name"
            label="Name"
            rules={[
              {
                required: true, message: 'Name is required.'
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            disabled={!inserting}
            name="implementer"
            label="Implementer"
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            disabled={!inserting}
            name="implementerAssembly"
            label="Assembly"
          >
            <Input placeholder="Assembly" />
          </Form.Item>
        </Col>

      </Row>
      
    </Form>
  );
}