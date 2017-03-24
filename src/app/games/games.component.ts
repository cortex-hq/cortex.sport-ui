import {Component, AfterViewInit} from "@angular/core";
import {GamesService, IGame} from "../../services/games.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  viewProviders: [ GamesService ],
})
export class GamesComponent implements AfterViewInit {

  games: IGame[];
  filteredGames: IGame[];

  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private _gamesService: GamesService,
              public media: TdMediaService) {
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle( 'Covalent Games' );
    this.loadUsers();
  }

  // filterUsers(displayName: string = ''): void {
  //   this.filteredGames = this.games.filter((game: IGame) => {
  //     return game.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
  //   });
  // }

  loadUsers(): void {
    this._loadingService.register('games.list');
    this._gamesService.getAll().subscribe((games: IGame[]) => {
      this.games = games;
      this.filteredGames = games;
      this._loadingService.resolve('games.list');
    }, (error: Error) => {
      this._gamesService.getAll().subscribe((games: IGame[]) => {
        this.games = games;
        this.filteredGames = games;
        this._loadingService.resolve('games.list');
      });
    });
  }
}
