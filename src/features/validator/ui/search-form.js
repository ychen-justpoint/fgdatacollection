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
            <Row gutter={[8, 8]} justify={"start"} >
                <Col span={12}>
                    <Form.Item name="streamid" label="Stream" rules={[{ required: false, message: 'Please select a Stream!', }]}>
                        <Select value={null} 
                                showSearch
                                filterOption={(input, option) =>
                                    option.items && option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                            <Option key={null} value={null}></Option>
                            {rest.stream.data.value.map((st) => (<Option key={st.id} value={st.id}>{st.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="keyword" label="Keyword" >
                        <Input placeholder="keyword" />
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