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
    selectedCombo
}) => {
    const characterIds = CHARACTERS.map(character => character.id);
    const { id, command, characterTags, tags, damage, note } = selectedCombo || {};
    const { closeModal } = useModalContext();
    const [comboView, setComboView] = useState('commands');
    const [comboNotation, setComboNotation] = useState(command || []);
    const [selectedCharacterTags, setSelectedCharacterTags] = useState(characterTags || characterIds);
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const [comboDamage, setComboDamage] = useState(damage || 1);
    const [comboNote, setComboNote] = useState(note || '');

    const handleSaveCombo = () => {
        closeModal({
            id: id,
            command: comboNotation,
            characterTags: selectedCharacterTags,
            tags: selectedTags,
            damage: comboDamage,
            note: comboNote,
        });
    }

    const handleCloseModal = () => {
        closeModal();
    }

    const handleViewChage = ({ target: { value } }) => {
        setComboView(value);
    }

    const canSave = !!comboNotation.length && !!selectedCharacterTags.length;
    
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
                    value="extras"
                    text="Extras"
                    onClick={handleViewChage}
                />
            </div>
            <div className='combo-builder-modal__content'>
                {comboView === 'commands' &&
                    <CommandView
                        comboDamage={comboDamage}
                        comboNotation={comboNotation}
                        setComboNotation={setComboNotation}
                        setComboDamage={setComboDamage}

                    />
                }
                {comboView === 'tags' &&
                    <TagsView
                        characterIds={characterIds}
                        selectedCharacterTags={selectedCharacterTags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        setSelectedCharacterTags={setSelectedCharacterTags}
                    />
                }
                {comboView === 'extras' &&
                    <ExtrasView
                        comboDamage={comboDamage}
                        comboNote={comboNote}
                        setComboDamage={setComboDamage}
                        setComboNote={setComboNote}
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