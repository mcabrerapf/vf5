import React from "react";

const EditIcon = () => {
    return (
        <svg
            fill="#000000"
            width="1.3rem"
            height="1.3rem"
            viewBox="0 0 24 24"
            id="edit"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            className="edit-icon"
        >
            <path
                id="secondary"
                d="M21,22H3a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z"
                style={{ fill: 'white' }}
            ></path>
            <path
                id="primary"
                d="M20.71,3.29a2.93,2.93,0,0,0-2.2-.84,3.25,3.25,0,0,0-2.17,1L7.46,12.29a1.16,1.16,0,0,0-.25.43L6,16.72A1,1,0,0,0,7,18a.9.9,0,0,0,.28,0l4-1.17a1.16,1.16,0,0,0,.43-.25l8.87-8.88a3.25,3.25,0,0,0,1-2.17A2.91,2.91,0,0,0,20.71,3.29Z"
                style={{ fill: "white" }}
            >
            </path>
        </svg >
    )
}

export default EditIcon;