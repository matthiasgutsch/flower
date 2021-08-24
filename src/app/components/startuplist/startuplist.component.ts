import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StartupService } from "../../services/startup.service";
import { Pipe, PipeTransform } from "@angular/core";
import { Startup } from "src/app/models/pokeapi";

@Component({
  selector: 'startuplist',
  templateUrl: './startuplist.component.html',
  styleUrls: ['./startuplist.component.scss']
})
export class StartupListComponent implements OnInit {
  openMenu: Boolean = false;
  startups: Startup[] = [];

  constructor(public navCtrl: NavController,
    public startupService: StartupService,) { }

  ngOnInit() {
    
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  list() {
    this.navCtrl.navigateForward('list');
    return this.openMenu = !this.openMenu;
  }

  markets() {
    this.navCtrl.navigateForward('markets');
    return this.openMenu = !this.openMenu;
  }
  

  home() {
    this.navCtrl.navigateForward('home');
    return this.openMenu = !this.openMenu;
  }

  news() {
    this.navCtrl.navigateForward('news');
    return this.openMenu = !this.openMenu;
  }


  author() {
    this.navCtrl.navigateForward('authors');
    return this.openMenu = !this.openMenu;
  }



  about() {
    this.navCtrl.navigateForward('about');
    return this.openMenu = !this.openMenu;
  }


  featured() {
    this.navCtrl.navigateForward('featured');
    return this.openMenu = !this.openMenu;
  }




  settings() {
    this.navCtrl.navigateForward('settings');
    
  }

}
