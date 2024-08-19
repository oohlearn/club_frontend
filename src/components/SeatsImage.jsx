import React, { useState } from "react";
import { Flex, Image } from "antd";

const SeatsImage = ({ stageImage }) => {
  const [scale, setScale] = useState(1);

  const onZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 5));
  const onZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const imageStyles = {
    transform: `scale(${scale}) `,
    transition: "transform 0.3s",
  };
  return (
    <Flex>
      <div style={{ position: "relative", width: "350px", margin: "0 auto" }}>
        <Image width={350} src={stageImage} style={imageStyles} preview={false} />
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "20px",
            zIndex: 1,
          }}
        >
          <img
            onClick={onZoomOut}
            src="/images/zoom_out_v2.png"
            alt=""
            style={{
              width: "30px",
              height: "auto",
              cursor: "pointer",
              marginRight: scale > 1.5 ? "50px" : "10px",
            }}
            hidden={scale === 1}
          />
          <img
            onClick={onZoomIn}
            src="/images/zoom_in.png"
            alt=""
            style={{
              width: "30px",
              height: "auto",
              cursor: "pointer",
              marginRight: "10px",
            }}
            hidden={scale > 1.5}
          />
        </div>
      </div>
    </Flex>
  );
};

export default SeatsImage;
