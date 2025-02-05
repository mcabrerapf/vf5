import React from 'react';
import './Button.scss'

const Button = ({
    children,
    modifier,
    text,
    value,
    disabled = false,
    onClick = () => { },
}) => {
    const disabledModifier = disabled ? 'disabled' : ''
    const className = ['button', modifier, disabledModifier].filter(Boolean).join(' ');

    const handleOnClick = (e) => {
        e.preventDefault();
        onClick(e);
    }

    return (
        <button
            disabled={disabled}
            className={className}
            value={value}
            onClick={handleOnClick}>
            {text}
            {children}
        </button>
    )
}

export default Button;