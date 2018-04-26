import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home.page';
import { UserStocksService } from '../../services/user-stocks.service';
import { StockDataService } from '../../app/stocks/stocks-data.service';

@Component({
    templateUrl: 'stock_chart.page.html',
})
export class StockChartPage {
    private companySymbol: string = "";
    private companyName: string = "";

    constructor(private navCtrl: NavController, private navParams: NavParams, private stockService: UserStocksService){
        this.companySymbol = this.navParams.get("company_symbol");
        this.companyName = this.navParams.get("company_name");
    }

    private openHomePage() {
        this.navCtrl.popToRoot();
    }

    private addStockToWallet(symbol: string) {
        this.stockService.getStockFromAPIAndAddToWallet(symbol);
    }
}
