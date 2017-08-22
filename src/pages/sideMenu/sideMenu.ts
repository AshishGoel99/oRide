import { ViewController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SettingPage } from "../setting/setting";

@Component({
    templateUrl: 'sideMenu.html'
})

export class SideMenu {
    constructor(public viewCtrl: ViewController, private navCtrl: NavController) { }

    openSettings() {
        this.viewCtrl.dismiss().then(() => {
            this.navCtrl.push(SettingPage);
        });
    }
}