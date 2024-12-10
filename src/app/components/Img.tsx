import ImageNext, { ImageProps } from "next/image";
import * as React from "react";

export default function Img({
  src,
  alt,
  className = "",
  ...rest
}: ImageProps & { className?: string }) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <ImageNext
        alt={alt}
        src={src}
        fill
        {...rest} // Truyền các thuộc tính khác
      />
    </div>
  );
}
