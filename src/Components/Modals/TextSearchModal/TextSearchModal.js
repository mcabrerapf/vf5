import React, { useEffect, useRef, useState } from 'react';
import './TextSearchModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import Button from '../../Button';
import ModalFooter from '../ModalFooter';

const TextSearchModal = ({
    selectedFilters,
}) => {
    const inputRef = useRef();
    const { closeModal } = useModalContext();
    const currentTextFilter = selectedFilters.find(filter => filter.key === 'text_search');
    const [textFilter, setTextFilter] = useState(currentTextFilter?.value || '')

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef])

    const onConfirmClick = () => {
        if (!textFilter && !currentTextFilter) {
            return closeModal();
        }
        if (!textFilter) {
            const updatedFilters = selectedFilters.filter(oFilter => oFilter.key !== 'text_search');
            return closeModal(updatedFilters);
        }
        const lowerCaseText = textFilter.toLocaleLowerCase();
        const newTextFilter = {
            id: `text_search/${lowerCaseText}`, key: 'text_search', value: lowerCaseText, name: textFilter, short_name: 'Txt'
        };
        const updatedFilters = !!currentTextFilter ?
            selectedFilters.map(oFilter => {
                if (oFilter.key === 'text_search') return newTextFilter;
                return oFilter;
            }) : [...selectedFilters, newTextFilter];
        closeModal(updatedFilters);
    }

    const handleNameEnterKey = (event) => {
        if (event.key === "Enter") {
            onConfirmClick();
        }
    };

    const onResetClick = () => {
        const updatedFilters = selectedFilters.filter(oFilter => oFilter.key !== 'text_search')
        closeModal(updatedFilters);
    }

    return (
        <div className='text-search-modal'>
            <div className='text-search-modal__content'>
                <input
                    ref={inputRef}
                    value={textFilter}
                    onChange={(e) => setTextFilter(e.target.value)}
                    onKeyDown={handleNameEnterKey}
                />
            </div>
            <ModalFooter>
                <Button
                    disabled={!currentTextFilter}
                    text='RESET'
                    modifier={'danger'}
                    onClick={onResetClick}
                />
                <Button
                    text='✓'
                    modifier={'active'}
                    onClick={onConfirmClick}
                />
            </ModalFooter>
        </div>
    )
}

export default TextSearchModal;