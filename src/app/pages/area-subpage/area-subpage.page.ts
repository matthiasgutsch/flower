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
import { Pages, Products} from 'src/app/models/pokeapi';

import { take } from 'rxjs/operators';

import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { StartupService } from '../../services/startup.service';
import { PageService } from 'src/app/services/page.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';

@Component({
  selector: 'app-area-subpage',
  templateUrl: './area-subpage.page.html',
  styleUrls: ['./area-subpage.page.scss'],
})
export class AreaSubPage implements OnInit {

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

  ) { this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();}

  results = [];
  timeout;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  returnUrl: string;
  page=12;
  subpages: Pages[] = [];
  products: Products[] = [];

  pages: Pages[] = [];
  files: Pages[] = [];


  ngOnInit() {
    this.getPage();
    this.getSubpage();
    this.getProducts();
    this.getFilespage();
  }



  async getPage() {
    await this.startupService
      .getPageId(this.route.snapshot.paramMap.get("id"))

      .subscribe(
        (pages: Pages[]) => {
          this.pages = [...this.pages, ...pages];
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

  async getProducts() {
    await this.startupService
      .getProductsById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (products: Products[]) => {
          this.products = [...this.products, ...products];
         });
  }


  async getFilespage() {
    await this.startupService
      .getFilesById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (files: Pages[]) => {
          this.files = [...this.files, ...files];
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


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.navCtrl.navigateForward('area/11');

}

}
