import React from "react";
const DownloadIcon = (props) => (
    <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        enableBackground="new 0 0 32 32"
        xmlSpace="preserve"
        {...props}
    >
        <line
            fill="white"
            stroke="white"
            strokeWidth={2}
            strokeMiterlimit={10}
            x1={25}
            y1={28}
            x2={7}
            y2={28}
        />
        <line
            fill="white"
            stroke="white"
            strokeWidth={2}
            strokeMiterlimit={10}
            x1={16}
            y1={23}
            x2={16}
            y2={4}
        />
        <polyline
            fill="white"
            stroke="white"
            strokeWidth={2}
            strokeMiterlimit={10}
            points="9,16 16,23 23,16 "
        />
    </svg>
);
export default DownloadIcon;
