import { useLayoutEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { useEffect } from "react";
import games from "../games";

export default function Game1Content({ gameID }) {
  const [selectedCharacterInfo, setSelectedCharacterInfo] = useState({
    characterName: "",
    selectedCoordinates: { x: 0, y: 0 }, 
    gameId: gameID,
  });
  const [characters, setCharacters] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownX, setDropdownX] = useState(0);
  const [dropdownY, setDropdownY] = useState(0);
  const [finishTime, setFinishTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [username, setUsername] = useState('');

  const imageRef = useRef(null);
  const dropdownRef = useRef(null);

  const [showCircle, setShowCircle] = useState(false);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
     timer = setInterval(() => {

      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
  
        return {
          hours: hours % 24, 
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
      });
    }, 1000);
  
}
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://waldo-clone-d1cae75d0e6b.herokuapp.com/game/${selectedCharacterInfo.gameId}/characters`);

        if (!response.ok) {
          throw new Error("Failed to get characters.");
        }

        const data = await response.json();
        setCharacters(data.Character);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchCharacters();
  }, [gameID]);

  useEffect(() => {
    function handleResize() {
 
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const imgWidth = imageRef.current.clientWidth;
        const imgHeight = imageRef.current.clientHeight;
        const newX = (circleX / 100) * imgWidth + rect.left;
        const newY = (circleY / 100) * imgHeight + rect.top;
        setCircleX(((newX - rect.left) / imgWidth) * 100);
        setCircleY(((newY - rect.top) / imgHeight) * 100);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [circleX, circleY]);

  function handleImageClick(event) {
    const rect = imageRef.current.getBoundingClientRect();
    const imgWidth = imageRef.current.clientWidth;
    const imgHeight = imageRef.current.clientHeight;
    const coordWidth = event.clientX - rect.left;
    const coordHeight = event.clientY - rect.top;

    const normalizedX = (coordWidth / imgWidth) * 100; // Convert to percentage for consistency
    const normalizedY = (coordHeight / imgHeight) * 100;

    setShowCircle(true);
    setCircleX(normalizedX);
    setCircleY(normalizedY);

    setDropdownX(coordWidth);
    setDropdownY(coordHeight);
    setShowDropdown(true);
  }

  const handleCharClick = (event) => {
    const selectedCharacter =
      event.currentTarget.querySelector(".name").textContent; // Get the character name


    const characterCoordinates = {
      x: circleX, 
      y: circleY,
    };

    setSelectedCharacterInfo({
      characterName: selectedCharacter,
      selectedCoordinates: characterCoordinates,
      gameId: gameID,
    });

    setShowCircle(!showCircle);
    setShowDropdown(!showDropdown);

    // handle fetch
  };

  const displayValidMsg = () => {
    setIsValid(true);
    setTimeout(() => {
      setIsValid(false);
    }, 3000);
  };

  const displayInValidMsg = () => {
    setIsNotValid(true);
    setTimeout(() => {
      setIsNotValid(false);
    }, 3000);
  };

  const displayModal = () => {
    setModal(true);
  };

  const handleGameCompletion = () => {
    setFinishTime(`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`);
};

  useEffect(() => {
    if (characters.length > 0) {
      let flag = true;
      characters.forEach((character) => {
        if (character.found === false) {
          flag = false;
          return;
        }
      });

      if (flag) {
        setIsTimerRunning(false);
        handleGameCompletion();
        displayModal();
      } else {
        console.log("Not all characters are found!");
      }
    }
  }, [characters]);

  useEffect(() => {
    if (
      selectedCharacterInfo.characterName !== "" ||
      selectedCharacterInfo.selectedCoordinates.x !== 0 ||
      selectedCharacterInfo.selectedCoordinates.y !== 0 
    ) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://waldo-clone-d1cae75d0e6b.herokuapp.com/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedCharacterInfo),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }

          const data = await response.json();
          console.log("Fetched data:", data.message);
          if (data.message === "Valid") {
            let charName = selectedCharacterInfo.characterName;

            setCharacters((prevChar) => {
              return prevChar.map((char) =>
                char.name === charName ? { ...char, found: true } : char
              );
            });

            displayValidMsg();
          } else if (data.message === "Invalid") {
            displayInValidMsg();
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchData();
    }
  }, [selectedCharacterInfo]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLeaderboardSubmit = async () => {
    try {
  
      const response = await fetch("https://waldo-clone-d1cae75d0e6b.herokuapp.com/leaderboard", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          finishTime,
          gameID,
        }),
      });

 
      navigate('/leaderboard');

    } catch (error) {
        console.error("Error fetching data:", error.message);

    }
  };

  return (
    <>
      <nav className="gameInsideNav">
        <h2>Where's Waldo</h2>

        <div>
            <p>{`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`}</p>
        </div>

        <div className="characters">
          <div className="dropdown-icon">3</div>

          <div className="dropdown-menu">
            {characters.map((character, index) => (
              <div
                key={index}
                className="c1"
                style={{
                  textDecoration: character.found ? "line-through" : "none",
                }}
              >
                <div className="c1Img">
                  <img className="img1" src={character.url} alt="" />
                </div>
                <div className="c1Name">{character.name}</div>
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div className="image-container" style={{ position: "relative" }}>
        <img
          src={games[gameID].gameImage}
          alt="df"
          className="gameImage"
          style={{ width: "100%" }}
          ref={imageRef}
          onClick={handleImageClick}
        />

        <div>
          {isValid && <div className="valid-msg">Character Found!</div>}
          {isNotValid && <div className="invalid-msg">Keep Trying..</div>}

          {modal && (
            <div className="overlay">
              <div className="modal">
                <div className="time">You finished in {finishTime}</div>
                <div className="score">
                  Submit your score to the leaderboard
                </div>
                <label htmlFor="username">Username </label>
                <input type="text" value={username} onChange={handleUsernameChange}/>
                <br></br>
                <div className="but">
                  <button onClick={handleLeaderboardSubmit}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showCircle && (
          <div
            className="red-circle"
            style={{
              top: `${circleY}%`,
              left: `${circleX}%`,
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        )}

        {showDropdown && (
          <div
            className="dropdown-menu-inside"
            ref={dropdownRef}
            style={{ position: "absolute", top: dropdownY, left: dropdownX }}
          >
            {characters
              .filter((character) => !character.found)
              .map((character, index) => (
                <div
                  key={index}
                  className="c1-inside"
                  onClick={handleCharClick}
                >
                  <div className="c1Img">
                    <img className="img1" src={character.url} alt="" />
                  </div>
                  <div className="c1Name name">{character.name}</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
