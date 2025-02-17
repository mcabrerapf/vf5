import React from "react";

const ChevronUp = (props) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="layer1">
      <path

        d="M 10 5.2929688 L 1.2929688 14 L 2 14.707031 L 10 6.7070312 L 18 14.707031 L 18.707031 14 L 10 5.2929688 z "
        style={{
          fill: "black",
          stroke: "black",
          strokeWidth: 1,
        }}
      />
    </g>
  </svg>
);

export default ChevronUp;
