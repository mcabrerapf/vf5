import './MatchupModal.scss';
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Matchup from '../../Matchup';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { calculateWinRate } from '../../../helpers';
import { SaveIcon } from '../../Icon';

const MatchupModal = ({
	matchup = {},
}) => {
	const { closeModal } = useModalContext();
	const { name, note: _note, wins: _wins, loses: _loses } = matchup
	const [note, setNote] = useState(_note || '')
	const [wins, setWins] = useState(_wins);
	const [loses, setLoses] = useState(_loses);

	const onSaveClick = () => {
		const newWinRate = calculateWinRate(loses, wins);
		closeModal({
			...matchup,
			wins,
			loses,
			total: wins + loses,
			win_rate: newWinRate,
			note
		});
	}

	const updateMatchups = (newMatchup) => {
		setWins(newMatchup.wins);
		setLoses(newMatchup.loses);
	}

	const onResetClick = () => {
		setWins(0);
		setLoses(0);
	}

	const handleLosesClick = () => {
		if (loses < 1) return;
		setLoses(loses - 1)
	}

	const handleWinsClick = () => {
		if (wins < 1) return;
		setWins(wins - 1)
	}
	const winRate = calculateWinRate(loses, wins);
	const newMatchup = { wins, loses, name, total: wins + loses, win_rate: winRate };

	return (
		<div
			className="matchup-modal"
		>

			<div
				className="matchup-modal__content"
			>
				<div
					className="matchup-modal__content__top"
				>
					<Matchup
						matchup={newMatchup}
						hideNote
						handleMatchupUpdate={updateMatchups}
					/>
					<div
						className="matchup-modal__content__top__buttons"
					>
						<Button
							disabled={wins < 1}
							onClick={handleWinsClick}
							text={"-"}
						/>
						<Button
							disabled={loses < 1}
							onClick={handleLosesClick}
							text={"-"}
						/>
					</div>
				</div>
				<div
					className="matchup-modal__content__bottom"
				>
					<textarea
						value={note}
						onChange={(e) => setNote(e.target.value)}
					/>
				</div>
			</div>
			<ModalFooter
			>
				<div
					className='modal-footer__delete-button'
				>
					<Button
						modifier={"danger reset"}
						onClick={onResetClick}
						text='RESET'
					/>
				</div>
				<div
					className='modal-footer__main-buttons'
				>
					<Button
						text='CANCEL'
						onClick={() => closeModal()}
					/>
					<Button
						modifier={'save-button'}
						onClick={onSaveClick}
					>
						SAVE
					</Button>
				</div>
			</ModalFooter>
		</div>
	);
}

export default MatchupModal;
