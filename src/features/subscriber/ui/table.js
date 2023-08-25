import React, { useState } from 'react';

import { Table, Divider, Tag, Popconfirm, Space, Drawer, Button, Select } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  PlusOutlined,
  BuildOutlined,
  ApartmentOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Option } = Select;

export default function StreamTable(props) {

  const {
    repo,
    rest,
    handleTableChange,
    selectedRowKeys,
    handleTableSelectionChange,
    handleOpenEditor,
    handleDelete
  } = props;

  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: false,
    //   sortDirections: ['descend', 'ascend']
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button onClick={() => { handleOpenEditor(record) }}>
            <EditOutlined />
          </Button>
          <Popconfirm title="Are you sure to delete this item?"
            onConfirm={() => { handleDelete(record) }}
            okText="Yes"
            cancelText="No">
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  const pagination = {
    current: repo.search.currentpage,
    pageSize: repo.search.itemperpage,
    total: repo.data['@odata.count'],
  };

  const rowSelection = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange: handleTableSelectionChange
  };

  // const titleBar = () => (
  //   <Space size="small">
  //     {`Total : ${repo.data.length}`}
  //     {`Selected : ${selectedRowKeys.length}`}
  //     <Button onClick={() => { handleOpenEditor({ id: null }) }}> <PlusOutlined /> </Button>
  //   </Space>);

  return (
    <div>
      {/* <Divider /> */}
      <div style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Space size="small">
          {`Total : ${repo.data['@odata.count']}`}
          {`Selected : ${selectedRowKeys.length}`}
          <Button onClick={() => { handleOpenEditor({ id: null }) }}> <PlusOutlined /> </Button>
        </Space>
      </div>
      
      {/* <Divider /> */}
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={repo.data.value}
        pagination={pagination}
        rowKey='id'
        onChange={handleTableChange}
        // title={titleBar}
        loading={repo.isbusy}
      />
    </div>

  );
}
