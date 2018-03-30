import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../services/auth.service';

export const firebaseConfig = {
    apiKey: 'aaa',
    authDomain: 'uek-stock-traders.firebaseapp.com',
    databaseURL: 'https://uek-stock-traders.firebaseio.com',
    projectId: 'uek-stock-traders',
    storageBucket: 'uek-stock-traders.appspot.com',
    messagingSenderId: '574461787753'
  };

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
    ],
    providers: [
        SplashScreen,
        AngularFireDatabase,
        AngularFireAuth,
        AuthService,
    ],
})
export class AppModule {
}
