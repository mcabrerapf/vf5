import './MatchupModal.scss';
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Matchup from '../../Matchup';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { calculateWinRate } from '../../../helpers';

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
		if (loses < 2) return;
		setLoses(loses - 1)
	}

	const handleWinsClick = () => {
		if (wins < 2) return;
		setWins(wins - 1)
	}
	const winRate = calculateWinRate(loses, wins);

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
						matchup={{ wins, loses, name, win_rate: winRate }}
						handleMatchupUpdate={updateMatchups}
					/>
					<div
						className="matchup-modal__content__top__buttons"
					>
						<Button
							disabled={loses < 2}
							onClick={handleLosesClick}
							text={"-"}
						/>
						<Button
							disabled={wins < 2}
							onClick={handleWinsClick}
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
				<Button
					modifier={"danger"}
					onClick={onResetClick}
					text='RESET'
				/>
				<Button
					onClick={onSaveClick}
					text='✓'
				/>
			</ModalFooter>
		</div>
	);
}

export default MatchupModal;
