import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NavController, Platform } from 'ionic-angular';
import { environment } from '../../environment';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../services/httpService';
import { UserData } from '../../models/userData';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
    public unregisterBackButtonAction: any;
    userData: UserData;

    constructor(
        public navCtrl: NavController, public fb: Facebook,
        private storage: Storage, private httpService: HttpService,
        private platform: Platform
    ) {
    }

    private fbLogin(): void {
        let permissions = new Array<string>();
        let nav = this.navCtrl;

        //the permissions your facebook app needs from the user
        permissions = ['public_profile', 'email'];
        this.fb.login(permissions)
            .then((res) => {
                this.fb.api('me?fields=id,name,email,first_name', []).then(profile => {
                    this.userData = {
                        email: profile['email'], firstName: profile['first_name'],
                        picture: "https://graph.facebook.com/" + res.authResponse.userID + "/picture?type=large",
                        username: profile['name'], fbId: res.authResponse.userID,
                        fbToken: res.authResponse.accessToken
                    };

                    this.addUser(this.userData, (res) => {
                        this.userData.apiToken = res.token;
                        this.userData.other = res.data;
                        this.storage.set(environment.dataKey, this.userData)
                            .then(function () {
                                nav.pop();
                            });
                    });
                });
            })
            .catch(e => console.log('Error logging into Facebook', e));
    }

    //add user to System
    addUser(data: UserData, callback: (r: any) => void): void {
        this.httpService.post(environment.endpoints.userLogin, data)
            .subscribe(
            response => {
                callback(response);
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    ionViewWillEnter() {
        this.initializeBackButtonCustomHandler();
    }

    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    public initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.backButtonAction();
        }, 10);
    }

    private backButtonAction(): void {
        this.platform.exitApp();
    }
}