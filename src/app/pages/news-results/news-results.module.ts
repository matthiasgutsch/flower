import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TruncateModule } from 'ng2-truncate';

import { ComponentsModule } from '../../components/component.module';

import { NewsResultsPage } from './news-results.page';

const routes: Routes = [
  {
    path: '',
    component: NewsResultsPage
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
    RouterModule.forChild(routes)
  ],
  declarations: [NewsResultsPage]
})
export class NewsResultsPageModule {}
