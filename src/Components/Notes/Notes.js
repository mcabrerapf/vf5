import React, { useEffect, useState } from 'react';
import './Notes.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modals/Modal';
import NoteModal from '../Modals/NoteModal';
import DeleteModal from '../Modals/DeleteModal';
import { generateId, getFromLocal, setLocalStorage } from '../../helpers';
import { CHARACTERS_DATA_KEY, STRINGS } from '../../constants';

const Notes = () => {
    const { selectedCharacter } = useMainContext();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);

    useEffect(
        () => {
            const localNotes = getFromLocal(
                CHARACTERS_DATA_KEY,
                selectedCharacter,
                STRINGS.NOTES
            );
            setNotes(localNotes);
        },
        [selectedCharacter]
    )

    const handleCloseModal = (newNote) => {
        if (newNote) {
            let updatedNotes;
            if (!newNote.id) {
                updatedNotes = [
                    ...notes.map(note => note),
                    { ...newNote, id: generateId() }
                ];

            } else {
                updatedNotes = notes.map((note) => {
                    if (note.id === newNote.id) return newNote;
                    return note;
                });
            }

            setLocalStorage(
                CHARACTERS_DATA_KEY,
                updatedNotes,
                selectedCharacter,
                STRINGS.NOTES
            );
            setNotes(updatedNotes);
        }
        toggleNoteModal();
    }

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        toggleNoteModal();
    }

    const handleNewNoteClick = () => {
        setSelectedNote(null);
        toggleNoteModal();
    }

    const toggleNoteModal = () => {
        setShowNoteModal(!showNoteModal);
    }


    const handleDeleteNote = (shouldDelete) => {
        if (shouldDelete) {
            const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);

            setLocalStorage(
                CHARACTERS_DATA_KEY,
                updatedNotes,
                selectedCharacter,
                STRINGS.NOTES
            );
            setNotes(updatedNotes);
        }
        setSelectedNote(null);
        toggleNoteDeleteModal();
    }

    const handleDeleteNoteClick = () => {
        toggleNoteDeleteModal()
    }

    const toggleNoteDeleteModal = () => {
        setShowDeleteNoteModal(!showDeleteNoteModal);
    }

    return (
        <div className='notes'>
            <ModalContextWrapper
                showModal={showNoteModal}
                closeModal={handleCloseModal}
                closeOnBgClick={false}
            >
                <Modal>
                    <NoteModal
                        selectedNote={selectedNote}
                        handleDeleteNoteClick={handleDeleteNoteClick}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showDeleteNoteModal}
                closeModal={handleDeleteNote}
            >
                <Modal>
                    <DeleteModal data={selectedNote} />
                </Modal>
            </ModalContextWrapper>
            <div className='notes__list-container'>
                <ul
                    className='notes__list-container__list'
                >
                    {notes.map((note) =>
                        <li
                            key={note.id}
                            className='notes__list-container__list__note'
                        >
                            <div
                                className='notes__list-container__list__note__content'
                                onClick={() => handleNoteClick(note)}

                            >
                                {note.content}

                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <footer className='notes__footer'>
                <Button
                    text={"+"}
                    onClick={handleNewNoteClick}
                />
            </footer>
        </div>
    )
}

export default Notes;