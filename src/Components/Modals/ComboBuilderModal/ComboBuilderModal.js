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
import { getLauncher } from '../../../helpers';

const ComboBuilderModal = ({
    selectedCombo,
    combos,
    combosFilterOptions,
    handleDeleteClick
}) => {
    const { selectedCharacter } = useMainContext();
    const { id, name, launcher = [], command = [], character_tags, tags, damage, note, favourite } = selectedCombo || {};
    const parsedMoveCommand = command.length ? [...launcher, '⊙', ...command] : [...launcher];
    const initCharacters = CHARACTERS.map(char => char.id);
    const { closeModal } = useModalContext();
    const [comboView, setComboView] = useState('commands');
    const [comboNotation, setComboNotation] = useState(parsedMoveCommand || []);
    const [selectedCharacterTags, setSelectedCharacterTags] = useState(character_tags || initCharacters);
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const [comboDamage, setComboDamage] = useState(damage || 1);
    const [comboName, setComboName] = useState(name || STRINGS.DEFAULT_COMBO_NAME);
    const [comboNote, setComboNote] = useState(note || '');
    const [isFavourite, setIsFavourite] = useState(!!favourite);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveCombo = () => {
        const [comboLauncher, restOfCombo] = getLauncher(comboNotation);
        const [finalTags, launcherName] = !id ?
            getCommandData(comboLauncher, comboNotation, selectedCharacter, selectedTags, combosFilterOptions) :
            [selectedTags];
        const nameToUse = getUniqueComboName(
            id,
            comboName,
            launcherName,
            combos
        );
        setIsSaving(true);
        closeModal({
            id: id,
            name: nameToUse,
            favourite: isFavourite,
            launcher: comboLauncher,
            command: restOfCombo,
            character_tags: selectedCharacterTags,
            tags: finalTags,
            damage: Number(comboDamage),
            note: comboNote,
            oId: selectedCombo?.oId,
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
    const canSave = !!comboNotation.length &&
        !!comboNotation.includes('⊙') &&
        !!selectedCharacterTags.length;

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
                    <>
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
                        <span className='combo-builder-modal__content__help'>*Use space to separate moves</span>
                    </>
                }
                {comboView === 'tags' &&
                    <TagsView
                        selectedCharacterTags={selectedCharacterTags}
                        selectedTags={selectedTags}
                        combosFilterOptions={combosFilterOptions}
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
                            disabled={!canSave || isSaving}
                            onClick={onDeleteClose}
                        />
                    }
                </div>
                <div
                    className='modal-footer__main-buttons'
                >
                    <Button
                        text='CANCEL'
                        disabled={isSaving}
                        onClick={() => closeModal()}
                    />
                    <Button
                        modifier={'save-button'}
                        disabled={!canSave || isSaving}
                        onClick={handleSaveCombo}
                    >
                        SAVE
                    </Button>
                </div>
            </ModalFooter>
        </div>
    )
}

export default ComboBuilderModal;