import { useParams } from 'react-router-dom';
import Game1Content from './Game1Content';

export default function GamePage()
{
    const { gameId } = useParams();

    let GameComponent;


    if (gameId === '0') {
        GameComponent = <Game1Content gameID = {gameId}/>;
    } 
    else if (gameId === '1') {
        GameComponent = <Game1Content gameID = {gameId}/>;
    } 
    else if (gameId === '2') {
        GameComponent = <Game1Content gameID = {gameId}/>;
    }

    return (
        <div>
            {GameComponent}
        </div>
    )
}