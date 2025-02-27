import React from "react";

const VsIcon = () => {
    return (
        <svg
            className="vs-icon"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 250 150"
            xmlns="http://www.w3.org/2000/svg"
        >

            <text
                x="5.5rem"
                y="50%"
                fontFamily="Impact, sans-serif"
                fontSize="19rem"
                fontWeight="bold"
                fill="red"
                stroke="black"
                strokeWidth="8"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                V
            </text>
            <text
                x="14rem"
                y="50%"
                fontFamily="Impact, sans-serif"
                fontSize="18rem"
                fontWeight="bold"
                strokeWidth="8"
                fill="white"
                stroke="black"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                S
            </text>
        </svg>
    )
}

export default VsIcon;