import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CORTEX_CORE_SPORT_SERVICE} from "../config/api.config";
export interface ITeam{
  id: string;
  sportId: string;
  // players: Player[];
  // coach: Coach;
}

@Injectable()
export class TeamsService {

  constructor(private http: Http) {}

  getAll(): Observable<ITeam[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/team.all'))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id: string): Observable<ITeam[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/team.get/' + id))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(sport: ITeam): Observable<ITeam[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/team.create/'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(sport: ITeam): Observable<ITeam[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/team.update/'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(sport: ITeam): Observable<ITeam[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/team.delete'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
