import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/component.module';

import { IonicModule } from '@ionic/angular';

import { PagePage } from './page.page';

const routes: Routes = [
  {
    path: '',
    component: PagePage
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
  declarations: [PagePage]
})
export class PagePageModule {}
