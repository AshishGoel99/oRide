import { Injectable } from '@angular/core';
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class UtilityService {

    constructor(
        private loadingCtrl: LoadingController) {
    }

    showLoading(): Loading {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    }
}