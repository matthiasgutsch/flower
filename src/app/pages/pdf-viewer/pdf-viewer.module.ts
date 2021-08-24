import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/component.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { IonicModule } from '@ionic/angular';

import { PdfViewerPage } from './pdf-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: PdfViewerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDocViewerModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PdfViewerPage]
})
export class PdfViewerPageModule {}
