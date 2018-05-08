import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {StockComment} from '../app/stocks/stock-comment.model';
import { AuthService } from './auth.service';

@Injectable()
export class StockCommentsService {

    public stockComments: Observable<StockComment[]>;
    private stockCommentsCollection: AngularFirestoreCollection<StockComment>;
    private stockSymbol: string = '';

    constructor(private afs: AngularFirestore, private authService: AuthService) {
    }

    public loadStockComments() {
        this.stockCommentsCollection = this.afs.doc(`comments/${this.stockSymbol}`).collection<StockComment>('stockComments',
            (ref) => ref.orderBy('timestamp', 'desc').limit(30));
        this.stockComments = this.stockCommentsCollection.valueChanges();
    }

    public addStockComment(stockComment: StockComment) {
        stockComment.timestamp = new Date();
        stockComment.author = this.authService.user.displayName;
        this.stockCommentsCollection.add(Object.assign({}, stockComment));
    }

    public setStockSymbol(symbol: string) {
        this.stockSymbol = symbol;
    }
}
