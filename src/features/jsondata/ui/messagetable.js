import React, { useState } from 'react';

import { Table, Divider, Tag, Popconfirm, Space, Drawer, Button, Select } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  PlusOutlined,
  BuildOutlined,
  ApartmentOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Option } = Select;

export default function MessageTable(props) {

  const {
    record
  } = props;

  console.log(record);
  
  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: false,
    //   sortDirections: ['descend', 'ascend']
    // },
    // {
    //   title: 'Type',
    //   dataIndex: 'messagetypeid',
    //   key: 'messagetypeid',
    //   sorter: true,
    //   sortDirections: ['descend', 'ascend'],
    //   render : (text, record, index)=>(
    //     <Select disabled defaultValue ={text}>
    //           {rest.messagetype.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
    //     </Select>
    //   )

    // },
    // {
    //   title: 'Json Data',
    //   dataIndex: 'jsondataid',
    //   key: 'jsondataid',
    //   sorter: true,
    //   sortDirections: ['descend', 'ascend']
    // },
    {
      title: 'Message',
      dataIndex: 'message1',
      key: 'message1',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    }
  ];

 return (
    <Table
        columns={columns}
        dataSource={record.messages}
        rowKey='id'
      />

  );
}
