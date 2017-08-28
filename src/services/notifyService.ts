import { Injectable } from '@angular/core';
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class NotifyService {

    loading: Loading;

    constructor(
        private loadingCtrl: LoadingController) {
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

    popError(): void {

    }
}