import React from "react";

interface LoadingSpinnerProps {
  size?: string; // Kích thước
  color?: string; // Màu
  thickness?: string; // Độ dày viền
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "w-6 h-6",
  color = "white",
}) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`rounded-full ${size}  animate-spin`}
        style={{
          border: "2px solid transparent",
          borderTopColor: color,
          borderRightColor: color, // Tăng góc tô màu
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
