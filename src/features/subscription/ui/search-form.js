import React, { useEffect, useState } from 'react';

import { Collapse, Form, Input, Select, Tooltip, Button, DatePicker, TimePicker, Space, Row, Col, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;

export default function SearchForm(props) {

    const { repo, rest, onFormSubmited, formState } = props;

    const [form] = Form.useForm();

    const onFinish = values => {
        onFormSubmited(values)
    };

    useEffect(() => { form.resetFields() }, [formState])

    return (

        <Form form={form} name="search-form" layout="vertical" onFinish={onFinish} initialValues={{ ...formState }}>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="messagetypeid"
                        label="Message type"
                        >
                        <Select
                            showSearch
                            placeholder="Search for Message type"
                            optionFilterProp="items"
                            filterOption={(input, option) =>
                                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key={null} value={null}></Option>
                            {rest.messagetype.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="subscriberid"
                        label="Subscriber"
                        >
                        <Select
                            showSearch
                            placeholder="Search for Subscriber"
                            optionFilterProp="items"
                            filterOption={(input, option) =>
                                option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key={null} value={null}></Option>
                            {rest.subscriber.data.value.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
                        </Select>
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