import './MatchupModal.scss';
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import VsIcon from '../../Icon/VsIcon';
import { useMainContext } from '../../../Contexts/MainContext';
import { useModalContext } from '../../../Contexts/ModalContext';
import { calculateWinRate, characterIdToName, stringNotationParser } from '../../../helpers';
import TextWithCommand from '../../TextWithCommand';

const MatchupModal = ({
	matchup = {},
}) => {
	const { selectedCharacter } = useMainContext();
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

	const onResetClick = () => {
		setWins(0);
		setLoses(0);
	}

	const handleLosesClick = (increase) => {
		if (!increase && loses < 1) return;
		if (increase) {
			setLoses(loses + 1)
		} else {
			setLoses(loses - 1)
		}
	}

	const handleWinsClick = (increase) => {
		if (!increase && wins < 1) return;
		if (increase) {
			setWins(wins + 1)
		} else {
			setWins(wins - 1)
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
						className="matchup-modal__content__top__vs"
					>
						<div
							className="matchup-modal__content__top__vs__player"
						>
							<div
								className="matchup-modal__content__top__vs__player__name"
							>
								{characterIdToName(selectedCharacter)}
							</div>
							<div
								className="matchup-modal__content__top__vs__player__buttons"
							>
								<Button
									onClick={() => handleWinsClick()}
									text={'-'}
								/>
								<span>{wins}</span>
								<Button
									onClick={() => handleWinsClick(true)}
									text={'+'}
								/>
							</div>
						</div>
						<div
							className='matchup-modal__content__top__vs__icon'
						>
							<VsIcon />
							<span>{winRate}%({wins + loses})</span>
						</div>

						<div
							className='matchup-modal__content__top__vs__oponent'
						>
							<div
								className="matchup-modal__content__top__vs__oponent__name"
							>
								{name}
							</div>
							<div
								className="matchup-modal__content__top__vs__oponent__buttons"
							>
								<Button
									onClick={() => handleLosesClick()}
									text={'-'}
								/>
								<span>{loses}</span>
								<Button
									onClick={() => handleLosesClick(true)}
									text={'+'}
								/>
							</div>
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
					<div className='matchup-modal__content__bottom__message'>
						*Supports input notation [2_6p+k] <TextWithCommand content={stringNotationParser('[2_6p+k]')} />
					</div>
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
						modifier={'save'}
						text='SAVE'
						onClick={onSaveClick}
					/>
				</div>
			</ModalFooter>
		</div>
	);
}

export default MatchupModal;
