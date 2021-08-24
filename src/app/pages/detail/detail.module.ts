import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DetailPage } from './detail.page';
import { ComponentsModule } from '../../components/component.module';
import { TruncateModule } from 'ng2-truncate';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncateModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()

  ],
  declarations: [DetailPage]
})
export class DetailPageModule { }
