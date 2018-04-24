import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockChartData} from './stock-chart-data.model';
import {StockQuote} from './stock-quote.model';
import {DateRange} from './data-range.model';
import {StockSymbol} from './stock-symbol.model';

const API_URL = 'https://api.iextrading.com/1.0/';

@Injectable()
export class StockDataService {

    constructor(private http: HttpClient) {
    }

    public getStockDataForChart(symbol: string, range: DateRange): Observable<StockChartData[]> {
        return this.http.get<StockChartData[]>(`${API_URL}/stock/${symbol}/chart/${range}`);
    }

    public getStockQuote(symbol: string): Observable<StockQuote> {
        return this.http.get<StockQuote>(`${API_URL}/stock/${symbol}/quote`);
    }

    public getAllStockSymbols(): Observable<StockSymbol[]> {
        return this.http.get<StockSymbol[]>(`${API_URL}/ref-data/symbols`);
    }
}
