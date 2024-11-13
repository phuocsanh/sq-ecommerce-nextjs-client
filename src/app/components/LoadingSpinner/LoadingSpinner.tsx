interface LoadingSpinnerProps {
  size?: string; // Có thể truyền size như '50px', '100px' hoặc '50%'
  color?: string; // Màu của spinner, ví dụ: '#3498db', 'red', v.v.
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "25px",
  color = "#ffffff",
}) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderTopColor: color, // Chỉ thay đổi màu của border-top
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid transparent",
          borderTop: `2px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          ...spinnerStyle,
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
