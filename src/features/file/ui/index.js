import React, { useEffect, useState, useCallback, useRef,useContext } from 'react';

import { Collapse, message, Modal, Spin, Form, Layout, Menu, Breadcrumb, Typography, Row, Col, Divider, Drawer, Button, Space, Radio } from 'antd';

import {
  UnorderedListOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { default as MyTable } from './table';
import { default as EditForm } from './edit-form';
import { default as SearchForm } from './search-form';

import { default as CommonContext } from '../../../app/common-context';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";

const { Panel } = Collapse;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Index(props) {

  const {
    repo,
    accessToken,
    accessTokenBatchFile,
    batchid,
    batchIdAccessorBatchFile,
    fetchFileIfNotBusy,
    upsertFileIfNotBusy ,
    deleteFileIfNotBusy,
    updateSearchstateIfNotBusy,
    initBatchFileState,
    fetchBatchFileIfNotBusy,
    upsertBatchFileIfNotBusy,
    deleteBatchFileIfNotBusy,
    updateBatchFileSearchstateIfNotBusy,
    ...rest
  } = props;
  
  const { instance, accounts } = useMsal();

  const acquireAccessToken = () => {
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    }).then((response) => {
      console.log(response);
      accessToken.setAccessToken(response.accessToken);
      accessTokenBatchFile.setAccessToken(response.accessToken);
    });
  }

  useEffect(() => {
    acquireAccessToken();
    if (batchid){
      batchIdAccessorBatchFile.setBatchId(batchid);
    }
  }, []);

  const repoRef = useRef(repo)

  useEffect(() => { repoRef.current = repo }, [repo])

  useEffect(() => {
    if (repo.msg.latest !== undefined && repo.msg.latest !== null) {
      if (repo.msg.latest.level && repo.msg.latest.data)
        message[repo.msg.latest.level](repo.msg.latest.data, 10)
    }
  }, [repo.msg.latest])

  useEffect(() => {
    if (batchid){
      fetchBatchFileIfNotBusy()
    }
    else
       fetchFileIfNotBusy()
  }, [repo.search])

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleTableSelectionChange = rowKeys => {

    setSelectedRowKeys(rowKeys);

  };

  const handleTableChange = (pagination, filters, sorter) => {
    let b = {
      ...repoRef.current.search,
      sortby: sorter.field !== undefined ? sorter.field : repo.search.sortby,
      sortorder: sorter.order !== undefined ? sorter.order : repo.search.sortorder,
      currentpage: pagination.current,
      itemperpage: pagination.pageSize,
      numberofsearch: repoRef.current.search.numberofsearch + 1
    };

    if (batchid){
      updateBatchFileSearchstateIfNotBusy(b)
    }
    else{
      updateSearchstateIfNotBusy(b)
    }
    
  }

  const handleTableRefresh = () => {
    let b = {
      ...repoRef.current.search,
      numberofsearch: repoRef.current.search.numberofsearch + 1
    };
    if (batchid){
      updateBatchFileSearchstateIfNotBusy(b)
    }
    else{
      updateSearchstateIfNotBusy(b)
    }
    
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawClose = () => { setDrawerOpen(false) }
  const onDrawOpen = () => { setDrawerOpen(true) }

  const [currentRecord, setCurrentRecord] = useState({});

  const handleOpenEditor = (record) => {
    setCurrentRecord(record);
    onDrawOpen();
  }

  const [form] = Form.useForm();

  const handleEditFormSave = () => {
    form.submit();
    // onDrawClose();
  }

  const handleDelete = (record) => {
    if (batchid)
      deleteBatchFileIfNotBusy(record)
    else
      deleteFileIfNotBusy(record)
  }

  const handleSearchFormSubmitted = (data) => {

    let originNumberOfSearch = repoRef.current.search.numberofsearch

    if (batchid){
      updateBatchFileSearchstateIfNotBusy(
        {
          ...repoRef.current.search,
          batchid : data.batchid,
          currentpage: 1,
          numberofsearch: originNumberOfSearch + 1
        }
      )
      
    }
    else{
      updateSearchstateIfNotBusy(
        {
          ...repoRef.current.search,
          batchid : data.batchid,
          currentpage: 1,
          numberofsearch: originNumberOfSearch + 1
        }
      );
    }

    
  }

  const { common, updateCommon } = useContext(CommonContext);

  common.module = 'File';

  updateCommon(common);

  return (
    <div>
      <Layout>
      <Row>
        <Col span={24}>
          <Collapse>
            <Panel header="Search" key="1">
              <SearchForm repo={repo} rest={rest} formState={repo.search} onFormSubmited={handleSearchFormSubmitted} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <MyTable
            repo={{
              ...repo
            }}
            rest={rest}
            handleTableChange={handleTableChange}
            selectedRowKeys={selectedRowKeys}
            handleTableSelectionChange={handleTableSelectionChange}
            handleOpenEditor={handleOpenEditor}
            handleDelete={handleDelete}
            handleTableRefresh = {handleTableRefresh}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Drawer
            title="Edit"
            width={720}
            onClose={onDrawClose}
            open={drawerOpen}
            bodyStyle={{ paddingBottom: 20 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Space size="small">
                  <Button onClick={() => handleEditFormSave()} type="primary">
                    Save
                  </Button>
                  <Button onClick={onDrawClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                </Space>
              </div>
            }
          >
            <Spin spinning={repo.isbusy}>
              <EditForm
                record={currentRecord}
                rest={rest}
                form={form}
                onSubmit={batchid ? upsertBatchFileIfNotBusy : upsertFileIfNotBusy}
              />
            </Spin>
          </Drawer>
        </Col>
      </Row>
    </Layout>
    </div>

  );
}
