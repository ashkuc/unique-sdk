import {
  AddressArguments,
  Balance,
  TransferBuildArguments,
  UnsignedTxPayload,
} from '@unique-nft/sdk/types';
import { formatBalance } from '@unique-nft/sdk/utils';
import { SdkStateQueries } from '@unique-nft/sdk/state-queries';
import { ApiPromise } from '@polkadot/api';
import { SdkExtrinsics } from '@unique-nft/sdk/extrinsics';

interface Sdk {
  api: ApiPromise;
  extrinsics: SdkExtrinsics;
  stateQueries: SdkStateQueries;
}

export class SdkBalance {
  private readonly multiplierToRaw: number;

  constructor(private readonly sdk: Sdk) {
    const tokenDecimals = this.sdk.api.registry.chainDecimals[0];
    this.multiplierToRaw = 10 ** tokenDecimals;
  }

  async get(args: AddressArguments): Promise<Balance> {
    // todo `get`: this.api[section][method]?
    // todo getBalance(address) { this.get('balances', 'all', address);
    const { availableBalance } = await this.sdk.api.derive.balances.all(
      args.address,
    );

    return formatBalance(this.sdk.api, availableBalance);
  }

  async transfer(args: TransferBuildArguments): Promise<UnsignedTxPayload> {
    const amountRaw = BigInt(args.amount * this.multiplierToRaw);
    return this.sdk.extrinsics.build({
      address: args.address,
      section: 'balances',
      method: 'transfer',
      args: [args.destination, amountRaw],
    });
  }
}
