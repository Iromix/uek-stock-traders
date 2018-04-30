import { Injectable } from '@angular/core';
import { StockQuote } from '../app/stocks/stock-quote.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {StockDataService} from '../app/stocks/stocks-data.service';

@Injectable()
export class UserStocksService {

    public stockQuotes: Observable<StockQuote[]>;
    private stockQuotesCollection: AngularFirestoreCollection<StockQuote>;

    constructor(private afs: AngularFirestore, private auth: AuthService, private stockData: StockDataService) {
        if (auth.isAuthenticated) {
            this.loadStockWallet();
        }
    }

    public addStockToWallet(stock: StockQuote) {
        this.stockQuotesCollection.doc(stock.symbol).set(stock);
    }

    public loadStockWallet() {
        this.stockQuotesCollection = this.afs.doc(`users/${this.auth.user.uid}`).collection<StockQuote>('stockQuotes');
        this.stockQuotes = this.stockQuotesCollection.valueChanges();
    }

    public deleteStockFromWallet(symbol: string) {
        this.stockQuotesCollection.doc(symbol).delete();
    }

    public getStockFromAPIAndAddToWallet(symbol: string) {
        this.stockData.getStockQuote(symbol).subscribe((stock) => { this.addStockToWallet(stock); } );
    }
}
