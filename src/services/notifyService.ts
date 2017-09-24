import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from "ionic-angular";

@Injectable()
export class NotifyService {

    loading: Loading;

    constructor(
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
    }

    showLoading(): void {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    hideLoading(): void {
        this.loading.dismiss();
    }

    popError(err: string): void {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['Ok']
        }).present();
    }
}