import React from "react";
import Tile from "./Tile";

import classes from "./Line.module.css";

const tempWord = new Array(5).fill(" ");

const Line = (props) => {
  console.log(tempWord);

  const { solution, guess } = props;

  if (guess === " ") {
    return (
      <div className={classes.line}>
        {tempWord.map((letter, index) => (
          <Tile key={index} letter={letter} styles="" />
        ))}
      </div>
    );
  }

  const word = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let styles = "";
    if (props.isFinal) {
      console.log(char);
      if (solution[i] === char) {
        styles += "correct";
      } else if (solution.includes(guess[i])) {
        styles += "close";
      } else styles += "incorrect";
    }

    word.push(<Tile key={i} letter={char} styles={styles} />);
  }

  return <div className={classes.line}>{word}</div>;
};

export default Line;
