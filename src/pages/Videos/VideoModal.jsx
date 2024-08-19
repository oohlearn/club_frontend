import React from "react";
import { Image } from "antd";
const VideoModal = ({ video }) => (
  <Image
    width={300}
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      borderRadius: "10px",
    }}
    preview={{
      destroyOnClose: true,

      mask: (
        <div
          style={{
            borderRadius: "10px", // Match the border radius
          }}
        >
          <h5 style={{ color: "white", margin: 0 }}>播放影片</h5>
        </div>
      ),

      imageRender: () => (
        <iframe
          maxWidth="960"
          maxHeight="540"
          width="960"
          height="540"
          src={video.embed_url}
          title={video.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      toolbarRender: () => null,
    }}
    src={video.image}
  />
);
export default VideoModal;
