import { Component, OnInit } from "@angular/core";
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
} from "@ionic/angular";
import { Pokemon } from "src/app/models/pokeapi";
import { EventProvider } from "../../event-provider.service";
import { TranslateService } from "@ngx-translate/core";

// Modals
import { SearchFilterPage } from "../../pages/modal/search-filter/search-filter.page";
import { ImagePage } from "./../../pages/modal/image/image.page";
import { ItemDetailsPage } from "./../../pages/modal/item-details/item-details.page";
import { StartupService } from "src/app/services/startup.service";

import { MenuService } from "./../../services/menu.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  yourLocation = "123 Test Street";

  results = [];
  timeout;

  tags = [];
  pokemons: Pokemon[] = [];

  category: any[];
  categories: any = {};

  private offset = 1;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public menuService: MenuService,
    public startupService: StartupService,
    private translate: TranslateService,
    private eventProvider: EventProvider
  ) {}

  ngOnInit(): void {
  }


}
