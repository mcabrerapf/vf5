import React from "react";
import Button from '../Button';
import { copyToClipboard, getFromLocal } from "../../helpers";
import { useModalContext } from "../../Contexts/ModalContext";
import { DECLINED_NEW_SITE_KEY } from "../../constants";

const NewSitwModal = () => {
    const { closeModal } = useModalContext();

    const copyAndGoToNewSite = () => {
        const allCharacterData = getFromLocal("ALL");
        if (!allCharacterData) return;
        copyToClipboard(allCharacterData);
        window.open("https://aws.d3e0atwhb8cqc5.amplifyapp.com/", "_blank");
    }

    const goToNewSite = () => {
        window.open("https://aws.d3e0atwhb8cqc5.amplifyapp.com/", "_blank");
    }

    const handleDecline =()=>{
        localStorage.setItem(DECLINED_NEW_SITE_KEY, true);
        closeModal();
    }

    return (
        <div
            className="new-site-modal"
        >
            <div
                className="new-site-modal__message"
            >
                <div>
                    There is an updated version of the app with a bunch of new features plus online fuctionality
                </div>

                <div>
                    I recommend copying your data to the clipboard and importing it in the new app via the Data tab
                </div>
                <div>
                    (This message wont show up again if you decline but the new url can be found in the Info tab)
                </div>
            </div>
            <div
                className="new-site-modal__buttons"
            >
                <Button
                    onClick={copyAndGoToNewSite}
                    text="Copy data to clipboard and go to new site"
                />
                <Button
                    onClick={goToNewSite}
                    text="Go to new site"
                />
                <Button
                    onClick={handleDecline}
                    text="Stay here"
                />
            </div>
        </div>
    )
}

export default NewSitwModal;