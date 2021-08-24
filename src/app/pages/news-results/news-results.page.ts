import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  NavController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';
import { News } from 'src/app/models/pokeapi';
import { take } from 'rxjs/operators';
// Modals
import { LoadingController, AlertController } from '@ionic/angular';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { ItemDetailsPage } from '../modal/item-details/item-details.page';
import { StartupService } from '../../services/startup.service';
import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.page.html',
  styleUrls: ['./news-results.page.scss']
})
export class NewsResultsPage implements OnInit {
  yourLocation = '123 Test Street';
  openMenu: Boolean = false;


  results = [];
  timeout;
  page=1;

  scrollPosition = 0;
  news: News[] = [];
  topnews: News[] = [];

  private offset = 1;

  @ViewChild(IonContent) ioncontent: IonContent;
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public startupService: StartupService,
    public loadingController: LoadingController
  ) {}



  ngOnInit(): void {
    this.loadNews();

    this.loadTopNews();

  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  loadNews(loadMore = false, evt?: { target: { complete: () => void } }) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .getNewsList(this.offset)
      .pipe(take(1))
      .subscribe((news: News[]) => {
        this.news = [...this.news, ...news];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  loadTopNews(loadMore = false, evt?: { target: { complete: () => void } }) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .get_news_featured()
      .pipe(take(1))
      .subscribe((topnews: News[]) => {
        this.topnews = [...this.topnews, ...topnews];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  onSearch(evt: CustomEvent) {
    const value = evt.detail.value;

    if (value) {
      this.startupService.findNews(value).subscribe(
        res => {
          this.news = res;
        },
        err => {
          this.news = [];
          console.error(err);
        }
      );
    } else {
      this.offset = 1;
      this.news = [];
      this.loadNews();
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
    this.startupService.getNews(this.page).subscribe((item) => {
      this.results = this.results.concat(item);
      event.target.complete();
    });

  }

  onSearchChange(searchKey: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.find({ page_title: searchKey }), 400);
  }

  find(searchFilter: any = {}) {
    this.startupService
      .find(searchFilter)
      .subscribe(
        (response) => (this.results = response),
      );
  }

  async presentItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsPage,
      componentProps: { information: item }
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

