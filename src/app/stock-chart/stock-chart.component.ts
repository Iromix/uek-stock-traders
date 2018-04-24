import { Component, OnInit, Input } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { StockDataService } from '../stocks/stocks-data.service';
import { DateRange } from '../stocks/data-range.model';

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
})
export class StockChartComponent implements OnInit {

    @Input() stockSymbol: string;
    chart: StockChart;

    constructor(private stockData: StockDataService) {
    }

    ngOnInit(): void {
        this.initChart();
    }

    private initChart() {
        this.stockData.getStockQuote(this.stockSymbol).subscribe(stock => {
            this.stockData.getStockDataForChart(this.stockSymbol, DateRange.FiveYears).subscribe((chartData) => {

                    let chartDataFormatted: any = [];
                    chartData.forEach((e) => {
                        chartDataFormatted.push([Date.parse(e.date), e.close])
                    });

                    this.chart = new StockChart({
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: stock.companyName + ' stock price'
                        },
                        series: [{
                            name: stock.symbol,
                            data: chartDataFormatted
                        }]
                    })
                }
            )
        });
    }
}
