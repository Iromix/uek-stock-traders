export class StockQuote {
    symbol: string;
    companyName: string;
    primaryExchange: string;
    sector: string;
    open: number;
    close: number;
    high: number;
    low: number;
    latestPrice: number;
    latestTime: Date;
    latestVolume: number;
    previousClose: number;
    change: number;
    changePercent: number;
    avgTotalVolume: number;
    marketCap: number;
    peRatio: number;
}