import { useState, useEffect } from "react";
import "./styles/style.css";
import Card from "./components/Card";

function App() {
  const [arr, SetArr] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [congratulations, setCongratulations] = useState(false); // Added state for congratulations
  const [clickedName, setClickedName] = useState("");

  async function fetchData() {
    try {
      let obj = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12`);
      let data = await obj.json();
      let results = data.results.map((el) => {
        el.isClicked = false;
        el.timesClicked = 0;
        return el;
      });
      SetArr(results);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
      let random = Math.floor(Math.random() * array.length);
      [array[random], array[i]] = [array[i], array[random]];
    }
  }

  function settingScores(array, name) {
    array.forEach((element) => {
      if (element.name === name) {
        element.timesClicked += 1;
        if (element.timesClicked > 1) {
          setClickedName(name);
          setBestScore(Math.max(score, bestScore));
          setScore(0);
          setTimeout(() => {
            setGameOver(true);
          }, 500);
        } else {
          setScore(score + 1);
          if (score + 1 === array.length) {
            setBestScore(score + 1);
            setCongratulations(true);  // Set congratulations state
          }
        }
      }
    });
  }

  function handleCardClick(name) {
    settingScores(arr, name);
    if (!gameOver && !congratulations) { // Check for both gameOver and congratulations
      shuffleArray(arr);
      SetArr(arr.map((element) => {
        if (element.name === name) {
          return { ...element, isClicked: true };
        } else {
          return element;
        }
      }));
    }
  }

  function handleRetry() {
    setGameOver(false);
    setCongratulations(false); // Reset congratulations state
    setClickedName("");
    fetchData();
  }

  return (
    <>
      <header>
        <h1>Pokémon Memory Game!</h1>
        <div className="score-container">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      {gameOver ? (
        <div className="game-over-container fade-in">
          <p className="game-over-text">Game Over! You clicked {clickedName} twice!</p>
          <button className="retry-button" onClick={handleRetry}>Retry</button>
        </div>
      ) : congratulations ? (
        <div className="congratulations-container fade-in">
          <p className="congratulations-text">Congratulations! You matched all the cards!</p>
          <button className="retry-button" onClick={handleRetry}>Play Again</button>
        </div>
      ) : (
        <Card array={arr} onclick={handleCardClick}></Card>
      )}
    </>
  );
}

export default App;
