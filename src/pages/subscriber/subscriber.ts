import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environment';
import { Subscriber } from '../../models/subscriber';
import { AddSubscriberPage } from '../addSubscribers/addSubscribers';

@Component({
    templateUrl: 'subscriber.html'
})
export class SubscriberPage implements OnInit {

    constructor(private navCtrl: NavController, private storage: Storage) {

    }

    subscribers: Subscriber[];

    ngOnInit(): void {
        this.getSubscribersFromStorage();
    }

    private getSubscribersFromStorage() {
        this.storage.get(environment.routeDataKey)
            .then((subs: Subscriber[]) => {
                this.subscribers = subs;
            });
    }

    public openAddSubscribers(): void {
        this.navCtrl.push(AddSubscriberPage, {
            callback: () => {
                this.getSubscribersFromStorage();
            }
        })
    }


}
