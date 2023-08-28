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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="batchid"
            label="Batch Id">
            <Input placeholder="Batchid" disabled/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status">
            <Input placeholder="Status"/>
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="jsonschemaid"
            label="Jsonschema Id">
            <Input placeholder="Jsonschemaid"/>
          </Form.Item>
        </Col>
      </Row> */}
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
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="json"
            label="Json">
            <Input.TextArea rows={4}  placeholder="Json" />
            {/* <JSONInput
              id="json_editor"
              placeholder={jsonData}
              locale={locale}
              onChange={handleJsonChange}
            /> */}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}