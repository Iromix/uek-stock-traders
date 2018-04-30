import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { HomePage } from '../home/home.page';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';

@Component({
    templateUrl: 'stock_chart.page.html',
})
export class StockChartPage {
    private companySymbol: string = '';
    private companyName: string = '';

    constructor(public toastCtrl: ToastController, private navCtrl: NavController, private navParams: NavParams,
                private stockService: UserStocksService) {
        this.companySymbol = this.navParams.get('company_symbol');
        this.companyName = this.navParams.get('company_name');
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
        this.showToast('Stock added to wallet');
    }

    private deleteStock(symbol: string) {
        this.stockService.deleteStockFromWallet(symbol);
        this.showToast('Stock deleted from wallet');
    }
}
