import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home.page';

@Component({
    template: `
        <ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
    public rootPage: any = LoginPage;

    constructor(public platform: Platform,
                public splashScreen: SplashScreen,
                private auth: AuthService) {
        this.platformReady();
    }

    public platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            this.splashScreen.hide();
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
