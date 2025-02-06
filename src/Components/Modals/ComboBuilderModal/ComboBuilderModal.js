import './ComboBuilderModal.scss'
import React, { useState } from 'react';
import { useModalContext } from '../../../Contexts/ModalContext';
import { useMainContext } from '../../../Contexts/MainContext';
import CommandView from './CommandView';
import TagsView from './TagsView';
import ExtrasView from './ExtrasView';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { getTagsFromCommand } from './helpers';

const ComboBuilderModal = ({
    selectedCombo
}) => {
    const { id, command, characterTags, tags, damage, note, favourite } = selectedCombo || {};
    const { selectedCharacter } = useMainContext();
    const { closeModal } = useModalContext();
    const [comboView, setComboView] = useState('commands');
    const [comboNotation, setComboNotation] = useState(command || []);
    const [selectedCharacterTags, setSelectedCharacterTags] = useState(characterTags || []);
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const [comboDamage, setComboDamage] = useState(damage || 1);
    const [comboNote, setComboNote] = useState(note || '');
    const [isFavourite, setIsFavourite] = useState(!!favourite);

    const handleSaveCombo = () => {
        const finalTags = !id ?
            getTagsFromCommand(comboNotation, selectedCharacter, selectedTags) :
            selectedTags;

        closeModal({
            id: id,
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
                        comboNotation={comboNotation}
                        isFavourite={isFavourite}
                        setFavourite={setFavourite}
                        setComboNotation={setComboNotation}
                        setComboDamage={setComboDamage}

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