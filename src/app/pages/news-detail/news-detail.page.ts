import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';

import { StartupService } from '../../services/startup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  news: any = {};
  newsRandom: any;

  slideOpts = {
    slidesPerView: 3,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 2,
      slideShadows: false,
    }
  }

  constructor( public loadingCtrl: LoadingController, 
    public loadingController: LoadingController, 
    public startupService: StartupService,
    public route: ActivatedRoute, public router: Router, private location: Location) { }

  ngOnInit() {
    this.getStudent();
  }

 
  async getStudent() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    await this.startupService.getPokemonNewsById(this.route.snapshot.paramMap.get('id'))
    
      .subscribe(res => {
        this.news = res;
        res.photo = this.getImageURL(res.photo);
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
  }

  private getImageURL(index: number) {
    const IMAGE_URL = 'https://www.associazionecomunali.it/assets/pages/';
    return `${IMAGE_URL}${index}`;
  }
  
  


  


}
