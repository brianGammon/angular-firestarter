import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterNavComponent } from '../footer-nav/footer-nav.component';
import { EggsDailyComponent } from '../eggs-daily/eggs-daily.component';
import { EggsAddComponent } from '../eggs-add/eggs-add.component';
import { ChickenProfileComponent } from '../chicken-profile/chicken-profile.component';
import { FlocksComponent } from '../flocks/flocks.component';
import { FlockComponent } from '../flock/flock.component';
import { ChickenAddComponent } from '../chicken-add/chicken-add.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  declarations: [
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    FooterNavComponent,
    UserFormComponent,
    EggsDailyComponent,
    EggsAddComponent,
    ChickenProfileComponent,
    FlocksComponent,
    FlockComponent,
    ChickenAddComponent
  ],
  exports: [
    TopNavComponent,
    FooterNavComponent,
    UserProfileComponent,
  ]
})
export class UiModule { }
