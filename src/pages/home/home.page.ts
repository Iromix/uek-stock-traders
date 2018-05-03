import { Component } from '@angular/core';
import {NavController, Refresher, ToastController} from 'ionic-angular';
import filter from 'lodash-es/filter';
import {AuthService} from '../../services/auth.service';
import { UserStocksService } from '../../services/user-stocks.service';
import {StockQuote} from '../../app/stocks/stock-quote.model';
import * as _ from 'lodash';
import { StockSearchPage } from '../stock_search/stock_search.page';
import { MyProfilePage } from '../my_profile/my_profile.page';
import { MyWalletPage } from '../my_wallet/my_wallet.page';

@Component({
    selector: 'ib-page-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    private stocks: StockQuote[] = [];

    constructor(public toastCtrl: ToastController, private auth: AuthService, private stockService: UserStocksService,
                private navCtrl: NavController) {
        this.stockService.stockQuotes.subscribe((stock: StockQuote[]) => {
            this.stocks = stock;
        });
        this.refreshDataAfterLogin();
    }

    private openStockQuotes() {
        this.navCtrl.push(StockSearchPage);
    }

    private openMyProfile() {
        this.navCtrl.push(MyProfilePage);
    }

    private openMyWallet() {
        this.navCtrl.push(MyWalletPage);
    }

    private logout() {
        this.auth.signOut();
    }

    private refreshData(refresher: Refresher) {
        this.stocks.forEach((stock) => {
            this.stockService.getStockFromAPIAndAddToWallet(stock.symbol);
        });
        if (!_.isNil(refresher)) {
            setTimeout(() => {
                refresher.complete();
            }, 2000);
        }
    }

    private refreshDataAfterLogin() {
        const loadFromDB = this.stockService.stockQuotes.subscribe(() => {
            loadFromDB.unsubscribe();
            this.refreshData(undefined);
        });
    }
}
