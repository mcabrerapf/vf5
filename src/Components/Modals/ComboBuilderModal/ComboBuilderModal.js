import './ComboBuilderModal.scss'
import React, { useState } from 'react';
import { useModalContext } from '../../../Contexts/ModalContext';
import { useMainContext } from '../../../Contexts/MainContext';
import CommandView from './CommandView';
import TagsView from './TagsView';
import ExtrasView from './ExtrasView';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { getCommandData } from './helpers';
import { CHARACTERS } from '../../../constants';

const ComboBuilderModal = ({
    selectedCombo,
    handleDeleteClick
}) => {
    const { selectedCharacter } = useMainContext();
    const { id, name, command, characterTags, tags, damage, note, favourite } = selectedCombo || {};
    const initCharacters = CHARACTERS.map(char => char.id);
    const { closeModal } = useModalContext();
    const [comboView, setComboView] = useState('commands');
    const [comboNotation, setComboNotation] = useState(command || []);
    const [selectedCharacterTags, setSelectedCharacterTags] = useState(characterTags || initCharacters);
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const [comboDamage, setComboDamage] = useState(damage || 1);
    const [comboName, setComboName] = useState(name || 'Combo Name');
    const [comboNote, setComboNote] = useState(note || '');
    const [isFavourite, setIsFavourite] = useState(!!favourite);

    const handleSaveCombo = () => {
        const [finalTags, launcherName] = !id ?
            getCommandData(comboNotation, selectedCharacter, selectedTags) :
            [selectedTags];
        const nameToUse = !id && comboName === 'Combo Name' ? launcherName : comboDamage;
        
        closeModal({
            id: id,
            name: nameToUse || 'Combo Name',
            favourite: isFavourite,
            command: comboNotation,
            characterTags: selectedCharacterTags,
            tags: finalTags,
            damage: Number(comboDamage),
            note: comboNote,
        });
    }

    const handleViewChage = ({ target: { value } }) => {
        setComboView(value);
    }

    const setFavourite = () => {
        setIsFavourite(!isFavourite);
    }

    const onDeleteClose = () => {
        handleDeleteClick(selectedCombo)
        closeModal();
    }
    const canSave = !!comboNotation.length && !!selectedCharacterTags.length;

    return (
        <div className='combo-builder-modal'>
            <div className='combo-builder-modal__sub-header'>
                <Button
                    modifier={comboView === 'commands' ? 'active left' : 'left'}
                    value="commands"
                    text="Command"
                    onClick={handleViewChage}
                />
                <Button
                    modifier={comboView === 'tags' ? 'active center' : 'center'}
                    value="tags"
                    text="Tags"
                    onClick={handleViewChage}
                />
                <Button
                    modifier={comboView === 'extras' ? 'active right' : 'right'}
                    value="extras"
                    text="Extras"
                    onClick={handleViewChage}
                />
            </div>
            <div className='combo-builder-modal__content'>
                {comboView === 'commands' &&
                    <CommandView
                        comboDamage={comboDamage}
                        comboName={comboName}
                        comboNotation={comboNotation}
                        isFavourite={isFavourite}
                        setFavourite={setFavourite}
                        setComboNotation={setComboNotation}
                        setComboDamage={setComboDamage}
                        setComboName={setComboName}

                    />
                }
                {comboView === 'tags' &&
                    <TagsView
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
            <ModalFooter>
                <div>
                    {!!id &&
                        <Button
                            text='DELETE'
                            disabled={!canSave}
                            onClick={onDeleteClose}
                        />
                    }
                </div>

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