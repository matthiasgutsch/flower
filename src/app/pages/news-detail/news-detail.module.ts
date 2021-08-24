import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/component.module';
import { TruncateModule } from 'ng2-truncate';

import { NewsDetailPage } from './news-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TruncateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsDetailPage]
})
export class NewsDetailPageModule { }
