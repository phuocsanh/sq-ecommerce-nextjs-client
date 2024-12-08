import ImageNext from "next/image";
import * as React from "react";

export default function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ImageNext
        alt={alt}
        src={src}
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
