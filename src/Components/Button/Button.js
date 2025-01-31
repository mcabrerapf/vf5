import React from 'react';
import './Button.scss'

const Button = ({
    onClick = () => { },
    text = 'Button',
    value = 'button',
    disabled = false,
    modifier
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
        </button>
    )
}

export default Button;