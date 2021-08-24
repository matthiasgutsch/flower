import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  NavController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  
  LoadingController
} from '@ionic/angular';
import { Pages } from 'src/app/models/pokeapi';

import { take } from 'rxjs/operators';

import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { StartupService } from '../../services/startup.service';
import { PageService } from 'src/app/services/page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.page.html',
  styleUrls: ['./subpage.page.scss'],
})
export class SubpagePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public startupService: StartupService,
    public route: ActivatedRoute,
    public pageService: PageService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, 
    public loadingController: LoadingController, 

  ) { }

  results = [];
  timeout;
  page=12;
  subpages: Pages[] = [];
  pages: Pages[] = [];
  files: Pages[] = [];


  ngOnInit() {
    this.getPage();
    this.getFilespage();

    this.getSubpage();
  }



  async getPage() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    await this.startupService
      .getPageId(this.route.snapshot.paramMap.get("id"))

      .subscribe(
        (pages: Pages[]) => {
          this.pages = [...this.pages, ...pages];
         });
         loading.dismiss();
  }

  async getFilespage() {
    await this.startupService
      .getFilesById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (files: Pages[]) => {
          this.files = [...this.files, ...files];
         });
  }

  async getSubpage() {
    await this.startupService
      .getSubpageById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (subpages: Pages[]) => {
          this.subpages = [...this.subpages, ...subpages];
         });
  }

  async notifications(ev?: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
