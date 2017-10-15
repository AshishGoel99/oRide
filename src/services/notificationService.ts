import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Route } from '../models/route';
import { PushObject, Push } from '@ionic-native/push';
import { DateTimeService } from './datetimeService';

@Injectable()
export class NotificationService {

    constructor(
        private localNotifications: LocalNotifications,
        private push: Push,
        private dateTimeService: DateTimeService
    ) {
    }

    public ScheduleNotifications(routes: Route[], callback: Function): void {

        let env = this;
        this.localNotifications.clearAll()
            .then(res => {
                console.log(res);

                routes.forEach(route => {

                    if (route.scheduleType == 0) {

                        route.days.forEach(day => {

                            //schedule for Go Time.
                            env.localNotifications.schedule({
                                title: 'Ready',
                                text: `It's time to leave for ` + route.from.name,
                                led: 'FF0000',
                                firstAt: this.dateTimeService.GetNextWeekDayDateTime(day, route.startTime),
                                every: 'week'
                            });

                            //schedule for Go Time.
                            env.localNotifications.schedule({
                                title: 'Ready',
                                text: `It's time to leave for ` + route.to.name,
                                led: 'FF0000',
                                firstAt: this.dateTimeService.GetNextWeekDayDateTime(day, route.returnTime),
                                every: 'week'
                            });

                        });
                    }
                    else {

                        //schedule for Go Time.
                        env.localNotifications.schedule({
                            title: 'Ready',
                            text: `It's time to leave for ` + route.from.name,
                            led: 'FF0000',
                            at: this.dateTimeService.ParseDateTime(route.date, route.startTime)
                        });

                        //schedule for Go Time.
                        env.localNotifications.schedule({
                            title: 'Ready',
                            text: `It's time to leave for ` + route.to.name,
                            led: 'FF0000',
                            at: this.dateTimeService.ParseDateTime(route.date, route.returnTime)
                        });
                    }

                });
            });
        // Schedule delayed notification
        let time = new Date();
        time.setMinutes(time.getMinutes() + 1);

        this.localNotifications.schedule({
            text: 'Delayed ILocalNotification',
            at: time,
            led: 'FF0000',
            sound: null
        });
    }

    public SetUpPush(callback: Function): void {

        const pushObject: PushObject = this.push.init({
            android: {
                // senderID: environment.fcmId
            }
        });

        pushObject.on('registration').subscribe((data: any) => {
            console.log('device token -> ' + data.registrationId);
            callback(data.registrationId);
        });

        pushObject.on('notification').subscribe((data: any) => {
            console.log('data -> ' + data);
        });

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
    }
}