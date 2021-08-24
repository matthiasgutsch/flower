import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonContent,
  NavController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  IonSlides,
} from "@ionic/angular";
import { News } from 'src/app/models/pokeapi';

import { Startup } from "src/app/models/pokeapi";
import { take } from "rxjs/operators";
// Modals
import { LoadingController, AlertController } from "@ionic/angular";
import { SearchFilterPage } from "../modal/search-filter/search-filter.page";
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from "../../components/notifications/notifications.component";
import { ItemDetailsPage } from "../modal/item-details/item-details.page";
import { MenuService } from "../../services/menu.service";
import { StartupService } from "../../services/startup.service";

import { TranslateService } from "@ngx-translate/core";
import { EventProvider } from "../../event-provider.service";
import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.page.html",
  styleUrls: ["./homepage.page.scss"],
})
export class HomepagePage implements OnInit {
  yourLocation = "123 Test Street";
  openMenu: Boolean = false;
  segment = 0;
  skipMsg: string = "Salta";
  @ViewChild("slides") slider: IonSlides;
  results = [];
  timeout;
  page = 1;
  categories = [];
  tags = [];
  scrollPosition = 0;
  startups: Startup[] = [];
  startupsRandom: Startup[] = [];

  news: News[] = [];

  private offset = 1;
  pokemonRandom: any;
  pokemonHome: any;
  pageresults: Startup[] = [];
  private pageid = 1;
  public lang: string;

  slideOptsRandom = {
    slidesPerView: 3,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 12,
      slideShadows: false,
    },
  };

  slideOpts = {
    slidesPerView: 2,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 12,
      slideShadows: false,
    },
  };

  slideOpts2 = {
    slidesPerView: 1,
    autoplay:true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  @ViewChild(IonContent) ioncontent: IonContent;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public menuService: MenuService,
    public startupService: StartupService,

    public loadingController: LoadingController,
    private translate: TranslateService,
    private eventProvider: EventProvider
  ) {}

  ngOnInit(): void {
    this.getPage();
    this.loadNews();
  }

  switchLanguage(language: string) {
    this.eventProvider.setLang(language);
  }

  getPage() {
    this.menuService.getPageId(this.pageid).pipe(take(1));
  }


  loadNews(loadMore = false, evt?: { target: { complete: () => void } }) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .get_news_featured()
      .pipe(take(1))
      .subscribe((news: News[]) => {
        this.news = [...this.news, ...news];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  getStartupsHomepage(
    loadMore = false,
    evt?: { target: { complete: () => void } }
  ) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .getNewsList(this.offset)
      .pipe(take(1))
      .subscribe((startups: Startup[]) => {
        this.startups = [...this.startups, ...startups];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  getStartupsHomepageRandom(
    loadMore = false,
    evt?: { target: { complete: () => void } }
  ) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .getStartupsListRandom(this.offset)
      .pipe(take(1))
      .subscribe((startupsRandom: Startup[]) => {
        this.startupsRandom = [...this.startupsRandom, ...startupsRandom];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  getNewsRandom(loadMore = false, evt?: { target: { complete: () => void } }) {
    if (loadMore) {
      this.offset += 1;
    }

    this.startupService
      .getNewsListRandom(this.offset)
      .pipe(take(1))
      .subscribe((news) => {
        this.news = [...this.news, ...news];

        if (evt) {
          evt.target.complete();
        }
      });
  }

  togglePopupMenu() {
    return (this.openMenu = !this.openMenu);
  }

  loadMore(event?) {
    setTimeout((_) => {
      this.results.push();
      if (event) event.target.complete();
    }, 500);
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.loadMore();
    this.ioncontent.scrollToPoint(0, this.scrollPosition);
  }

  ionViewDidLeave() {
    // Save scroll position
    this.ioncontent.getScrollElement().then((data) => {
      this.scrollPosition = data.scrollTop;
    });
  }

  doThis(event) {
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
      .subscribe((response) => (this.results = response));
  }

  settings() {
    this.navCtrl.navigateForward("settings");
  }

  async presentItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsPage,
      componentProps: { information: item },
    });
    return await modal.present();
  }

  async notifications(ev?: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
    });
    return await popover.present();
  }

  soci() {
    this.navCtrl.navigateForward('area/11');
    return this.openMenu = !this.openMenu;
  }

}
