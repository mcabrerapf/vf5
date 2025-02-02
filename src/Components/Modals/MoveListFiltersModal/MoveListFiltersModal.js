import React, { useState } from 'react';
import './MoveListFiltersModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import Notation from '../../Notation';
import MoveTypeBadge from '../../MoveTypeBadge';
import { useModalContext } from '../../../Contexts/ModalContext';
import { MOVE_LEVEL_MATCH } from '../../../constants';



const MoveListFiltersModal = ({
    selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);

    const handleClose = () => {
        closeModal();
    }
    const handleFilterSave = () => {
        closeModal(selectedTypeFilters);
    }

    const handleTypeClick = ({ target: { value } }) => {
        const parsedValue = `level/${value}`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleButtonClick = (value) => {
        const parsedValue = `command/${value}`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedTypeFilters([]);
    }

    const handleFavoriteClick = () => {
        const parsedValue = `fav/`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const typeOptions = Object.keys(MOVE_LEVEL_MATCH).map(key => MOVE_LEVEL_MATCH[key]);

    const isFavSelected = selectedTypeFilters.includes(`fav/`);
    const favModifier = isFavSelected ? 'selected' : 'not-selected';

    return (
        <div className='movelist-filters-modal'>
            <ModalHeader
                modifier={"align-right"}
            >
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='movelist-filters-modal__content'>
                <div className='movelist-filters-modal__content__buttons'>
                    <Notation
                        notation='[P]'
                        modifier={selectedTypeFilters.includes(`command/[P]`) ? 'selected' : ''}
                        onClick={handleButtonClick}
                    />
                    <Notation
                        notation='[K]'
                        modifier={selectedTypeFilters.includes(`command/[K]`) ? 'selected' : ''}
                        onClick={handleButtonClick}
                    />
                    <Notation
                        notation='[G]'
                        modifier={selectedTypeFilters.includes(`command/[G]`) ? 'selected' : ''}
                        onClick={handleButtonClick}
                    />
                    <div
                        className={`movelist-filters-modal__content__buttons__grouped-button ${selectedTypeFilters.includes(`command/[P][+][K][+][G]`) ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('[P][+][K][+][G]')}
                    >
                        <Notation
                            notation='[P]'
                        />
                        <Notation
                            notation='[+]'
                        />
                        <Notation
                            notation='[K]'
                        />
                        <Notation
                            notation='[+]'
                        />
                        <Notation
                            notation='[G]'
                        />
                    </div>
                    <div
                        className={`movelist-filters-modal__content__buttons__grouped-button ${selectedTypeFilters.includes(`command/[P][+][K]`) ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('[P][+][K]')}
                    >
                        <Notation
                            notation='[P]'
                        />
                        <Notation
                            notation='[+]'
                        />
                        <Notation
                            notation='[K]'
                        />
                    </div>
                    <div
                        className={`movelist-filters-modal__content__buttons__grouped-button ${selectedTypeFilters.includes(`command/[K][+][G]`) ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('[K][+][G]')}
                    >
                        <Notation
                            notation='[K]'
                        />
                        <Notation
                            notation='[+]'
                        />
                        <Notation
                            notation='[G]'
                        />
                    </div>
                    <div
                        className={`movelist-filters-modal__content__buttons__grouped-button ${selectedTypeFilters.includes(`command/[P][+][G]`) ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('[P][+][G]')}
                    >
                        <Notation
                            notation='[P]'
                        />
                        <Notation
                            notation='[+]'
                        />
                        <Notation
                            notation='[G]'
                        />
                    </div>

                </div>
                <div className='movelist-filters-modal__content__types'>
                    {typeOptions.map(typeOption => {
                        const isSelected = selectedTypeFilters.includes(`level/${typeOption}`);
                        const modifier = isSelected ? 'selected' : 'not-selected';

                        return (
                            <MoveTypeBadge
                                key={typeOption}
                                modifier={modifier}
                                moveType={typeOption}
                                onClick={handleTypeClick}
                            />
                        )
                    })}
                    <MoveTypeBadge
                        modifier={favModifier}
                        moveType={'favorite'}
                        onClick={handleFavoriteClick}
                    />
                </div>

            </div>
            <ModalFooter>
                <Button
                    text='Reset'
                    modifier={'active'}
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