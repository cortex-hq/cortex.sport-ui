import {IIncident} from "./incidents.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CORTEX_CORE_SPORT_SERVICE} from "../config/api.config";

export interface IGame {
  awayTeamId: string;
  homeTeamId: string;
  completed: boolean;
  awayScore: number;
  homeScore: number;
  where: string;
  date: string;
  seasonId: string;
  id: string;
  incidents?: IIncident[];
}

@Injectable()
export class GamesService {

  constructor(private http: Http) {
  }

  getAll(): Observable<IGame[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/game.all'))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id: string): Observable<IGame[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/game.get/' + id))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
