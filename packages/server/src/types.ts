export interface Vote {
  uuid: string;
  vote: number;
}

export interface Option {
  name: string;
  image: string;
}

export interface State {
  votes: Vote[];
  voteSummary: [number, number];
  options: [Option, Option];
}
