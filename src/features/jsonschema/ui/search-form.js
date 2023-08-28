import React, { useEffect, useState } from 'react';

import { Checkbox,Collapse, Form, Input, Select, Tooltip, Button, DatePicker, TimePicker, Space, Row, Col, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;

export default function SearchForm(props) {

    const { repo, rest, onFormSubmited, formState } = props;

    const [form] = Form.useForm();

    const onFinish = values => {
        onFormSubmited(values)
    };

    useEffect(() => { form.resetFields() }, [formState,form])

    return (

        <Form form={form} name="search-form" layout="vertical" onFinish={onFinish} initialValues={{ ...formState }}>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="streamid"
                        label="Stream"
                    >
                        <Select
                            showSearch
                            placeholder="Search for Stream"
                            optionFilterProp="items"
                            filterOption={(input, option) =>
                                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key={'undefined'} value={''}></Option>
                            {rest.stream.data.value.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="isactive"
                        label="Active" valuePropName="checked">
                        <Checkbox placeholder="Active" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={1}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form.Item>
                </Col>

            </Row>
        </Form>

    );
}