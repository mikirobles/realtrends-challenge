import * as React from "react";

import VotingBox from "~/app/components/VotingBox";
import useVote from "~/app/hooks/useVote";
import logo from "~/assets/logo.svg";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const [state, vote, resetVote] = useVote();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          <img alt="RealTrends" src={logo} width={180} />
        </h1>
        <div className={styles.optionsContainer}>
          {state.options.map((option, index) => (
            <VotingBox
              key={index}
              image={option.image}
              name={option.name}
              votePercentage={state.voteSummary[index] / state.votes.length}
              onVote={() => vote(index)}
            />
          ))}
        </div>
        <button style={{margin: 20}} onClick={resetVote}>
          STOP THE COUNT!!!!
        </button>
      </header>
    </main>
  );
};

export default Home;
