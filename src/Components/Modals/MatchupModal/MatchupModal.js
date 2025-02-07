import './MatchupModal.scss';
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { calculateWinRate } from '../../../helpers';

const MatchupModal = ({
	matchup = {},
	selectedCharacterName = () => { }
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

	const onCounterClick = (isOponent, iAdd) => {
		if (isOponent) {
			setLoses(iAdd ? loses + 1 : loses - 1);
		} else {
			setWins(iAdd ? wins + 1 : wins - 1);
		}
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
					<div
						className="matchup-modal__content__top__character"
					>
						<div
							className="matchup-modal__content__top__character__name"
						>
							{name}
						</div>
						<div
							className="matchup-modal__content__top__character__buttons"
						>
							<Button
								disabled={loses < 1}
								onClick={() => onCounterClick(true, false)}
								text="-"
							/>
							<div
								className="matchup-modal__content__top__character__buttons__number"
							>
								{loses}
							</div>
							<Button

								onClick={() => onCounterClick(true, true)}
								text="+"
							/>
						</div>
					</div>
					<div
						className="matchup-modal__content__top__win-rate"
					>
						{winRate}%
					</div>
					<div
						className="matchup-modal__content__top__character"
					>
						<div
							className="matchup-modal__content__top__character__name"
						>
							{selectedCharacterName}
						</div>
						<div
							className="matchup-modal__content__top__character__buttons"
						>
							<Button
								disabled={wins < 1}
								onClick={() => onCounterClick(false, false)}
								text="-"
							/>
							<div
								className="matchup-modal__content__top__character__buttons__number"
							>
								{wins}
							</div>
							<Button
								onClick={() => onCounterClick(false, true)}
								text="+"
							/>
						</div>
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
				modifier={"align-right"}
			>
				<Button
					onClick={onSaveClick}
					text='✓'
				/>
			</ModalFooter>
		</div>
	);
}

export default MatchupModal;
