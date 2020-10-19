export interface OrderBookModel {
  base_currency: string;
  base_increment: string;
  base_max_size: string;
  base_min_size: string;
  cancel_only: boolean;
  display_name: string;
  id: string;
  limit_only: boolean;
  margin_enabled: boolean;
  max_market_funds: string;
  min_market_funds: string;
  post_only: boolean;
  quote_currency: string;
  quote_increment: string;
  status: string;
  status_message: string;
  type: string;
}

export interface Level2Model {
  type: 'l2update' | 'snapshot' | 'ticker';
  product_id: string;
  time?: Date;
  price?: number;
  changes?: Array<Array<string>>;
  asks?: Array<any>;
  bids?: Array<any>;
  // ticker
  best_ask: string;
  best_bid: string;
  high_24h: string;
  last_size: string;
  low_24h: string;
  open_24h: string;
  sequence: number;
  side: 'buy' | 'sell';
  trade_id: number;
  volume_24h: string;
  volume_30d: string;
}
export interface OfferChartDataModel {
  bidstotalvolume?: number;
  bidsvolume?: number;
  askstotalvolume?: number;
  asksvolume?: number;
  value: number;
}

export const getOfferChartID = (offer: OfferChartDataModel) => {
  const type = offer.bidstotalvolume ? 'sell' : 'buy';
  return `${type}_${offer.value}`;
};

export enum CryptoMarkets {
  COINBASE,
  KRAKEN,
  BINANCE,
  BITFINEX,
  BITMEX,
  /*
  DERIBIT,
  OKEX,*/
}

export interface CryptoMarketModel {
  label: string;
  ws: string;
  wsf: string;
}

export const CryptoMarketList: Array<CryptoMarketModel> = [
  { label: `COINBASE`, ws: 'wss://ws-feed.pro.coinbase.com', wsf: null },
  { label: `KRAKEN`, ws: 'wss://ws.kraken.com	', wsf: null },
  { label: 'BINANCE', ws: 'wss://fstream.binance.com', wsf: 'wss://fstream.binance.com' },
  { label: 'OKEX', ws: 'wss://ws-feed.pro.coinbase.com', wsf: 'wss://ws-feed.pro.coinbase.com' },
  { label: 'BITFINEX', ws: 'wss://ws-feed.pro.coinbase.com', wsf: null },
  { label: 'DERIBIT', ws: null, wsf: 'wss://ws-feed.pro.coinbase.com' },
  {
    label: 'BITMEX',
    ws: null,
    wsf: 'wss://www.bitmex.com/realtime',
  },
];

export const MarketTypes = ['Spot', 'Future', 'Option'];

// Helper
const StringIsNumber = (value) => isNaN(Number(value)) === false;

// Turn enum into array
function ToArray(enumeration) {
  return Object.keys(enumeration)
    .filter(StringIsNumber)
    .map((key) => enumeration[key]);
}

export const CryptoList = ToArray(CryptoMarkets);
