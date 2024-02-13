import type { IPoolService, TradeRouter } from '@galacticcouncil/sdk';
import type { ApiPromise } from '@polkadot/api';
import type { SingleValueData } from 'lightweight-charts';

export interface Account {
  name: string;
  address: string;
  provider: string;
}

export interface Chain {
  api: ApiPromise;
  ecosystem: Ecosystem;
  poolService: IPoolService;
  router: TradeRouter;
}

export enum Ecosystem {
  Kusama = 'kusama',
  Polkadot = 'polkadot',
  Testnet = 'testnet',
}

export interface TradeConfig {
  slippage: string;
  slippageTwap: string;
  maxRetries: number;
}

export interface DcaConfig {
  slippage: string;
  maxRetries: number;
}

export type TradeData = {
  primary: SingleValueData[];
  secondary: SingleValueData[];
};