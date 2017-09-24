import { Component } from '@angular/core';

// import { SchedulePage } from '../schedule/schedule';
import { HomePage } from '../home/home';
import { RoutePage } from '../routes/route';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RoutePage;
  // tab2Root = SchedulePage;
  tab3Root = SettingPage;

  constructor() {

  }
}
