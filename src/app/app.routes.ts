import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/form/form.component';
import { LogsComponent } from './logs/logs.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardTemplateComponent } from './templates/dashboard/dashboard.component';
import { EmailTemplateComponent } from './templates/email/email.component';
import { EditorTemplateComponent } from './templates/editor/editor.component';
import {SportsComponent} from "./sports/sports.component";
import {SportFormComponent} from "./sports/form/sport-form.component";
import {SeasonsComponent} from "./seasons/seasons.component";
import {SeasonFormComponent} from "./seasons/form/season-form.component";
import {GamesComponent} from "./games/games.component";
import {GameFormComponent} from "./games/form/game-form.component";
import {TeamsComponent} from "./teams/teams.component";
import {TeamFormComponent} from "./teams/form/team-form/team-form.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [{
      component: DashboardComponent,
      path: '',
    },
    {path: 'product', component: DashboardProductComponent, children: [
      {path: '', component: ProductOverviewComponent},
      {path: 'stats', component: ProductStatsComponent},
      {path: 'features', children: [
        {path: '', component: ProductFeaturesComponent},
        {path: 'add', component: FeaturesFormComponent},
        {path: ':id/delete', component: FeaturesFormComponent},
        {path: ':id/edit', component: FeaturesFormComponent},
      ]},
    ]},
    {path: 'item/:id', component: DetailComponent},
    {path: 'logs', component: LogsComponent},
    {path: 'form', component: FormComponent},
    {path: 'users', children: [
      {path: '', component: UsersComponent},
      {path: 'add', component: UsersFormComponent},
      {path: ':id/delete', component: UsersFormComponent},
      {path: ':id/edit', component: UsersFormComponent},
    ]},
    {path: 'sport', children: [
      {path: '', component: SportsComponent},
      {path: 'add', component: SportFormComponent},
      {path: ':id/delete', component: SportFormComponent},
      {path: ':id/edit', component: SportFormComponent},
    ]},
    {path: 'seasons', children: [
      {path: '', component: SeasonsComponent},
      {path: 'add', component: SeasonFormComponent},
      {path: ':id/delete', component: SeasonFormComponent},
      {path: ':id/edit', component: SeasonFormComponent},
    ]},
    {path: 'games', children: [
      {path: '', component: GamesComponent},
      {path: 'add', component: GameFormComponent},
      {path: ':id/delete', component: GameFormComponent},
      {path: ':id/edit', component: GameFormComponent},
    ]},
    {path: 'teams', children: [
      {path: '', component: TeamsComponent},
      {path: 'add', component: TeamFormComponent},
      {path: ':id/delete', component: TeamFormComponent},
      {path: ':id/edit', component: TeamFormComponent},
    ]},
    {path: 'templates', children: [
      {path: '', component: TemplatesComponent},
      {path: 'dashboard', component: DashboardTemplateComponent},
      {path: 'email', component: EmailTemplateComponent},
      {path: 'editor', component: EditorTemplateComponent},
    ]},
  ]},
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
