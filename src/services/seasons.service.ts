import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CORTEX_CORE_SPORT_SERVICE} from '../config/api.config';
import {IGame} from "./games.service";

export class ISeason {
  sportId: string;
  endDate: string;
  startDate: string;
  id: string;
  games?: IGame[];
}

export class IInjuryReport{
  seasonId: string;
  gameId: string;
}

@Injectable()
export class SeasonsService {

  constructor(private http: Http) {
  }

  getAll(): Observable<ISeason[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/season.all'))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id: string): Observable<ISeason[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/season.get/' + id))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(season: ISeason): Observable<ISeason[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/season.create/'), season)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(season: ISeason): Observable<ISeason[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/season.update/'), season)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(season: ISeason): Observable<ISeason[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/season.delete'), season)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  reportInjury(injuryReport: IInjuryReport): Observable<ISeason[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/sport.reportinjury'), injuryReport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateGame(game: IGame): Observable<ISeason[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/season.updategame'), game)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
