import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';
import { StockQuote } from '../../app/stocks/stock-quote.model';

@Component({
    templateUrl: 'stock_chart.page.html',
})
export class StockChartPage {

    alreadyInWallet: boolean = false;
    private companySymbol: string = '';
    private companyName: string = '';

    constructor(public toastCtrl: ToastController, private navCtrl: NavController, private navParams: NavParams,
                private stockService: UserStocksService) {
        this.companySymbol = this.navParams.get('company_symbol');
        this.companyName = this.navParams.get('company_name');

        this.stockService.loadStockWallet();
        this.stockService.stockQuotes.subscribe((stock: StockQuote[]) => {
            if (stock.find(x => x.symbol == this.companySymbol)) {
                this.alreadyInWallet = true;
            }
        });
    }

    private openHomePage() {
        this.navCtrl.popToRoot();
    }

    private showToast(message: string) {
      const toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }

    private addStockToWallet(symbol: string) {
        this.stockService.getStockFromAPIAndAddToWallet(symbol);
        this.alreadyInWallet = true;
        this.showToast('Stock added to wallet');
    }

    private deleteStock(symbol: string) {
        this.stockService.deleteStockFromWallet(symbol);
        this.alreadyInWallet = false;
        this.showToast('Stock deleted from wallet');
    }
}
