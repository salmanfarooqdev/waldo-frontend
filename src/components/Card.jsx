import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Card(props){


    return(
        <div className="card" >

                    <div className="game-image">
                        <img className="homeimg" src={props.game.gameImage} alt="" />
                    </div>
                    <div className="game-info">
                        <div className="game-title">
                        {props.game.name}
                        </div>

                       {props.flag !== 'true' && (
                        <Link to={`/game/${props.game.gameId}`}>
                        <button className="start">Start Game</button>
                        </Link>
                       )}

                        
                    </div>
        </div>
    )
}