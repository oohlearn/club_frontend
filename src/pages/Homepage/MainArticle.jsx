import React, { useState } from "react";
import { Button, List, Skeleton, Col, Flex, Row } from "antd";

function MainArticle({ latestNews }) {
  // const [btnText, setBtnText] = useState("更多資訊");
  // if (latestNews["category"] === "ticket") {
  //   setBtnText("購票去");
  // }
  let btnText = "看更多";
  if (latestNews["category"] === "ticket") {
    btnText = "購票去";
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img src="/images/home2.png" alt="" width="100%" />
          </div>
          <div className="col-7">
            <h3>{latestNews["title"]}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis enim eius nam,
              laboriosam eaque corporis vitae ea natus.
            </p>
            <Row align={"bottom"}>
              <Button type="primary">{btnText}</Button>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainArticle;
