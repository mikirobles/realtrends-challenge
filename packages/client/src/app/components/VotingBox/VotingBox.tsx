import React from "react";

import useVote from "~/app/hooks/useVote";

import styles from "./VotingBox.module.scss";

interface VotingBoxProps {
  name: string;
  image: string;
  votePercentage: number;
  onVote: () => void;
}

function VotingBox({name, image, votePercentage, onVote}: VotingBoxProps) {
  // color is hsl range between 12 - 128
  const [state] = useVote();
  const color = votePercentage * 116 + 12;

  const style = {
    "--vote": `${votePercentage * 100}%`,
    "--color": votePercentage ? `hsl(${color}, 100%, 67%)` : "black",
  } as React.CSSProperties;

  return (
    <button className={styles.container} style={style} onClick={onVote}>
      <img src={image} />
      <span>{name}</span> <br />
      <span>
        {((votePercentage || 0) * 100).toFixed(1)}% - Votes:{" "}
        {Math.round((votePercentage || 0) * state.votes.length)}
      </span>
    </button>
  );
}

export default VotingBox;
