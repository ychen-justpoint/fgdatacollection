import React, { useEffect, useState, useRef,useContext } from 'react';

import { Collapse, message, Spin, Form, Layout, Row, Col, Drawer, Button, Space } from 'antd';


import { default as MyTable } from './table';
import { default as EditForm } from './edit-form';
import { default as SearchForm } from './search-form';

import { default as CommonContext } from '../../../app/common-context';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";

const { Panel } = Collapse;

export default function Index(props) {

  const {
    repo,
    accessToken,
    accessTokenBatchMessage,
    jsondataid,
    batchid,
    batchIdAccessorBatchMessage,
    fetchMessagesIfNotBusy,
    upsertMessageIfNotBusy,
    deleteMessageIfNotBusy,
    updateSearchstateIfNotBusy,
    fetchBatchMessageIfNotBusy,
    upsertBatchMessageIfNotBusy,
    deleteBatchMessageIfNotBusy,
    updateBatchMessageSearchstateIfNotBusy,
    initBatchMessageState,
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
      accessTokenBatchMessage.setAccessToken(response.accessToken);
    });
  }

  useEffect(() => {
    acquireAccessToken();
    if (batchid){
      batchIdAccessorBatchMessage.setBatchId(batchid);
    }
  }, []);

  const repoRef = useRef(repo)

  useEffect(() => { repoRef.current = repo }, [repo])

  useEffect(() => {
    if (repo.msg.latest !== undefined && repo.msg.latest !== null) {
      if (repo.msg.latest.level && repo.msg.latest.data)
        message[repo.msg.latest.level](repo.msg.latest.data, 5)
    }
  }, [repo.msg.latest])

  useEffect(() => {
    if (batchid)
      fetchBatchMessageIfNotBusy();
    else
      fetchMessagesIfNotBusy();
  }, [repo.search])

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleTableSelectionChange = rowKeys => {

    setSelectedRowKeys(rowKeys);

  };

  const handleTableChange = (pagination, filters, sorter) => {
    let b = {
      ...repoRef.current.search,
      jsondataid : jsondataid,
      sortby: sorter.field !== undefined ? sorter.field : repo.search.sortby,
      sortorder: sorter.order !== undefined ? sorter.order : repo.search.sortorder,
      currentpage: pagination.current,
      itemperpage: pagination.pageSize,
      numberofsearch: repoRef.current.search.numberofsearch + 1
    };

    if (batchid) 
      updateBatchMessageSearchstateIfNotBusy(b);
    else
      updateSearchstateIfNotBusy(b);
}

  const handleTableRefresh = () => {
    let b = {
      ...repoRef.current.search,
      numberofsearch: repoRef.current.search.numberofsearch + 1
    };
    if (batchid) 
      updateBatchMessageSearchstateIfNotBusy(b);
    else 
      updateSearchstateIfNotBusy(b);
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
      deleteBatchMessageIfNotBusy(record);
    else
      deleteMessageIfNotBusy(record);
  }

  const handleSearchFormSubmitted = (data) => {

    let originNumberOfSearch = repoRef.current.search.numberofsearch
    let b = {
      ...repoRef.current.search,
      jsondataid : jsondataid,
      messagetypeid: data.messagetypeid,
      keyword : data.keyword,
      currentpage: 1,
      numberofsearch: originNumberOfSearch + 1
    };

    if (batchid) 
      updateBatchMessageSearchstateIfNotBusy(b);
    else
      updateSearchstateIfNotBusy(b);
  }

  const { common, updateCommon } = useContext(CommonContext);

  common.module = 'Message';

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
                onSubmit={batchid ? upsertBatchMessageIfNotBusy : upsertMessageIfNotBusy}
              />
            </Spin>
          </Drawer>
        </Col>
      </Row>
    </Layout>
    </div>

  );
}
