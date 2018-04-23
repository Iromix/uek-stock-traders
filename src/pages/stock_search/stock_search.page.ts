import { Component } from '@angular/core';
import {StockDataService} from '../../app/stocks/stocks-data.service';
import {StockSymbol} from '../../app/stocks/stock-symbol.model';
import {UserStocksService} from '../../services/user-stocks.service';
import { StockChartPage } from '../stock_chart/stock_chart.page';

@Component({
    selector: 'ib-page-stock-search',
    templateUrl: 'stock_search.page.html',
})
export class StockSearchPage {

    private stockSymbolsFromAPI: StockSymbol[];
    private stockSymbols: StockSymbol[];

    constructor(private stockData: StockDataService, private userStocksService: UserStocksService) {
        stockData.getAllStockSymbols().subscribe((data) => {
            this.stockSymbolsFromAPI = data;
            this.stockSymbols = data;
        });
    }

    private resetStockSymbols() {
        this.stockSymbols = this.stockSymbolsFromAPI;
    }

    private filterStocksBySymbolOrName(searchQuery: string) {
        if (searchQuery && searchQuery.trim() !== '') {
            this.stockSymbols = this.stockSymbols.filter((stockSymbol) => {
                return stockSymbol.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                    || stockSymbol.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }
    }

    private filterStocks(event: any) {
        const searchQuery = event.target.value;
        this.resetStockSymbols();

        this.filterStocksBySymbolOrName(searchQuery);
    }

    private addStockToWallet(symbol: string) {
        this.userStocksService.getStockFromAPIAndAddToWallet(symbol);
    }
    
    private stock_chart_page() {
        this.navCtrl.push(StockChartPage);
    }
}
