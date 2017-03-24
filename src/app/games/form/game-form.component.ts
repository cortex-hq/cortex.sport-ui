import {Component, OnInit, AfterViewInit} from '@angular/core';
import {GamesService, IGame} from "../../../services/games.service";
import {IIncident} from "../../../services/incidents.service";
import {ActivatedRoute} from "@angular/router";
import {TdMediaService} from "@covalent/core";
import {ISeason, SeasonsService} from "../../../services/seasons.service";
import {TeamsService, ITeam} from "../../../services/teams.service";

@Component({
  selector: 'app-game-form',
  templateUrl: 'game-form.component.html',
  styleUrls: ['game-form.component.scss'],
  viewProviders: [GamesService, SeasonsService, TeamsService]
})
export class GameFormComponent implements OnInit, AfterViewInit {

  action: string;
  awayTeamId: string;
  homeTeamId: string;
  completed: boolean;
  awayScore: number;
  homeScore: number;
  where: string;
  date: string;
  seasonId: string;
  id: string;
  season: ISeason;
  incidents: IIncident[];
  seasons: ISeason[];
  teams: ITeam[];
  game: IGame;

  constructor(private _gamesService: GamesService,
              private _teamsService: TeamsService,
              private _seasonsService: SeasonsService,
              private _route: ActivatedRoute,
              public media: TdMediaService) {
    this.awayScore = 0;
    this.homeScore = 0;
  }

  goBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this.loadSeasons();
    this.loadTeams();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      if (params.id) {
        let userId: string = params.id;
        this._gamesService.get(userId).subscribe((game: any) => {
          this.awayTeamId = game.awayTeamId;
          this.homeTeamId = game.homeTeamId;
          this.completed = game.completed;
          this.awayScore = game.awayScore;
          this.homeScore = game.homeScore;
          this.where = game.where;
          this.date = game.date;
          this.seasonId = game.seasonId;
          this.id = game.id;
          this.incidents = game.incidents;
        });
      }
    });
  }

  save(): void {
    this.game = {
      awayTeamId: this.awayTeamId,
      homeTeamId: this.homeTeamId,
      completed: this.completed,
      awayScore: this.awayScore,
      homeScore: this.homeScore,
      where: this.where,
      date: this.date,
      seasonId: this.seasonId,
      id: this.id,
      incidents: this.incidents
    };

    if (this.action === 'add') {
      this.season.games.push(this.game); //TODO
      this._seasonsService.update(this.season).subscribe(() => {
        this.goBack();
      });
    } else {
      this._seasonsService.updateGame(this.game).subscribe(() => {
        this.goBack();
      });
    }
  }

  private loadSeasons(): void {
    this._seasonsService.getAll().subscribe((sports: ISeason[]) => {
      this.seasons = sports;
    }, (error: Error) => {
      this._seasonsService.getAll().subscribe((sports: ISeason[]) => {
        this.seasons = sports;
      });
    });
  }

  private loadTeams(): void {
    this._teamsService.getAll().subscribe((ITeam: ITeam[]) => {
      this.teams = ITeam;
    }, (error: Error) => {
      this._seasonsService.getAll().subscribe((ITeam: ITeam[]) => {
        this.teams = ITeam;
      });
    });
  }
}
