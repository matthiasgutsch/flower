import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  PopoverController,
  ModalController,
  IonSlides,
} from "@ionic/angular";

import { MenuService } from "./../../services/menu.service";
import { StartupService } from "./../../services/startup.service";

import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationsComponent } from "./../../components/notifications/notifications.component";
import { Pipe, PipeTransform } from "@angular/core";
import { delay, map } from "rxjs/operators";
import { of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { EventProvider } from "../../event-provider.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit {
  startup: any = {};
  startupsRandom: any;
  obs$ = of(1).pipe(delay(2000));

  

  public show: boolean = false;
  public showFeatures: boolean = false;

  public buttonName: any = "Show";

  constructor(
    public loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    public menuService: MenuService,
    public startupService: StartupService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    private translate: TranslateService,
    private eventProvider: EventProvider,
    public router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getStudent();
    this.getStartupsRandom();
    this.notifications();
  }

  colorResult(result) {
    console.log(result);
  }

  async notifications(ev?: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
    });
    return await popover.dismiss();
  }

  switchLanguage(language: string) {
    this.eventProvider.setLang(language);
  }

  async getStudent() {
    const loading = await this.loadingCtrl.create({
      message: "Loading",
    });
    await loading.present();
    await this.startupService
      .getPokemonById(this.route.snapshot.paramMap.get("id"))

      .subscribe(
        (res) => {
          this.startup = res;
          res.photo = this.getImageURL(res.photo);
          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
        }
      );
  }


  
  private getImageURL(index: number) {
    const IMAGE_URL = "https://www.associazionecomunali.it/assets/pages/";
    return `${IMAGE_URL}${index}`;
  }

  async getStartupsRandom() {
    const loading = await this.loadingController.create({
      message: "Loading",
    });
    await loading.present();
    await this.startupService.getStartupsListRandom().subscribe(
      (res) => {
        this.startupsRandom = res;
        loading.dismiss();
      },
      (err) => {
        // console.log(err);
        loading.dismiss();
      }
    );
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }

  toggleFeatures() {
    this.showFeatures = !this.showFeatures;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showFeatures) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }
}
