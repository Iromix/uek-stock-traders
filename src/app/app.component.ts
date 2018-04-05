import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home.page';
import { ToastController, AlertController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
    template: `
        <ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
    public rootPage: any = LoginPage;
    public connectionTimer: any = null;


    constructor(private platform: Platform, private auth: AuthService, private toastCtrl: ToastController, private alertCtrl: AlertController, private network: Network) {
        this.platformReady();
    }

    private alertWhenDisconnected(){
        const alert = this.alertCtrl.create({
            message: 'Please turn on your network connection to use the service !', 
            buttons: 
            [{
                text: 'Connect',
                handler: () => {
                    this.connectionTimer = setTimeout(()=> { this.alertWhenDisconnected();}, 3000);
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
        alert.present();
    }

    private networkConnected()
    {
        this.network.onConnect().subscribe(() => 
        {
            if(this.connectionTimer!=null)
            {
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

    private networkDisconnected(){
        this.network.onDisconnect().subscribe(() => {
            this.alertWhenDisconnected();
        })
    }

    public platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            this.networkConnected();
            this.networkDisconnected();
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
}
