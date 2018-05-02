import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { StockDataService } from '../stocks/stocks-data.service';
import { DateRange } from '../stocks/data-range.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'ib-stock-chart',
  templateUrl: './stock-chart.component.html',
})
export class StockChartComponent implements OnInit, OnDestroy {

    @Input() private stockSymbol: string;
    showLoading: boolean = true;
    private chart: StockChart;
    private stockQuoteSubscription: Subscription;
    private chartDataSubscription: Subscription;

    constructor(private stockData: StockDataService) {
    }

    public ngOnInit(): void {
        this.initChart();
    }

    private initChart() {
        this.stockQuoteSubscription = this.stockData.getStockQuote(this.stockSymbol).subscribe((stock) => {
            this.chartDataSubscription = this.stockData.getStockDataForChart(this.stockSymbol, DateRange.FiveYears).subscribe((chartData) => {
                    const chartDataFormatted: any = [];
                    chartData.forEach((e) => {
                        chartDataFormatted.push([Date.parse(e.date), e.close]);
                    });

                    this.showLoading = false;

                    this.chart = new StockChart({
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: stock.companyName
                        },
                        series: [{
                            name: stock.symbol,
                            data: chartDataFormatted
                        }]
                    });
                }
            );
        });
    }

    ngOnDestroy(): void {
        if (this.chartDataSubscription) {
            this.chartDataSubscription.unsubscribe();
        }

        if (this.stockQuoteSubscription) {
            this.stockQuoteSubscription.unsubscribe();
        }
    }
}
