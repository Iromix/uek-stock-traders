import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { StockSearchPage } from '../pages/stock_search/stock_search.page';
import { StockChartPage } from '../pages/stock_chart/stock_chart.page';
import { MyProfilePage } from '../pages/my_profile/my_profile.page';
import { MyWalletPage } from '../pages/my_wallet/my_wallet.page';

import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from '../services/auth.service';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Network } from '@ionic-native/network';
import { HttpClientModule } from '@angular/common/http';
import { StockDataService } from './stocks/stocks-data.service';
import { UserStocksService } from '../services/user-stocks.service';


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
        SignupPage,
        StockSearchPage,
        StockChartPage,
        MyProfilePage,
        MyWalletPage,
    ],
    imports: [
        BrowserModule,
        NgxErrorsModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        SignupPage,
        StockSearchPage,
        StockChartPage,
        MyProfilePage,
        MyWalletPage,
    ],
    providers: [
        SplashScreen,
        AngularFireDatabase,
        AngularFireAuth,
        AngularFirestore,
        AuthService,
        Network,
        StockDataService,
        UserStocksService,
    ],
})
export class AppModule {
}
