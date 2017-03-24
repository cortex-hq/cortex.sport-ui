import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ISeason, SeasonsService} from "../../services/seasons.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
  viewProviders: [SeasonsService]
})
export class SeasonsComponent implements AfterViewInit {

  seasons: ISeason[];
  filteredSeasons: ISeason[];

  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private _seasonsService: SeasonsService,
              public media: TdMediaService) {
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle('Covalent seasons');
    this.loadSeasons();
  }

  filterSeasons(displayName: string = ''): void {
    this.filteredSeasons = this.seasons.filter((season: ISeason) => {
      return season;//.label.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  loadSeasons(): void {
    this._loadingService.register('seasons.list');
    this._seasonsService.getAll().subscribe((seasons: ISeason[]) => {
      this.seasons = seasons;
      this.filteredSeasons = seasons;
      this._loadingService.resolve('seasons.list');
    }, (error: Error) => {
      this._seasonsService.getAll().subscribe((seasons: ISeason[]) => {
        this.seasons = seasons;
        this.filteredSeasons = seasons;
        this._loadingService.resolve('seasons.list');
      });
    });
  }

  deleteSeasons(season: ISeason): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this season?'})
      .afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this._loadingService.register('seasons.list');
        this._seasonsService.delete(season).subscribe(() => {
          this.seasons = this.seasons.filter((seasons: ISeason) => {
            return seasons.id !== season.id;
          });
          this.filteredSeasons = this.filteredSeasons.filter((seasons: ISeason) => {
            return seasons.id !== season.id;
          });
          this._loadingService.resolve('seasons.list');
          this._snackBarService.open('Season deleted', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('seasons.list');
        });
      }
    });
  }
}
