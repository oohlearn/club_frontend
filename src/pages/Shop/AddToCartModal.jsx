import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Modal, Image, Row, ConfigProvider, Select } from "antd";
import styled from "styled-components";

const ModalStyle = styled.div`
  h6 {
    margin-top: 50px;
  }
  .cartIcon {
    height: 25px;
    width: 25px;
  }
`;
const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

// TODO OK按鈕刪掉
const AddToCartModal = ({ loading, setOpen, open, product }) => {
  const [sizeOptions, setSizeOptions] = useState([]);
  const handleClick = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (product?.size_list) {
      const options = product.size_list.map((item) => ({
        label: `${item.size} ${item.description}`,
        value: item.size,
      }));
      setSizeOptions(options);
    }
  }, [product]);
  return (
    <ModalStyle>
      <Modal
        title={<p>請選擇商品規格</p>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Image preview={false} width={200} src={product.index_image} />
        <h3>{product.title}</h3>
        <h6>NT$ {product.price}</h6>
        <Row>
          <h6>數量：</h6>
          <ConfigProvider
            theme={{
              components: {
                Select: { optionPadding: 5 },
              },
            }}
          >
            <Select size="small" defaultValue={1} options={selectOptions}>
              購買數量
            </Select>
          </ConfigProvider>
        </Row>
        <br />
        <Row
          style={{
            display: product.size_list ? "block" : "none",
            color: "orange",
            fontWeight: "bold",
          }}
        >
          尺寸：（不同尺寸或顏色，請分別加入購物車）
          <ConfigProvider
            theme={{
              components: {
                Select: { optionPadding: "15" },
              },
            }}
          >
            <Select className="sizeOption" size="small" options={sizeOptions}></Select>
          </ConfigProvider>
        </Row>
        <Link>
          <Button type="default" onClick={handleClick}>
            加入購物車
          </Button>
        </Link>
      </Modal>
    </ModalStyle>
  );
};
export default AddToCartModal;
