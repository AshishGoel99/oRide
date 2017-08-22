import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'setting.html'
})
export class SettingPage {

    constructor(private navCtrl: NavController) {

    }

    goHome(): void {
        this.navCtrl.pop();
    }
}
