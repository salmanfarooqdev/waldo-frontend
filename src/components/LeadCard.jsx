import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LeadCard(props){

    const handleCardClick = () => {
        props.onSelectGame(props.game.gameId);
      };


    return(
        <>
        <div className={`leadcard ${props.isSelected ? 'selected' : ''}`} onClick={handleCardClick}>

                    <div className="game-image">
                        <img className="homeimg" src={props.game.gameImage} alt="" />
                    </div>
                    <div className="game-info">
                        <div className="game-title">
                        {props.game.name}
                        </div>
                    </div>

        </div>

       

</>
    )
}