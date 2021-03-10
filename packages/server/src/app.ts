import {createServer} from "http";

import {Socket} from "socket.io";
import {Server} from "socket.io";
import {ChatClient} from "twitch-chat-client";

import {State} from "./types";

const httpServer = createServer();

// Set up socket io / chat listeners
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const chatClient = ChatClient.anonymous({
  channels: ["goncypozzo"],
});
chatClient.connect();

// Set up empty app state
const state: State = {
  votes: [],
  voteRecord: {},
  voteSummary: [0, 0],
  options: [
    {
      name: "Goncy",
      image: "https://pbs.twimg.com/profile_images/1199686661954818050/IRXOiWJY.jpg",
    },
    {
      name: "Dan Abramov",
      image: "https://miro.medium.com/max/3150/1*xxVEfOOAmIKHWOUloRKLhw.jpeg",
    },
  ],
};

// Helper function to prevent duplicate votes
function hasVoted(id: string): boolean {
  return !!state.voteRecord[id];
}

function vote(uuid: string, vote: number) {
  if (hasVoted(uuid)) return;
  state.votes.push({
    uuid,
    vote,
  });
  state.voteSummary[vote] += 1;
  state.voteRecord[uuid] = vote;
}

function resetState() {
  state.votes = [];
  state.voteSummary = [0, 0];
  state.voteRecord = {};
}

// Handle client-side votes
io.on("connection", async (socket: Socket) => {
  socket.join("voting-room");

  socket.emit("update", state);

  socket.on("vote", (votingIndex) => {
    vote(socket.id, votingIndex);
    io.to("voting-room").emit("update", state);
  });

  socket.on("resetVote", () => {
    resetState();
    io.to("voting-room").emit("update", state);
  });
});

// Handle twitch votes
chatClient.onMessage((_, user, message) => {
  if (message === "1" || message === "2") {
    const optionVoted = Number(message);
    vote(user, optionVoted - 1);
  }
});

httpServer.listen(3001);
