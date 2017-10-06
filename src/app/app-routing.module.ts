import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
// import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { EggsDailyComponent } from './ui/eggs-daily/eggs-daily.component';
import { EggsAddComponent } from './ui/eggs-add/eggs-add.component';
import { ChickenProfileComponent } from './ui/chicken-profile/chicken-profile.component';
import { FlocksComponent } from './ui/flocks/flocks.component';
import { FlockComponent } from './ui/flock/flock.component';
import { ChickenAddComponent } from './ui/chicken-add/chicken-add.component';


import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent, },
  { path: 'eggs/:date', component: EggsDailyComponent, canActivate: [AuthGuard]},
  { path: 'chicken/:chickenId', component: ChickenProfileComponent, canActivate: [AuthGuard] },
  { path: 'chicken-add', component: ChickenAddComponent, canActivate: [AuthGuard] },
  { path: 'flocks', component: FlocksComponent, canActivate: [AuthGuard] },
  { path: 'flock', component: FlockComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule' },
  { path: 'today', component: EggsDailyComponent, canActivate: [AuthGuard]},
  { path: 'add', component: EggsAddComponent, canActivate: [AuthGuard]}

  // { path: 'uploads', component: UploadsListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
