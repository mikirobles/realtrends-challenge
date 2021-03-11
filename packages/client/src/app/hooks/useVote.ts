import {useCallback, useState} from "react";
import {io} from "socket.io-client";

const socket = io("http://localhost:3001/");

export interface Vote {
  uuid: string;
  vote: number;
}

export interface Option {
  name: string;
  image: string;
}

export interface VotingState {
  votes: Vote[];
  voteSummary: [number, number];
  options: [Option, Option];
}

const initialState: VotingState = {
  voteSummary: [0, 0],
  votes: [],
  options: [
    {name: "Loading...", image: ""},
    {name: "Loading...", image: ""},
  ],
};

function useVote() {
  // @Performance: Put the state in a context/global state,
  // so it does not need to be initialized on every hook call
  const [state, setState] = useState<VotingState>(initialState);

  socket.on("update", (newState: VotingState) => setState(newState));

  const vote = useCallback((optionIndex) => {
    socket.emit("vote", optionIndex);
  }, []);

  const resetVote = useCallback(() => {
    socket.emit("resetVote");
  }, []);

  return [state, vote, resetVote] as const;
}

export default useVote;
