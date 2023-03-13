import { useState, useEffect } from "react";

import Line from "./components/Line";

import classes from "./App.module.css";

const DUMMY_WORDS = [
  "ALBUM",
  "HINGE",
  "MONEY",
  "SCRAP",
  "GAMER",
  "GLASS",
  "COVER",
  "SCOUR",
  "BEING",
  "DELVE",
  "YEILD",
  "METAL",
  "TIPSY",
  "SLUNG",
  "FARCE",
  "GECKO",
  "SHINE",
  "CANNY",
  "MIDST",
  "BADGE",
  "HOMER",
  "TRAIN",
  "STORY",
  "HAIRY",
];
const solution =
  DUMMY_WORDS[Math.floor(Math.random() * (DUMMY_WORDS.length - 1))];

const regex = /^[A-Za-z]{1}$/;

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const inputHandler = (event) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length < 5) return;

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;

        if (isCorrect) setIsGameOver(true);
      }

      if (event.key === "Backspace") {
        setCurrentGuess((oldguess) => oldguess.slice(0, -1));
        return;
      }

      if (currentGuess.length === 5) return;

      if (regex.test(event.key)) {
        setCurrentGuess((oldguess) => oldguess + event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", inputHandler);

    return () => window.removeEventListener("keydown", inputHandler);
  }, [currentGuess, isGameOver, guesses]);

  const showSolutionHandler = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className={classes.app}>
      <div className={classes.board}>
        {guesses.map((guess, index) => {
          const isCurrentGuess =
            index === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={index}
              guess={isCurrentGuess ? currentGuess : guess ?? " "}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
            />
          );
        })}
      </div>
      <div className={classes.solutionContainer}>
        <div className={classes.button} onClick={showSolutionHandler}>
          ANSWER
        </div>
        <div className={classes.solution}>{showSolution ? solution : " "}</div>
      </div>
    </div>
  );
}

export default App;
