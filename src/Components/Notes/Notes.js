import React, { useEffect, useState } from 'react';
import './Notes.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modals/Modal';
import NoteModal from '../Modals/NoteModal';
import DeleteModal from '../Modals/DeleteModal';
import Note from '../Note';
import { deleteNote, getNotes, updateNotes } from '../../services';

const Notes = () => {
    const { selectedCharacter } = useMainContext();
    const [notes, setNotes] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);

    useEffect(
        () => {
            const localNotes = getNotes(selectedCharacter);
            setNotes(localNotes);
        },
        [selectedCharacter]
    )

    if(!notes) return null;

    const handleCloseModal = (newNote) => {
        if (newNote) {
            const updatedNotes = updateNotes(selectedCharacter, newNote);
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
            const updatedNotes = deleteNote(selectedCharacter, selectedNote.id);
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
                        <Note
                            note={note}
                            handleNoteClick={handleNoteClick}
                        />
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