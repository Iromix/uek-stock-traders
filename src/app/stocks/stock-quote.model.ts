export class StockQuote {
    public symbol: string;
    public companyName: string;
    public primaryExchange: string;
    public sector: string;
    public open: number;
    public close: number;
    public high: number;
    public low: number;
    public latestPrice: number;
    public latestTime: Date;
    public latestVolume: number;
    public previousClose: number;
    public change: number;
    public changePercent: number;
    public avgTotalVolume: number;
    public marketCap: number;
    public peRatio: number;
}
