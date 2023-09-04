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

  const schema = form.getFieldValue('schema');

  const [jsonData, setJsonData] = useState(schema);

  const handleJsonChange = (newJson) => {
    setJsonData(newJson);
    form.setFieldsValue({ schema: newJson }); // Update the form field value
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
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="schema"
            label="Schema"
            rules={[
              {
                required: true, message: 'Schema is required.'
              },
            ]}>
            <Input.TextArea rows={4}  placeholder="schema" />
            {/* <JSONInput
              id="json_editor"
              placeholder={jsonData}
              locale={locale}
              onChange={handleJsonChange}
            /> */}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="template"
            label="Template">
            <Input.TextArea rows={4} placeholder="Template" />
          </Form.Item>
        </Col>

      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="isactive"
            label="Active" valuePropName="checked">
            <Checkbox placeholder="Active" />
          </Form.Item>
        </Col>
      </Row>

    </Form>
  );
}