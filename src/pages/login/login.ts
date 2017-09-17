import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';
import { environment } from '../../environment';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../services/httpService';
import { UserData } from '../../models/userData';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    userData: UserData;

    constructor(
        public navCtrl: NavController, public fb: Facebook,
        private storage: Storage, private httpService: HttpService
    ) {
    }

    private fbLogin(): void {
        let permissions = new Array<string>();
        let nav = this.navCtrl;

        //the permissions your facebook app needs from the user
        permissions = ['public_profile', 'email'];
        this.fb.login(permissions)
            .then((res) => {
                if (res.status == 'ok') {

                    this.fb.api('me?fields=id,name,email,first_name', []).then(profile => {
                        this.userData = {
                            email: profile['email'], firstName: profile['first_name'],
                            picture: "https://graph.facebook.com/" + res.authResponse.userID + "/picture?type=large",
                            username: profile['name'], fbId: res.authResponse.userID,
                            fbToken: res.authResponse.accessToken
                        };

                        this.addUser(this.userData, (res) => {
                            if (res.success) {
                                this.userData.apiToken = res.token;
                                this.storage.set(environment.dataKey, this.userData)
                                    .then(function () {
                                        nav.pop();
                                    });
                            }
                            else {
                            }
                        });
                    });
                }
            })
            .catch(e => console.log('Error logging into Facebook', e));
    }

    //add user to System
    addUser(data: UserData, callback: (r: any) => void): void {
        this.httpService.post(environment.endpoints.userLogin, data)
            .subscribe(
            response => {
                callback(response.ok);
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }
}