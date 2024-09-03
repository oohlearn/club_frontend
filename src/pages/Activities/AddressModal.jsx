import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Modal, Image, Row, ConfigProvider, Select } from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify"; //清理HTML

const ModalStyle = styled(Modal)`
  h6 {
    margin-top: 20px;
  }
  .mapIcon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

// TODO OK按鈕刪掉
const AddressModal = ({ loading, setOpen, open, venue }) => {
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <ModalStyle
      title={<p>交通方式參考</p>}
      loading={loading}
      open={open}
      onOk={() => setOpen(false)}
      footer={
        <Button type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>
      }
    >
      <h3>{venue.name}</h3>
      <Row>
        <Link to={venue.map_url} target="_blank" rel="noopener noreferrer">
          <img
            className="mapIcon"
            src="https://cdn2.iconfinder.com/data/icons/social-media-2259/512/google-512.png"
          />
          <strong>Google 地圖</strong>
        </Link>
      </Row>
      <Row>
        <h6>地址：{venue.address}</h6>
      </Row>
      <h6 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(venue.traffic_info) }}></h6>
      <br />
    </ModalStyle>
  );
};
export default AddressModal;
