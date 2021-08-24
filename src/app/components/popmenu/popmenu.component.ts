import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss']
})
export class PopmenuComponent implements OnInit {
  openMenu: boolean = false;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.togglePopupMenu();
  }

  state = false;
  enabled = true;

  
  
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  list() {
    this.navCtrl.navigateForward('list');
  }

  featured() {
    this.navCtrl.navigateForward('featured');
  }

  news() {
    this.navCtrl.navigateForward('news');
  }


  settings() {
    this.navCtrl.navigateForward('settings');
    
  }

}
