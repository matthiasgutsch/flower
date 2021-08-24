import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  openMenu: Boolean = false;

  constructor(public navCtrl: NavController) { }

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
    this.navCtrl.navigateForward('');
    return this.openMenu = !this.openMenu;
  }

  news() {
    this.navCtrl.navigateForward('news');
    return this.openMenu = !this.openMenu;
  }



  about() {
    this.navCtrl.navigateForward('page/2');
    return this.openMenu = !this.openMenu;
  }


  contatti() {
    this.navCtrl.navigateForward('page/38');
    return this.openMenu = !this.openMenu;
  }


  area() {
    this.navCtrl.navigateForward('area/11');
    return this.openMenu = !this.openMenu;
  }
}
