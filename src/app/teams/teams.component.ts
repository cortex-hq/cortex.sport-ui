import {Component, AfterViewInit} from "@angular/core";
import {TdMediaService, TdDialogService, TdLoadingService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TeamsService, ITeam} from "../../services/teams.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  viewProviders: [TeamsService]
})
export class TeamsComponent implements AfterViewInit {

  teams: ITeam[];
  filteredTeams: ITeam[];

  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private _teamsService: TeamsService,
              public media: TdMediaService) {
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle('Covalent Teams');
    this.loadTeams();
  }

  // filterTeams(displayName: string = ''): void {
  //   this.filteredTeams = this.teams.filter((teams: ITeam) => {
  //     return team.label.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
  //   });
  // }

  loadTeams(): void {
    this._loadingService.register('teams.list');
    this._teamsService.getAll().subscribe((teams: ITeam[]) => {
      this.teams = teams;
      this.filteredTeams = teams;
      this._loadingService.resolve('teams.list');
    }, (error: Error) => {
      this._teamsService.getAll().subscribe((teams: ITeam[]) => {
        this.teams = teams;
        this.filteredTeams = teams;
        this._loadingService.resolve('teams.list');
      });
    });
  }

  deleteTeams(team: ITeam): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this team?'})
      .afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this._loadingService.register('teams.list');
        this._teamsService.delete(team).subscribe(() => {
          this.teams = this.teams.filter((teams: ITeam) => {
            return teams.id !== team.id;
          });
          this.filteredTeams = this.filteredTeams.filter((teams: ITeam) => {
            return teams.id !== team.id;
          });
          this._loadingService.resolve('teams.list');
          this._snackBarService.open('Team deleted', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('teams.list');
        });
      }
    });
  }
}
