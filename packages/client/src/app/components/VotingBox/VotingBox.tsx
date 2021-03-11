import React from "react";

import useVote from "~/app/hooks/useVote";

import styles from "./VotingBox.module.scss";

interface VotingBoxProps {
  name: string;
  image: string;
  votePercentage: number;
  voteNumber: number;
  onVote: () => void;
}

function VotingBox({name, image, votePercentage, onVote, voteNumber}: VotingBoxProps) {
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
      <h2 className={styles.name}>{name}</h2>
      <span>
        {((votePercentage || 0) * 100).toFixed(1)}% - Votes:{" "}
        {Math.round((votePercentage || 0) * state.votes.length)}
      </span>
      <h2>Type {voteNumber} in the chat to vote</h2>
    </button>
  );
}

export default VotingBox;
