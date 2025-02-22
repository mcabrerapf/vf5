import React, { useState } from 'react';
import './Main.scss'
import Character from '../Character';
import { useMainContext } from '../../Contexts/MainContext';
import { CHARACTERS, DECLINED_NEW_SITE_KEY } from '../../constants';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import NewSitwModal from './NewSiteModal';

const Main = () => {
    const declindeNewSite = localStorage.getItem(DECLINED_NEW_SITE_KEY);
    const [showNewSiteModal, setShowNewSiteModal] = useState(!declindeNewSite);

    const { selectedCharacter } = useMainContext();
    document.title = CHARACTERS.find(char => char.id === selectedCharacter).name;

    return (
        <div className='main'>
            <ModalContextWrapper
                closeOnBgClick={false}
                showModal={showNewSiteModal}
                closeModal={() => setShowNewSiteModal(false)}
            >
                <Modal>
                    <NewSitwModal
                    />
                </Modal>
            </ModalContextWrapper>
            <Character />
        </div>
    )
}

export default Main;