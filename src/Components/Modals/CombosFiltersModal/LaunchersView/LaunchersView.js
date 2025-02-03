import React from "react";
import './LaunchersView.scss';
import MoveCommand from "../../../MoveCommand";

const LaunchersView = ({
    selectedFilters = [],
    launchers = [],
    onLauncherClick = () => { }
}) => {
    const launcherFilters = selectedFilters
        .filter(filter => filter.includes('launcher/'))
        .map(filter => filter.split('/')[1])

    return (
        <div className='launchers-view'>
            {launchers.map(launcher => {
                const isSelected = launcherFilters.includes(launcher.join(''))
                
                return (
                    <MoveCommand
                        modifier={isSelected ? 'selected' : ''}
                        command={launcher}
                        onClick={() =>
                            onLauncherClick({ target: { value: launcher, isSelected: isSelected } })
                        }
                    />
                )
            })}
        </div>
    )
}

export default LaunchersView;