import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import filter from 'lodash-es/filter';
import {AuthService} from '../../services/auth.service';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';
import {StockQuote} from '../../app/stocks/stock-quote.model';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'ib-page-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    public user: any;
    private stockQuotes: Observable<StockQuote[]>;

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
        this.stockQuotes = this.stockService.stockQuotes;
    }

    private showToast() {
      const toast = this.toastCtrl.create({
        message: 'It works!',
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

    private addSampleStock(symbol: string) {
        this.stockData.getStockQuote(symbol).subscribe((stock) => { this.stockService.addStockToWallet(stock); } );
    }
}
