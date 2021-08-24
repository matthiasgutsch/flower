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
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  returnUrl: string;
  viewer = 'google';
  selectedType = 'pdf';
 
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

  ) {  
}

  results = [];
  timeout;
  page=12;
  files: Pages[] = [];


  ngOnInit() {
    
      this.startupService
       .getFileById(this.route.snapshot.paramMap.get("id"))
       .subscribe(
         (files: Pages[]) => {
           this.files = [...this.files, ...files];
          });
   
  }




  

 


}
