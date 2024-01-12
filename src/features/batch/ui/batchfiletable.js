import React, { useState } from 'react';

import { Table, Popconfirm, Space, Button, Select,Checkbox } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  PlusOutlined,
  BuildOutlined,
  ApartmentOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FileProtectOutlined
} from '@ant-design/icons';

const { Option } = Select;

export default function batchFileTable(props) {

  const {
    record,
    ...rest
  } = props;

  const columns = [
    {
      title: 'Container',
      dataIndex: ['file','container'],
      key: 'container',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'File Name',
      dataIndex: ['file','filename'],
      key: 'filename',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Processed ?',
      dataIndex: ['file','isprocessed'],
      key: 'isprocessed',
      sorter: false,
      sortDirections: ['descend', 'ascend'],
      render:(text, record, index)=>(
        <Checkbox checked={text}/>
      )
    },
    {
      title: 'Created On',
      dataIndex: 'createddate',
      key: 'createddate',
      sorter: false,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => (text && new Date(text).toString())
    }
  ];
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={record.batchFiles}
      />
    </div>

  );
}
