export interface Vote {
  /** ID of used who voted */
  uuid: string;
  /** Index of option voted */
  vote: number;
}

export interface Option {
  /** Name of vote option (e.g.: "banana") */
  name: string;
  /** Image of vote option (e.g.: "https://images/banana.png") */
  image: string;
}

export interface State {
  /** List of votes */
  votes: Vote[];
  /** Record of votes by user id - allows a faster lookup of users that voted */
  voteRecord: Record<Vote["uuid"], Vote["vote"]>;
  /** Votes per option by index (e.g. [10,5]) */
  voteSummary: [number, number];
  /** Options to be voted */
  options: [Option, Option];
}
