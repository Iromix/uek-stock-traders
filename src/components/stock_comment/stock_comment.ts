import {Component, Input, OnInit} from '@angular/core';
import {StockCommentsService} from '../../services/stock-comments.service';
import {Observable} from 'rxjs/Observable';
import {StockComment} from '../../app/stocks/stock-comment.model';
import * as moment from 'moment';

@Component({
    selector: 'ib-stock-comment',
    templateUrl: 'stock_comment.html',
    providers: [
        StockCommentsService,
    ],
})
export class StockCommentComponent implements OnInit {
    private userComment: string = '';
    private userRate: boolean = true;

    @Input() private symbol: string;
    private stockComments: Observable<StockComment[]>;

    constructor(private stockCommentsService: StockCommentsService) {
    }

    public ngOnInit() {
        this.loadStockComments();
    }

    private formatDateToFromNow(date) {
        return moment(date).fromNow();
    }

    private loadStockComments() {
        this.stockCommentsService.setStockSymbol(this.symbol);
        this.stockCommentsService.loadStockComments();
        this.stockComments = this.stockCommentsService.stockComments;
    }

    private addStockComment() {
        const stockComment = new StockComment();
        stockComment.comment = this.userComment;
        stockComment.rating = this.userRate;
        this.stockCommentsService.addStockComment(stockComment);
        this.userComment = '';
    }

    private changeUserRate(value: boolean) {
        this.userRate = value;
    }
}
