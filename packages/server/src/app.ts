import {createServer} from "http";

import {Socket} from "socket.io";
import {Server} from "socket.io";

import {State} from "./types";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const state: State = {
  votes: [],
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

io.on("connection", (socket: Socket) => {
  socket.join("voting-room");

  socket.emit("update", state);

  socket.on("vote", (votingIndex) => {
    state.votes.push({
      uuid: socket.id,
      vote: votingIndex,
    });
    state.voteSummary[votingIndex] += 1;
    io.to("voting-room").emit("update", state);
  });

  socket.on("resetVote", () => {
    state.votes = [];
    state.voteSummary = [0, 0];
    io.to("voting-room").emit("update", state);
  });
});

httpServer.listen(3001);
