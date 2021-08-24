import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/component.module';

import { TruncateModule } from 'ng2-truncate';
import { TranslateModule } from '@ngx-translate/core';

import { HomeResultsPage } from './home-results.page';

const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    TruncateModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()

  ],
  declarations: [HomeResultsPage]
})
export class HomeResultsPageModule {}
