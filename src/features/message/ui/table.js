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

export default function myTable(props) {

  const {
    repo,
    rest,
    handleTableChange,
    selectedRowKeys,
    handleTableSelectionChange,
    handleOpenEditor,
    handleDelete,
    handleTableRefresh
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
      title: 'Type',
      dataIndex: 'messagetypeid',
      key: 'messagetypeid',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render : (text, record, index)=>(
        <Select disabled defaultValue ={text}>
              {rest.messagetype.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
        </Select>
      )

    },
    {
      title: 'Batch',
      dataIndex: ['batch','name'],
      key: 'batch.name',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Logdate',
      dataIndex: 'logdate',
      key: 'logdate',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render : (text,record,index) => (text && new Date(text).toString())
    },
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
          <Button onClick={() => { handleTableRefresh()}}> <ReloadOutlined /> </Button>
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
