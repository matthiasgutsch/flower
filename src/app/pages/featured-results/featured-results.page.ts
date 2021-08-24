import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  NavController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokeapi';
import { take } from 'rxjs/operators';
// Modals
import { LoadingController, AlertController } from '@ionic/angular';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { ItemDetailsPage } from '../modal/item-details/item-details.page';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-featured-results',
  templateUrl: './featured-results.page.html',
  styleUrls: ['./featured-results.page.scss']
})
export class FeaturedResultsPage implements OnInit {
  yourLocation = '123 Test Street';
  openMenu: Boolean = false;


  results = [];
  timeout;
  page=1;

  categories = [];
  tags = [];

  scrollPosition = 0;
  pokemons: Pokemon[] = [];
  private offset = 1;

  @ViewChild(IonContent) ioncontent: IonContent;
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public menuService: MenuService,
    public loadingController: LoadingController
  ) {}



  ngOnInit(): void {

    this.loadPokemon();

  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  loadPokemon(loadMore = false, evt?: { target: { complete: () => void } }) {
    if (loadMore) {
      this.offset += 1;
    }

    this.menuService
      .getPokemonFeaturedList(this.offset)
      .pipe(take(1))
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = [...this.pokemons, ...pokemons];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  onSearch(evt: CustomEvent) {
    const value = evt.detail.value;

    if (value) {
      this.menuService.findPokemon(value).subscribe(
        res => {
          this.pokemons = res;
        },
        err => {
          this.pokemons = [];
          console.error(err);
        }
      );
    } else {
      this.offset = 1;
      this.pokemons = [];
      this.loadPokemon();
      return;
    }
  }


  loadMore(event?) {
    setTimeout(_ => {
      this.results.push();
      if (event)
        event.target.complete();
    }, 500);
  }


  


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.loadMore();
    this.ioncontent.scrollToPoint(0, this.scrollPosition);
  }

  ionViewDidLeave(){
    // Save scroll position
   this.ioncontent.getScrollElement().then(data => {
     this.scrollPosition = data.scrollTop;
   });
 }


  doThis(event)
  {
    this.page++;
    this.menuService.getStudent(this.page).subscribe((item) => {
      this.results = this.results.concat(item);
      event.target.complete();
    });

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
      );
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async presentItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsPage,
      componentProps: { information: item }
    });
    return await modal.present();
  }


  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage,
      componentProps: { categories: this.categories, tags: this.tags }
    });

    modal.onDidDismiss().then((result) => {
      const { data } = result;

      if (!data) {
        return;
      }

      let filters = {};

      Object.keys(data).forEach((param) => {
        if (data[param]) {
          filters = { ...filters, [param]: data[param] };
        }
      });

      this.find(filters);
    });

    return await modal.present();
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

