import { Component, OnInit, Input } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController
} from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { MenuService } from '../../../services/menu.service';
import { SearchFilterPage } from '../../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../../modal/image/image.page';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss']
})
export class ItemDetailsPage implements OnInit {
  @Input() information: any;
  results = [];
  resultsRandom = [];
  timeout;

  
  constructor(private modalCtrl: ModalController,
    public menuService: MenuService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {}

    ngOnInit(): void {
      this.find();
      this.findRandom();

  
    }
  
    ionViewWillEnter() {
      this.menuCtrl.enable(true);
    }
  
    onSearchChange(searchKey: string) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.find({ page_title: searchKey }), 400);
    }
  
    find(searchFilter: any = {}) {
      this.menuService
        .find(searchFilter)
        .subscribe(
          (response) => (this.results = response),
          (err) => console.log(err)
        );
    }

    findRandom(searchFilter: any = {}) {
      this.menuService
        .findRandom(searchFilter)
        .subscribe(
          (response) => (this.resultsRandom = response),
          (err) => console.log(err)
        );
    }

  
    settings() {
      this.navCtrl.navigateForward('settings');
    }
  
    
  
    
  
    async presentImage(image: any) {
      const modal = await this.modalCtrl.create({
        component: ImagePage,
        componentProps: { value: image }
      });
      return await modal.present();
    }
  
    async presentItem(item: any) {
      const modal = await this.modalCtrl.create({
        component: ItemDetailsPage,
        componentProps: { information: item }
      });
      return await modal.present();
    }
  
  
    

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
