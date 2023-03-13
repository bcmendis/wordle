import React from "react";
import classes from "./Tile.module.css";

const Tile = (props) => {
  return (
    <div
      className={`${classes.letter} ${
        props.styles === "correct"
          ? classes.correct
          : props.styles === "incorrect"
          ? classes.incorrect
          : props.styles === "close"
          ? classes.close
          : ""
      }`}
    >
      {props.letter}
    </div>
  );
};

export default Tile;
