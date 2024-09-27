import React, { useState, useEffect } from "react";

import { Button, Modal, message, Image, Row, ConfigProvider, Select, Col } from "antd";
import styled from "styled-components";
import { useProductContext } from "../../context/ProductContext";
import { useProductCart } from "../../context/ProductCartContext";
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

const AddToCartModal = ({ loading, setOpen, open, productData }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const [sizeOptions, setSizeOptions] = useState([]);

  const { addToCart } = useProductCart();

  const { getProductDetail, updateSizeOptions } = useProductContext();

  useEffect(() => {
    const options = productData.size_list.map((item) => ({
      label: `${item.size} ${item.description ? item.description : ""}`,
      value: item.id,
    }));
    setSizeOptions(options);
    if (productData?.size_list?.length < 2) {
      setSelectedSize(productData.size_list[0]["id"]);
    }
  }, [productData]);

  const handleAddToCart = () => {
    if (productData.size_list.length > 1 && !selectedSize) {
      message.warning("請選擇尺寸或顏色");
      return;
    } else {
      addToCart(productData, selectedQty, selectedSize);
      setOpen(false);
    }
  };
  return (
    <>
      <Modal
        title={<p>請選擇商品規格</p>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
        okText="加入購物車"
        cancelText="關閉視窗"
        onOk={handleAddToCart}
      >
        <Image preview={false} width={200} src={productData.index_image} />
        <h3>{productData.title}</h3>
        <h6>NT$ {productData.price}</h6>
        <Row>
          <h6>數量：</h6>
          <ConfigProvider
            theme={{
              components: {
                Select: { optionPadding: 5 },
              },
            }}
          >
            <Select
              size="small"
              defaultValue={1}
              options={selectOptions}
              onChange={(value) => setSelectedQty(value)}
            >
              購買數量
            </Select>
          </ConfigProvider>
        </Row>
        <br />
        <Row
          style={{
            color: "orange",
            fontWeight: "bold",
          }}
        >
          尺寸：
          <Col>（不同尺寸或顏色，請分別加入購物車）</Col>
          <br />
          <ConfigProvider
            theme={{
              components: {
                Select: { optionPadding: "5" },
              },
            }}
          >
            <Select
              className="sizeOption"
              onChange={(value) => setSelectedSize(value)}
              size="small"
              options={sizeOptions}
            ></Select>
          </ConfigProvider>
        </Row>
      </Modal>
    </>
  );
};
export default AddToCartModal;
