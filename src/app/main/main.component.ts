import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
    title: 'Seasons',
    route: '/seasons',
    icon: 'people',
  },
    {
      title: 'Teams',
      route: '/teams',
      icon: 'people',
    },
    {
      title: 'Games',
      route: '/games',
      icon: 'people',
    }, {
      title: 'Sports',
      route: '/sport',
      icon: 'people',
    }, {
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },
  ];

  constructor(private _router: Router) {
  }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
