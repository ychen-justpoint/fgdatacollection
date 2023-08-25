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
                    <Form.Item name="email" label="Email" >
                        <Input placeholder="email" />
                    </Form.Item>
                </Col>    
                <Col span={12}>
                    <Form.Item name="name" label="Name" >
                        <Input placeholder="Name" />
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