import './MoveListFiltersModal.scss'
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import CommandView from './CommandView';
import { useModalContext } from '../../../Contexts/ModalContext';
import { STRINGS } from '../../../constants';
import { capitalizeFirstLetter } from '.././../../helpers'

const MoveListFiltersModal = ({
    selectedFilters,
    filterOptions,
    movesProperties
}) => {
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS)
    const [commandFilter, setCommandFilter] = useState([])

    const attackLevelFilters = [];
    const dodgeFilters = [];
    const frameDatFilters = {};

    filterOptions.forEach(fOption => {
        const { id: fId, key: fKey } = fOption;
        if (fKey === 'attack_level') attackLevelFilters.push(fOption);
        if (fKey === 'dodge_direction') dodgeFilters.push(fOption);
        if (fId.includes("is_plus_on") ||
            fId.includes("is_minus_on_") ||
            fId.includes("is_punishable_on_") ||
            fId.includes("guarantees_on_") ||
            fId.includes("launches_on") ||
            fId.includes("staggers_on")) {
            const [objKey] = fId.split('_on');
            if (!frameDatFilters[objKey]) frameDatFilters[objKey] = [];
            frameDatFilters[objKey].push(fOption)
        };
    })

    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.value === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedTypeFilters);
            return;
        }
        const newCommand = {
            id: `command/${stringCommand}`,
            key: 'command',
            value: stringCommand,
            name: 'Command',
            short_name: 'Cmd'
        }
        const withCommand = [...selectedTypeFilters, newCommand];
        closeModal(withCommand);
    }

    const handleFilterClick = (filter) => {
        let newTypeFilters;
        const hasFilter = !!selectedTypeFilters.find(selected => selected.id === filter.id)

        if (hasFilter) {
            newTypeFilters = selectedTypeFilters.filter(value => value.id !== filter.id);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), filter];
        }
        setSelectedTypeFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedTypeFilters([]);
        setCommandFilter([]);
    }

    return (
        <div className='movelist-filters-modal'>
            <div className='movelist-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active left' : 'left'}
                    text='Attack Level'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.FRAME_DATA ? 'active center' : 'center'}
                    text='Frame Data'
                    onClick={() => setFiltersView(STRINGS.FRAME_DATA)}
                />
                <Button
                    modifier={filtersView === STRINGS.DODE_DIRECTION ? 'active center' : 'center'}
                    text='Dodge'
                    onClick={() => setFiltersView(STRINGS.DODE_DIRECTION)}
                />
                <Button
                    modifier={filtersView === STRINGS.COMMAND ? 'active right' : 'right'}
                    text='Command'
                    onClick={() => setFiltersView(STRINGS.COMMAND)}

                />
            </div>
            <div className='movelist-filters-modal__content'>
                {filtersView === STRINGS.TAGS &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {attackLevelFilters.map(fOption => {
                            const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            const modifier = isSelected ? `move-type ${fOption.value}` : '';
                            const buttonText = `${fOption.name} (${movesProperties[fOption.value]})`

                            return (
                                <Button
                                    key={fOption.id}
                                    modifier={modifier}
                                    value={fOption.id}
                                    text={buttonText}
                                    onClick={() => handleFilterClick(fOption)}
                                />
                            )
                        })}
                    </div>
                }
                {filtersView === STRINGS.FRAME_DATA &&
                    <div
                        className='movelist-filters-modal__content__fd-options'
                    >
                        {Object.keys(frameDatFilters).map(fdFilterKey => {

                            const header = capitalizeFirstLetter(fdFilterKey.split('_').join(' '));

                            const fDFilter = frameDatFilters[fdFilterKey];
                            return (
                                <div
                                    className='movelist-filters-modal__content__fd-options__option'
                                >
                                    <div
                                        className='movelist-filters-modal__content__fd-options__option__header'
                                    >
                                        {header} on:
                                    </div>
                                    <div
                                        className='movelist-filters-modal__content__fd-options__option__options'
                                    >
                                        {
                                            fDFilter.map(fOption => {
                                                const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                                                const modifier = isSelected ? 's active' : 's';
                                                const [, text] = fOption.name.split('on')
                                                const buttonText = `${text} (${movesProperties[fOption.key]})`
                                                return (
                                                    <Button
                                                        key={fOption.id}
                                                        disabled={!movesProperties[fOption.key]}
                                                        modifier={modifier}
                                                        value={fOption.id}
                                                        text={buttonText}
                                                        onClick={() => handleFilterClick(fOption)}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            )
                        })
                        }
                    </div>
                }
                {filtersView === STRINGS.DODE_DIRECTION &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {dodgeFilters.map(fOption => {
                            const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            const modifier = isSelected ? 'active' : '';
                            const numberOfMOves = movesProperties[`${STRINGS.DODE_DIRECTION}_${fOption.value}`];
                            const buttonText = `${fOption.name} (${numberOfMOves})`

                            return (
                                <Button
                                    key={fOption.id}
                                    disabled={!numberOfMOves}
                                    modifier={modifier}
                                    value={fOption.id}
                                    text={buttonText}
                                    onClick={() => handleFilterClick(fOption)}
                                />
                            )
                        })}
                    </div>
                }
                {filtersView === STRINGS.COMMAND &&
                    <CommandView
                        commandFilter={commandFilter}
                        setCommandFilter={setCommandFilter}
                    />
                }
            </div>
            <ModalFooter>
                <Button
                    text='Reset'
                    modifier={'active reset'}
                    onClick={handleFiltersReset}
                />
                <Button
                    text='✓'
                    modifier={'active'}
                    onClick={handleFilterSave}
                />
            </ModalFooter>

        </div>
    )
}

export default MoveListFiltersModal;