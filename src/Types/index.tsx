export interface Lot {
  id: string;
  label: string;
  minPrice: number;
  currentPrice: number;
  ownerId: string | null;
}

export interface Bid {
  lotId: string;
  accountId: string;
  amount: number;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface AppState {
  lots: Lot[];
  bids: Bid[];
  accounts: Account[];
  currentAccountId: string | null;
  viewMode: 'treemap' | 'list';
  availableLotIds: string[];
  auctionEndTime: number | null;
}

export type AppAction =
  | { type: 'PLACE_BID'; payload: { lotId: string; amount: number } }
  | { type: 'REMOVE_BID'; payload: { lotId: string } }
  | { type: 'SET_ACCOUNT'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'treemap' | 'list' }
  | { type: 'START_AUCTION'; payload: { lotIds: string[]; endTime: number } }
  | { type: 'END_AUCTION' };