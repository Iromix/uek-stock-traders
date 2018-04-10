import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockChartData} from "./stock-chart-data.model";
import {StockQuote} from "./stock-quote.model";
import {DateRange} from "./data-range.model";

const API_URL = 'https://api.iextrading.com/1.0/stock/';

@Injectable()
export class StockDataService {

    constructor(private http: HttpClient) {
    }

    public getStockDataForChart(symbol: string, range: DateRange): Observable<Array<StockChartData>> {
        return this.http.get<Array<StockChartData>>(API_URL + symbol + '/chart/' + range);
    }

    public getStockQuote(symbol: string): Observable<StockQuote> {
        return this.http.get<StockQuote>(API_URL + symbol + '/quote');
    }
}
