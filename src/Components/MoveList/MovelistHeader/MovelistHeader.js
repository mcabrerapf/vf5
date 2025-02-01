import React, { useState } from 'react';
import './MovelistHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveTypSelectModal from '../../Modals/MoveTypSelectModal';
import MoveListSortModal from '../../Modals/MoveListSortModal';
import Button from '../../Button';
import { LOCAL_KEYS } from '../../../constants';
import { SORT_OPTIONS } from '../../../constants';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';

const MovelistHeader = ({
    moveKeys,
    selectedMoveType,
    selectedMovelistSort,
    selectedFilters,
    handleFiltersChange,
    setSelectedMoveType,
    setSelectedMovelistSort,
}) => {
    const [showMoveTypeSelectModal, setShowMoveTypeSelectModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const handleTypeSelectModalClose = (type) => {
        if (type) {
            localStorage.setItem(LOCAL_KEYS.SELECTED_MOVE_TYPE, type);
            setSelectedMoveType(type);
        }
        toggleMoveTypeSelectModal();
    }

    const handleSortModalClose = (sort) => {
        localStorage.setItem(LOCAL_KEYS.SELECTED_MOVELIST_SORT, sort);
        setSelectedMovelistSort(sort);
        toggleSortModal();
    }

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleMoveTypeSelectModal = () => {
        setShowMoveTypeSelectModal(!showMoveTypeSelectModal);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const parsedSort = selectedMovelistSort.split('/');
    const [, sortName] = SORT_OPTIONS.find(option => option[0] === parsedSort[0]);
    const pSelectedMoveType = selectedMoveType.split('-').join(' ');

    return (
        <header className='movelist-header'>
            <ModalContextWrapper
                showModal={showMoveTypeSelectModal}
                closeModal={handleTypeSelectModalClose}
            >
                <Modal>
                    <MoveTypSelectModal
                        selectedMoveType={selectedMoveType}
                        moveKeys={moveKeys}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <MoveListSortModal selectedMovelistSort={selectedMovelistSort} />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <Modal>
                    <MoveListFiltersModal
                        selectedFilters={selectedFilters}
                    />
                </Modal>
            </ModalContextWrapper>
            <Button
                modifier={'active'}
                text={selectedMoveType === 'allMoves' ? 'All Moves' : pSelectedMoveType}
                onClick={toggleMoveTypeSelectModal}
            />
            <Button
                modifier={"active"}
                text={'Filters'}
                onClick={toggleFiltersModal}
            />
            <Button
                modifier={"active"}
                text={`${sortName}/${parsedSort[1]}`}
                onClick={toggleSortModal}
            />
        </header>
    )
}

export default MovelistHeader;