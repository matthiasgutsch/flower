import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './shared/interfaces/pages';
import { TranslateService } from '@ngx-translate/core';
import { EventProvider } from './event-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages: Array<Pages>;
  openMenu: Boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private translate: TranslateService,
    private eventProvider:EventProvider
  ) {
    this.appPages = [
      {
        group: 'Menu',
        itens: [
          {
            title: 'Home',
            // url: '/home-results',
            url: 'home',
            direct: 'root',
            icon: 'home'
          },
          {
            title: 'Chi siamo',
            url: '/page/2',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
        
          {
            title: 'Mantova in Festival',
            url: '/page/39',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          {
            title: 'Servizi alla Persona',
            url: '/page/5',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          
          {
            title: 'Attività in corso',
            url: '/page/11',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          

          {
            title: 'Diventa Socio',
            url: '/page/838',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
           
          
          {
            title: 'Scopi & Obiettivi',
            url: '/page/904',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          {
            title: 'Corsi',
            url: '/list',
            direct: 'forward',
            icon: 'search'
          },

         
          {
            title: 'News',
            url: '/news',
            direct: 'forward',
            icon: 'information'
          },
          {
            title: 'Convenzioni',
            url: '/page/27',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          {
            title: 'Contatti',
            url: '/page/38',
            direct: 'forward',
            icon: 'information-circle-outline'
          }
        ]
      }
    ];

    

    translate.setDefaultLang('it');

  
    this.initializeApp();
    this.eventProvider.currentLang.subscribe(lang => {
      this.translate.use(lang);
    });

    this.initializeApp();
  }

  
  soci() {
    this.navCtrl.navigateForward('login');
    return this.openMenu = !this.openMenu;
  }

  initializeApp() {
    this.platform
      .ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      })
      .catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
}
