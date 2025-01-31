import React from 'react';
import './Button.scss'

const Button = ({
    onClick = () => { },
    text = 'Button',
    value = 'button',
    modifier
}) => {
    const className = ['button', modifier].filter(Boolean).join(' ');

    const handleOnClick = (e) => {
        e.preventDefault();
        onClick(e);
    }
    return (
        <button
            className={className}
            value={value}
            onClick={handleOnClick}>
            {text}
        </button>
    )
}

export default Button;