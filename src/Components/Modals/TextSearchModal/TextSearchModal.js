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
    const currentTextFilter = selectedFilters.find(filter => filter.prefix === 'text_search');
    const [textFilter, setTextFilter] = useState(currentTextFilter?.id || '')

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
            const updatedFilters = selectedFilters.filter(oFilter => oFilter.prefix !== 'text_search');
            return closeModal(updatedFilters);
        }
        const lowerCaseText = textFilter.toLocaleLowerCase();
        const newText = {
            id: lowerCaseText, prefix: 'text_search', name: textFilter
        };
        const updatedFilters = !!currentTextFilter ?
            selectedFilters.map(oFilter => {
                if (oFilter.prefix === 'text_search') return newText;
                return oFilter;
            }) : [...selectedFilters, newText];
        closeModal(updatedFilters);
    }

    const handleNameEnterKey = (event) => {
        if (event.key === "Enter") {
            onConfirmClick();
        }
    };

    const onResetClick = () => {
        const updatedFilters = selectedFilters.filter(oFilter => oFilter.prefix !== 'text_search')
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