import React from 'react';
import './CommandView.scss'
import CommandBuilder from '../../../CommandBuilder';

const CommandView = ({
    commandFilter,
    setCommandFilter,
}) => {
    
    return (
        <div className='command-view'>
            <CommandBuilder
                command={commandFilter}
                setCommand={setCommandFilter}
            />
        </div>
    )
}

export default CommandView;