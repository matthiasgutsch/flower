import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TruncateModule } from 'ng2-truncate';

import { ComponentsModule } from '../../components/component.module';
import { TranslateModule } from '@ngx-translate/core';

import { HomepagePage } from './homepage.page';

const routes: Routes = [
  {
    path: '',
    component: HomepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TruncateModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [HomepagePage]
})
export class HomepagePageModule {}
