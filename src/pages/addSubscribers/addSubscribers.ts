import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../../models/subscriber';
import { Contacts } from '@ionic-native/contacts';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../services/httpService';
import { environment } from '../../environment';
import { ViewController, NavParams } from '../../../node_modules/ionic-angular/umd';

@Component({
    templateUrl: 'addSubscribers.html'
})
export class AddSubscriberPage implements OnInit {

    constructor(private contactsService: Contacts, private storage: Storage,
        private httpService: HttpService, private viewCtrl: ViewController,
        private navParams: NavParams) {

    }

    contacts: Subscriber[];
    selectedContacts: Subscriber[];
    callBack: any;

    ngOnInit(): void {
        this.contactsService.find(['displayName', 'name', 'phoneNumbers'])
            .then(result => {
                this.contacts = result.map(contact => {
                    return {
                        name: contact.displayName
                    }
                }
                )
            });
    }

    ionViewWillEnter() {
        this.callBack = this.navParams.get('callback');
    }

    public onContactSelect(selectedContact: Subscriber, event): void {
        if (event.checked) {
            let index = this.selectedContacts.indexOf(selectedContact);
            this.selectedContacts.splice(index);
        }
        else {
            this.selectedContacts.push(selectedContact);
        }
    }

    public addSubscribers(): void {
        this.httpService.post(environment.endpoints.subscriberSave, this.selectedContacts)
            .subscribe(result => {
                console.log(result);
                this.storage.set(environment.subscriberDataKey, this.selectedContacts);
                this.callBack();
                this.viewCtrl.dismiss();
            });
    }
}
