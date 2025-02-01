import React, { useState } from 'react';
import './ComboBuilderModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import CommandView from './CommandView';
import TagsView from './TagsView';
import ExtrasView from './ExtrasView';
import { CHARACTERS } from '../../../constants';

const ComboBuilderModal = ({
    selectedCombo = {}
}) => {
    const characterIds = CHARACTERS.map(character => character.id);
    const { command, tags, id } = selectedCombo
    const { closeModal } = useModalContext();
    const [comboView, setComboView] = useState('commands');
    const [comboNotation, setComboNotation] = useState(command || []);
    const [selectedTags, setSelectedTags] = useState(tags || characterIds);

    const handleSaveCombo = () => {
        closeModal({
            id: id,
            command: comboNotation,
            tags: selectedTags
        });
    }

    const handleCloseModal = () => {
        closeModal();
    }

    const handleViewChage = ({ target: { value } }) => {
        setComboView(value);
    }

    const canSave = !!comboNotation.length && !!selectedTags.length;

    return (
        <div className='combo-builder-modal'>
            <ModalHeader modifier="align-right">
                <Button
                    modifier="no-border"
                    text="X"
                    onClick={handleCloseModal}
                />
            </ModalHeader>
            <div className='combo-builder-modal__sub-header'>
                <Button
                    modifier={comboView === 'commands' ? 'active' : ''}
                    value="commands"
                    text="Commands"
                    onClick={handleViewChage}
                />
                <Button
                    modifier={comboView === 'tags' ? 'active' : ''}
                    value="tags"
                    text="Tags"
                    onClick={handleViewChage}
                />
                <Button
                    modifier={comboView === 'extras' ? 'active' : ''}
                    disabled
                    value="extras"
                    text="Extras"
                    onClick={handleViewChage}
                />
            </div>
            <div className='combo-builder-modal__content'>
                {comboView === 'commands' &&
                    <CommandView
                        comboNotation={comboNotation}
                        setComboNotation={setComboNotation}
                    />
                }
                {comboView === 'tags' &&
                    <TagsView
                        characterIds={characterIds}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                }
                {comboView === 'extras' &&
                    <ExtrasView
                    />
                }
            </div>
            <ModalFooter modifier="align-right">
                <Button
                    text='✓'
                    disabled={!canSave}
                    onClick={handleSaveCombo}
                />
            </ModalFooter>
        </div>
    )
}

export default ComboBuilderModal;