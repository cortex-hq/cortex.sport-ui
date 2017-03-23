import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response, Http} from "@angular/http";
import {CORTEX_CORE_SPORT_SERVICE} from "../config/api.config";

export interface ISport {
  id: string;
  label: string;
}

@Injectable()
export class SportsService {

  constructor(private http: Http) {}

  getAll(): Observable<ISport[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/sport.all'))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id: string): Observable<ISport[]> {
    return this.http.get(CORTEX_CORE_SPORT_SERVICE.concat('/sport.get/' + id))
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(sport: ISport): Observable<ISport[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/sport.create/'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(sport: ISport): Observable<ISport[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/sport.update/'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(sport: ISport): Observable<ISport[]> {
    return this.http.post(CORTEX_CORE_SPORT_SERVICE.concat('/sport.delete'), sport)
      .map((res: Response) => {
        return res.json().value;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
