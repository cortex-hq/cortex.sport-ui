import {Component, AfterViewInit} from '@angular/core';
import {SportsService, ISport} from "../../services/sports.service";
import {TdMediaService, TdDialogService, TdLoadingService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
  viewProviders: [SportsService]
})
export class SportsComponent implements AfterViewInit {

  sports: ISport[];
  filteredSports: ISport[];

  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private _sportsService: SportsService,
              public media: TdMediaService) {
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle('Covalent Sports');
    this.loadSports();
  }

  filterSports(displayName: string = ''): void {
    this.filteredSports = this.sports.filter((sport: ISport) => {
      return sport.label.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  loadSports(): void {
    this._loadingService.register('sports.list');
    this._sportsService.getAll().subscribe((sports: ISport[]) => {
      this.sports = sports;
      this.filteredSports = sports;
      this._loadingService.resolve('sports.list');
    }, (error: Error) => {
      this._sportsService.getAll().subscribe((sports: ISport[]) => {
        this.sports = sports;
        this.filteredSports = sports;
        this._loadingService.resolve('sports.list');
      });
    });
  }

  deleteSports(sport: ISport): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this sport?'})
      .afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this._loadingService.register('sports.list');
        this._sportsService.delete(sport).subscribe(() => {
          this.sports = this.sports.filter((sports: ISport) => {
            return sports.id !== sport.id;
          });
          this.filteredSports = this.filteredSports.filter((sports: ISport) => {
            return sports.id !== sport.id;
          });
          this._loadingService.resolve('sports.list');
          this._snackBarService.open('Sport deleted', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('sports.list');
        });
      }
    });
  }
}
