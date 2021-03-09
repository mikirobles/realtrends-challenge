import React from "react";

import useVote from "~/app/hooks/useVote";

import styles from "./CombatLog.module.scss";

function CombatLog() {
  const [state] = useVote();

  return (
    <div className={styles.container}>
      <h3>Combat log:</h3>
      <div className={styles.combatLog}>
        {state.votes.map(({uuid, vote}, index) => (
          <div key={index}>
            <p>{`${uuid} voted for ${state.options[vote].name}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CombatLog;
