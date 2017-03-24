import { Component, OnInit } from '@angular/core';
import {TeamsService, ITeam} from "../../../../services/teams.service";
import {SportsService, ISport} from "../../../../services/sports.service";
import {ActivatedRoute} from "@angular/router";
import {TdMediaService} from "@covalent/core";

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  viewProviders: [TeamsService, SportsService]
})
export class TeamFormComponent implements OnInit {

  id: string;
  sportId: string;
  action:string;
  sports: ISport[];
  team: ITeam;

  constructor(private _sportsService: SportsService,
              private _teamsService: TeamsService,
             private _route: ActivatedRoute,
             public media: TdMediaService) {
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
        let teammId: string = params.id;
        this._teamsService.get(teammId).subscribe((team: any) => {
          this.sportId = team.sportId;
          this.id = team.label;
        });
      }
    });
  }

  save(): void {
    this.team = {
      sportId: this.sportId,
      id: this.id
    };

    if (this.action === 'add') {
      this._teamsService.create(this.team).subscribe(() => {
        this.goBack();
      });
    } else {
      this._teamsService.update(this.team).subscribe(() => {
        this.goBack();
      });
    }
  }

  private loadSports():void{
    this._sportsService.getAll().subscribe((sports: ISport[]) => {
      this.sports = sports;
    }, (error: Error) => {
      this._sportsService.getAll().subscribe((sports: ISport[]) => {
        this.sports = sports;
      });
    });
  }
}
