import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home.page';
import {ToastController, AlertController, Platform, Alert} from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
    public rootPage: any = LoginPage;
    public connectionTimer: any = null;
    public showAlertWhenDisconnected: any;

    constructor(private platform: Platform, private auth: AuthService, private toastCtrl: ToastController,
                private alertCtrl: AlertController, private network: Network, public splashScreen: SplashScreen) {
        this.platformReady();
    }

     public platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.onNetworkConnected();
            this.onNetworkDisconnected();
        });

        this.auth.afAuth.authState.subscribe((user: any) => {
            if (user) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
        },
        () => {
          this.rootPage = LoginPage;
        }
        );
    }

    private alertWhenDisconnected() {
        this.showAlertWhenDisconnected = this.alertCtrl.create({
            message: 'Please turn on your network connection to use the service !',
            buttons: [{
                text: 'Connect',
                handler: () => {
                    this.connectionTimer = setTimeout(() => { this.alertWhenDisconnected(); }, 5000);
                }
             },
             {
                text: 'EXIT APP',
                handler: () => {
                    this.platform.exitApp();
                }
             }
            ]
            });
        this. showAlertWhenDisconnected.present();
    }

    private onNetworkConnected() {
        this.network.onConnect().subscribe(() => {
            if (this.connectionTimer != null || this. showAlertWhenDisconnected.present()) {
                this. showAlertWhenDisconnected.dismiss();
                clearTimeout(this.connectionTimer);
                this.connectionTimer = null;

                const toast = this.toastCtrl.create({
                    message: 'Network connected!',
                    duration: 3000
                });
                toast.present();
            }
        });
    }

    private onNetworkDisconnected() {
        this.network.onDisconnect().subscribe(() => {
            this.alertWhenDisconnected();
        });
    }
}
