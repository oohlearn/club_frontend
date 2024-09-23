import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Modal, message, Image, Row, ConfigProvider, Select, Col } from "antd";
import styled from "styled-components";
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

// TODO OK按鈕刪掉
const AddToCartModal = ({ loading, setOpen, open, product }) => {
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useProductCart();

  useEffect(() => {
    if (product?.size_list) {
      const options = product.size_list.map((item) => ({
        label: `${item.size} ${item.description}`,
        value: item.size,
      }));
      setSizeOptions(options);
      setSelectedSize(options[0]?.value || ""); // 設置默認尺寸
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product.size_list.length > 0 && !selectedSize) {
      message.warning("請選擇尺寸或顏色");
      return;
    }
    addToCart(product, selectedQty, selectedSize);
    message.success("成功加入購物車");
    setOpen(false);
  };
  return (
    <ModalStyle>
      <Modal
        title={<p>請選擇商品規格</p>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
        okText="加入購物車"
        cancelText="關閉視窗"
        onOk={handleAddToCart}
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
            display: product?.size_list.length > 0 ? "block" : "none",
            color: "orange",
            fontWeight: "bold",
          }}
        >
          尺寸：
          <Col>（不同尺寸或顏色，請分別加入購物車）</Col>
          <Select
            className="sizeOption"
            onChange={(value) => setSelectedSize(value)}
            size="small"
            options={sizeOptions}
          ></Select>
        </Row>
      </Modal>
    </ModalStyle>
  );
};
export default AddToCartModal;
