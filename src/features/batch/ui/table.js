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
  ReloadOutlined,
  FileProtectOutlined
} from '@ant-design/icons';

import { default as Detail } from './detail';

const { Option } = Select;

const getRowClassName = record => {
  // Define your logic to determine the background color based on the score
  if (record.status === 'valid') {
    return 'valid-batch-row';
  } else if (record.status === 'invalid') {
    return 'invalid-batch-row';
  } else {
    return 'init-batch-row';
  }
};

export default function myTable(props) {

  const {
    repo,
    rest,
    handleTableChange,
    selectedRowKeys,
    handleTableSelectionChange,
    handleOpenEditor,
    handleDelete,
    handleValidate,
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      // render: (text, record, index) => (
      //   <Select disabled defaultValue={text}>
      //     <Option value='init'>init</Option>
      //     <Option value='closed'>closed</Option>
      //     <Option value='invalid'>invalid</Option>
      //     <Option value='valid'>valid</Option>
      //     <Option value='published'>published</Option>
      //   </Select>
      // )

    },
    {
      title: 'Stream',
      dataIndex: 'streamid',
      key: 'streamid',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => (
        rest.stream ? 
        (<Select disabled defaultValue={text}>
          {rest.stream.data.value.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
        </Select>) : <div/>
      )
    },
    {
      title: 'Source',
      dataIndex: 'sourceid',
      key: 'sourceid',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => (
        rest.source ?
        <Select disabled defaultValue={text}>
          {rest.source.data.map((jd) => (<Option key={jd.id} value={jd.id}>{jd.name}</Option>))}
        </Select>
        :
        <div/>
      )
    },
    {
      title: 'Created On',
      dataIndex: 'createddate',
      key: 'createddate',
      sorter: false,
      sortDirections: ['descend', 'ascend'],
      render : (text,record,index) => (text && new Date(text).toString())
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Popconfirm title="Are you sure to validate batch?"
            onConfirm={() => { handleValidate(record) }}
            okText="Yes"
            cancelText="No">
            <Button>
              <FileProtectOutlined />
            </Button>
          </Popconfirm>
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
    total: repo.data && repo.data['@odata.count'],
  };

  const rowSelection = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange: handleTableSelectionChange
  };

  return (
    <div>
      {/* <Divider /> */}
      <div style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Space size="small">
          {`Total : ${repo.data && repo.data['@odata.count']}`}
          {`Selected : ${selectedRowKeys.length}`}
          <Button onClick={() => { handleOpenEditor({ id: null }) }}> <PlusOutlined /> </Button>
          <Button onClick={() => { handleTableRefresh()}}> <ReloadOutlined /> </Button>
        </Space>
      </div>

      {/* <Divider /> */}
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={repo.data && repo.data.value}
        pagination={pagination}
        rowKey='id'
        onChange={handleTableChange}
        // title={titleBar}
        loading={repo.isbusy}
        rowClassName={getRowClassName}
        expandable={{
          expandedRowRender: record => <Detail record={record}></Detail>
        }}
      />
    </div>

  );
}
