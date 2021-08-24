import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/component.module';

import { IonicModule } from '@ionic/angular';

import { AreaSubPage } from '../area-subpage/area-subpage.page';

const routes: Routes = [
  {
    path: '',
    component: AreaSubPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AreaSubPage]
})
export class AreaSubPageModule {}
