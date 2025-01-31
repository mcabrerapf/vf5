import React from 'react';
import './Icon.scss'
import { ICONS } from './constants';

const Icon = ({
    icon = "q",
    color = "white",
    width = '15px',
    height = '15px',
    strokeWidth = 2,
}) => {
    const iconProps = ICONS[icon];

    return (
        <div className='icon'>
            <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
                <path
                    {...iconProps}
                    fill={color}
                    strokeWidth={strokeWidth} />
            </svg>
        </div>
    )
}

export default Icon;