import React, { useState } from "react";
import PageNav from "../PageNav/PageNav";

const images = [
  "https://picsum.photos/id/1015/400/250",
  "https://picsum.photos/id/1016/400/250",
  "https://picsum.photos/id/1018/400/250",
  "https://picsum.photos/id/1020/400/250",
  "https://picsum.photos/id/1024/400/250",
  "https://picsum.photos/id/1027/400/250",
];

function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  const windowSize = 4; // show 3 images at a time

  const endIndex = startIndex + windowSize;
  const visibleImages = images.slice(startIndex, endIndex);

  const next = () => {
    if (endIndex < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
      <PageNav />
      <div style={{ width: "420px", margin: "20px auto", textAlign: "center" }}>
        <h2>Sliding Window Carousel</h2>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {visibleImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${startIndex + i}`}
              style={{
                width: "130px",
                height: "80px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        <div style={{ marginTop: "10px" }}>
          <button onClick={prev} disabled={startIndex === 0}>
            ⬅️ Prev
          </button>
          <button onClick={next} disabled={endIndex >= images.length}>
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
