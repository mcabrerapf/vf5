import React from "react";
import './LaunchersView.scss';
import MoveCommand from "../../../MoveCommand";

const LaunchersView = ({
    selectedFilters = [],
    launchers = [],
    onLauncherClick = () => { }
}) => {
    const launcherFilters = selectedFilters
        .filter(filter => filter.key ==='launcher')

    return (
        <div className='launchers-view'>
            {launchers.map(launcher => {
                const isSelected = !!launcherFilters.find(lFilter=>lFilter.id ===launcher.join('-'))
                
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