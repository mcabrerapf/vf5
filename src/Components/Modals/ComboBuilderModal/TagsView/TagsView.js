import React from 'react';
import './TagsView.scss';
import CharacterBadge from '../../../CharacterBadge';
import { CHARACTERS } from '../../../../constants';

const TagsView = ({
    selectedTags,
    setSelectedTags
}) => {

    const handleTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('selected')) {
            updatedTags = selectedTags.filter(tag => tag !== value);
        } else {
            updatedTags = [...selectedTags.map(tag => tag), value];
        }
        setSelectedTags(updatedTags);
    }

    const handleAllClick = ({ target: { className } }) => {
        let updatedTags;

        if (className.includes('selected')) {
            updatedTags = [];
        } else {
            updatedTags = CHARACTERS.map(character => character.id);
        }
        setSelectedTags(updatedTags);
    }

    return (
        <div className='tags-view'>
            <div className='tags-view__characters'>
                {CHARACTERS.map(character =>
                    <CharacterBadge
                        key={character.id}
                        character={character.id}
                        value={character.id}
                        modifier={selectedTags.includes(character.id) ? 'selected' : ''}
                        onClick={handleTagClick}
                    />
                )}
                <CharacterBadge
                    character="ALL"
                    modifier={selectedTags.length === CHARACTERS.length ? 'selected' : ''}
                    onClick={handleAllClick}
                />
            </div>

        </div>
    )
}

export default TagsView;