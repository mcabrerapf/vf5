import './ComboBuilderModal.scss'
import React, { useState } from 'react';
import { useModalContext } from '../../../Contexts/ModalContext';
import { useMainContext } from '../../../Contexts/MainContext';
import CommandView from './CommandView';
import TagsView from './TagsView';
import ExtrasView from './ExtrasView';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { getCommandData, getUniqueComboName } from './helpers';
import { CHARACTERS, STRINGS } from '../../../constants';
import { SaveIcon } from '../../Icon';

const ComboBuilderModal = ({
    selectedCombo,
    combos,
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
    const [comboName, setComboName] = useState(name || STRINGS.DEFAULT_COMBO_NAME);
    const [comboNote, setComboNote] = useState(note || '');
    const [isFavourite, setIsFavourite] = useState(!!favourite);

    const handleSaveCombo = () => {
        const [finalTags, launcherName] = !id ?
            getCommandData(comboNotation, selectedCharacter, selectedTags) :
            [selectedTags];
        const nameToUse = getUniqueComboName(
            id,
            comboName,
            launcherName,
            combos
        );

        closeModal({
            id: id,
            name: nameToUse,
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
                <div
                    className='modal-footer__delete-button'
                >
                    {!!id &&
                        <Button
                            modifier={'danger'}
                            text='DEL'
                            disabled={!canSave}
                            onClick={onDeleteClose}
                        />
                    }
                </div>
                <div
                    className='modal-footer__main-buttons'
                >
                    <Button
                        text='X'
                        onClick={() => closeModal()}
                    />
                    <Button
                        modifier={'save-button'}
                        disabled={!canSave}
                        onClick={handleSaveCombo}
                    >
                        <SaveIcon />
                    </Button>
                </div>
            </ModalFooter>
        </div>
    )
}

export default ComboBuilderModal;