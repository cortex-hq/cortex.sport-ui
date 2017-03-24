import {IIncident} from "./incidents.service";

export interface IGame {
  awayTeamId: string;
  homeTeamId: string;
  completed: boolean;
  awayScore: number;
  homeScore: number;
  where: string;
  date: string;
  id: string;
  incidents?: IIncident[];
}
