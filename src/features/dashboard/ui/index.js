import React, { useState, useEffect, useContext } from 'react';

import {
  Card,
  Col,
  Row,
  Typography,
  Spin
} from "antd";

import { Link } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";
import { default as CommonContext } from '../../../app/common-context';



export default function Index(props) {

  const {
    repo,
    accessToken,
    fetchDashboardIfNotBusy,
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
      fetchDashboardIfNotBusy();
    });
  }

  useEffect(() => {
    acquireAccessToken();
  }, []);

  const { common, updateCommon } = useContext(CommonContext);

  common.module = 'Dashboard';

  const { Title, Text } = Typography;

  updateCommon(common);

  return (
    <Spin spinning={repo.isbusy}>
      <Row gutter={[24, 0]}>
        {repo.data.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
          >
            <Link to={c.link}>
              <Card bordered={false}>
                <div>
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.title}</span>
                      <Title level={3} style={{ color: "red" }}>
                        {c.totalinerror}
                      </Title>
                      <Title level={3}>
                        <small>{c.total + " total"} </small>
                      </Title>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Spin>

  )
}

