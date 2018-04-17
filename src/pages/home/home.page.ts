import { Component } from '@angular/core';
import {Refresher, ToastController} from 'ionic-angular';
import filter from 'lodash-es/filter';
import {AuthService} from '../../services/auth.service';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';
import {StockQuote} from '../../app/stocks/stock-quote.model';
import * as _ from 'lodash';

@Component({
    selector: 'ib-page-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    public user: any;
    private stocks: StockQuote[] = [];

    constructor(public toastCtrl: ToastController, private auth: AuthService, private stockService: UserStocksService,
                private stockData: StockDataService) {
        const myArr = [
            {
                name: 'barney',
                age: 36,
                active: true,
            },
            {
                name: 'fred',
                age: 40,
                active: false,
            }];

        this.user = (filter(myArr, (o) => o.active))[0];
        this.stockService.loadStockWallet();
        this.stockService.stockQuotes.subscribe((stock: StockQuote[]) => {
            this.stocks = stock;
        });
        this.refreshDataAfterLogin();
    }

    private showToast() {
      const toast = this.toastCtrl.create({
        message: 'It works!',
        duration: 3000
      });
      toast.present();
    }
    
    private stock_quotes_of_companies_page() {
      const toast = this.toastCtrl.create({
        message: 'Tutaj będzie przejście do strony z wyszukiwarką spółek',
        duration: 3000
      });
      toast.present();
    }

    private logout() {
        this.auth.signOut();
    }

    private deleteStock(stock: StockQuote) {
        this.stockService.deleteStockFromWallet(stock);
    }

    private getStockFromAPIAndAddToWallet(symbol: string) {
        this.stockData.getStockQuote(symbol).subscribe((stock) => { this.stockService.addStockToWallet(stock); } );
    }

    private refreshData(refresher: Refresher) {
        this.stocks.forEach((stock) => {
            this.getStockFromAPIAndAddToWallet(stock.symbol);
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
