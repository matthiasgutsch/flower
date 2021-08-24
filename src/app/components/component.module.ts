import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

import { FooterComponent } from "./footer/footer.component";
import { PopmenuComponent } from "./popmenu/popmenu.component";
import {FilterPipe} from './filter.pipe';
import { StartupListComponent } from "./startuplist/startuplist.component";

@NgModule({
  declarations: [FooterComponent, PopmenuComponent, StartupListComponent, FilterPipe],
  exports: [FooterComponent, PopmenuComponent, StartupListComponent, FilterPipe],
  imports: [IonicModule],
})
export class ComponentsModule {}
