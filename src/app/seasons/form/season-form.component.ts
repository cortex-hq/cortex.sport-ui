import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SeasonsService, ISeason} from "../../../services/seasons.service";
import {ActivatedRoute} from "@angular/router";
import {TdMediaService} from "@covalent/core";
import {IGame} from "../../../services/games.service";
import {ISport, SportsService} from "../../../services/sports.service";

@Component({
  selector: 'app-season-form',
  templateUrl: 'season-form.component.html',
  styleUrls: ['season-form.component.scss'],
  viewProviders: [SeasonsService, SportsService]
})
export class SeasonFormComponent implements OnInit, AfterViewInit {

  sportId: string;
  endDate: string;
  startDate: string;
  id: string;
  action: string;
  season: ISeason;
  games: IGame[];
  sports: ISport[];

  constructor(private _seasonsService: SeasonsService,
              private _route: ActivatedRoute,
              public media: TdMediaService,
              private _sportsService: SportsService) {
  }

  goBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this.loadSports();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      if (params.id) {
        let userId: string = params.id;
        this._seasonsService.get(userId).subscribe((season: any) => {
          this.sportId = season.sportId;
          this.endDate = season.endDate;
          this.startDate = season.startDate;
          this.id = season.id;
          this.games = season.games;
        });
      }
    });
  }

  save(): void {
    this.season = {
      sportId: this.sportId,
      endDate: this.endDate,
      startDate: this.startDate,
      id: this.id,
      games: this.games,
    };
    if (this.action === 'add') {
      this._seasonsService.create(this.season).subscribe(() => {
        this.goBack();
      });
    } else {
      this._seasonsService.update(this.season).subscribe(() => {
        this.goBack();
      });
    }
  }

  private loadSports(): void {
    this._sportsService.getAll().subscribe((sports: ISport[]) => {
      this.sports = sports;
    }, (error: Error) => {
      this._sportsService.getAll().subscribe((sports: ISport[]) => {
        this.sports = sports;
      });
    });
  }
}
