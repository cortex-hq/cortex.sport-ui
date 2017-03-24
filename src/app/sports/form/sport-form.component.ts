import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SportsService, ISport} from "../../../services/sports.service";
import {TdMediaService} from "@covalent/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sport-form',
  templateUrl: 'sport-form.component.html',
  styleUrls: ['sport-form.component.scss'],
  viewProviders: [SportsService]
})
export class SportFormComponent implements OnInit, AfterViewInit {

  id: string;
  label: string;
  sport: ISport;
  action: string;

  constructor(private _sportsService: SportsService,
              private _route: ActivatedRoute,
              public media: TdMediaService) {
  }

  goBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      if (params.id) {
        let userId: string = params.id;
        this._sportsService.get(userId).subscribe((sport: any) => {
          this.label = sport.label;
          this.id = sport.label;
        });
      }
    });
  }

  save(): void {
    this.sport = {
      label: this.label,
      id: this.id
    };

    if (this.action === 'add') {
      this._sportsService.create(this.sport).subscribe(() => {
        this.goBack();
      });
    } else {
      this._sportsService.update(this.sport).subscribe(() => {
        this.goBack();
      });
    }
  }
}
