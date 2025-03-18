import React from 'react';

import { Table, Popconfirm, Space, Button, Select,Checkbox } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  DownloadOutlined,
  FolderAddOutlined
} from '@ant-design/icons';

import { default as Detail } from './detail';

const { Option } = Select;

export default function myTable(props) {

  const {
    repo,
    rest,
    accessToken,
    handleTableChange,
    selectedRowKeys,
    handleTableSelectionChange,
    handleOpenEditor,
    handleDelete,
    handleTableRefresh,
    handleBuildBatch
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
      title: 'Stream',
      dataIndex: ['stream','name'],
      key: 'streamid',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Source',
      dataIndex: ['source','name'],
      key: 'sourceid',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    // {
    //   title: 'Collector Id',
    //   dataIndex: ['collector','name'],
    //   key: 'collectorid',
    //   sorter: false,
    //   sortDirections: ['descend', 'ascend']
    // },
    {
      title: 'Processed?',
      dataIndex: 'isprocessed',
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
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => (text && new Date(text).toString())
    },
    {
      title: 'Container',
      dataIndex: 'container',
      key: 'container',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'File Name',
      dataIndex: 'filename',
      key: 'filename',
      sorter: false,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          {/* <Button onClick={() => { handleDownload(record) }}>
            <DownloadOutlined />
          </Button> */}
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

  const downloadFile = (data) => {

    return new Promise((resolve) => {

        const resourceUrl = process.env.REACT_APP_API + 'api/files/';

        let url = resourceUrl + data.id + '/download'

        const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }

        fetch(url, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                } else {
                    return res.arrayBuffer();
                }
            })
            .then(
                (arrayBuffer) => { 

                  // const textDecoder = new TextDecoder('utf-8');
                  // const text = textDecoder.decode(arrayBuffer);

                  // resolve(text);
                  
                  
                  const uint8Array = new Uint8Array(arrayBuffer);

                  const byteArray = Array.from(uint8Array);
                  
                  resolve(byteArray);
                 
                }
            )
            .catch(
                (error) => { throw new Error(error.message); }
            )

    });
};

  const handleDownload = async (data) =>{
      
      var content = await downloadFile(data);

      const blob = new Blob([content], { type: 'application/octet-stream' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename; // Set the file name

      // Simulate a click event on the anchor element
      link.click();

    // Clean up by revoking the object URL
      window.URL.revokeObjectURL(url);
  }


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
          {/* <Button onClick={() => { handleOpenEditor({ id: null }) }}> <PlusOutlined /> </Button> */}
          <Button onClick={() => { handleTableRefresh()}}> <ReloadOutlined /> </Button>
          <Popconfirm title="Are you sure to build a new batch for the selected files?"
            onConfirm={() => { handleBuildBatch(selectedRowKeys)} }
            okText="Yes"
            cancelText="No">
            <Button>
              <FolderAddOutlined />
            </Button>
          </Popconfirm>
       
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
        expandable={{
          expandedRowRender: record => <Detail record={record}></Detail>
        }}
      />
    </div>

  );
}
