import React, { useState } from 'react';

import { Table, Divider, Tag, Popconfirm, Space, Drawer, Button, Select, Tooltip } from 'antd';
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
      title: 'Batch',
      dataIndex: ['batch','name'],
      key: 'batchid',
      sorter: true,
      sortDirections: ['descend', 'ascend']
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
