import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';

@Component({
    templateUrl: 'stock_chart.page.html',
})
export class StockChartPage {
    public user: any;

    constructor(private navCtrl: NavController){}

    private openHomePage() {
        this.navCtrl.popToRoot();
    }
}
