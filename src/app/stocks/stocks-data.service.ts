import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockChartData} from './stock-chart-data.model';
import {StockQuote} from './stock-quote.model';

const API_URL = 'https://api.iextrading.com/1.0/stock/';

export enum DateRange {
    Day = '1d',
    Month = '1m',
    ThreeMonths = '3m',
    SixMonths = '6m',
    Year = '1y',
    TwoYears = '2y',
    FiveYears = '5y',
}

@Injectable()
export class StockDataService {

    constructor(private http: HttpClient) {
    }

    public getStockDataForChart(symbol: string, range: DateRange): Observable<StockChartData[]> {
        return this.http.get<StockChartData[]>(API_URL + symbol + '/chart/' + range);
    }

    public getStockQuote(symbol: string): Observable<StockQuote> {
        return this.http.get<StockQuote>(API_URL + symbol + '/quote');
    }
}
