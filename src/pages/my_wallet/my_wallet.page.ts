import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';
import { StockSearchPage } from '../stock_search/stock_search.page';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';
import {StockQuote} from '../../app/stocks/stock-quote.model';
import * as _ from 'lodash';
import filter from 'lodash-es/filter';

@Component({
    templateUrl: 'my_wallet.page.html',
})
export class MyWalletPage {
    public user: any;
    private stocks: StockQuote[] = [];

    constructor(private navCtrl: NavController, private stockService: UserStocksService,){
        this.stockService.loadStockWallet();
        this.stockService.stockQuotes.subscribe((stock: StockQuote[]) => {
            this.stocks = stock;
        });
    }
    
    private openHomePage() {
        this.navCtrl.popToRoot();
    }
    
    private openStockQuotes() {
        this.navCtrl.push(StockSearchPage);
    }

    private deleteStock(stock: StockQuote) {
        this.stockService.deleteStockFromWallet(stock);
    }

    private addStock(symbol: string) {
        this.stockService.getStockFromAPIAndAddToWallet(symbol);
    }
}
